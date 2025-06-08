import { GoogleGenerativeAI, GenerativeModel } from '@google/generative-ai';
import dotenv from 'dotenv';
import {GoogleAIFileManager} from "@google/generative-ai/server";

dotenv.config();

const API_KEY = process.env.GEMINI_API_KEY;

if (!API_KEY) {
    throw new Error('GEMINI_API_KEY is not set in the environment variables');
}


const genAI = new GoogleGenerativeAI(API_KEY);
const fileManager = new GoogleAIFileManager(API_KEY);

// 파일 업로드를 처리하는 함수
async function uploadImageFile(filePath: string): Promise<{ uri: string, mimeType: string }> {
    try {
        // fileManager를 이용해 파일 업로드
        const uploadResponse = await fileManager.uploadFile(filePath, {
            mimeType: 'image/jpeg', // 여기에 적절한 MIME 타입을 넣어줍니다.
        });

        return {
            uri: uploadResponse.file.uri, // 업로드한 파일의 URI
            mimeType: uploadResponse.file.mimeType, // 파일의 MIME 타입
        };
    } catch (error) {
        console.error('File upload failed:', error);
        throw error;
    }
}

// 텍스트와 이미지 기반 요청을 처리하는 함수
export async function requestGemini15FlashImageJson(prompt: string, imagePath: string): Promise<string | null> {
    try {
        // 이미지 업로드
        const uploadResponse = await uploadImageFile(imagePath);

        // 생성 모델 초기화
        const model: GenerativeModel = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

        // 텍스트와 업로드된 파일 URI를 결합하여 콘텐츠 생성 요청
        const result = await model.generateContent([
            {
                fileData: {
                    mimeType: uploadResponse.mimeType,
                    fileUri: uploadResponse.uri,
                }
            },
            { text: prompt }
        ]);

        // 결과 텍스트 추출
        const response = await result.response;
        const text = response.text();

        return text;
    } catch (error) {
        console.error('Error in requestGemini15FlashImageJson:', error);
        return null;
    }
}