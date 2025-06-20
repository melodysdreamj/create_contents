// pocket_base 라이브러리 가져오기
import { New, NewPocketBaseCollection } from "./_";
import { Buffer } from "buffer";

async function main() {
  console.log("--- 버퍼 업로드 예제 시작 ---");

  // 1. 업로드할 PocketBase 레코드 정보 준비
  const object = new New();
  object.docId = "buffer_test_doc_01";

  // 2. 업로드할 버퍼 생성
  const content = "이것은 버퍼로 업로드될 테스트 파일의 내용입니다.";
  const buffer = Buffer.from(content, "utf-8");

  console.log(`'${object.docId}' 레코드에 버퍼 내용 업로드를 시도합니다.`);

  // 3. 버퍼 업로드 함수 호출
  const result = await NewPocketBaseCollection.upsertFileFromBuffer(
    object,
    buffer
  );

  if (result) {
    console.log("✅ 버퍼 업로드 성공:", result);
  } else {
    console.error("❌ 버퍼 업로드 실패");
  }

  console.log("--- 버퍼 업로드 예제 종료 ---");
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    process.exit(0);
  });

export {};
