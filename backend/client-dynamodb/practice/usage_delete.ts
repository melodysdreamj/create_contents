import { Practice, PracticeDynamoDb } from "./_";
import { Sub } from "./sub";
import { TestEnumTest } from "./test_enum";
async function main() {
  console.log("start");

  let result = await PracticeDynamoDb.delete('example');
  console.log(result);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});

export {};
