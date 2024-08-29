import {generateSuno35MusicSaveMusic} from "./_";

const axios = require('axios');
const fs = require('fs');

async function main() {
    console.log("start");

    let filePath = await generateSuno35MusicSaveMusic("A happy and upbeat song");
    console.log("Saved music file: ", filePath);
}

main().catch(err => {
    console.error(err);
    process.exit(1);
});

