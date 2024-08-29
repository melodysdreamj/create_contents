import { GoogleGenerativeAI, GenerativeModel } from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config();

const API_KEY = process.env.GEMINI_API_KEY;

if (!API_KEY) {
    throw new Error('GEMINI_API_KEY is not set in the environment variables');
}

const genAI = new GoogleGenerativeAI(API_KEY);

export async function requestGeminiPro(prompt: string): Promise<string | null> {
    try {
        const model: GenerativeModel = genAI.getGenerativeModel({ model: 'gemini-15-pro' });

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        return text;
    } catch (error) {
        console.error('Error in requestGeminiPro:', error);
        return null;
    }
}