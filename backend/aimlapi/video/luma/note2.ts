import dotenv from "dotenv";
import fs from "fs";
import path from "path";

// Model list and pricing information:
// https://aimlapi.com/models
// https://aimlapi.com/ai-ml-api-pricing

async function main() {
    console.log("start");

    dotenv.config();

    const response = await fetch('https://api.aimlapi.com/luma-ai/generations', {
        method: 'POST',
        headers: {
            "Authorization": `Bearer ${process.env.AIMLAPI_KEY}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "aspect_ratio": "16:9",
            "expand_prompt": true,
            "user_prompt": "girl with a sword"
        }),
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    console.log('Response received:', data);
}

main().catch(err => {
    console.error(err);
    process.exit(1);
});

export {};
