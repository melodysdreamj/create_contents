// pocket_base 라이브러리 가져오기
import dotenv from "dotenv";
import { New, NewPocketBaseCollection } from "./_";

// 어드민 로그인
async function createCollection() {
  let obj = new New();
  obj.docId = "sky";

  await NewPocketBaseCollection.upsertFile(obj, "data/image/sdxl/image.png");
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
