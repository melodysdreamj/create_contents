import { PracticeDynamoDb } from "./_";

async function main() {
  console.log("start");

  await PracticeDynamoDb.createTable();
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});

export {};
