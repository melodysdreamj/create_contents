// pocket_base 라이브러리 가져오기
import dotenv from "dotenv";

const PocketBase = require('pocketbase').default;

// PocketBase 클라이언트 초기화
const pb = new PocketBase('https://june.pockethost.io/'); // PocketBase 서버 주소 설정

// 특정 컬렉션의 모든 레코드 가져오기 함수
async function getAllRecords() {
    try {
        dotenv.config();

        // 어드민 로그인 (아이디와 비밀번호 설정 필요)
        await pb.admins.authWithPassword(process.env.POCKETBASE_ADMIN_EMAIL, process.env.POCKETBASE_ADMIN_PASSWORD);

        let page = 1;
        const perPage = 100; // 한 번에 가져올 레코드 수
        let allRecords: any[] = [];
        let hasMore = true;

        while (hasMore) {
            // 각 페이지별 레코드 리스트 가져오기
            const resultList = await pb.collection('example_collection').getList(page, perPage);

            // 레코드를 allRecords 배열에 추가
            allRecords = allRecords.concat(resultList.items);

            // 더 이상 레코드가 없으면 종료
            if (resultList.items.length < perPage) {
                hasMore = false;
            }

            // 다음 페이지로 이동
            page += 1;
        }

        console.log('모든 레코드 가져오기 완료:', allRecords);
    } catch (error) {
        console.error('레코드 가져오기 실패:', error);
    }
}

// 함수 호출
async function main() {
    console.log("start");

    await getAllRecords();
}

main().catch(err => {
    console.error(err);
    process.exit(1);
});

export {};
