// pocket_base 라이브러리 가져오기
import dotenv from "dotenv";

const PocketBase = require('pocketbase').default;

// PocketBase 클라이언트 초기화
const pb = new PocketBase('https://june.pockethost.io/'); // PocketBase 서버 주소 설정

// 레코드 업데이트 함수 (특정 레코드 ID로 업데이트)
async function updateData(recordId: string, newTitle : string) {
    try {
        dotenv.config();

        // 어드민 로그인 (아이디와 비밀번호 설정 필요)
        await pb.admins.authWithPassword(process.env.POCKETBASE_ADMIN_EMAIL, process.env.POCKETBASE_ADMIN_PASSWORD);

        // 업데이트할 데이터 설정
        const updatedData = {
            title: newTitle // 새로운 타이틀
        };

        // 레코드 업데이트 요청
        const updatedRecord = await pb.collection('example_collection').update(recordId, updatedData);

        console.log('레코드 업데이트 성공:', updatedRecord); // 업데이트된 레코드 출력
    } catch (error) {
        console.error('레코드 업데이트 실패:', error);
    }
}

// 함수 호출
async function main() {
    console.log("start");

    // 업데이트할 레코드 ID와 새로운 타이틀
    const recordIdToUpdate = "4g42ovdl2h3mwoh"; // 업데이트할 레코드의 ID
    const newTitle = "Updated Title"; // 새로운 타이틀

    await updateData(recordIdToUpdate, newTitle);
}

main().catch(err => {
    console.error(err);
    process.exit(1);
});

export {};
