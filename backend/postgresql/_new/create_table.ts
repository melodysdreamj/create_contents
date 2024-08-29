import {NewPostgresql} from "./_";

async function run() {
    await NewPostgresql.createTable();
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
