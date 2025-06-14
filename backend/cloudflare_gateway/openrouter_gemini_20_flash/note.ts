import { requestCloudflareGatewayOpenRouterGemini20Flash } from "./_";

async function main() {
    console.log("start");

    const response = await requestCloudflareGatewayOpenRouterGemini20Flash("Hello, how are you?");
    console.log(response);
}

main().catch(err => {
    console.error(err);
    process.exit(1);
}).finally(async () => {});;

export {};
