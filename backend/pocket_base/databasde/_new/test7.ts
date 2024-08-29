// pocket_base 라이브러리 가져오기
import dotenv from "dotenv";

const PocketBase = require('pocketbase').default;

// PocketBase 클라이언트 초기화
const pb = new PocketBase('https://june.pockethost.io/'); // PocketBase 서버 주소 설정

// 레코드 삭제 함수
async function deleteData(recordId : string) {
    try {
        dotenv.config();

        // 어드민 로그인 (아이디와 비밀번호 설정 필요)
        await pb.admins.authWithPassword(process.env.POCKETBASE_ADMIN_EMAIL, process.env.POCKETBASE_ADMIN_PASSWORD);

        // 레코드 삭제 요청
        await pb.collection('example_collection').delete(recordId);

        console.log('레코드 삭제 완료:', recordId);
    } catch (error) {
        console.error('레코드 삭제 실패:', error);
    }
}

// 함수 호출
async function main() {
    console.log("start");

    // 삭제할 레코드 ID
    const recordIdToDelete = "RECORD_ID_HERE"; // 삭제할 레코드의 ID

    await deleteData(recordIdToDelete);
}

main().catch(err => {
    console.error(err);
    process.exit(1);
});

export {};
