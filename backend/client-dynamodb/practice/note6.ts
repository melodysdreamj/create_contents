import { DynamoDBClient, ScanCommand } from "@aws-sdk/client-dynamodb";
import dotenv from "dotenv";

async function main() {
  console.log("전체 데이터 조회 시작");

  dotenv.config();
  const client = new DynamoDBClient({
    region: process.env.AWS_REGION ?? 'ap-northeast-2',
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID ?? '',
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY ?? '',
    },
  });

  try {
    // 1. 모든 사용자 조회 (Scan)
    const allUsersParams = {
      TableName: "Users",
      Limit: 50  // 한 번에 가져올 항목 수 제한
    };

    const allUsers = await client.send(new ScanCommand(allUsersParams));
    console.log("전체 사용자 목록:", allUsers.Items);
    
    // 2. 모든 게시글 조회 (Scan with pagination)
    let lastEvaluatedKey = undefined;
    const allPosts = [];
    
    do {
      const scanPostsParams = {
        TableName: "Posts",
        Limit: 50,
        ExclusiveStartKey: lastEvaluatedKey
      };

      const postsResponse = await client.send(new ScanCommand(scanPostsParams));
      if (postsResponse.Items) {
        allPosts.push(...postsResponse.Items);
      }
      
      lastEvaluatedKey = postsResponse.LastEvaluatedKey;
    } while (lastEvaluatedKey);

    console.log("전체 게시글 수:", allPosts.length);
    console.log("전체 게시글 목록:", allPosts);

  } catch (err) {
    console.error("데이터 조회 중 오류 발생:", err);
    throw err;
  }
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});

export {}; 