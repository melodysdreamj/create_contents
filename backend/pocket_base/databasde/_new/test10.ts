import dotenv from "dotenv";
import * as fs from "fs";
import * as path from "path";
import FormData from 'form-data';
import axios from 'axios';

const PocketBase = require('pocketbase').default;

// 환경 변수 로드
dotenv.config();

// PocketBase 클라이언트 초기화
const pb = new PocketBase('https://june.pockethost.io/');

// 파일 업로드 함수
async function uploadFile(collectionName: string, filePath: string) {
    try {
        // 어드민 로그인
        await pb.admins.authWithPassword(process.env.POCKETBASE_ADMIN_EMAIL, process.env.POCKETBASE_ADMIN_PASSWORD);

        // 컬렉션 레코드 생성
        const newRecord = await pb.collection(collectionName).create({
            title: 'example_title',
            content: 'example_content',
            is_published: true,
        });

        // 파일 스트림 생성
        const fileStream = fs.createReadStream(filePath);

        // FormData 객체 생성
        const formData = new FormData();
        formData.append('attached_file', fileStream, path.basename(filePath));

        // Axios를 사용하여 업로드 요청 수행
        const uploadResponse = await axios.patch(`${pb.baseUrl}/api/collections/${collectionName}/records/${newRecord.id}`, formData, {
            headers: {
                ...formData.getHeaders(),
                Authorization: `Bearer ${pb.authStore.token}`, // 인증 토큰 헤더에 추가
            },
        });

        console.log('파일 업로드 완료:', uploadResponse.data);

        return uploadResponse.data;
    } catch (error) {
        console.error('파일 업로드 중 오류 발생:', error);
        throw error;
    }
}

// 파일 다운로드 함수
async function downloadFile(collectionName: string, recordId: string, collectionId: string, fileName: string, downloadPath: string) {
    try {
        // 어드민 로그인
        await pb.admins.authWithPassword(process.env.POCKETBASE_ADMIN_EMAIL, process.env.POCKETBASE_ADMIN_PASSWORD);

        // 파일 다운로드 URL 직접 생성
        const fileUrl = `${pb.baseUrl}/api/files/${collectionId}/${recordId}/${fileName}`;

        console.log(`다운로드 URL: ${fileUrl}`);

        // Axios로 파일 다운로드 요청
        const response = await axios.get(fileUrl, { responseType: 'stream' });

        // 스트림으로 파일 다운로드
        const fileStream = fs.createWriteStream(downloadPath);
        response.data.pipe(fileStream);

        fileStream.on('finish', () => {
            console.log('파일 다운로드 완료:', downloadPath);
        });

        fileStream.on('error', (err) => {
            console.error('파일 다운로드 중 오류 발생:', err);
        });
    } catch (error) {
        console.error('파일 다운로드 중 오류 발생:', error);
        throw error;
    }
}

// 함수 호출
async function main() {
    console.log("start");

    // 컬렉션 이름 및 파일 경로 설정
    const collectionName = "example_collection"; // 업로드할 컬렉션 이름
    const filePath = "data/image/sdxl/image.png"; // 업로드할 파일 경로
    const downloadPath = "data/image/sdxl/image_download.png"; // 다운로드할 파일 경로

    // 파일 업로드
    const uploadResponse = await uploadFile(collectionName, filePath);

    // 파일 다운로드
    const recordId = uploadResponse.id; // 업로드된 레코드 ID
    const collectionId = uploadResponse.collectionId; // 업로드된 컬렉션 ID
    const fileName = uploadResponse.attached_file; // 업로드된 파일 이름 (응답에서 확인)
    await downloadFile(collectionName, recordId, collectionId, fileName, downloadPath);
}

main().catch(err => {
    console.error(err);
    process.exit(1);
});

export {};
