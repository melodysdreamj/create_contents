import { NewPostgresql } from "./_";

async function main() {
    console.log("start");
    await NewPostgresql.createIndex();
}

main().catch(err => {
    console.error(err);
    process.exit(1);
}).finally(async () => {});;

export {};
