import {FruitPocketBaseCollection} from "./_";

async function main() {
    console.log("start");
    await FruitPocketBaseCollection.createTable();

}

main().catch(err => {
    console.error(err);
    process.exit(1);
}).finally(async () => {});;

export {};
