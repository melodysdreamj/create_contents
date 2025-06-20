import { New, NewPocketBaseCollection } from "./_";
import { LegoUtil } from "../../../../util";

async function main() {
  // 데이터가 충분하지 않다면 이 부분을 주석 해제하여 데이터를 추가하세요.
  // let needUpsertObjects: New[] = [];
  // for (let i = 0; i < 1000; i++) {
  //   let obj = new New();
  //   obj.docId = LegoUtil.randomString(10);
  //   needUpsertObjects.push(obj);
  // }
  // await NewPocketBaseCollection.upsertMany(needUpsertObjects);

  // 그후 불러보기
  let allObjects = await NewPocketBaseCollection.getAll();
  console.log("Total objects fetched:", allObjects.length);
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {});

export {};
