import { DynamoDBClient, UpdateItemCommand } from "@aws-sdk/client-dynamodb";
import dotenv from "dotenv";

async function main() {
  console.log("데이터 업데이트 시작");

  dotenv.config();
  const client = new DynamoDBClient({
    region: process.env.AWS_REGION ?? 'ap-northeast-2',
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID ?? '',
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY ?? '',
    },
  });

  try {
    // 사용자 정보 업데이트
    const updateUserParams = {
      TableName: "Users",
      Key: {
        userId: { S: "업데이트할-사용자-ID" }
      },
      UpdateExpression: "SET #name = :name, #email = :email",
      ExpressionAttributeNames: {
        "#name": "name",
        "#email": "email"
      },
      ExpressionAttributeValues: {
        ":name": { S: "새로운 이름" },
        ":email": { S: "new@example.com" }
      }
    };

    await client.send(new UpdateItemCommand(updateUserParams));
    console.log("사용자 정보 업데이트 완료");

    // 게시글 내용 업데이트
    const updatePostParams = {
      TableName: "Posts",
      Key: {
        postId: { S: "업데이트할-게시글-ID" },
        createdAt: { S: "게시글-생성-시간" }
      },
      UpdateExpression: "SET #title = :title, #content = :content",
      ExpressionAttributeNames: {
        "#title": "title",
        "#content": "content"
      },
      ExpressionAttributeValues: {
        ":title": { S: "수정된 제목" },
        ":content": { S: "수정된 내용입니다." }
      }
    };

    await client.send(new UpdateItemCommand(updatePostParams));
    console.log("게시글 업데이트 완료");

  } catch (err) {
    console.error("데이터 업데이트 중 오류 발생:", err);
    throw err;
  }
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});

export {}; 