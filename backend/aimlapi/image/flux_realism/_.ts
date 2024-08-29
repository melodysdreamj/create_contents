import path from "path";
import fs from "fs";
import dotenv from "dotenv";
const axios = require('axios');

// // flux중 오픈소스 중간모델이지만 비상업라이센스임
// model list : https://docs.aimlapi.com/api-overview/models/image-models
// model : https://aimlapi.com/models
// model price: https://aimlapi.com/ai-ml-api-pricing

// Flux 프로 모델에서 이미지 URL을 생성하는 함수
export async function generateFluxRealismImageUrl(prompt: string): Promise<string | null> {
    dotenv.config();

    try {
        console.log("Image generation started");

        const response = await fetch('https://api.aimlapi.com/images/generations', {
            method: 'POST',
            headers: {
                "Authorization": `Bearer ${process.env.AIMLAPI_KEY}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "model": "flux-realism",
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
export async function downloadAndSaveFluxRealismImage(imageUrl: string, savePath: string): Promise<string | null> {
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
export async function generateFluxRealismImageSaveImage(prompt: string): Promise<string | null> {
    dotenv.config();

    const imageUrl = await generateFluxRealismImageUrl(prompt);

    if (imageUrl) {
        const savePath = path.resolve('./data/image/flux_realism/image.jpeg');
        const dirPath = path.dirname(savePath);

        // 폴더가 없으면 생성
        if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath, { recursive: true });
        }

        // 이미지 다운로드 및 저장
        return await downloadAndSaveFluxRealismImage(imageUrl, savePath);
    }
    return null;
}