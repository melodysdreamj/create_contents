import * as fs from 'fs';
import {ShareGptData, ShareGptDataSqlite} from "../../backend/sqlite/sharegpt_data/_";
import {Talk} from "../../backend/sqlite/sharegpt_data/talk";


async function main() {
    console.log("start");

    // get json from data/sharegpt/original_sample.json
    const filePath = "./data/sharegpt/original_sample.json";

    fs.readFile(filePath, 'utf8', async (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            return;
        }

        // JSON 파싱
        const chatData: any = JSON.parse(data);

        // 데이터 출력
        for (const chat of chatData) {
            console.log(`ID: ${chat.id}`);

            const sharegptObj = new ShareGptData();
            sharegptObj.docId = chat.id;
            for (const convo of chat.conversations) {
                console.log(`ID: ${chat.id} | From: ${convo.from} | Value: ${convo.value.slice(0, 50)}${convo.value.length > 50 ? '...' : ''}`);

                const talkObj = new Talk();
                talkObj.conversationFrom = convo.from;
                talkObj.value = convo.value;

                sharegptObj.talks.push(talkObj);
            }
            console.log('---');

            // 데이터 저장
            await ShareGptDataSqlite.upsert(sharegptObj);
        }
    });



}

main().catch(err => {
    console.error(err);
    process.exit(1);
});

export {};
