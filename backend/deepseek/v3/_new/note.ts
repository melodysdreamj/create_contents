import {requestDeepseekV3Chat} from "./_";

async function main() {
    console.log("start");

    let response = await requestDeepseekV3Chat("Tell me about the upcoming meeting on Friday.");
    console.log(response);
}

main().catch(err => {
    console.error(err);
    process.exit(1);
}).finally(async () => {});;

export {};
