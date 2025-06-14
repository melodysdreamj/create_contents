import {requestGemini20FlashExpJson} from "./_";

async function main() {
    console.log("start");

    let response = await requestGemini20FlashExpJson(`인기 있는 쿠키 레시피 3가지를 아래 TypeScript 인터페이스 형식에 맞는 JSON 배열로 반환해 줘.

interface Recipe {
    recipeName: string;
    description: string;
}`);
    console.log(response);
}

main().catch(err => {
    console.error(err);
    process.exit(1);
}).finally(async () => {});;

export {};
