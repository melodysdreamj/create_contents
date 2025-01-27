import OpenAI from 'openai';
import dotenv from "dotenv";

export async function requestDeepseekR1Chat(question: string): Promise<string | null> {
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
            model: "deepseek-reasoner",
        });

        return chatCompletion.choices[0].message.content;
    } catch (err) {
        console.error(err);
        return null;
    }
}
