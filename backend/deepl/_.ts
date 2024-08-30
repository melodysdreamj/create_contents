import axios from 'axios';
import dotenv from "dotenv";

// 텍스트 번역 함수
export async function TranslateTextByDeepl(text: string, fromLang: string, toLang: string): Promise<string> {

    dotenv.config();

    const apiKey = process.env.DEEPL_API_KEY;
    const url = 'https://api-free.deepl.com/v2/translate';

    try {
        // DeepL API 요청 보내기
        const response = await axios.post(url, null, {
            params: {
                auth_key: apiKey,
                text: text,
                source_lang: fromLang,
                target_lang: toLang,
            },
        });

        // 번역된 텍스트 가져오기
        const translatedText = response.data.translations[0].text;
        // console.log(`Translated text: ${translatedText}`);
        return translatedText;
    } catch (err) {
        console.error('Error translating text:', err);
        throw err;
    }
}
