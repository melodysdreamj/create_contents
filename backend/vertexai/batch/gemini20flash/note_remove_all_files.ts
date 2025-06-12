import { Storage } from "@google-cloud/storage";
import dotenv from "dotenv";
import * as readline from "readline";

dotenv.config();

const { GCS_BUCKET_NAME } = process.env;

if (!GCS_BUCKET_NAME) {
  throw new Error("GCS_BUCKET_NAME must be set in the environment variables");
}

const storage = new Storage();

/**
 * 사용자 확인을 위한 프롬프트
 */
function askConfirmation(question: string): Promise<boolean> {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      rl.close();
      resolve(answer.toLowerCase() === "y" || answer.toLowerCase() === "yes");
    });
  });
}

/**
 * 배치 관련 파일들을 모두 삭제
 */
async function removeAllBatchFiles() {
  const bucket = storage.bucket(GCS_BUCKET_NAME!);

  console.log(`🔍 버킷 스캔 중: ${GCS_BUCKET_NAME}`);

  // 배치 관련 파일 패턴
  const patterns = ["batch-prompts-", "batch-results-", "batch-metadata-"];

  let totalFiles = 0;
  const filesToDelete: string[] = [];

  try {
    // 모든 파일 나열
    const [files] = await bucket.getFiles();

    // 배치 관련 파일 필터링
    for (const file of files) {
      const fileName = file.name;

      if (patterns.some((pattern) => fileName.startsWith(pattern))) {
        filesToDelete.push(fileName);
      }
    }

    totalFiles = filesToDelete.length;

    if (totalFiles === 0) {
      console.log("✅ 삭제할 배치 파일이 없습니다.");
      return;
    }

    console.log(`\n📊 발견된 배치 파일: ${totalFiles}개`);
    console.log("📋 삭제 예정 파일들:");

    // 파일 목록 출력 (최대 10개까지)
    filesToDelete.slice(0, 10).forEach((fileName, index) => {
      console.log(`  ${index + 1}. ${fileName}`);
    });

    if (filesToDelete.length > 10) {
      console.log(`  ... 그리고 ${filesToDelete.length - 10}개 더`);
    }

    // 확인 프롬프트
    const confirmed = await askConfirmation(
      `\n⚠️  정말로 ${totalFiles}개의 배치 파일을 삭제하시겠습니까? (y/N): `
    );

    if (!confirmed) {
      console.log("❌ 삭제가 취소되었습니다.");
      return;
    }

    console.log("\n🗑️ 파일 삭제 중...");

    let deletedCount = 0;
    let failedCount = 0;

    // 파일 삭제 (병렬 처리)
    const deletePromises = filesToDelete.map(async (fileName) => {
      try {
        await bucket.file(fileName).delete();
        deletedCount++;

        if (deletedCount % 10 === 0) {
          console.log(`📍 진행 상황: ${deletedCount}/${totalFiles}`);
        }

        return { success: true, fileName };
      } catch (error) {
        failedCount++;
        console.error(`❌ 삭제 실패: ${fileName}`, error);
        return { success: false, fileName, error };
      }
    });

    await Promise.all(deletePromises);

    console.log(`\n✅ 삭제 완료!`);
    console.log(`📊 성공: ${deletedCount}개`);
    if (failedCount > 0) {
      console.log(`❌ 실패: ${failedCount}개`);
    }
  } catch (error) {
    console.error("❌ 버킷 스캔 실패:", error);
  }
}

/**
 * 특정 패턴의 파일만 삭제 (선택적 기능)
 */
async function removeFilesByPattern(pattern: string) {
  const bucket = storage.bucket(GCS_BUCKET_NAME!);

  console.log(`🔍 패턴 검색: ${pattern}`);

  try {
    const [files] = await bucket.getFiles({ prefix: pattern });

    if (files.length === 0) {
      console.log("✅ 해당 패턴의 파일이 없습니다.");
      return;
    }

    console.log(`📊 발견된 파일: ${files.length}개`);

    const confirmed = await askConfirmation(
      `패턴 '${pattern}'에 해당하는 ${files.length}개 파일을 삭제하시겠습니까? (y/N): `
    );

    if (!confirmed) {
      console.log("❌ 삭제가 취소되었습니다.");
      return;
    }

    console.log("🗑️ 삭제 중...");

    for (const file of files) {
      try {
        await file.delete();
        console.log(`✅ 삭제: ${file.name}`);
      } catch (error) {
        console.error(`❌ 삭제 실패: ${file.name}`, error);
      }
    }

    console.log("✅ 패턴별 삭제 완료!");
  } catch (error) {
    console.error("❌ 패턴 삭제 실패:", error);
  }
}

async function main() {
  console.log("🧹 배치 파일 정리 도구");
  console.log(`📁 대상 버킷: ${GCS_BUCKET_NAME}`);

  // 명령행 인수 확인
  const args = process.argv.slice(2);

  if (args.length > 0) {
    const pattern = args[0];
    console.log(`🎯 특정 패턴 삭제 모드: ${pattern}`);
    await removeFilesByPattern(pattern);
  } else {
    console.log("🎯 전체 배치 파일 삭제 모드");
    await removeAllBatchFiles();
  }
}

main().catch((err) => {
  console.error("❌ 실행 실패:", err);
  process.exit(1);
});

export {};
