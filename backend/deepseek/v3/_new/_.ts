import OpenAI from 'openai';
import dotenv from "dotenv";

export async function requestDeepseekV3Chat(question: string): Promise<string | null> {
    try {
        dotenv.config();

        const openai = new OpenAI({
            baseURL: 'https://api.deepseek.com',
            apiKey: process.env.DEEPSEEK_API_KEY,
        });

        const chatCompletion = await openai.chat.completions.create({
            messages: [
                { role: "system", content: "You are a helpful assistant." },
                { role: "user", content: question }
            ],
            model: "deepseek-chat",
        });

        return chatCompletion.choices[0].message.content;
    } catch (err) {
        console.error(err);
        return null;
    }
}
