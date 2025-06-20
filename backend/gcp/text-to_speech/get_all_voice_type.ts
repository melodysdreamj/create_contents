import {
  GoogleCloudPlatformVoiceTypes,
  GoogleCloudPlatformVoiceTypesSqlite,
} from "../../sqlite/google_cloud_platform_voice_types/_";
import { TextToSpeechClient } from "@google-cloud/text-to-speech";

// 클라이언트는 한 번만 생성해서 재사용합니다.
const client = new TextToSpeechClient();

async function getAllVoices() {
  console.log("Fetching all available voices from Google Cloud...");

  // listVoices 메소드를 호출합니다.
  const [response] = await client.listVoices({});
  const voices = response.voices;

  if (!voices) {
    console.log("No voices found!");
    return;
  }

  console.log(`Total voices found: ${voices.length}`);

  const languageRegionRules: { [key: string]: string } = {
    en: "en-US",
    es: "es-US",
    cmn: "cmn-CN",
    fr: "fr-FR",
    pt: "pt-BR",
    nl: "nl-NL",
  };

  // 전체 저장 시작
  for (const voice of voices) {
    // voice.name 은 'ko-KR-Chirp3-HD-Achernar' 와 같은 형식입니다.
    // 이를 분해하여 필요한 정보를 추출합니다.
    const nameParts = voice.name!.split("-");

    // 'ko-KR'과 같은 전체 언어 코드는 voice.languageCodes[0]에 들어있습니다.
    if (!voice.languageCodes || voice.languageCodes.length === 0) {
      console.warn(`Skipping voice with no language codes: ${voice.name}`);
      throw new Error("No language codes");
    }
    const languageAndCountry = voice.languageCodes[0];
    const langParts = languageAndCountry.split("-");
    const language = langParts[0];
    // 국가 코드가 없는 경우를 대비해 확인합니다.
    const country = langParts.length > 1 ? langParts[1] : "";

    // VoiceType은 이름의 마지막 부분입니다. (예: Achernar)
    const voiceType = nameParts[nameParts.length - 1];

    // GeneratorType은 언어/국가 코드와 VoiceType 사이의 모든 것입니다. (예: Chirp3-HD)
    // 인덱스 2부터 시작해서 마지막 요소를 제외하고 합칩니다.
    const generatorType = nameParts.slice(2, nameParts.length - 1).join("-");

    // 우선 최고 사양제외하고 저장안함
    if (generatorType !== "Chirp3-HD") {
      continue;
    }

    let googleCloudPlatformVoiceTypes = new GoogleCloudPlatformVoiceTypes(
      voice.name!
    );

    googleCloudPlatformVoiceTypes.GeneratorType = generatorType;
    googleCloudPlatformVoiceTypes.VoiceType = voiceType;
    googleCloudPlatformVoiceTypes.language = language;
    googleCloudPlatformVoiceTypes.country = country;
    googleCloudPlatformVoiceTypes.languageAndCountry = languageAndCountry;
    googleCloudPlatformVoiceTypes.isMale = voice.ssmlGender === "MALE";

    // 언어 규칙에 따라 필터링
    // 규칙 객체에 현재 음성의 언어가 키로 존재하는지 확인합니다.
    if (language in languageRegionRules) {
      // 규칙에 지정된 언어의 경우, 국가 코드가 일치하는지 확인합니다.
      if (languageAndCountry !== languageRegionRules[language]) {
        // 일치하지 않으면, 이 음성을 데이터베이스에 저장하지 않고 다음 음성으로 넘어갑니다.
        continue;
      }
    }

    await GoogleCloudPlatformVoiceTypesSqlite.upsert(
      googleCloudPlatformVoiceTypes
    );
  }

  console.log(
    "All voices saved to database : ",
    (await GoogleCloudPlatformVoiceTypesSqlite.getAll()).length
  );
}

getAllVoices();
