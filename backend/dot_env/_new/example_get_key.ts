import dotenv from "dotenv";


export function GetOpenAiApiKey(): string | undefined {
    dotenv.config();
    return process.env.OPENAI_API_KEY;
}