import { DynamoDBClient, CreateTableCommand, ScalarAttributeType } from "@aws-sdk/client-dynamodb";
import dotenv from "dotenv";



// main 함수
async function main() {
  console.log("테이블 생성 시작");


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

// Users 테이블 생성 파라미터
const usersTableParams = {
  TableName: "Users",
  KeySchema: [
    { AttributeName: "userId", KeyType: "HASH" as const },
  ],
  AttributeDefinitions: [
    { AttributeName: "userId", AttributeType: "S" as ScalarAttributeType },
    { AttributeName: "email", AttributeType: "S" as ScalarAttributeType },
  ],
  GlobalSecondaryIndexes: [
    {
      IndexName: "EmailIndex",
      KeySchema: [
        { AttributeName: "email", KeyType: "HASH" as const },
      ],
      Projection: {
        ProjectionType: "ALL"
      },
      ProvisionedThroughput: {
        ReadCapacityUnits: 5,
        WriteCapacityUnits: 5
      }
    }
  ],
  BillingMode: "PAY_PER_REQUEST" as const,
};

// Posts 테이블 생성 파라미터
const postsTableParams = {
  TableName: "Posts",
  KeySchema: [
    { AttributeName: "postId", KeyType: "HASH" as const },
    { AttributeName: "createdAt", KeyType: "RANGE" as const }
  ],
  AttributeDefinitions: [
    { AttributeName: "postId", AttributeType: "S" as ScalarAttributeType },
    { AttributeName: "createdAt", AttributeType: "S" as ScalarAttributeType },
    { AttributeName: "userId", AttributeType: "S" as ScalarAttributeType }
  ],
  GlobalSecondaryIndexes: [
    {
      IndexName: "UserPostsIndex",
      KeySchema: [
        { AttributeName: "userId", KeyType: "HASH" as const },
        { AttributeName: "createdAt", KeyType: "RANGE" as const }
      ],
      Projection: {
        ProjectionType: "ALL"
      },
      ProvisionedThroughput: {
        ReadCapacityUnits: 5,
        WriteCapacityUnits: 5
      }
    }
  ],
  BillingMode: "PAY_PER_REQUEST" as const,
};

  try {
    // Users 테이블 생성
    const usersTable = await client.send(new CreateTableCommand({
      ...usersTableParams,
      GlobalSecondaryIndexes: [{
        ...usersTableParams.GlobalSecondaryIndexes[0],
        Projection: {
          ProjectionType: "ALL" as const
        }
      }]
    }));
    console.log("Users 테이블 생성 완료:", usersTable);

    // Posts 테이블 생성 
    const postsTable = await client.send(new CreateTableCommand({
      ...postsTableParams,
      GlobalSecondaryIndexes: [{
        ...postsTableParams.GlobalSecondaryIndexes[0],
        Projection: {
          ProjectionType: "ALL" as const
        }
      }]
    }));
    console.log("Posts 테이블 생성 완료:", postsTable);
  } catch (err) {
    console.error("테이블 생성 중 오류 발생:", err);
    process.exit(1);
  }
}

// main 함수 호출
main().catch((err) => {
  console.error(err);
  process.exit(1);
});

export {};
