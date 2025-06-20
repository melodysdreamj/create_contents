import { synthesizeSpeechToBuffer, synthesizeSpeechToFile } from "./_";
import * as fs from "fs/promises";
import { GoogleCloudPlatformVoiceTypesSqlite } from "../../sqlite/google_cloud_platform_voice_types/_";

// [중요] 이 스크립트를 실행하기 전에 GCP 인증이 필요합니다.
// 터미널에서 다음 명령어를 실행하여 애플리케이션 기본 사용자 인증 정보를 설정하세요:
// gcloud auth application-default login

async function main() {
  console.log("start");

  let allObjs = await GoogleCloudPlatformVoiceTypesSqlite.getAll();

  let uniqueObjs = allObjs.filter(
    (obj, index, self) =>
      index === self.findIndex((t) => t.language === obj.language)
  );

  console.log(uniqueObjs.map((obj) => obj.language));
  console.log(uniqueObjs.length);
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {});

export {};
