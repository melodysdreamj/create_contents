import OpenAI from "openai";
import { zodResponseFormat } from "openai/helpers/zod";
import { z } from "zod";
import dotenv from "dotenv";

dotenv.config();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

// 소제목 리스트를 위한 새로운 Zod 스키마 정의
const SubtitlesList = z.object({
    subtitles: z.array(z.string()), // 소제목을 담을 배열
});

export async function requestBookSubTitleGpt4oParsedChat(question: string) : Promise<any | null> {
    try {
        const completion = await openai.beta.chat.completions.parse({
            model: "gpt-4o-2024-08-06",
            messages: [
                { role: "system", content: "You are an AI assistant. Please generate a list of subtitles for a self-development book." },
                { role: "user", content: question },
            ],
            response_format: zodResponseFormat(SubtitlesList, "subtitles"),
        });

        return completion.choices[0].message.parsed;
    } catch (err) {
        console.error(err);
        return null;
    }
}
