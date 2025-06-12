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

interface PromptWithId {
  id: string;
  text: string;
}

/**
 * Gemini 2.0 Flash 모델에 배치 예측 요청을 보냅니다.
 * @param prompts - 요청할 프롬프트 배열 (ID와 텍스트 객체)
 * @returns 생성된 배치 예측 작업의 ID
 */
export async function requestBatchPrediction(
  prompts: PromptWithId[]
): Promise<string> {
  const bucket = storage.bucket(GCS_BUCKET_NAME!);
  const { v4: uuidv4 } = require("uuid");
  const jobUuid = uuidv4();
  const inputFileName = `batch-prompts-${jobUuid}.jsonl`;
  const outputPrefix = `batch-results-${jobUuid}/`;
  const timestamp = new Date().toISOString();

  // 1. 프롬프트를 JSONL 형식으로 변환
  const jsonlData = prompts
    .map((prompt) => {
      const request = {
        contents: [
          {
            role: "user",
            parts: [{ text: prompt.text }],
          },
        ],
      };
      return JSON.stringify({ request, custom_id: prompt.id });
    })
    .join("\n");

  // 2. 메타데이터 파일 저장
  const metadata = {
    fileUuid: jobUuid,
    prompts: prompts,
    timestamp: timestamp,
    promptCount: prompts.length,
  };

  const metadataFile = bucket.file(`batch-metadata-${jobUuid}.json`);
  await metadataFile.save(JSON.stringify(metadata, null, 2), {
    contentType: "application/json",
  });

  // 3. JSONL 파일을 GCS에 업로드
  const inputFile = bucket.file(inputFileName);
  await inputFile.save(jsonlData, {
    contentType: "application/jsonl",
  });

  console.log(
    `📤 입력 파일 업로드 완료: gs://${GCS_BUCKET_NAME}/${inputFileName}`
  );

  // 4. 배치 예측 작업 생성
  const model = `projects/${VERTEX_AI_PROJECT_ID}/locations/${VERTEX_AI_LOCATION}/publishers/google/models/gemini-2.0-flash-001`;

  const batchPredictionJob = {
    displayName: `gemini-batch-predict-${jobUuid}`,
    model: model,
    inputConfig: {
      instancesFormat: "jsonl",
      gcsSource: {
        uris: [`gs://${GCS_BUCKET_NAME}/${inputFileName}`],
      },
    },
    outputConfig: {
      predictionsFormat: "jsonl",
      gcsDestination: {
        outputUriPrefix: `gs://${GCS_BUCKET_NAME}/${outputPrefix}`,
      },
    },
  };

  const [response] = await jobServiceClient.createBatchPredictionJob({
    parent: `projects/${VERTEX_AI_PROJECT_ID}/locations/${VERTEX_AI_LOCATION}`,
    batchPredictionJob: batchPredictionJob,
  });

  if (!response.name) {
    throw new Error("배치 예측 작업 생성에 실패했습니다.");
  }

  console.log(`✅ 배치 예측 작업 생성 완료: ${response.name}`);

  const jobId = response.name.split("/").pop();
  if (!jobId) {
    throw new Error("작업 ID를 추출할 수 없습니다.");
  }

  return jobId;
}
