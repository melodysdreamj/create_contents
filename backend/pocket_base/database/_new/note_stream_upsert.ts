// pocket_base 라이브러리 가져오기
import { New, NewPocketBaseCollection } from "./_";
import * as fs from "fs";
import path from "path";
import { Readable } from "stream";

async function main() {
  console.log("--- 스트림 업로드 예제 시작 ---");

  // 1. 업로드할 테스트용 파일과 스트림 생성
  // 실제 사용 시에는 업로드할 파일의 스트림을 가져오면 됩니다.
  const tempFilePath = path.join(__dirname, "temp_upload_file.txt");
  const fileContent = "이것은 스트림으로 업로드될 테스트 파일의 내용입니다.";
  fs.writeFileSync(tempFilePath, fileContent);

  // 파일로부터 Readable 스트림을 생성합니다.
  const fileStream = fs.createReadStream(tempFilePath);

  // 2. PocketBase에 저장될 객체 정보 준비
  // 특정 docId를 가진 레코드에 파일을 연결합니다.
  const object = new New();
  object.docId = "stream_test_doc_01"; // 이 docId를 가진 레코드가 없으면 새로 생성됩니다.

  console.log(`'${object.docId}' 레코드에 파일 스트림 업로드를 시도합니다.`);

  // 3. 스트림 업로드 함수 호출
  const result = await NewPocketBaseCollection.upsertFileFromStream(
    object,
    fileStream
  );

  if (result) {
    console.log("✅ 스트림 업로드 성공:", JSON.stringify(result, null, 2));
  } else {
    console.error("❌ 스트림 업로드 실패");
  }

  // 4. 테스트용 파일 삭제
  fs.unlinkSync(tempFilePath);

  console.log("--- 스트림 업로드 예제 종료 ---");
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    // PocketBase SDK가 내부적으로 열린 연결을 유지할 수 있으므로,
    // process.exit()를 호출하여 명시적으로 프로세스를 종료하는 것이 좋습니다.
    process.exit(0);
  });

export {};
