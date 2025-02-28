import { requestCloudflareGatewayGemini20Flash } from "./_";

async function main() {
    console.log("start");

    const result = await requestCloudflareGatewayGemini20Flash("What is Cloudflare?");
    console.log(result);
}

main().catch(err => {
    console.error(err);
    process.exit(1);
});

export {};
