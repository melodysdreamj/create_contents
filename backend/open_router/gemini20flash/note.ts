import { requestGemini20Flash } from "./_";

async function main() {
  console.log("start");

  const response = await requestGemini20Flash("하늘이 파란 이유는 무엇인가요?");
  console.log(response);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

export {};
