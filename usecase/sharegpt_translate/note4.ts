import * as fs from 'fs';
import {ShareGptData, ShareGptDataSqlite} from "../../backend/sqlite/sharegpt_data/_";
import {Talk} from "../../backend/sqlite/sharegpt_data/talk";
import {TranslateTextByDeepl} from "../../backend/deepl/_";


async function main() {
    console.log("start");

    // 데이터베이스나 소스에서 데이터를 가져옴
    let sharegptObjs = await ShareGptDataSqlite.getAll();
    const newJsonFormat = sharegptObjs.map((sharegptObj: any) => {
        // 변환할 객체 구조를 정의
        return {
            id: sharegptObj.docId,
            conversations: sharegptObj.talks.map((talk: any) => ({
                from: talk.conversationFrom,
                value: talk.value,
                // translatedValue: talk.translatedValue // 번역된 값이 있으면 추가
            }))
        };
    });

    // JSON 파일 경로 설정
    const filePath = './data/sharegpt/output.json';

    // 변환된 데이터를 파일로 쓰기
    fs.writeFile(filePath, JSON.stringify(newJsonFormat, null, 2), 'utf8', (err) => {
        if (err) {
            console.error('Error writing file:', err);
            return;
        }
        console.log('JSON file has been updated.');
    });

    // 변환된 JSON 객체 콘솔 출력
    for (const obj of newJsonFormat) {
        console.log(`ID: ${obj.id}`);
        for (const convo of obj.conversations) {
            console.log(`ID: ${obj.id} | From: ${convo.from} | Value: ${convo.value.slice(0, 50)}${convo.value.length > 50 ? '...' : ''}`);
            console.log(convo.translatedValue);
        }
        console.log('---');
    }
}

main().catch(err => {
    console.error(err);
    process.exit(1);
});

export {};
