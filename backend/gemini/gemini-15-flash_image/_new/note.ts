import {requestGeminiFlashWithImage} from "../_";

async function main() {
    console.log("start");

    const prompt = '이 사진에 대해서 설명해주세요.';
    const imagePath = 'backend/gemini/gemini-15-flash_image/sample.png'; // 업로드할 이미지 파일 경로

    const response = await requestGeminiFlashWithImage(prompt, imagePath);
    console.log('Generated Response:', response);
}

main().catch(err => {
    console.error(err);
    process.exit(1);
}).finally(async () => {});;

export {};
