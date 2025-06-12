import { JobServiceClient } from "@google-cloud/aiplatform";
import { Storage } from "@google-cloud/storage";
import dotenv from "dotenv";

dotenv.config();

const { GCS_BUCKET_NAME, VERTEX_AI_PROJECT_ID, VERTEX_AI_LOCATION } =
  process.env;

if (!GCS_BUCKET_NAME || !VERTEX_AI_PROJECT_ID || !VERTEX_AI_LOCATION) {
  throw new Error(
    "GCS_BUCKET_NAME, VERTEX_AI_PROJECT_ID, and VERTEX_AI_LOCATION must be set in the environment variables"
  );
}

const storage = new Storage();
const jobServiceClient = new JobServiceClient({
  apiEndpoint: `${VERTEX_AI_LOCATION}-aiplatform.googleapis.com`,
});

interface BatchResult {
  id: string;
  originalPrompt: string;
  response: any;
  answer: string | null;
}

interface BatchStatus {
  state: string;
  isCompleted: boolean;
  isSucceeded: boolean;
  isFailed: boolean;
  error?: any;
  results?: BatchResult[];
  displayName?: string;
}

/**
 * 배치 작업 상태 확인
 */
async function checkJobStatus(jobId: string) {
  const jobName = `projects/${VERTEX_AI_PROJECT_ID}/locations/${VERTEX_AI_LOCATION}/batchPredictionJobs/${jobId}`;

  try {
    const [job] = await jobServiceClient.getBatchPredictionJob({
      name: jobName,
    });

    return {
      id: jobId,
      displayName: job.displayName,
      state: job.state,
      createTime: job.createTime,
      startTime: job.startTime,
      endTime: job.endTime,
      outputInfo: job.outputInfo,
      error: job.error,
    };
  } catch (error) {
    console.error("배치 작업 상태 확인 오류:", error);
    throw error;
  }
}

/**
 * 완료된 배치 작업의 결과를 다운로드
 */
async function downloadResults(jobUuid: string): Promise<BatchResult[]> {
  const bucket = storage.bucket(GCS_BUCKET_NAME!);
  const outputPrefix = `batch-results-${jobUuid}/`;
  const metadataFileName = `batch-metadata-${jobUuid}.json`;

  try {
    // 1. 메타데이터 다운로드
    let metadata = null;
    try {
      const metadataFile = bucket.file(metadataFileName);
      const [metadataContent] = await metadataFile.download();
      metadata = JSON.parse(metadataContent.toString());
    } catch (metadataError) {
      console.warn("⚠️ 메타데이터 파일을 찾을 수 없습니다:", metadataError);
    }

    // 2. 결과 파일들 나열
    const [files] = await bucket.getFiles({
      prefix: outputPrefix,
    });

    if (files.length === 0) {
      throw new Error(`결과 파일을 찾을 수 없습니다: ${jobUuid}`);
    }

    const rawResults: any[] = [];

    // 3. 각 결과 파일 다운로드 및 파싱
    for (const file of files) {
      if (file.name.endsWith(".jsonl")) {
        console.log(`📥 다운로드 중: ${file.name}...`);

        const [content] = await file.download();
        const lines = content.toString().trim().split("\n");

        for (const line of lines) {
          if (line.trim()) {
            try {
              const result = JSON.parse(line);
              rawResults.push(result);
            } catch (parseError) {
              console.error(`파싱 오류: ${line}`, parseError);
            }
          }
        }
      }
    }

    // 4. custom_id 기준으로 정렬
    const idToIndexMap = new Map();
    if (metadata?.prompts) {
      metadata.prompts.forEach((prompt: any, index: number) => {
        idToIndexMap.set(prompt.id, index);
      });
    }

    rawResults.sort((a, b) => {
      const aIndex = idToIndexMap.get(a.custom_id) ?? 999999;
      const bIndex = idToIndexMap.get(b.custom_id) ?? 999999;
      return aIndex - bIndex;
    });

    // 5. 결과 가공
    const orderedResults: BatchResult[] = rawResults.map((result) => {
      const originalIndex = idToIndexMap.get(result.custom_id);
      const originalPrompt = metadata?.prompts?.[originalIndex] || null;

      return {
        id: result.custom_id,
        originalPrompt: originalPrompt?.text || "",
        response: result.response,
        answer:
          result.response?.candidates?.[0]?.content?.parts?.[0]?.text || null,
      };
    });

    console.log(`📊 다운로드 완료: ${orderedResults.length}개 결과`);
    return orderedResults;
  } catch (error) {
    console.error("결과 다운로드 오류:", error);
    throw error;
  }
}

