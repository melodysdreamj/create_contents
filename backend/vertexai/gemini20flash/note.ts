import { requestGemini20Flash } from "./_";

async function main() {
  console.log("start");

  const resp = await requestGemini20Flash("why sky is blue?");
  console.log(resp);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

export {};
