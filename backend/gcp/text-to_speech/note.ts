import { synthesizeSpeechToBuffer, synthesizeSpeechToFile } from "./_";
import * as fs from "fs/promises";

// [중요] 이 스크립트를 실행하기 전에 GCP 인증이 필요합니다.
// 터미널에서 다음 명령어를 실행하여 애플리케이션 기본 사용자 인증 정보를 설정하세요:
// gcloud auth application-default login

async function main() {
  console.log("start");

  const text =
    "이것은 Google Cloud Text-to-Speech API를 테스트하기 위한 문장입니다.";

  // --- 1. 파일 저장 방식 ---
  console.log("\n[1] 파일 저장 방식으로 음성 파일 생성 시작...");
  await synthesizeSpeechToFile(text, "output_from_file_function.ogg");

  // --- 2. 버퍼 반환 방식 ---
  console.log("\n[2] 버퍼 반환 방식으로 음성 파일 생성 시작...");
  const audioBuffer = await synthesizeSpeechToBuffer(text);
  await fs.writeFile("output_from_buffer_function.ogg", audioBuffer, "binary");
  console.log("✅ [output_from_buffer_function.ogg] 생성 완료!");

  console.log("\n모든 작업 완료.");
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {});

export {};
