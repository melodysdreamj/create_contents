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
    const companyName = "Nickelodeon Movies"; // 예시로 삼성전자를 사용

    // OpenAI API 호출
    const completion = await openai.beta.chat.completions.parse({
        model: "gpt-4o-2024-08-06",
        messages: [
            { role: "system", content: "당신은 비즈니스 분석 전문가입니다. 주어진 구조에 따라 한국어로 기업 분석을 해주세요." },
            {
                role: "user",
                content: `다음 항목에 대해 ${companyName}에 대한 한국어 분석을 제공해주세요:
                1. 기업 개요. ${companyName}가 무슨 회사인지 쉽게 알 수 있도록 1-2 문단으로 설명해주세요.
                2. 주력 상품 및 서비스. ${companyName}의 핵심 제품과 서비스에 대해 2-3 문단으로 설명해주세요.
                3. 강점, 약점, 기회, 위협 (4S 분석). 각 요소에 대해 각각 1-2 문단 이상 분석해 주세요.
                4. 주요 경쟁사 및 관계. ${companyName}의 주요 경쟁사와 그들 사이의 관계를 2-3 문단으로 설명해 주세요.
                5. 기업의 역사. ${companyName}의 설립 배경, 주요 성장 단계 및 변곡점을 설명해 주세요.`
            },
        ],
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
     * 예시 출력 (삼성전자를 예로 들면):
     *
     * 기업 개요: 삼성전자는 글로벌 전자기기 제조업체로, 스마트폰, 가전제품, 반도체 등 다양한 산업에서 세계적인 리더로 자리잡고 있습니다...
     * 주력 상품 및 서비스: 삼성전자의 주력 제품은 스마트폰, TV, 가전제품, 그리고 반도체입니다. 갤럭시 스마트폰 시리즈는 전 세계에서 높은 인기를 얻고 있으며...
     * 4S 분석:
     *   강점: 기술 혁신을 통한 제품 다양성, 글로벌 브랜드 파워...
     *   약점: 특정 시장에서의 치열한 경쟁과 마진 감소...
     *   기회: IoT, AI 및 자율 주행차 분야에서의 성장 가능성...
     *   위협: 글로벌 경제 불확실성과 기술 변화 속도...
     * 경쟁사 및 관계: 삼성전자의 주요 경쟁사로는 애플, 화웨이, 소니 등이 있으며, 이들 기업과의 경쟁은 스마트폰, 가전 및 반도체 시장에서 치열하게 이루어지고 있습니다...
     * 기업의 역사: 삼성전자는 1969년에 설립되었으며, 초기에는 가전제품 제조업체로 시작하였으나, 현재는 반도체와 스마트폰을 포함한 다양한 기술 산업의 글로벌 리더로 성장했습니다...
     */
}

// 메인 함수 실행 및 오류 처리
main().catch(err => {
    console.error(err);
    process.exit(1);
}).finally(async () => {});;

export {};
