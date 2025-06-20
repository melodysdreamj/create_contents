import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
} from "@aws-sdk/client-s3";
import { promises as fs, createWriteStream } from "fs";
import { Readable } from "stream";
import "dotenv/config";

// --- R2 연결 설정 ---
// .env 파일의 키 이름이 다른 경우 여기에서 수정하세요.
const ACCOUNT_ID = process.env.CLOUDFLARE_ACCOUNT_ID_1;
const ACCESS_KEY_ID = process.env.CLOUDFLARE_R2_ACCESS_KEY_ID_1;
const SECRET_ACCESS_KEY = process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY_1;
const BUCKET_NAME = process.env.CLOUDFLARE_R2_BUCKET_NAME_1;
// --------------------

// 필수 환경 변수가 모두 설정되었는지 확인합니다.
if (!ACCOUNT_ID || !ACCESS_KEY_ID || !SECRET_ACCESS_KEY || !BUCKET_NAME) {
  throw new Error(
    "R2 접속에 필요한 환경 변수가 설정되지 않았습니다. (ACCOUNT_ID, ACCESS_KEY_ID, SECRET_ACCESS_KEY, BUCKET_NAME)"
  );
}

// R2 클라이언트 초기화
const R2 = new S3Client({
  region: "auto",
  endpoint: `https://${ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: ACCESS_KEY_ID,
    secretAccessKey: SECRET_ACCESS_KEY,
  },
});

/**
 * Cloudflare R2 파일 및 스트림 처리를 위한 유틸리티 클래스
 */
export class R2New {
  /**
   * 로컬 파일을 R2에 업로드합니다.
   * @param filePath 업로드할 파일의 로컬 경로
   * @param key R2에 저장될 객체의 키 (파일 경로 및 이름)
   */
  static async uploadFile(filePath: string, key: string): Promise<void> {
    const fileContent = await fs.readFile(filePath);

    const params = {
      Bucket: BUCKET_NAME!,
      Key: key,
      Body: fileContent,
      ContentLength: fileContent.length,
    };

    try {
      const command = new PutObjectCommand(params);
      await R2.send(command);
      console.log(`✅ Successfully uploaded file ${filePath} as ${key} to R2.`);
    } catch (error) {
      console.error(
        `❌ Error uploading file ${key} from path ${filePath} to R2:`,
        error
      );
      throw error;
    }
  }

  /**
   * Readable 스트림을 R2에 업로드합니다. (메모리 효율적)
   * @param stream 업로드할 Readable 스트림
   * @param key R2에 저장될 객체의 키
   */
  static async uploadStream(stream: Readable, key: string): Promise<void> {
    const params = {
      Bucket: BUCKET_NAME!,
      Key: key,
      Body: stream,
      // Cloudflare R2는 aws-chunked 인코딩을 완전히 지원하지 않을 수 있습니다.
      // BodyChecksum을 비활성화하면 SDK가 서명 과정에서 스트림의 SHA256 해시를
      // 계산하는 것을 방지하여 호환성 문제를 해결할 수 있습니다.
      BodyChecksum: false,
    };
    try {
      const command = new PutObjectCommand(params);
      await R2.send(command);
      console.log(`✅ Successfully uploaded stream as ${key} to R2.`);
    } catch (error) {
      console.error(`❌ Error uploading stream ${key} to R2:`, error);
      throw error;
    }
  }

  /**
   * R2의 파일을 로컬 경로에 다운로드합니다.
   * @param key 다운로드할 객체의 키
   * @param downloadPath 다운로드받을 로컬 파일 경로
   * @returns 성공 시 true, 실패 시 false
   */
  static async downloadFile(
    key: string,
    downloadPath: string
  ): Promise<boolean> {
    try {
      const stream = await this.downloadStream(key);
      if (!stream) {
        // downloadStream이 null을 반환하면 실패 처리
        return false;
      }
      const writer = createWriteStream(downloadPath);
      stream.pipe(writer);
      await new Promise((resolve, reject) => {
        writer.on("finish", resolve);
        writer.on("error", reject);
      });
      console.log(
        `✅ Successfully downloaded ${key} from R2 to ${downloadPath}.`
      );
      return true;
    } catch (error) {
      console.error(`❌ Error downloading file ${key} from R2:`, error);
      return false;
    }
  }

  /**
   * R2의 파일을 Readable 스트림으로 다운로드합니다.
   * @param key 다운로드할 객체의 키
   * @returns 파일 데이터를 담은 Readable 스트림, 실패 시 null
   */
  static async downloadStream(key: string): Promise<Readable | null> {
    const params = {
      Bucket: BUCKET_NAME!,
      Key: key,
    };
    try {
      const command = new GetObjectCommand(params);
      const { Body } = await R2.send(command);
      if (Body && Body instanceof Readable) {
        return Body;
      } else {
        console.warn(`Body가 없거나 스트림이 아님 (Key: ${key})`);
        return null;
      }
    } catch (error) {
      // 404 Not Found 같은 에러는 정상적인 실패일 수 있으므로 error 대신 warn으로 로깅
      if (
        error instanceof Error &&
        (error.name === "NoSuchKey" || error.name === "NotFound")
      ) {
        console.warn(`파일을 찾을 수 없음 (Key: ${key})`);
      } else {
        console.error(`❌ Error downloading stream ${key} from R2:`, error);
      }
      return null;
    }
  }
}
