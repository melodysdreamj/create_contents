// pocket_base 라이브러리 가져오기
import dotenv from "dotenv";

const PocketBase = require('pocketbase').default;

// PocketBase 클라이언트 초기화
const pb = new PocketBase('https://june.pockethost.io/'); // PocketBase 서버 주소 설정

// 데이터 가져오기 함수
async function getData() {
    try {
        dotenv.config();

        // 어드민 로그인 (아이디와 비밀번호 설정 필요)
        await pb.admins.authWithPassword(process.env.POCKETBASE_ADMIN_EMAIL, process.env.POCKETBASE_ADMIN_PASSWORD);

        // 레코드 리스트 가져오기 (페이지: 1, 페이지 크기: 10)
        const resultList = await pb.collection('example_collection').getList(1, 10); // 첫 번째 페이지, 10개의 레코드

        console.log('레코드 가져오기 성공:', resultList.items); // 레코드 리스트 출력
    } catch (error) {
        console.error('레코드 가져오기 실패:', error);
    }
}

// 함수 호출
async function main() {
    console.log("start");
    await getData();
}

main().catch(err => {
    console.error(err);
    process.exit(1);
});

export {};
