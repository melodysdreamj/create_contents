import path from "path";
import fs from "fs";
import dotenv from "dotenv";

const axios = require('axios');

// // flux중 오픈소스 중간모델이지만 비상업라이센스임
// model list : https://docs.aimlapi.com/api-overview/models/image-models
// model price: https://aimlapi.com/ai-ml-api-pricing
export async function generateFluxProImageUrl(prompt: string): Promise<string | null> {
    try {

        dotenv.config();

        console.log("Image generation started");

        const response = await fetch('https://api.aimlapi.com/images/generations', {
            method: 'POST',
            headers: {
                "Authorization": `Bearer ${process.env.AIMLAPI_KEY}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "model": "flux-pro",
                "image_size": "square", // https://docs.aimlapi.com/api-overview/generating-images-with-flux
                "prompt": prompt,
            }),
        });

        const data = await response.json();

        // 이미지 URL 확인 후 반환
        if (data && data.images && data.images.length > 0) {
            const imageUrl = data.images[0].url;
            console.log("Image URL: ", imageUrl);
            return imageUrl;
        } else {
            console.error("No images returned from the API");
            return null;
        }
    } catch (err) {
        console.error("Error generating image: ", err);
        return null;
    }
}

// URL에서 이미지를 다운로드하고 로컬에 저장하는 함수
export async function downloadAndSaveFluxProImage(imageUrl: string, savePath: string): Promise<string | null> {
    try {
        const response = await axios({
            url: imageUrl,
            method: 'GET',
            responseType: 'arraybuffer', // 이미지 데이터를 이진 배열로 받음
        });

        // 파일 시스템에 이미지 저장
        fs.writeFileSync(savePath, response.data);
        console.log(`Image saved to ${savePath}`);
        return savePath;
    } catch (err) {
        console.error("Error downloading or saving the image: ", err);
        return null;
    }
}

// Flux 프로 이미지 생성 후 다운로드 및 저장하는 함수
export async function generateFluxProImageSaveImage(prompt: string, folderPath: string): Promise<string | null> {
    const imageUrl = await generateFluxProImageUrl(prompt);
    if (imageUrl) {
        const extension = path.extname(imageUrl) || '.jpeg';

        // 폴더 경로 설정
        const saveFolder = path.resolve(`./data/image/${folderPath}`);

        // 폴더가 없으면 생성
        if (!fs.existsSync(saveFolder)) {
            fs.mkdirSync(saveFolder, { recursive: true });
        }

        // 랜덤 파일명 생성
        const randomFileName = generateRandomString(12) + extension;
        const savePath = path.join(saveFolder, randomFileName);

        return await downloadAndSaveFluxProImage(imageUrl, savePath);
    }
    return null;
}

// 랜덤 문자열 생성 함수
function generateRandomString(length: number): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}