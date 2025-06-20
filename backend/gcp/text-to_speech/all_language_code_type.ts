import { GoogleCloudPlatformVoiceTypesSqlite } from "./_";

async function main() {
  console.log("start");

  let allObjs = await GoogleCloudPlatformVoiceTypesSqlite.getAll();

  // 겹치는거 제거하고 유니크한것들만 목록으로 만들어서 출력
  let uniqueObjs = allObjs.filter(
    (obj, index, self) =>
      index ===
      self.findIndex((t) => t.languageAndCountry === obj.languageAndCountry)
  );

  console.log(uniqueObjs.map((obj) => obj.languageAndCountry));

  console.log("end");
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {});

export {};
