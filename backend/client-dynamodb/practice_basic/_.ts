import {
  DynamoDBClient,
  CreateTableCommand,
  ScalarAttributeType,
  PutItemCommand,
  GetItemCommand,
  QueryCommand,
  DeleteItemCommand,
  UpdateItemCommand,
  ScanCommand,
} from "@aws-sdk/client-dynamodb";
import { LegoUtil } from "../../../util";
import path from "path";
export class New {
  constructor() {
    this.docId = LegoUtil.randomString(10);
  }
  docId: string = "";
  toDataString(): string {
    return btoa(
      Array.from(
        new TextEncoder().encode(
          new URLSearchParams({
            docId: this.docId,
          }).toString()
        )
      )
        .map((byte) => String.fromCharCode(byte))
        .join("")
    );
  }
  static fromDataString(dataString: string): New {
    const queryParams = Object.fromEntries(
      new URLSearchParams(atob(dataString))
    );
    const object = new New();
    object.docId = queryParams["docId"] || "";
    return object;
  }
  toMap(): object {
    return {
      docId: this.docId,
    };
  }
  static fromMap(queryParams: any): New {
    const object = new New();
    object.docId = queryParams.docId;
    return object;
  }
}
export class NewDynamoDb {
  static client = new DynamoDBClient({
    region: process.env.AWS_REGION ?? "ap-northeast-2",
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID ?? "",
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY ?? "",
    },
  });
  static async createTable() {
    const tableParams = {
      TableName: "New",
      KeySchema: [{ AttributeName: "docId", KeyType: "HASH" as const }],
      AttributeDefinitions: [
        { AttributeName: "docId", AttributeType: "S" as ScalarAttributeType },
      ],
      BillingMode: "PAY_PER_REQUEST" as const,
    };
    try {
      const usersTable = await NewDynamoDb.client.send(
        new CreateTableCommand(tableParams)
      );
      console.log("table created:", usersTable);
    } catch (err) {
      console.error("table creation failed:", err);
    }
  }
  static async upsert(object: New) {
    const upsertParams = {
      TableName: "New",
      Item: {
        docId: { S: object.docId },
      },
    };
    await NewDynamoDb.client.send(new PutItemCommand(upsertParams));
  }
  static async delete(docId: string): Promise<boolean> {
    try {
      const result = await NewDynamoDb.client.send(
        new DeleteItemCommand({
          TableName: "New",
          Key: { docId: { S: docId } },
          ReturnValues: "ALL_OLD", // 삭제된 항목 반환
        })
      );
      return !!result.Attributes; // 항목이 실제로 삭제되었는지 확인
    } catch (error) {
      console.error("Failed to delete item:", error);
      throw error; // 또는 에러 처리 로직
    }
  }
  static async get(docId: string): Promise<New | null> {
    const getParams = {
      TableName: "New",
      Key: { docId: { S: docId } },
    };
    const result = await NewDynamoDb.client.send(new GetItemCommand(getParams));
    if (result.Item) {
      return this.fromMap(result.Item);
    }
    return null;
  }
  static fromMap(queryParams: any): New {
    const object = new New();
    object.docId = queryParams.docId.S;
    return object;
  }
}
