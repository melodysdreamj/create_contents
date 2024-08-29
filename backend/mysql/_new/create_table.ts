import {NewMySql} from "./_";

async function run() {
    await NewMySql.createTable();
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
