import OpenAI from "openai";
import { zodResponseFormat } from "openai/helpers/zod";
import { z } from "zod";
import dotenv from "dotenv";

dotenv.config();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

const CalendarEvent = z.object({
    name: z.string(),
    date: z.string(),
    participants: z.array(z.string()),
});

export async function requestGpt4oParsedChat(question: string) : Promise<any | null> {
    try {
        const completion = await openai.beta.chat.completions.parse({
            model: "gpt-4o-2024-08-06",
            messages: [
                { role: "system", content: "You are ai assistant. Please answer the question." },
                { role: "user", content: question },
            ],
            response_format: zodResponseFormat(CalendarEvent, "event"),
        });

        return completion.choices[0].message.parsed;
    } catch (err) {
        console.error(err);
        return null;
    }
}

// Example usage:
(async () => {
    const event = await requestGpt4oParsedChat("Tell me about the upcoming meeting on Friday.");
    console.log(event);
})();
