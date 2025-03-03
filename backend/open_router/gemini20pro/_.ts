import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const client = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
});

export async function requestGemini20Pro(
  prompt: string
): Promise<string | null> {
  try {
    console.log("Gemini 2.0 Pro chat started");

    const completion = await client.chat.completions.create({
      model: "google/gemini-2.0-pro-exp-02-05:free",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    return completion.choices[0].message.content;
  } catch (error) {
    console.error("Error in Gemini 2.0 Pro chat:", error);
    return null;
  }
}
