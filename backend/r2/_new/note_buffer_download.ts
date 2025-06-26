import { R2New } from "./_";
import * as fs from "fs";
import * as path from "path";

async function main() {
  console.log("--- Buffer Download Test ---");

  // 1. 다운로드할 객체 키(파일 이름) 정의 (업로드 테스트에서 사용한 키와 동일해야 함)
  const key = "test/buffer_upload_sample.txt";

  console.log(`Downloading object from R2 with key: ${key}`);

  // 2. R2New 클래스의 downloadAsBuffer 함수 호출
  const downloadedBuffer = await R2New.downloadAsBuffer(key);

  // 3. 결과 확인
  if (downloadedBuffer) {
    console.log("✅ Download successful!");
    console.log(`Downloaded buffer size: ${downloadedBuffer.length} bytes`);

    // 다운로드한 버퍼를 문자열로 변환하여 내용 확인
    const content = downloadedBuffer.toString("utf-8");
    console.log("--- Content ---");
    console.log(content);
    console.log("---------------");

    // (선택) 다운로드한 버퍼를 로컬 파일로 저장하여 확인
    const outputPath = path.join(__dirname, "downloaded_from_r2.txt");
    fs.writeFileSync(outputPath, downloadedBuffer);
    console.log(`Buffer saved to local file: ${outputPath}`);
  } else {
    console.error("❌ Download failed. Buffer is null. (Is the key correct?)");
  }

  console.log("--- Buffer Download Test Finished ---");
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {});

export {};
