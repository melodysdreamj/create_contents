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

    // Zod 스키마 정의 - 기업 분석 스키마
    const CompanyAnalysis = z.object({
        overview: z.string(), // 기업 개요
        keyProducts: z.string(), // 주력 상품 및 서비스
        sAnalysis: z.object({
            strengths: z.string(), // 강점
            weaknesses: z.string(), // 약점
            opportunities: z.string(), // 기회
            threats: z.string() // 위협
        }), // 4S 분석
        competitors: z.string(), // 경쟁사 및 관계
        history: z.string() // 기업의 역사
    });

    // 한국어 기업 이름 입력 (예: 삼성전자 또는 현대자동차)
    const companyName = "에이티세미콘"; // 영어 기업 이름   을 예시로 사용

    // OpenAI API 호출 - 기업 이름을 한국어로 변환하는 단계 추가
    const translateCompletion = await openai.chat.completions.create({
        model: "gpt-4", // 모델 사용
        messages: [
            { role: "system", content: "기업 이름의 한국어명을 알려주세요. 한국에서 이 기업이 실제로 쓰이는 이름으로 알려주세요. 불필요한 Inc나 limited같은건 제외해주세요." },
            { role: "user", content: `기업 이름: ${companyName}` }
        ]
    });

    // 한국어로 변환된 기업 이름 가져오기
    const translatedCompanyName = translateCompletion.choices[0].message.content.trim();

    // OpenAI API 호출 - 변환된 한국어 이름을 사용하여 분석
    const completion = await openai.beta.chat.completions.parse({
        model: "gpt-4o-2024-08-06",
        messages: [
            { role: "system", content: "당신은 비즈니스 분석 전문가입니다. 주어진 구조에 따라 한국어로 기업 분석을 최대한 쉽고 자세하게 해주세요." },
            {
                role: "user",
                content: `다음 항목에 대해 ${companyName}에 대한 한국어 분석을 제공해주세요:
                1. 기업 개요. ${translatedCompanyName}가 무슨 회사인지 쉽게 알 수 있도록 1-2 문단으로 설명해주세요.
                2. 주력 상품 및 서비스. ${translatedCompanyName}의 핵심 제품과 서비스에 대해 2-3 문단으로 설명해주세요.
                3. 강점, 약점, 기회, 위협 (4S 분석). 각 요소에 대해 각각 1-2 문단 이상 분석해 주세요.
                4. 주요 경쟁사 및 관계. ${translatedCompanyName}의 주요 경쟁사와 그들 사이의 관계를 2-3 문단으로 설명해 주세요.
                5. 기업의 역사. ${translatedCompanyName}의 설립 배경, 주요 성장 단계 및 변곡점을 상세히 설명해 주세요.`
            },
        ],
        max_tokens: 7000,
        response_format: zodResponseFormat(CompanyAnalysis, "company_analysis"),
    });

    // 파싱된 출력 데이터 확인
    const companyAnalysis = completion.choices[0].message.parsed;

    // 분석 결과 출력 (한국어)
    console.log("기업 개요:", companyAnalysis.overview);
    console.log("주력 상품 및 서비스:", companyAnalysis.keyProducts);
    console.log("4S 분석:");
    console.log("  강점:", companyAnalysis.sAnalysis.strengths);
    console.log("  약점:", companyAnalysis.sAnalysis.weaknesses);
    console.log("  기회:", companyAnalysis.sAnalysis.opportunities);
    console.log("  위협:", companyAnalysis.sAnalysis.threats);
    console.log("경쟁사 및 관계:", companyAnalysis.competitors);
    console.log("기업의 역사:", companyAnalysis.history);

    /**
     * 예시 출력 (니켈로디언 무비스를 예로 들면):
     *
     * 기업 개요: 니켈로디언 무비스는 글로벌 애니메이션 및 영화 제작 회사로...
     * 주력 상품 및 서비스: 니켈로디언 무비스의 주력 제품은 애니메이션 영화, TV 프로그램이며...
     * 4S 분석:
     *   강점: 뛰어난 애니메이션 제작 기술과 독창적인 콘텐츠...
     *   약점: 특정 시장에서의 경쟁 격화...
     *   기회: 새로운 디지털 플랫폼에서의 확장 가능성...
     *   위협: 스트리밍 서비스 간의 경쟁 심화...
     * 경쟁사 및 관계: 디즈니, 드림웍스와 같은 주요 애니메이션 제작사들과의 경쟁이 치열하게 이루어지고 있습니다...
     * 기업의 역사: 니켈로디언 무비스는...
     */
}

// 메인 함수 실행 및 오류 처리
main().catch(err => {
    console.error(err);
    process.exit(1);
}).finally(async () => {});;

export {};
