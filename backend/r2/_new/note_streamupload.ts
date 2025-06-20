import { R2New } from "./_";
import * as fs from "fs";
import path from "path";

async function main() {
  console.log("--- R2 스트림 업로드 예제 시작 ---");

  // 1. 업로드할 테스트용 파일을 생성합니다.
  const uploadFilePath = path.join(__dirname, "upload_stream_test.txt");
  const fileContent = `이 파일은 스트림을 통해 ${new Date().toISOString()}에 업로드되었습니다.`;
  fs.writeFileSync(uploadFilePath, fileContent);

  // 2. 파일로부터 읽기 스트림(Readable Stream)을 생성합니다.
  const stream = fs.createReadStream(uploadFilePath);

  // 3. R2에 저장될 객체 키를 정의합니다.
  const r2Key = "test-files/stream_upload_example.txt";

  console.log(`파일 스트림을 R2 키 '${r2Key}'(으)로 업로드합니다.`);

  try {
    // 4. 스트림 업로드 함수를 호출합니다.
    await R2New.uploadStream(stream, r2Key);
    console.log("✅ 스트림 업로드 성공.");
  } catch (error) {
    console.error("❌ 스트림 업로드 중 오류가 발생했습니다.", error);
  } finally {
    // 5. 테스트용으로 생성한 로컬 파일을 삭제합니다.
    fs.unlinkSync(uploadFilePath);
    console.log("생성했던 임시 파일을 삭제했습니다.");
  }

  console.log("--- R2 스트림 업로드 예제 종료 ---");
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
