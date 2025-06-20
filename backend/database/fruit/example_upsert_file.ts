// pocket_base 라이브러리 가져오기
import dotenv from "dotenv";
import {Fruit, FruitPocketBaseCollection} from "./_";

const PocketBase = require('pocketbase').default;

// PocketBase 클라이언트 초기화
const pb = new PocketBase('https://june.pockethost.io/'); // PocketBase 서버 주소 설정

// 어드민 로그인
async function createCollection() {

    let obj = new Fruit();
    obj.docId = "sky";


    await FruitPocketBaseCollection.upsertFile(obj, 'data/image/sdxl/image2.png');


}

// 함수 호출


async function main() {
    console.log("start");
    await createCollection();
}

main().catch(err => {
    console.error(err);
    process.exit(1);
}).finally(async () => {});;

export {};
