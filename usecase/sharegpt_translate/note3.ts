import * as fs from 'fs';
import {ShareGptData, ShareGptDataSqlite} from "../../backend/sqlite/sharegpt_data/_";
import {Talk} from "../../backend/sqlite/sharegpt_data/talk";
import {TranslateTextByDeepl} from "../../backend/deepl/_";


async function main() {
    console.log("start");

    let sharegptObjs = await ShareGptDataSqlite.getAll();
    for(const sharegptObj of sharegptObjs) {
        console.log(`ID: ${sharegptObj.docId}`);
        for(let i = 0; i < sharegptObj.talks.length; i++) {
            const talk = sharegptObj.talks[i];
            console.log(`ID: ${sharegptObj.docId} | From: ${talk.conversationFrom} | Value: ${talk.value.slice(0, 50)}${talk.value.length > 50 ? '...' : ''}`);

            console.log(sharegptObj.talks[i].translatedValue);

        }
        console.log('---');
    }

}

main().catch(err => {
    console.error(err);
    process.exit(1);
});

export {};
