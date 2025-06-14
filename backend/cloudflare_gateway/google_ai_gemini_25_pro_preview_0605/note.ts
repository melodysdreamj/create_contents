import { requestCloudflareGatewayGemini25ProPreview0605 } from "./_";

async function main() {
    console.log("start");

    const result = await requestCloudflareGatewayGemini25ProPreview0605("하늘이 푸른 이유가 뭐야?");
    console.log(result);
}

main().catch(err => {
    console.error(err);
    process.exit(1);
}).finally(async () => {});;

export {};
