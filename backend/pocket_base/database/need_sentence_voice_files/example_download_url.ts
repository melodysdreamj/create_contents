// pocket_base 라이브러리 가져오기
import { NeedSentenceVoiceFiles, NeedSentenceVoiceFilesPocketBaseCollection } from "./_";

// 어드민 로그인
async function createCollection() {
  let obj = await NeedSentenceVoiceFilesPocketBaseCollection.get("sky");

  let downloadUrl = await NeedSentenceVoiceFilesPocketBaseCollection.getDownloadUrl(obj);
  console.log(downloadUrl);
}

// 함수 호출

async function main() {
  console.log("start");
  await createCollection();
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {});

export {};
