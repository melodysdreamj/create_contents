import { DynamoDBClient, GetItemCommand, QueryCommand } from "@aws-sdk/client-dynamodb";
import dotenv from "dotenv";

async function main() {
  console.log("데이터 읽기 시작");

  dotenv.config();
  const client = new DynamoDBClient({
    region: process.env.AWS_REGION ?? 'ap-northeast-2',
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID ?? '',
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY ?? '',
    },
  });

  try {
    // 특정 사용자 조회
    const userParams = {
      TableName: "Users",
      Key: {
        userId: { S: "여기에-사용자-ID-입력" }
      }
    };

    const userData = await client.send(new GetItemCommand(userParams));
    console.log("사용자 데이터:", userData.Item);

    // 특정 사용자의 게시글 목록 조회 (GSI 사용)
    const postsParams = {
      TableName: "Posts",
      IndexName: "UserPostsIndex",
      KeyConditionExpression: "userId = :userId",
      ExpressionAttributeValues: {
        ":userId": { S: "여기에-사용자-ID-입력" }
      }
    };

    const userPosts = await client.send(new QueryCommand(postsParams));
    console.log("사용자의 게시글:", userPosts.Items);

  } catch (err) {
    console.error("데이터 읽기 중 오류 발생:", err);
    throw err;
  }
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});

export {}; 