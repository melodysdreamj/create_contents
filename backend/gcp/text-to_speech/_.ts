import { TextToSpeechClient } from "@google-cloud/text-to-speech";
import * as fs from "fs/promises";

console.log("Initializing Google TextToSpeechClient...");
// 클라이언트는 한 번만 초기화하고 재사용하는 것이 좋습니다.
const client = new TextToSpeechClient();

/**
 * 텍스트를 음성으로 변환하여 파일에 저장합니다.
 * @param text 변환할 텍스트
 * @param outputFileName 저장할 파일 경로
 */
export async function synthesizeSpeechToFile(
  text: string,
  outputFileName: string
) {
  const request = {
    input: { text },
    voice: { languageCode: "ko-KR", name: "ko-KR-Chirp3-HD-Achernar" },
    audioConfig: {
      audioEncoding: "OGG_OPUS" as const,
    },
  };

  const [response] = await client.synthesizeSpeech(request);

  if (!response.audioContent) {
    throw new Error("Audio content is empty.");
  }

  await fs.writeFile(outputFileName, response.audioContent, "binary");
  console.log(`✅ [${outputFileName}] 생성 완료!`);
}

/**
 * 텍스트를 음성으로 변환하여 버퍼(Uint8Array) 형태로 반환합니다.
 * @param text 변환할 텍스트
 * @returns 오디오 데이터가 담긴 버퍼
 */
export async function synthesizeSpeechToBuffer(text: string) {
  const request = {
    input: { text },
    voice: { languageCode: "ko-KR", name: "ko-KR-Chirp3-HD-Achernar" },
    audioConfig: {
      audioEncoding: "OGG_OPUS" as const,
    },
  };

  const [response] = await client.synthesizeSpeech(request);

  if (!response.audioContent) {
    throw new Error("Audio content is empty.");
  }

  return response.audioContent;
}
