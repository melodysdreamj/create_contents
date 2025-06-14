import {generateFluxRealismImageSaveImage} from "./_";

const axios = require('axios');
const fs = require('fs');

async function main() {
    console.log("start");

    let filePath = await generateFluxRealismImageSaveImage("beautiful k-pop idol man",'/flux/realism');
    console.log("Saved image file: ", filePath);
}

main().catch(err => {
    console.error(err);
    process.exit(1);
}).finally(async () => {});;

