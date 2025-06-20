import { ExamplePocketBaseCollection } from "./_";

async function main() {
  console.log("start");
  await ExamplePocketBaseCollection.createTable();
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {});

export {};
