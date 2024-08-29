import dotenv from "dotenv";
import * as path from "path";
import FormData from 'form-data';
import axios, { AxiosResponse } from 'axios';
import 'pocketbase';  // PocketBase 타입 정의가 있다고 가정
import { Readable } from 'stream';

dotenv.config();

// PocketBase 클라이언트 초기화
const PocketBase = require('pocketbase').default;
const pb = new PocketBase('https://june.pockethost.io/');

// 파일 업로드 함수의 반환 타입 (여기선 PocketBase의 Record 타입으로 가정)
interface UploadResponse{
    id: string;
    collectionId: string;
    attached_file: string;  // 파일이 저장된 필드
}

// Buffer 객체를 업로드하는 함수
async function uploadBuffer(collectionName: string, buffer: Buffer, fileName: string): Promise<UploadResponse> {
    try {
        // 어드민 로그인
        await pb.admins.authWithPassword(process.env.POCKETBASE_ADMIN_EMAIL!, process.env.POCKETBASE_ADMIN_PASSWORD!);

        // 컬렉션 레코드 생성
        const newRecord: UploadResponse = await pb.collection(collectionName).create({
            title: 'example_title',
            content: 'example_content',
            is_published: true,
        });

        // FormData 객체 생성
        const formData = new FormData();
        formData.append('attached_file', buffer, fileName);  // Buffer 객체를 파일로 업로드

        // Axios를 사용하여 업로드 요청 수행
        const uploadResponse: AxiosResponse<UploadResponse> = await axios.patch(`${pb.baseUrl}/api/collections/${collectionName}/records/${newRecord.id}`, formData, {
            headers: {
                ...formData.getHeaders(),
                Authorization: `Bearer ${pb.authStore.token}`, // 인증 토큰 헤더에 추가
            },
        });

        console.log('Buffer 업로드 완료:', uploadResponse.data);

        return uploadResponse.data;  // 업로드된 파일 정보 반환
    } catch (error) {
        console.error('Buffer 업로드 중 오류 발생:', error);
        throw error;
    }
}

// 레코드의 파일 필드에서 파일을 다운로드하는 함수
async function downloadFileFromRecord(collectionName: string, recordId: string): Promise<Buffer> {
    try {
        // 어드민 로그인
        await pb.admins.authWithPassword(process.env.POCKETBASE_ADMIN_EMAIL!, process.env.POCKETBASE_ADMIN_PASSWORD!);

        // 해당 레코드 가져오기
        const record = await pb.collection(collectionName).getOne(recordId);

        console.log(`레코드 정보:`, record);

        // 레코드 내의 파일 필드에서 파일 이름을 가져옴
        const actualFileName: string = record['attached_file'];  // fileField에 해당하는 파일 이름 가져오기

        // 파일 다운로드 URL 생성
        const fileUrl: string = `${pb.baseUrl}/api/files/${record.collectionId}/${recordId}/${actualFileName}`;
        console.log(`다운로드 URL: ${fileUrl}`);

        // Axios로 파일 다운로드 요청 (스트림으로 받음)
        const response = await axios.get<Readable>(fileUrl, { responseType: 'stream' });

        // 스트림 데이터를 메모리 버퍼에 저장하기 위한 배열
        const chunks: Buffer[] = [];

        // 스트림에서 데이터를 받아서 배열에 추가
        response.data.on('data', (chunk: Buffer) => {
            chunks.push(chunk);
        });

        return new Promise<Buffer>((resolve, reject) => {
            // 스트림이 끝나면 모든 청크를 하나로 합침
            response.data.on('end', () => {
                const buffer: Buffer = Buffer.concat(chunks);  // 청크들을 하나의 버퍼로 합침
                console.log('파일 스트림 다운로드 완료, 버퍼 크기:', buffer.length);
                resolve(buffer);  // 합쳐진 버퍼를 반환
            });

            // 에러 처리
            response.data.on('error', (err: Error) => {
                console.error('파일 다운로드 중 오류 발생:', err);
                reject(err);  // 오류 발생 시 거부
            });
        });

    } catch (error) {
        console.error('파일 다운로드 중 오류 발생:', error);
        throw error;
    }
}

// 메인 함수
async function main(): Promise<void> {
    console.log("start");

    // 컬렉션 이름 설정
    const collectionName: string = "example_collection";

    // 가상의 파일 데이터를 메모리로 생성
    const buffer: Buffer = Buffer.from('Hello, PocketBase! This is a test buffer.', 'utf-8');
    const fileName: string = "testfile.txt"; // 업로드할 파일 이름

    // Buffer를 파일처럼 업로드
    const uploadResponse: UploadResponse = await uploadBuffer(collectionName, buffer, fileName);

    console.log('업로드된 파일 정보:', uploadResponse);

    // 업로드한 파일을 레코드의 파일 필드를 통해 다운로드
    const recordId: string = uploadResponse.id;
    const downloadedBuffer: Buffer = await downloadFileFromRecord(collectionName, recordId);

    // 다운로드된 버퍼를 Base64로 변환
    const base64String: string = downloadedBuffer.toString('base64');
    console.log('다운로드된 파일의 Base64 데이터:', base64String);
}

main().catch(err => {
    console.error(err);
    process.exit(1);
});

export {};
