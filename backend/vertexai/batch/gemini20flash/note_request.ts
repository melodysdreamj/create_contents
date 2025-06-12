import { requestBatchPrediction } from "./request";

async function main() {
  console.log("🚀 배치 요청 예제");

  // 테스트 프롬프트
  const prompts = [
    { id: "q1", text: "사과에 대해 간단히 설명해주세요." },
    { id: "q2", text: "바나나의 효능은 무엇인가요?" },
    { id: "q3", text: "오렌지 주스 만드는 법을 알려주세요." },
  ];

  console.log(`📝 프롬프트: ${prompts.length}개`);

  try {
    const jobId = await requestBatchPrediction(prompts);

    console.log(`✅ 요청 완료!`);
    console.log(`📋 Job ID: ${jobId}`);
    console.log(`\n결과 확인: note_response.ts에서 위 JobID로 확인하세요.`);
  } catch (error) {
    console.error("❌ 요청 실패:", error);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

export {};
