import { requestOpenRouterDeepseekV3 } from "./_";

async function main() {
  console.log("start");

  let response = await requestOpenRouterDeepseekV3(
    "Tell me about the upcoming meeting on Friday."
  );
  console.log(response);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

export {};
