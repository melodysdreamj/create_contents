import {generateSd3ImageUrl} from "./_";

const axios = require('axios');
const fs = require('fs');

async function main() {
    console.log("start");

    try {
        let url = await generateSd3ImageUrl("apple");
        console.log("Generated image URL: ", url);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

main().catch(err => {
    console.error(err);
    process.exit(1);
}).finally(async () => {});;

