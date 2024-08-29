// pocket_base 라이브러리 가져오기
import dotenv from "dotenv";

const PocketBase = require('pocketbase').default;

// PocketBase 클라이언트 초기화
const pb = new PocketBase('https://june.pockethost.io/'); // PocketBase 서버 주소 설정

// 데이터 삽입 함수
async function insertData() {
    try {
        dotenv.config();

        // 어드민 로그인 (아이디와 비밀번호 설정 필요)
        await pb.admins.authWithPassword(process.env.POCKETBASE_ADMIN_EMAIL, process.env.POCKETBASE_ADMIN_PASSWORD);

        // 레코드 데이터 설정
        const recordData = {
            title: 'Example Title',      // 'title' 필드 값
            content: 'This is an example content.', // 'content' 필드 값
            is_published: true           // 'is_published' 필드 값
        };

        // 레코드 삽입 요청
        const record = await pb.collection('example_collection').create(recordData);

        console.log('레코드 삽입 완료:', record);
    } catch (error) {
        console.error('레코드 삽입 실패:', error);
    }
}

// 함수 호출
async function main() {
    console.log("start");
    await insertData();
}

main().catch(err => {
    console.error(err);
    process.exit(1);
});

export {};
