import {ExamplePostgresql} from "./_";

async function run() {
    await ExamplePostgresql.resetTable();
}

async function main() {
    await run();
    console.log("reset table done");
    throw new Error("end")
}


main().catch((err) => {
    console.error(err)
    process.exit(1)
})

export {}
