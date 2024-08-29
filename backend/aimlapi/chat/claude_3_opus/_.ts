import dotenv from "dotenv";

const { OpenAI } = require('openai');

// model list : https://docs.aimlapi.com/api-overview/models/chat-models
// models: https://aimlapi.com/models
// model price: https://aimlapi.com/ai-ml-api-pricing
export async function generateTextClaude3Opus(prompt : string, system: string) : Promise<string | null> {
    try {
        dotenv.config();
        console.log("Claude 3 Opus chat generation started");

        const api = new OpenAI({
            baseURL: 'https://api.aimlapi.com',
            apiKey: process.env.AIMLAPI_KEY,
        });

        const result = await api.chat.completions.create({
            model: 'claude-3-opus-20240229',
            max_tokens: 1024,
            messages: [
                {
                    "role": "user",
                    "content": prompt,
                }
            ],
        });

        const message = result.choices[0].message.content;
        console.log(`Assistant: ${message}`);

        return message;

    } catch (err) {
        console.error("Error generating: ", err);
        return null;
    }
}