import {ExampleMySql} from "./example";

async function run() {
    await ExampleMySql.createTable();
}

async function main() {
    await run();
    console.log("create table done");
    throw new Error("end")
}


main().catch((err) => {
    console.error(err)
    process.exit(1)
})

export {}
