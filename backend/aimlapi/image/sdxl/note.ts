import {generateSdxlImage} from "./_";

const axios = require('axios');
const fs = require('fs');

async function main() {
    console.log("start");

    await generateSdxlImage("apple");
}

main().catch(err => {
    console.error(err);
    process.exit(1);
}).finally(async () => {});;

