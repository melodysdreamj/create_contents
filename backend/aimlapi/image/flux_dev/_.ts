import path from "path";
import fs from "fs";
import dotenv from "dotenv";

const axios = require('axios');

// // flux중 오픈소스 중간모델이지만 비상업라이센스임
// model list : https://docs.aimlapi.com/api-overview/models/image-models
// model price: https://aimlapi.com/ai-ml-api-pricing
export async function generateFluxDevImageUrl(prompt: string): Promise<string | null> {
    dotenv.config();
    console.log("Image generation started");

    const response = await fetch('https://api.aimlapi.com/images/generations', {
        method: 'POST',
        headers: {
            "Authorization": `Bearer ${process.env.AIMLAPI_KEY}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "model": "flux/dev",
            "image_size": "square", // https://docs.aimlapi.com/api-overview/generating-images-with-flux
            "prompt": prompt,
        }),
    });

    const data = await response.json();

    // console.log(data);

    // Check if image URL exists and return it
    if (data && data.images && data.images.length > 0) {
        const imageUrl = data.images[0].url;
        console.log("Image URL: ", imageUrl);
        return imageUrl;
    } else {
        console.error("No images returned from the API");
        return null;
    }
}

// URL에서 이미지를 다운로드하고 로컬에 저장하는 함수
export async function downloadAndSaveImage(imageUrl: string, savePath: string): Promise<string | null> {
    try {
        const response = await axios({
            url: imageUrl,
            method: 'GET',
            responseType: 'arraybuffer', // 이미지 데이터를 이진 배열로 받음
        });

        fs.writeFileSync(savePath, response.data);
        console.log(`Image saved to ${savePath}`);
        return savePath;
    } catch (err) {
        console.error("Error downloading or saving the image: ", err);
        return null;
    }
}

// 예시로 호출하는 함수
export async function generateFluxDevImageSaveImage(prompt: string): Promise<string | null> {
    dotenv.config();

    const imageUrl = await generateFluxDevImageUrl(prompt);
    if (imageUrl) {
        // 이미지 확장자 추출
        const extension = path.extname(imageUrl) || '.jpeg'; // 확장자가 없으면 기본값으로 .jpeg 사용
        const savePath = path.resolve(`./data/image/flux_dev/image${extension}`);
        const dirPath = path.dirname(savePath);

        // 폴더가 없으면 생성
        if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath, { recursive: true });
        }

        return await downloadAndSaveImage(imageUrl, savePath);
    }
    return null;
}