import { DynamoDBClient, DeleteItemCommand } from "@aws-sdk/client-dynamodb";
import dotenv from "dotenv";

async function main() {
  console.log("데이터 삭제 시작");

  dotenv.config();
  const client = new DynamoDBClient({
    region: process.env.AWS_REGION ?? 'ap-northeast-2',
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID ?? '',
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY ?? '',
    },
  });

  try {
    // 게시글 삭제
    const deletePostParams = {
      TableName: "Posts",
      Key: {
        postId: { S: "삭제할-게시글-ID" },
        createdAt: { S: "게시글-생성-시간" }
      }
    };

    await client.send(new DeleteItemCommand(deletePostParams));
    console.log("게시글 삭제 완료");

    // 사용자 삭제
    const deleteUserParams = {
      TableName: "Users",
      Key: {
        userId: { S: "삭제할-사용자-ID" }
      }
    };

    await client.send(new DeleteItemCommand(deleteUserParams));
    console.log("사용자 삭제 완료");

  } catch (err) {
    console.error("데이터 삭제 중 오류 발생:", err);
    throw err;
  }
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});

export {}; 