import {generateFluxRealismImageSaveImage} from "../../backend/aimlapi/image/flux_realism/_";
import {generateFluxProImageSaveImage} from "../../backend/aimlapi/image/flux_pro/_";

async function main() {
    console.log("start");


    for(let i=0; i<3; i++) {
        const filePath = await generateFluxProImageSaveImage("A homeless man with a long beard and long hair, sitting on the side of a street corner next to a make-shift tent, a cardboard sign is placed next to him that reads \"Please donate my bitcoin wallet is 1J5z8w63J",'/mash_test');
        console.log("Saved image file: ", filePath);
    }


}

main().catch(err => {
    console.error(err);
    process.exit(1);
});

export {};
