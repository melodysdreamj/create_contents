import translate from 'translate-google';

// 텍스트 번역 함수
export async function TranslateText(text: string, fromLang: string, toLang: string): Promise<string> {
    try {
        const res = await translate(text, { from: fromLang, to: toLang });
        console.log(`Translated chat: ${res}`);
        return res;
    } catch (err) {
        console.error('Error translating chat:', err);
        throw err;
    }
}