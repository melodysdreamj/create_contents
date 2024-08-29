import {ExamplePocketBaseCollection} from "./example";

async function main() {
    console.log("start");
    await ExamplePocketBaseCollection.createTable();

    console.log("create table done");

}

main().catch(err => {
    console.error(err);
    process.exit(1);
});

export {};
