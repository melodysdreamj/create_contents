// pocket_base 라이브러리 가져오기
import dotenv from "dotenv";

const PocketBase = require('pocketbase').default;

// PocketBase 클라이언트 초기화
const pb = new PocketBase('https://june.pockethost.io/'); // PocketBase 서버 주소 설정

// 데이터 가져오기 함수 (특정 타이틀로 필터링)
async function getDataByTitle(title: string) {
    try {
        dotenv.config();

        // 어드민 로그인 (아이디와 비밀번호 설정 필요)
        await pb.admins.authWithPassword(process.env.POCKETBASE_ADMIN_EMAIL, process.env.POCKETBASE_ADMIN_PASSWORD);

        // 특정 타이틀로 레코드 가져오기
        const record = await pb.collection('example_collection').getFirstListItem(`title="${title}"`);

        console.log('레코드 가져오기 성공:', record); // 레코드 출력

        console.log('title:', record.title); // 타이틀 출력
    } catch (error) {
        console.error('레코드 가져오기 실패:', error);
    }
}

// 함수 호출
async function main() {
    console.log("start");

    // 특정 타이틀을 기반으로 데이터를 가져옴
    const titleToSearch = "Example Title"; // 가져올 타이틀
    await getDataByTitle(titleToSearch);
}

main().catch(err => {
    console.error(err);
    process.exit(1);
});

export {};
