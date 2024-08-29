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
        intro: z.string(), // 인트로
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
    const companyName = "TCL中环"; // 영어 기업 이름   을 예시로 사용

    // OpenAI API 호출 - 기업 이름을 한국어로 변환하는 단계 추가
    const translateCompletion = await openai.chat.completions.create({
        model: "gpt-4", // 모델 사용
        messages: [
            { role: "system", content: "기업 이름의 한국어명을 알려주세요. 한국에서 이 기업이 실제로 쓰이는 이름으로 알려주세요. 불필요한 Inc나 limited같은건 제외해주세요. 알려진 한국어 이름이없다면 직역하고 괄호로 원이름도 넣어주세요." },
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
1. 인트로. ${translatedCompanyName} 와 관련해서 자연스럽게 시작해주세요. 
2. 기업 개요. ${translatedCompanyName}가 무슨 회사인지 쉽게 알 수 있도록 1-2 문단으로 설명해주세요.
3. 돈버는 방법. ${translatedCompanyName}의 핵심 돈버는 방법에 대해 2-3 문단으로 설명해주세요. 
4. 강점, 약점, 기회, 위협 (4S 분석). 각 요소에 대해 각각 1-2 문단 이상 분석해 주세요.
5. 주요 경쟁사 및 관계. ${translatedCompanyName}의 주요 경쟁사와 그들 사이의 관계를 2-3 문단으로 설명해 주세요.
6. 기업의 역사. ${translatedCompanyName}의 설립 배경, 주요 성장 단계 및 변곡점을 상세히 설명해 주세요.

예시로 삼성전자를 들어서 설명하겠습니다. 이 형식과 느낌처럼 해주세요.

1. 인트로 

최근 불확실한 경제 환경 속에서 안정적인 성장을 기대할 수 있는 기업에 대한 관심이 높아지고 있습니다. 이와 같은 상황에서 삼성전자는 글로벌 시장에서 지속적으로 성장하며, 안정적인 배당과 장기적인 투자 가치를 제공하는 기업으로 주목받고 있습니다. 오늘은 삼성전자가 어떤 기업인지, 그 장점과 단점, 그리고 주요 경쟁사와의 관계에 대해 자세히 알아보겠습니다.

2. 기업 개요

삼성전자는 반도체, 스마트폰, 가전제품, 디스플레이 등 다양한 산업 분야에서 글로벌 선두를 달리고 있는 대한민국의 대표적인 기술 기업입니다. 특히 반도체 시장에서 메모리 칩과 비메모리 반도체를 모두 생산하며 세계 시장을 주도하고 있으며, 스마트폰 시장에서도 갤럭시 시리즈를 통해 꾸준히 강력한 존재감을 발휘하고 있습니다. 또한, 다양한 가전제품과 디스플레이 기술에서도 시장 점유율을 확대하며 성장하고 있습니다.

3. 돈버는 방법

삼성전자의 핵심 수익원은 크게 반도체, 스마트폰, 그리고 가전제품 부문으로 나뉩니다.

먼저, 반도체 부문에서 삼성전자는 DRAM, NAND 플래시 메모리와 같은 메모리 반도체뿐만 아니라 시스템 반도체 분야에서도 큰 성과를 내고 있습니다. 반도체 부문은 삼성전자의 가장 큰 수익원으로, 특히 서버, 데이터 센터, 스마트폰 등에 사용되는 메모리 칩의 수요가 지속적으로 증가하면서 꾸준한 매출을 올리고 있습니다.

스마트폰 부문에서는 갤럭시 시리즈로 대표되는 삼성전자의 스마트폰 사업은 전 세계에서 두 번째로 큰 시장 점유율을 차지하고 있습니다. 특히 프리미엄 스마트폰 시장에서 애플과 경쟁하면서도 중저가 시장을 공략해 광범위한 소비자층을 확보하고 있습니다.

또한, 삼성전자는 TV, 냉장고, 세탁기 등 다양한 가전제품 부문에서도 세계적인 브랜드로 자리 잡고 있으며, 특히 QLED TV와 같은 첨단 기술을 통해 고급 가전시장에서도 강력한 존재감을 보이고 있습니다.

4. 강점, 약점, 기회, 위협 (4S 분석)

삼성전자의 강점으로는 반도체 산업의 글로벌 리더십을 통해 안정적인 수익을 창출하고 있으며, 다각화된 사업 포트폴리오로 위험을 분산하고 있다는 점입니다. 또한, 막대한 연구개발(R&D) 투자로 혁신적인 기술 개발을 지속하고 있어 시장 경쟁력을 유지하고 있습니다.

약점으로는 삼성전자의 수익 구조가 반도체 의존도가 높다는 점이 약점으로 작용할 수 있습니다. 반도체 업황이 불안정할 경우, 삼성전자의 전체 수익에 큰 타격을 줄 수 있습니다.

기회 요인으로는 5G 기술의 확산과 인공지능(AI) 및 자율주행차 등 신기술의 부상입니다. 이는 삼성전자에게 새로운 성장 기회를 제공할 수 있으며, 시스템 반도체 시장의 확대는 삼성전자가 반도체 분야에서 지속적인 성장을 이어갈 수 있는 중요한 요소가 될 것입니다.

위협 요인으로는 글로벌 경제 불확실성과 미중 무역 갈등, 그리고 기술 경쟁 심화로 인해 삼성전자의 글로벌 공급망과 수익성이 위협받을 수 있습니다. 또한, 반도체 시장의 과잉 공급이나 스마트폰 시장의 경쟁 심화는 수익성을 저해할 수 있는 요인입니다.

5. 주요 경쟁사 및 관계

삼성전자의 주요 경쟁사로는 애플(Apple), TSMC(Taiwan Semiconductor Manufacturing Company), 화웨이(Huawei) 등이 있습니다. 스마트폰 시장에서는 애플과의 경쟁이 가장 두드러지며, 특히 프리미엄 시장에서 갤럭시 시리즈와 아이폰 시리즈가 치열한 경쟁을 벌이고 있습니다. 또한, 중저가 시장에서는 중국의 화웨이, 샤오미(Xiaomi) 등과도 경쟁하고 있습니다.

반도체 분야에서는 TSMC와의 경쟁이 주목됩니다. TSMC는 세계 최대 파운드리(반도체 위탁생산) 업체로, 삼성전자의 파운드리 부문과 경쟁하고 있습니다. 두 회사는 첨단 공정 기술에서 우위를 점하기 위해 막대한 R&D 투자를 하고 있으며, 특히 5nm, 3nm 공정 등 차세대 반도체 기술을 두고 경쟁이 치열합니다.

6. 기업의 역사

삼성전자는 1969년에 설립되어 초기에는 흑백 TV 제조업체로 출발했으며, 이후 가전제품 및 전자기기 시장으로 사업을 확장해왔습니다. 1980년대에 이르러 반도체 사업에 진출하며 급격한 성장을 이뤘고, 1990년대에는 세계적인 메모리 반도체 제조사로 자리잡게 되었습니다. DRAM과 NAND 플래시 메모리 생산을 통해 글로벌 반도체 시장에서 확고한 지위를 구축한 삼성전자는, 이후 LCD 디스플레이와 OLED 등 첨단 디스플레이 기술로 영역을 확대했습니다.

2000년대 이후, 삼성전자는 갤럭시 스마트폰 시리즈를 통해 모바일 시장에서 강력한 위치를 차지하게 되었으며, 애플과 함께 스마트폰 시장의 양대 산맥으로 평가받고 있습니다. 스마트폰 시장에서의 성공은 삼성전자가 글로벌 IT 기업으로 자리잡는 데 중요한 역할을 했습니다.

최근에는 5G, AI, 자율주행, 전장(전자 장비) 산업에도 적극적으로 투자하며 미래 시장을 대비하고 있습니다. 삼성전자는 전 세계적으로 300,000명 이상의 직원을 고용하고 있으며, 글로벌 경제에 중대한 영향을 미치는 기업으로 성장했습니다. 또한 반도체, 스마트폰, 가전 등 다양한 분야에서 지속적인 성장을 이어가며, 미래 성장 동력을 확보하고자 하고 있습니다.

                `
            },
        ],
        max_tokens: 7000,
        response_format: zodResponseFormat(CompanyAnalysis, "company_analysis"),
    });

    // 파싱된 출력 데이터 확인
    const companyAnalysis = completion.choices[0].message.parsed;

    // 분석 결과 출력 (한국어)
    console.log("인트로:", companyAnalysis.intro);
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
});

export {};
