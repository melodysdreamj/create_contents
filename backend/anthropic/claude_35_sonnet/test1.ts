import Anthropic from "@anthropic-ai/sdk";
import dotenv from "dotenv";


async function main() {
    console.log("start");

    dotenv.config();


    const anthropic = new Anthropic(
        {
            apiKey: process.env.ANTHROPIC_API_KEY, // 환경 변수로부터 API 키 로드
        }
    );

    const msg = await anthropic.messages.create({
        model: "claude-3-5-sonnet-20240620",
        max_tokens: 1000,
        temperature: 0,
        // system: "Respond only with short poems.",
        messages: [
            {
                "role": "user",
                "content": [
                    {
                        "type": "text",
                        "text": "why sky is blue?"
                    }
                ]
            }
        ]
    });
    console.log(msg);

}

main().catch(err => {
    console.error(err);
    process.exit(1);
});

export {};
