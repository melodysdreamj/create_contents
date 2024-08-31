import {requestNewGpt4oParsedChat} from "./_";

async function main() {
    console.log("start");

    const event = await requestNewGpt4oParsedChat("Tell me about the upcoming meeting on Friday.");
    console.log(event);
}

main().catch(err => {
    console.error(err);
    process.exit(1);
});

export {};
