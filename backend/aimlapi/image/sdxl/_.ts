import path from "path";
import fs from "fs";
import dotenv from "dotenv";
const axios = require('axios');

// // flux중 오픈소스 중간모델이지만 비상업라이센스임
// model list : https://docs.aimlapi.com/api-overview/models/image-models
// model : https://aimlapi.com/models
// model price: https://aimlapi.com/ai-ml-api-pricing

// Flux 프로 모델에서 이미지 URL을 생성하는 함수
export async function generateSdxlImageUrl(prompt: string): Promise<string | null> {
    dotenv.config();

    try {
        console.log("Image generation started");

        const response = await axios.post(
            'https://api.aimlapi.com/images/generations',
            {
                prompt: prompt,
                model: 'stabilityai/stable-diffusion-xl-base-1.0',
            },
            {
                headers: {
                    Authorization: `Bearer ${process.env.AIMLAPI_KEY}`,
                },
            }
        );

        // 이미지 URL 확인 후 반환
        if (response.data && response.data.output && response.data.output.choices.length > 0) {
            const imageUrl = response.data.output.choices[0].image_base64;
            // console.log("Image URL: ", imageUrl);
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

// URL에서 이미지를 다운로드하고 로컬에 저장하는 함수 (base64 형식으로 저장)
export async function downloadAndSaveSdxlImage(imageBase64: string, savePath: string): Promise<string | null> {
    try {
        // base64 형식으로 이미지를 저장
        fs.writeFileSync(savePath, imageBase64, 'base64');
        console.log(`Image saved to ${savePath}`);
        return savePath;
    } catch (err) {
        console.error("Error saving the image: ", err);
        return null;
    }
}

// SDXL 이미지 생성 후 다운로드 및 저장하는 함수
export async function generateSdxlImageSaveImage(prompt: string): Promise<string | null> {
    dotenv.config();

    const imageBase64 = await generateSdxlImageUrl(prompt);

    if (imageBase64) {
        const savePath = path.resolve('./data/image/sdxl/image.png');
        const dirPath = path.dirname(savePath);

        // 폴더가 없으면 생성
        if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath, { recursive: true });
        }

        // 이미지 다운로드 및 저장
        return await downloadAndSaveSdxlImage(imageBase64, savePath);
    }
    return null;
}