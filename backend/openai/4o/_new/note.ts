import {requestGpt4oChat} from "./_";

async function main() {
    console.log("start");

    let reponse = await requestGpt4oChat("Tell me about the upcoming meeting on Friday.");
    console.log(reponse);
}

main().catch(err => {
    console.error(err);
    process.exit(1);
});

export {};
