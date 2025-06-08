import { GoogleGenerativeAI, GenerativeModel } from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config();

const API_KEY = process.env.GEMINI_API_KEY;

if (!API_KEY) {
    throw new Error('GEMINI_API_KEY is not set in the environment variables');
}

const genAI = new GoogleGenerativeAI(API_KEY);

export async function requestGemini20FlashExpJson(prompt: string): Promise<string | null> {
    try {
        const model: GenerativeModel = genAI.getGenerativeModel({
            model: "gemini-2.0-flash-exp",
            generationConfig: {
                responseMimeType: "application/json",
              },
        });

        const result = await model.generateContent(prompt);
        const response = await result.response.text();

        return response;
    } catch (error) {
        console.error("Error in requestGemini20FlashExpJson:", error);
        return null;
    }
}

// const prompt = `List a few popular cookie recipes using this JSON schema:
//
// Recipe = {'recipeName': string}
// Return: Array<Recipe>`;
//
// requestGeminiFlash(prompt).then((response) => {
//     if (response) {
//         console.log(response);
//     } else {
//         console.log("No response received");
//     }
// });
