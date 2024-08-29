import dotenv from "dotenv";
import fs from "fs";
import path from "path";

// video documentation: https://docs.aimlapi.com/api-overview/luma-ai-text-to-video
// Model list and pricing information:
// https://aimlapi.com/models
// https://aimlapi.com/ai-ml-api-pricing

async function main() {
    console.log("start");

    dotenv.config();

    const url = 'https://api.aimlapi.com/luma-ai/generation';
    const querystring = new URLSearchParams({
        "ids[0]": "5b9b26f4-25f7-4711-8b53-ea02219160aa"
    });

    const response = await fetch(`${url}?${querystring.toString()}`, {
        method: 'GET',
        headers: {
            "Authorization": `Bearer ${process.env.AIMLAPI_KEY}`,
            "Content-Type": "application/json"
        }
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
