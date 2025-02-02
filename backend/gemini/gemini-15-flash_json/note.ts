import {requestGeminiFlash} from "./_new/_";

async function main() {
    console.log("start");

    let response = await requestGeminiFlash(`List a few popular cookie recipes using this JSON schema:

Recipe = {'recipeName': string}
Return: Array<Recipe>`);
    console.log(response);
}

main().catch(err => {
    console.error(err);
    process.exit(1);
});

export {};
