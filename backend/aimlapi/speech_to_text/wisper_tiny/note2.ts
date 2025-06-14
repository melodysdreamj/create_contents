import dotenv from "dotenv";

// speech model list: https://docs.aimlapi.com/api-overview/models/speech-models
// price : https://aimlapi.com/ai-ml-api-pricing

async function main() {
    console.log("start");

    dotenv.config();

    const response = await fetch('https://api.aimlapi.com/stt', {
        method: 'POST',
        headers: {
            "Authorization": `Bearer ${process.env.AIMLAPI_KEY}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            model: "#g1_whisper-tiny",
            url: 'https://audio-samples.github.io/samples/mp3/blizzard_unconditional/sample-0.mp3',
        }),
    });
    const data = await response.json();
    console.log(data);

}

main().catch(err => {
    console.error(err);
    process.exit(1);
}).finally(async () => {});;

export {};
