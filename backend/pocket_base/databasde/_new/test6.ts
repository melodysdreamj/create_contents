// pocket_base 라이브러리 가져오기
import dotenv from "dotenv";

const PocketBase = require('pocketbase').default;

// PocketBase 클라이언트 초기화
const pb = new PocketBase('https://june.pockethost.io/'); // PocketBase 서버 주소 설정

// 타이틀 기준으로 업데이트 또는 생성 함수
async function upsertDataByTitle(title: string, newContent: string) {
    try {
        dotenv.config();

        // 어드민 로그인 (아이디와 비밀번호 설정 필요)
        await pb.admins.authWithPassword(process.env.POCKETBASE_ADMIN_EMAIL, process.env.POCKETBASE_ADMIN_PASSWORD);

        // 먼저 해당 타이틀을 가진 레코드가 있는지 확인
        let record;
        try {
            record = await pb.collection('example_collection').getFirstListItem(`title="${title}"`);
        } catch (error : any) {
            if (error.status === 404) {
                // 레코드를 찾을 수 없으면 새로 생성
                const newRecordData = {
                    title: title,
                    content: newContent,
                    is_published: false // 기본값 설정
                };

                record = await pb.collection('example_collection').create(newRecordData);
                console.log('레코드 생성 완료:', record);
                return;
            } else {
                // 다른 에러가 발생한 경우 처리
                throw error;
            }
        }

        // 레코드가 존재하면 업데이트
        const updatedData = {
            content: newContent
        };

        const updatedRecord = await pb.collection('example_collection').update(record.id, updatedData);
        console.log('레코드 업데이트 완료:', updatedRecord);
    } catch (error) {
        console.error('레코드 처리 실패:', error);
    }
}

// 함수 호출
async function main() {
    console.log("start");

    // 업데이트 또는 생성할 타이틀과 내용
    const titleToSearch = "Example Title"; // 검색할 타이틀
    const newContent = "Updated Content"; // 업데이트할 내용

    await upsertDataByTitle(titleToSearch, newContent);
}

main().catch(err => {
    console.error(err);
    process.exit(1);
});

export {};
