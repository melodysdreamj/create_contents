import { R2New } from "./_";
import * as fs from "fs";
import path from "path";

async function main() {
  console.log("--- R2 스트림 다운로드 예제 시작 ---");

  // 1. 다운로드할 R2 객체의 키를 정의합니다. (스트림 업로드 예제에서 사용한 키)
  const r2Key = "test-files/stream_upload_example.txt";

  // 2. 다운로드 스트림을 저장할 로컬 파일 경로를 지정합니다.
  const downloadFilePath = path.join(
    __dirname,
    "downloaded_stream_from_r2.txt"
  );

  console.log(
    `R2 키 '${r2Key}'의 파일을 스트림으로 다운로드하여 '${downloadFilePath}'에 저장합니다.`
  );

  // 3. 스트림 다운로드 함수를 호출하여 Readable 스트림을 얻습니다.
  const downloadStream = await R2New.downloadStream(r2Key);

  if (downloadStream) {
    console.log(
      "✅ 다운로드 스트림을 성공적으로 얻었습니다. 파일로 저장을 시작합니다."
    );
    // 4. 받아온 스트림을 파일 쓰기 스트림(Writable Stream)에 연결(pipe)합니다.
    const writer = fs.createWriteStream(downloadFilePath);
    downloadStream.pipe(writer);

    try {
      // 스트림이 모두 완료될 때까지 기다립니다.
      await new Promise<void>((resolve, reject) => {
        writer.on("finish", resolve);
        writer.on("error", reject); // 쓰기 오류 처리
        downloadStream.on("error", reject); // 읽기 오류 처리
      });

      console.log("✅ 파일 저장이 완료되었습니다.");

      // 5. 다운로드된 파일의 내용을 확인하고 삭제합니다.
      const content = fs.readFileSync(downloadFilePath, "utf-8");
      console.log("다운로드된 파일 내용:", content);
      fs.unlinkSync(downloadFilePath);
      console.log("다운로드했던 임시 파일을 삭제했습니다.");
    } catch (error) {
      console.error(
        "❌ 스트림을 파일로 저장하는 중 오류가 발생했습니다.",
        error
      );
    }
  } else {
    console.error("❌ 스트림 다운로드에 실패했습니다. (반환값: null)");
  }

  console.log("--- R2 스트림 다운로드 예제 종료 ---");
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
