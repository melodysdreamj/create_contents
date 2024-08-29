import OpenAI from "openai";
import { zodResponseFormat } from "openai/helpers/zod";
import { z } from "zod";
import dotenv from "dotenv";

async function main() {
    console.log("start");

    // 환경 변수 로드
    dotenv.config();

    // OpenAI 클라이언트 초기화
    const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
    });

    // Zod 스키마 정의 - 여행가 프로필 예시
    const TravelerProfile = z.object({
        name: z.string(), // 여행가의 이름
        age: z.number(), // 여행가의 나이
        cities_visited: z.array(z.string()), // 방문한 도시 목록
    });

    // OpenAI API 호출
    const completion = await openai.beta.chat.completions.parse({
        model: "gpt-4o-2024-08-06",
        messages: [
            { role: "system", content: "Extract the traveler profile information." },
            { role: "user", content: "The traveler John is 30 years old and has visited New York, Paris, and Tokyo." },
        ],
        response_format: zodResponseFormat(TravelerProfile, "traveler_profile"),
    });

    // 파싱된 출력 데이터 확인
    const travelerProfile = completion.choices[0].message.parsed;

    console.log(travelerProfile); // Traveler profile 출력

    /**
     * 출력 예시:
     * {
     *   name: "John",
     *   age: 30,
     *   cities_visited: ["New York", "Paris", "Tokyo"]
     * }
     */
}

// 메인 함수 실행 및 오류 처리
main().catch(err => {
    console.error(err);
    process.exit(1);
});

export {};
