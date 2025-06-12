import { checkBatchResponse } from "./response";

async function main() {
  console.log("🔍 배치 응답 확인 예제");

  // 여기에 실제 JobID를 입력하세요
  const jobId = "YOUR_JOB_ID_HERE";

  if (jobId !== "YOUR_JOB_ID_HERE") {
    try {
      const status = await checkBatchResponse(jobId);

      console.log(`📊 상태: ${status.state}`);
      console.log(`✅ 완료: ${status.isCompleted}`);
      console.log(`🎉 성공: ${status.isSucceeded}`);

      if (status.isSucceeded && status.results) {
        console.log(`\n📋 결과 (${status.results.length}개):`);
        status.results.forEach((result) => {
          console.log(`• ${result.id}: ${result.answer || "응답없음"}`);
        });
      } else if (status.isFailed) {
        console.log(`❌ 실패: ${status.error}`);
      } else {
        console.log(`⏳ 아직 진행중...`);
      }
    } catch (error) {
      console.error("❌ 확인 실패:", error);
    }
  } else {
    console.log("⚠️ JobID를 입력하세요");
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

export {};
