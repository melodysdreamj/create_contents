import { NewDynamoDb } from "./_";

async function main() {
  console.log("start");

  await NewDynamoDb.createTable();
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});

export {};
