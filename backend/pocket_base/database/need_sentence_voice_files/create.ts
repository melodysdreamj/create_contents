import { NeedSentenceVoiceFilesPocketBaseCollection } from "./_";

async function main() {
  console.log("start");
  await NeedSentenceVoiceFilesPocketBaseCollection.createTable();
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {});

export {};
 