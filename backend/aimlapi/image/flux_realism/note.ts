import {generateFluxImage} from "./_";

const axios = require('axios');
const fs = require('fs');

async function main() {
    console.log("start");

    generateFluxImage("happy girl with a sword").then(url => {
        if (url) {
            console.log("Generated image URL: ", url);
        } else {
            console.log("Failed to generate image");
        }
    }).catch(err => {
        console.error(err);
        process.exit(1);
    });
}

main().catch(err => {
    console.error(err);
    process.exit(1);
});

