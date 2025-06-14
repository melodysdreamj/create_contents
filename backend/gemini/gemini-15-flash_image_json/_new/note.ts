import { requestGemini15FlashImageJson } from "./_";

async function main() {
    console.log("start");

    // 프롬프트를 JSON 스키마 형식으로 작성
    const prompt = `
    Describe the content of this image using the following JSON schema:
    
    ImageDescription = {
        "description": string, 
        "objectsInImage": Array<string>,
        "colors": Array<string>
    }
    Return: ImageDescription`;

    const imagePath = 'backend/gemini/gemini-15-flash_image/sample.png'; // 업로드할 이미지 파일 경로

    const response = await requestGemini15FlashImageJson(prompt, imagePath);
    console.log('Generated Response:', response);
}

main().catch(err => {
    console.error(err);
    process.exit(1);
}).finally(async () => {});;

export {};
