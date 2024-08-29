// pocket_base 라이브러리 가져오기
import dotenv from "dotenv";

const PocketBase = require('pocketbase').default;

// PocketBase 클라이언트 초기화
const pb = new PocketBase('https://june.pockethost.io/'); // PocketBase 서버 주소 설정

// 어드민 로그인
async function createCollection() {
    try {

        dotenv.config();

        // 어드민 로그인 (아이디와 비밀번호 설정 필요)
       await pb.admins.authWithPassword(process.env.POCKETBASE_ADMIN_EMAIL, process.env.POCKETBASE_ADMIN_PASSWORD);

        // 컬렉션 생성
        const collectionData = {
            name: 'example_collection',  // 컬렉션 이름
            type: 'base',                // 컬렉션 타입 (base, auth 등)
            schema: [
                {
                    name: 'title',
                    type: 'text',
                    required: true,
                },
                {
                    name: 'content',
                    type: 'text',
                    required: false,
                },
                {
                    name: 'is_published',
                    type: 'bool',
                    required: false,
                },
                {
                    name: 'attached_file',
                    type: 'file',   // 파일 필드 추가
                    options: {
                        maxSelect: 1, // 파일 개수 제한을 1개로 설정
                        maxSize: 10485760, // 파일 크기를 10MB로 제한
                    }
                }
            ],
            indexes: [],  // 인덱스 설정
        };


        // 컬렉션 생성 요청
        const collection = await pb.collections.create(collectionData);

        console.log('컬렉션 생성 완료:', collection);
    } catch (error) {
        console.error('컬렉션 생성 실패:', error);
    }
}

// 함수 호출


async function main() {
    console.log("start");
    await createCollection();
}

main().catch(err => {
    console.error(err);
    process.exit(1);
});

export {};
