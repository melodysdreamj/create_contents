import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

export async function requestOpenRouterClaude35Sonnet(
  prompt: string
): Promise<string | null> {
  try {
    const openai = new OpenAI({
      baseURL: "https://openrouter.ai/api/v1",
      apiKey: process.env.OPENROUTER_API_KEY,
    });

    const completion = await openai.chat.completions.create({
      model: "anthropic/claude-3.5-sonnet",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    if (completion.choices && completion.choices[0]?.message?.content) {
      return completion.choices[0].message.content;
    }

    return null;
  } catch (error) {
    console.error("Error in requestOpenRouterDeepseekV3:", error);
    return null;
  }
}
