// pocket_base 라이브러리 가져오기
import { New, NewPocketBaseCollection } from "./_";
import * as fs from "fs";
import path from "path";

async function main() {
  console.log("--- 버퍼 다운로드 예제 시작 ---");

  // 1. 다운로드할 파일이 포함된 PocketBase 레코드 정보 준비
  const object = new New();
  object.docId = "buffer_test_doc_01";

  console.log(
    `'${object.docId}' 레코드로부터 파일 버퍼 다운로드를 시도합니다.`
  );

  // 2. 버퍼 다운로드 함수 호출
  const downloadBuffer = await NewPocketBaseCollection.downloadFileAsBuffer(
    object
  );

  if (downloadBuffer) {
    // 3. 다운로드된 버퍼를 파일로 저장하고 내용 확인
    const downloadPath = path.join(__dirname, "downloaded_from_buffer.txt");
    fs.writeFileSync(downloadPath, new Uint8Array(downloadBuffer));

    console.log(`✅ 버퍼 다운로드 및 파일 저장 성공: ${downloadPath}`);
    console.log("저장된 파일 내용:", downloadBuffer.toString("utf-8"));
  } else {
    console.error(
      "❌ 버퍼 다운로드 실패: 해당 레코드에 파일이 없거나 오류 발생"
    );
  }

  console.log("--- 버퍼 다운로드 예제 종료 ---");
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
