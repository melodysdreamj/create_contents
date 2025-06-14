import dotenv from "dotenv";
import fs from "fs";
import path from "path";

// speech model list: https://docs.aimlapi.com/api-overview/models/speech-models
// https://aimlapi.com/models
// price : https://aimlapi.com/ai-ml-api-pricing

async function main() {
    console.log("start");

    dotenv.config();

    const response = await fetch('https://api.aimlapi.com/tts', {
        method: 'POST',
        headers: {
            "Authorization": `Bearer ${process.env.AIMLAPI_KEY}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "model": "#g1_aura-asteria-en",
            "text": "Hi! What are you doing today?"
        }),
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const dist = path.resolve('./data/tts/audio.wav');
    fs.writeFileSync(dist, buffer);

    console.log('Audio saved to:', dist);
}

main().catch(err => {
    console.error(err);
    process.exit(1);
}).finally(async () => {});;

export {};
