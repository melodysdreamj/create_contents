// pocket_base 라이브러리 가져오기
import { New, NewPocketBaseCollection } from "./_";
import * as fs from "fs";
import path from "path";

async function main() {
  console.log("--- 스트림 다운로드 예제 시작 ---");

  // 1. 다운로드할 파일이 포함된 PocketBase 레코드 정보 준비
  // 바로 위 업로드 예제에서 사용한 docId와 동일한 docId를 사용합니다.
  const object = new New();
  object.docId = "stream_test_doc_01";

  console.log(
    `'${object.docId}' 레코드로부터 파일 스트림 다운로드를 시도합니다.`
  );

  // 2. 스트림 다운로드 함수 호출
  const downloadStream = await NewPocketBaseCollection.downloadFileAsStream(
    object
  );

  if (downloadStream) {
    // 3. 다운로드된 스트림을 파일로 저장
    // 스트림을 다른 곳(예: R2 업로드 스트림)으로 바로 파이핑할 수도 있습니다.
    const downloadPath = path.join(__dirname, "downloaded_file.txt");
    const writer = fs.createWriteStream(downloadPath);

    downloadStream.pipe(writer);

    // 스트림이 끝나기를 기다립니다.
    await new Promise((resolve, reject) => {
      writer.on("finish", resolve);
      writer.on("error", reject);
    });

    console.log(`✅ 스트림 다운로드 및 파일 저장 성공: ${downloadPath}`);
    // 저장된 파일 내용 확인
    console.log("저장된 파일 내용:", fs.readFileSync(downloadPath, "utf-8"));
    // 테스트용으로 저장된 파일 삭제
    // fs.unlinkSync(downloadPath);
  } else {
    console.error(
      "❌ 스트림 다운로드 실패: 해당 레코드에 파일이 없거나 오류 발생"
    );
  }

  console.log("--- 스트림 다운로드 예제 종료 ---");
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
