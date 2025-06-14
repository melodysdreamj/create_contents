import {requestGeminiPro} from "../_";

async function main() {
    console.log("start");

    let response = await requestGeminiPro("하늘이 푸른 이유는 무엇인가요?");
    console.log(response);
}

main().catch(err => {
    console.error(err);
    process.exit(1);
}).finally(async () => {});;

export {};
