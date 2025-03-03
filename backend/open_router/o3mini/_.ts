import OpenAI from "openai";
import dotenv from "dotenv";
dotenv.config();

// OpenRouter API를 사용하여 텍스트 생성하는 함수
export async function openRouterGenerateO3Mini(
  text: string
): Promise<string | null> {
  try {
    const client = new OpenAI({
      baseURL: "https://openrouter.ai/api/v1",
      apiKey: process.env.OPENROUTER_API_KEY,
    });

    const completion = await client.chat.completions.create({
      model: "openai/o3-mini",
      messages: [{ role: "user", content: text }],
    });

    return completion.choices[0].message.content;
  } catch (err) {
    console.error("Error generating text:", err);
    return null;
  }
}

// 사용 예시
async function example() {
  const response = await openRouterGenerateO3Mini(
    "하늘이 파란 이유는 무엇인가요?"
  );
  console.log(response);
}
