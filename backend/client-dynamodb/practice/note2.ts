import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";
import { v4 as uuidv4 } from 'uuid';
import dotenv from "dotenv";

async function main() {
  console.log("데이터 쓰기 시작");

  // .env 파일 로드
  dotenv.config();

  // DynamoDB 클라이언트 설정
  const client = new DynamoDBClient({
    region: process.env.AWS_REGION ?? 'ap-northeast-2',
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID ?? '',
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY ?? '',
    },
  });

  try {
    // 사용자 생성
    const userId = uuidv4();
    const userParams = {
      TableName: "Users",
      Item: {
        userId: { S: userId },
        email: { S: "test@example.com" },
        name: { S: "홍길동" },
        createdAt: { S: new Date().toISOString() }
      }
    };

    await client.send(new PutItemCommand(userParams));
    console.log("사용자 생성 완료");

    // 게시글 생성
    const postParams = {
      TableName: "Posts",
      Item: {
        postId: { S: uuidv4() },
        userId: { S: userId },
        title: { S: "첫 번째 게시글" },
        content: { S: "안녕하세요, 첫 게시글입니다." },
        createdAt: { S: new Date().toISOString() }
      }
    };

    await client.send(new PutItemCommand(postParams));
    console.log("게시글 생성 완료");

  } catch (err) {
    console.error("데이터 쓰기 중 오류 발생:", err);
    throw err;
  }
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});

export {};
