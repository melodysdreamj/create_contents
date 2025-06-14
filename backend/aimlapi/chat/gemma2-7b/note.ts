import {generateGemma2_7b} from "./_";

const axios = require('axios');
const fs = require('fs');

async function main() {
    console.log("start");

    var response = await generateGemma2_7b("왜 하늘을 파란거야?", 'You are an AI assistant who knows everything.');
    console.log(response);
}

main().catch(err => {
    console.error(err);
    process.exit(1);
}).finally(async () => {});;

