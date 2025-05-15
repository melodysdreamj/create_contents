import { LegoUtil } from "../../../../util";
const PocketBase = require("pocketbase").default;
dotenv.config();
const pb = new PocketBase(process.env.POCKET_BASE_URL);
import dotenv from "dotenv";
import sqlite3 from "sqlite3";
import path from "path";
import { Sub } from "./sub";
import { TestEnumTest, TestEnumTestHelper } from "./test_enum";
export class Example {
  constructor() {
    this.docId = LegoUtil.randomString(10);
  }
  s000: string = "";
  i000: number = 0;
  b000: boolean = false;
  r000: number = 0.0;
  t000: Date = new Date(0);
  l000: string[] = [];
  m000: { [key: string]: any } = {};
  c000: Sub = new Sub();
  j000: Sub[] = [];
  e000: TestEnumTest = TestEnumTest.notSelected;
  docId: string = "";
  toDataString(): string {
    return btoa(
      Array.from(
        new TextEncoder().encode(
          new URLSearchParams({
            s000: this.s000,
            i000: this.i000.toString(),
            b000: this.b000.toString(),
            r000: this.r000.toString(),
            t000: this.t000.getTime().toString(),
            l000: JSON.stringify(this.l000),
            m000: JSON.stringify(this.m000),
            c000: this.c000.toDataString(),
            j000: JSON.stringify(
              this.j000.map((model: Sub) => model.toDataString())
            ),
            e000: this.e000,
            docId: this.docId,
          }).toString()
        )
      )
        .map((byte) => String.fromCharCode(byte))
        .join("")
    );
  }
  static fromDataString(dataString: string): Example {
    const queryParams = Object.fromEntries(
      new URLSearchParams(atob(dataString))
    );
    const object = new Example();
    object.s000 = queryParams["s000"] || "";
    object.i000 = parseInt(queryParams["i000"] || "0", 10);
    object.b000 = queryParams["b000"] === "true";
    object.r000 = parseFloat(queryParams["r000"] || "0");
    object.t000 = new Date(parseInt(queryParams["t000"] || "0", 10));
    object.l000 = JSON.parse(queryParams["l000"] || "[]");
    object.m000 = JSON.parse(queryParams["m000"] || "{}");
    object.c000 = Sub.fromDataString(
      queryParams["c000"] || new Sub().toDataString()
    );
    object.j000 = (JSON.parse(queryParams["j000"] || "[]") || []).map(
      (item: string) => Sub.fromDataString(item)
    );
    object.e000 = TestEnumTestHelper.fromString(
      queryParams["e000"] || TestEnumTest.notSelected
    );
    object.docId = queryParams["docId"] || "";
    return object;
  }
  toMap(): object {
    return {
      s000: this.s000,
      i000: this.i000,
      b000: this.b000 ? 1 : 0,
      r000: this.r000,
      t000: this.t000.getTime(),
      l000: JSON.stringify(this.l000),
      m000: JSON.stringify(this.m000),
      c000: this.c000.toDataString(),
      j000: JSON.stringify(this.j000.map((model: Sub) => model.toDataString())),
      e000: this.e000,
      docId: this.docId,
    };
  }
  static fromMap(queryParams: any): Example {
    const object = new Example();
    object.s000 = queryParams.s000 || "";
    object.i000 = Number(queryParams.i000 || 0);
    object.b000 = queryParams.b000 === 1;
    object.r000 = queryParams.r000 || 0.0;
    object.t000 = new Date(queryParams.t000 || 0);
    object.l000 = JSON.parse(queryParams.l000 || "[]");
    object.m000 = JSON.parse(queryParams.m000 || "{}");
    object.c000 = Sub.fromDataString(
      queryParams.c000 || new Sub().toDataString()
    );
    object.j000 = (JSON.parse(queryParams.j000 || "[]") || []).map(
      (item: string) => Sub.fromDataString(item)
    );
    object.e000 = TestEnumTestHelper.fromString(
      queryParams.e000 || TestEnumTest.notSelected
    );
    object.docId = queryParams.docId;
    return object;
  }
}
export class ExamplePocketBaseCollection {
  static _ready = false;
  static async getDb() {
    if (ExamplePocketBaseCollection._ready) return;
    dotenv.config();
    await pb.admins.authWithPassword(
      process.env.POCKET_BASE_ADMIN_EMAIL,
      process.env.POCKET_BASE_ADMIN_PASSWORD
    );
    ExamplePocketBaseCollection._ready = true;
  }
  static async createTable() {
    await ExamplePocketBaseCollection.getDb();
    const collectionData = {
      name: "Example",
      type: "base",
      schema: [
        { name: "docId", type: "text", required: true, unique: true },
        { name: "s000", type: "text", required: false },
        { name: "i000", type: "number", required: false },
        { name: "b000", type: "bool", required: false },
        { name: "r000", type: "number", required: false },
        { name: "t000", type: "number", required: false },
        { name: "l000", type: "text", required: false },
        { name: "m000", type: "text", required: false },
        { name: "c000", type: "text", required: false },
        { name: "j000", type: "text", required: false },
        { name: "e000", type: "text", required: false },
      ],
      indexes: [], // 인덱스 설정
    };
    try {
      const collection = await pb.collections.create(collectionData);
      console.log("컬렉션 생성 완료:", collection);
    } catch (error) {
      console.error("컬렉션 생성 실패:", error);
    }
  }
  static async insert(object: Example) {
    await ExamplePocketBaseCollection.getDb();
    const recordData = {
      docId: object.docId,
      s000: object.s000,
      i000: object.i000,
      b000: object.b000,
      r000: object.r000,
      t000: object.t000.getTime(),
      l000: JSON.stringify(object.l000),
      m000: JSON.stringify(object.m000),
      c000: object.c000.toDataString(),
      j000: JSON.stringify(
        object.j000.map((model: Sub) => model.toDataString())
      ),
      e000: object.e000,
    };
    const record = await pb.collection("Example").create(recordData);
    console.log("레코드 삽입 완료:", record);
  }
  static async upsert(object: Example) {
    await ExamplePocketBaseCollection.getDb();
    const rawObj = await this.getRow(object.docId);
    if (rawObj == null) {
      await this.insert(object);
    } else {
      const updatedData = {
        docId: object.docId,
        s000: object.s000,
        i000: object.i000,
        b000: object.b000,
        r000: object.r000,
        t000: object.t000.getTime(),
        l000: JSON.stringify(object.l000),
        m000: JSON.stringify(object.m000),
        c000: object.c000.toDataString(),
        j000: JSON.stringify(
          object.j000.map((model: Sub) => model.toDataString())
        ),
        e000: object.e000,
      };
      try {
        const updatedRecord = await pb
          .collection("Example")
          .update(rawObj.id, updatedData);
      } catch (e) {
        console.log("failed to upsert", e);
      }
    }
  }
  static async delete(docId: string) {
    await ExamplePocketBaseCollection.getDb();
    const rawObj = await this.getRow(docId);
    if (rawObj != null) {
      await pb.collection("Example").delete(rawObj.id);
    } else {
      console.log("failed to delete because object is not found");
    }
  }
  static async get(docId: string): Promise<Example | null> {
    await ExamplePocketBaseCollection.getDb();
    try {
      const xs = await pb
        .collection("Example")
        .getFirstListItem(`docId="${docId}"`);
      return Example.fromMap(xs);
    } catch (e) {
      return null;
    }
  }
  static async getRow(docId: string): Promise<any> {
    await ExamplePocketBaseCollection.getDb();
    try {
      return await pb
        .collection("Example")
        .getFirstListItem(`docId="${docId}"`);
    } catch (e) {
      return null;
    }
  }
  static async getAll(): Promise<Example[]> {
    await ExamplePocketBaseCollection.getDb();
    try {
      let page = 1;
      const perPage = 100; // 한 번에 가져올 레코드 수
      let allRecords: any[] = [];
      let hasMore = true;
      while (hasMore) {
        const resultList = await pb
          .collection("Example")
          .getList({ page: page, perPage: perPage });
        allRecords = allRecords.concat(resultList.items);
        if (resultList.items.length < perPage) {
          hasMore = false;
        }
        page += 1;
      }
      const result: Example[] = [];
      for (let i = 0; i < allRecords.length; i++) {
        result.push(Example.fromMap(allRecords[i]));
      }
      return result;
    } catch (e) {
      console.log(e);
      return [];
    }
  }
  static async getByI000(value: number): Promise<Example | null> {
    await ExamplePocketBaseCollection.getDb();
    try {
      const xs = await pb
        .collection("Example")
        .getFirstListItem(`i000=${value}`);
      return Example.fromMap(xs);
    } catch (e) {
      return null;
    }
  }
  static async deleteAll() {
    await ExamplePocketBaseCollection.getDb();
    let page = 1;
    const perPage = 100; // 한 번에 가져올 레코드 수
    let allRecords: any[] = [];
    let hasMore = true;
    while (hasMore) {
      const resultList = await pb
        .collection("Example")
        .getList({ page: page, perPage: perPage });
      allRecords = allRecords.concat(resultList.items);
      if (resultList.items.length < perPage) {
        hasMore = false;
      }
      page += 1;
    }
    for (let i = 0; i < allRecords.length; i++) {
      await pb.collection("Example").delete(allRecords[i].id);
    }
    console.log("All records are deleted");
  }
  static async resetTable() {
    await ExamplePocketBaseCollection.getDb();
    const collections: any[] = await pb.collections.getFullList(); // 컬렉션 목록의 타입을 any로 설정
    const collectionToDelete = collections.find(
      (collection: any) => collection.name === "Example"
    );
    if (collectionToDelete) {
      await pb.collections.delete(collectionToDelete.id);
      console.log("컬렉션 삭제 완료:", "Example");
    } else {
      console.log("컬렉션을 찾을 수 없습니다:", "Example");
    }
    await ExamplePocketBaseCollection.createTable();
  }
}
