import { requestOpenRouterClaude35Sonnet } from "./_";

async function main() {
  console.log("start");

  let response = await requestOpenRouterClaude35Sonnet(
    "Tell me about the upcoming meeting on Friday."
  );

  console.log(response);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

export {};
