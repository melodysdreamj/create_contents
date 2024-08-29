// 사용 예제 함수
import {TranslateText} from "./_";

async function exampleUsage(): Promise<void> {
    const text = 'Hello, how are you?';
    const fromLang = 'en';
    const toLang = 'ko';

    try {
        const translatedText = await TranslateText(text, fromLang, toLang);
        console.log(`Translation result: ${translatedText}`);
    } catch (error) {
        console.error('Failed to translate chat:', error);
    }
}

exampleUsage().catch(err => {
    console.error(err);
    process.exit(1);
});

export { TranslateText };