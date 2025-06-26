import { R2New } from "./_";

async function main() {
  console.log("--- Buffer Upload Test ---");

  // 1. 업로드할 버퍼 생성 (예: 텍스트를 버퍼로 변환)
  const content =
    "이것은 R2에 업로드할 샘플 버퍼 데이터입니다. Hello R2 from Buffer!";
  const sampleBuffer = Buffer.from(content, "utf-8");

  // 2. R2에 저장할 객체 키(파일 이름) 정의
  const key = "test/buffer_upload_sample.txt";

  console.log(`Uploading buffer to R2 with key: ${key}`);
  console.log(`Buffer size: ${sampleBuffer.length} bytes`);

  // 3. R2New 클래스의 uploadBuffer 함수 호출
  await R2New.uploadBuffer(sampleBuffer, key);

  console.log("--- Buffer Upload Test Finished ---");
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {});

export {};