/**
 * 배치 파일들을 자동으로 정리
 */
async function cleanupBatchFiles(displayName: string | null | undefined) {
  if (!displayName) return;

  const jobUuid = displayName.replace("gemini-batch-predict-", "");
  const bucket = storage.bucket(GCS_BUCKET_NAME!);

  const patterns = [
    `batch-prompts-${jobUuid}.jsonl`,
    `batch-metadata-${jobUuid}.json`,
    `batch-results-${jobUuid}/`,
  ];

  try {
    for (const pattern of patterns) {
      if (pattern.endsWith("/")) {
        const [files] = await bucket.getFiles({ prefix: pattern });
        for (const file of files) {
          try {
            await file.delete();
          } catch (error: any) {
            if (error.code !== 404) {
              console.error(`❌ 삭제 실패: ${file.name}`);
            }
          }
        }
      } else {
        try {
          await bucket.file(pattern).delete();
        } catch (error: any) {
          if (error.code !== 404) {
            console.error(`❌ 삭제 실패: ${pattern}`);
          }
        }
      }
    }
    console.log(`🧹 관련 파일들이 정리되었습니다.`);
  } catch (error) {
    console.error(`❌ 파일 정리 오류:`, error);
  }
}

/**
 * jobId를 통해 배치 작업 상태 확인 및 결과 반환
 */
export async function checkBatchResponse(jobId: string): Promise<BatchStatus> {
  try {
    const status = await checkJobStatus(jobId);

    const batchStatus: BatchStatus = {
      state: String(status.state) || "UNKNOWN",
      isCompleted:
        status.state === "JOB_STATE_SUCCEEDED" ||
        status.state === "JOB_STATE_FAILED",
      isSucceeded: status.state === "JOB_STATE_SUCCEEDED",
      isFailed: status.state === "JOB_STATE_FAILED",
      error: status.error,
      displayName: status.displayName || undefined,
    };

    // 성공적으로 완료된 경우에만 결과 다운로드
    if (batchStatus.isSucceeded) {
      // jobId에서 jobUuid 추출 (displayName에서)
      const jobUuid = status.displayName?.replace("gemini-batch-predict-", "");
      if (jobUuid) {
        try {
          const results = await downloadResults(jobUuid);
          batchStatus.results = results;

          // 성공적으로 결과를 가져온 후 자동으로 파일 정리
          await cleanupBatchFiles(status.displayName);
        } catch (downloadError) {
          console.error("결과 다운로드 실패:", downloadError);
          batchStatus.error = downloadError;
        }
      }
    }

    return batchStatus;
  } catch (error) {
    console.error("배치 응답 확인 오류:", error);
    throw error;
  }
}

/**
 * jobUuid를 통해 배치 작업 상태 확인 및 결과 반환
 */
export async function checkBatchResponseByUuid(
  jobUuid: string
): Promise<BatchStatus> {
  try {
    // 메타데이터에서 jobId를 찾거나, 직접 상태 확인
    // 여기서는 결과 파일 존재 여부로 완료 상태를 판단
    const bucket = storage.bucket(GCS_BUCKET_NAME!);
    const outputPrefix = `batch-results-${jobUuid}/`;

    const [files] = await bucket.getFiles({
      prefix: outputPrefix,
    });

    const hasResults = files.some((file) => file.name.endsWith(".jsonl"));

    if (hasResults) {
      // 결과 파일이 있으면 완료된 것으로 간주
      try {
        const results = await downloadResults(jobUuid);
        return {
          state: "JOB_STATE_SUCCEEDED",
          isCompleted: true,
          isSucceeded: true,
          isFailed: false,
          results: results,
        };
      } catch (downloadError) {
        return {
          state: "JOB_STATE_FAILED",
          isCompleted: true,
          isSucceeded: false,
          isFailed: true,
          error: downloadError,
        };
      }
    } else {
      // 결과 파일이 없으면 아직 진행 중
      return {
        state: "JOB_STATE_RUNNING",
        isCompleted: false,
        isSucceeded: false,
        isFailed: false,
      };
    }
  } catch (error) {
    console.error("배치 응답 확인 오류 (UUID):", error);
    return {
      state: "JOB_STATE_FAILED",
      isCompleted: true,
      isSucceeded: false,
      isFailed: true,
      error: error,
    };
  }
}
