import OpenAI from "openai";
import { zodResponseFormat } from "openai/helpers/zod";
import { z } from "zod";
import dotenv from "dotenv";



async function main() {
    console.log("start");

    dotenv.config();


    const openai = new OpenAI(
        {
            apiKey: process.env.OPENAI_API_KEY,
        }
    );

    const CalendarEvent = z.object({
        name: z.string(),
        date: z.string(),
        participants: z.array(z.string()),
    });

    const completion = await openai.beta.chat.completions.parse({
        model: "gpt-4o-2024-08-06",
        messages: [
            { role: "system", content: "Extract the event information." },
            { role: "user", content: "why roma is distroyed?" },
        ],
        response_format: zodResponseFormat(CalendarEvent, "event"),
    });

    const event = completion.choices[0].message.parsed;

    console.log(event);

}

main().catch(err => {
    console.error(err);
    process.exit(1);
});

export {};
