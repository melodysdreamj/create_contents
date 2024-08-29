// pocket_base 라이브러리 가져오기
import dotenv from "dotenv";

const PocketBase = require('pocketbase').default;

// PocketBase 클라이언트 초기화
const pb = new PocketBase('https://june.pockethost.io/'); // PocketBase 서버 주소 설정

// 컬렉션 이름을 기반으로 삭제하는 함수
async function deleteCollectionByName(collectionName: string) {
    try {
        dotenv.config();

        // 어드민 로그인 (아이디와 비밀번호 설정 필요)
        await pb.admins.authWithPassword(process.env.POCKETBASE_ADMIN_EMAIL, process.env.POCKETBASE_ADMIN_PASSWORD);

        // 모든 컬렉션 목록 가져오기
        const collections: any[] = await pb.collections.getFullList(); // 컬렉션 목록의 타입을 any로 설정

        // 이름으로 컬렉션 찾기
        const collectionToDelete = collections.find((collection: any) => collection.name === collectionName);

        if (collectionToDelete) {
            // 컬렉션 삭제 요청
            await pb.collections.delete(collectionToDelete.id);
            console.log('컬렉션 삭제 완료:', collectionName);
        } else {
            console.log('컬렉션을 찾을 수 없습니다:', collectionName);
        }
    } catch (error) {
        console.error('컬렉션 삭제 실패:', error);
    }
}

// 함수 호출
async function main() {
    console.log("start");

    // 삭제할 컬렉션 이름
    const collectionNameToDelete = "example_collection"; // 삭제할 컬렉션의 이름

    await deleteCollectionByName(collectionNameToDelete);
}

main().catch(err => {
    console.error(err);
    process.exit(1);
});

export {};
