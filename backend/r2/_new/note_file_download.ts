import { R2New } from "./_";
import * as fs from "fs";
import path from "path";

async function main() {
  console.log("--- R2 파일 다운로드 예제 시작 ---");

  // 1. 다운로드할 R2 객체의 키를 정의합니다. (업로드 예제에서 사용한 키)
  const r2Key = "test-files/file_upload_example.txt";

  // 2. 다운로드 받을 로컬 파일 경로를 지정합니다.
  const downloadFilePath = path.join(__dirname, "downloaded_from_r2.txt");

  console.log(
    `R2 키 '${r2Key}'의 파일을 '${downloadFilePath}'(으)로 다운로드합니다.`
  );

  // 3. 파일 다운로드 함수를 호출하고 성공 여부를 받습니다.
  const success = await R2New.downloadFile(r2Key, downloadFilePath);

  if (success) {
    console.log("✅ 파일 다운로드 성공.");

    // 4. 다운로드된 파일의 내용을 확인하고 삭제합니다.
    const content = fs.readFileSync(downloadFilePath, "utf-8");
    console.log("다운로드된 파일 내용:", content);
    fs.unlinkSync(downloadFilePath);
    console.log("다운로드했던 임시 파일을 삭제했습니다.");
  } else {
    console.error("❌ 파일 다운로드에 실패했습니다.");
  }

  console.log("--- R2 파일 다운로드 예제 종료 ---");
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
