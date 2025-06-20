import { LegoUtil } from "../../../../util";
import * as fs from "fs";
import dotenv from "dotenv";
import path from "path";
import FormData from "form-data";
import axios, { AxiosResponse } from "axios";
dotenv.config();
const PocketBase = require("pocketbase").default;
const pb = new PocketBase(process.env.POCKET_BASE_URL);
export class Fruit {
  constructor() {
    this.docId = LegoUtil.randomString(10);
  }
  definition: string = "";
  history: string = "";
  food: string = "";
  imageUrl: string = "";
  fileName: string = "";
  docId: string = "";
  toDataString(): string {
    return btoa(
      Array.from(
        new TextEncoder().encode(
          new URLSearchParams({
            definition: this.definition,
            history: this.history,
            food: this.food,
            imageUrl: this.imageUrl,
            fileName: this.fileName,
            docId: this.docId,
          }).toString()
        )
      )
        .map((byte) => String.fromCharCode(byte))
        .join("")
    );
  }
  static fromDataString(dataString: string): Fruit {
    const queryParams = Object.fromEntries(
      new URLSearchParams(atob(dataString))
    );
    const object = new Fruit();
    object.definition = queryParams["definition"] || "";
    object.history = queryParams["history"] || "";
    object.food = queryParams["food"] || "";
    object.imageUrl = queryParams["imageUrl"] || "";
    object.fileName = queryParams["fileName"] || "";
    object.docId = queryParams["docId"] || "";
    return object;
  }
  toMap(): object {
    return {
      definition: this.definition,
      history: this.history,
      food: this.food,
      imageUrl: this.imageUrl,
      fileName: this.fileName,
      docId: this.docId,
    };
  }
  static fromMap(queryParams: any): Fruit {
    const object = new Fruit();
    object.definition = queryParams.definition || "";
    object.history = queryParams.history || "";
    object.food = queryParams.food || "";
    object.imageUrl = queryParams.imageUrl || "";
    object.fileName = queryParams.fileName || "";
    object.docId = queryParams.docId;
    return object;
  }
}
export class FruitPocketBaseCollection {
  static _ready = false;
  static async getDb() {
    if (FruitPocketBaseCollection._ready) return;
    dotenv.config();
    await pb.admins.authWithPassword(
      process.env.POCKET_BASE_ADMIN_EMAIL,
      process.env.POCKET_BASE_ADMIN_PASSWORD
    );
    FruitPocketBaseCollection._ready = true;
  }
  static async createTable() {
    await FruitPocketBaseCollection.getDb();
    const collectionData = {
      name: "Fruit",
      type: "base",
      schema: [
        { name: "docId", type: "text", required: true, unique: true },
        { name: "definition", type: "text", required: false },
        { name: "history", type: "text", required: false },
        { name: "food", type: "text", required: false },
        { name: "imageUrl", type: "text", required: false },
        {
          name: "fileName",
          type: "file",
          required: false,
          options: {
            maxSelect: 1, // 파일 개수 제한을 1개로 설정
            maxSize: 1048576000, // 파일 크기를 1000MB로 제한
          },
        },
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
  static async insert(object: Fruit): Promise<string> {
    await FruitPocketBaseCollection.getDb();
    const recordData = {
      docId: object.docId,
      definition: object.definition,
      history: object.history,
      food: object.food,
      imageUrl: object.imageUrl,
      fileName: object.fileName,
    };
    const record = await pb.collection("Fruit").create(recordData);
    console.log("레코드 삽입 완료:", record);
    return record.id;
  }
  static async upsert(object: Fruit): Promise<string | null> {
    await FruitPocketBaseCollection.getDb();
    const rawObj = await this.getRow(object.docId);
    if (rawObj == null) {
      return await this.insert(object);
    } else {
      const updatedData = {
        docId: object.docId,
        definition: object.definition,
        history: object.history,
        food: object.food,
        imageUrl: object.imageUrl,
        fileName: object.fileName,
      };
      try {
        const updatedRecord = await pb
          .collection("Fruit")
          .update(rawObj.id, updatedData);
        return updatedRecord.id;
      } catch (e) {
        console.log("failed to upsert", e);
        return null;
      }
    }
  }
  static async delete(docId: string) {
    await FruitPocketBaseCollection.getDb();
    const rawObj = await this.getRow(docId);
    if (rawObj != null) {
      await pb.collection("Fruit").delete(rawObj.id);
    } else {
      console.log("failed to delete because object is not found");
    }
  }
  static async get(docId: string): Promise<Fruit | null> {
    await FruitPocketBaseCollection.getDb();
    try {
      const xs = await pb
        .collection("Fruit")
        .getFirstListItem(`docId="${docId}"`);
      return Fruit.fromMap(xs);
    } catch (e) {
      return null;
    }
  }
  static async getRow(docId: string): Promise<any> {
    await FruitPocketBaseCollection.getDb();
    try {
      return await pb.collection("Fruit").getFirstListItem(`docId="${docId}"`);
    } catch (e) {
      return null;
    }
  }
  static async getAll(): Promise<Fruit[]> {
    await FruitPocketBaseCollection.getDb();
    try {
      let page = 1;
      const perPage = 100; // 한 번에 가져올 레코드 수
      let allRecords: any[] = [];
      let hasMore = true;
      while (hasMore) {
        const resultList = await pb
          .collection("Fruit")
          .getList({ page: page, perPage: perPage });
        allRecords = allRecords.concat(resultList.items);
        if (resultList.items.length < perPage) {
          hasMore = false;
        }
        page += 1;
      }
      const result: Fruit[] = [];
      for (let i = 0; i < allRecords.length; i++) {
        result.push(Fruit.fromMap(allRecords[i]));
      }
      return result;
    } catch (e) {
      console.log(e);
      return [];
    }
  }
  static async getByI000(value: number): Promise<Fruit | null> {
    await FruitPocketBaseCollection.getDb();
    try {
      const xs = await pb.collection("Fruit").getFirstListItem(`i000=${value}`);
      return Fruit.fromMap(xs);
    } catch (e) {
      return null;
    }
  }
  static async deleteAll() {
    await FruitPocketBaseCollection.getDb();
    let page = 1;
    const perPage = 100; // 한 번에 가져올 레코드 수
    let allRecords: any[] = [];
    let hasMore = true;
    while (hasMore) {
      const resultList = await pb
        .collection("Fruit")
        .getList({ page: page, perPage: perPage });
      allRecords = allRecords.concat(resultList.items);
      if (resultList.items.length < perPage) {
        hasMore = false;
      }
      page += 1;
    }
    for (let i = 0; i < allRecords.length; i++) {
      await pb.collection("Fruit").delete(allRecords[i].id);
    }
    console.log("All records are deleted");
  }
  static async resetTable() {
    await FruitPocketBaseCollection.getDb();
    const collections: any[] = await pb.collections.getFullList(); // 컬렉션 목록의 타입을 any로 설정
    const collectionToDelete = collections.find(
      (collection: any) => collection.name === "Fruit"
    );
    if (collectionToDelete) {
      await pb.collections.delete(collectionToDelete.id);
      console.log("컬렉션 삭제 완료:", "Fruit");
    } else {
      console.log("컬렉션을 찾을 수 없습니다:", "Fruit");
    }
    await FruitPocketBaseCollection.createTable();
  }
  static async upsertFile(object: Fruit, filePath: string) {
    await FruitPocketBaseCollection.getDb();
    const obj = await this.getRow(object.docId);
    try {
      if (obj == null) {
        let id = await this.insert(object);
        const formData = new FormData();
        formData.append("fileName", fs.createReadStream(filePath), {
          filename: path.basename(filePath),
        });
        const uploadResponse: AxiosResponse<any> = await axios.patch(
          `${pb.baseUrl}/api/collections/Fruit/records/${id}`,
          formData,
          {
            headers: {
              ...formData.getHeaders(),
              Authorization: `Bearer ${pb.authStore.token}`, // 인증 토큰 헤더에 추가
            },
          }
        );
        return uploadResponse.data;
      } else {
        const formData = new FormData();
        formData.append("fileName", fs.createReadStream(filePath), {
          filename: path.basename(filePath),
        });
        const uploadResponse: AxiosResponse<any> = await axios.patch(
          `${pb.baseUrl}/api/collections/Fruit/records/${obj.id}`,
          formData,
          {
            headers: {
              ...formData.getHeaders(),
              Authorization: `Bearer ${pb.authStore.token}`, // 인증 토큰 헤더에 추가
            },
          }
        );
        console.log("Buffer 업로드 완료:", uploadResponse.data);
        return uploadResponse.data;
      }
    } catch (e) {
      console.log("failed to upsert", e);
      return null;
    }
  }
  static async downloadFile(object: Fruit, filePath: string): Promise<boolean> {
    await FruitPocketBaseCollection.getDb();
    const obj = await this.getRow(object.docId);
    if (obj == null) {
      console.log("object is not found");
      return false;
    } else {
      try {
        const downloadResponse: AxiosResponse<any> = await axios.get(
          `${pb.baseUrl}/api/files/${obj.collectionId}/${obj.id}/${obj.fileName}`,
          {
            responseType: "stream",
            headers: {
              Authorization: `Bearer ${pb.authStore.token}`, // 인증 토큰 헤더에 추가
            },
          }
        );
        const fileStream = fs.createWriteStream(filePath);
        downloadResponse.data.pipe(fileStream);
        return true;
      } catch (e) {
        console.log("failed to download", e);
        return false;
      }
    }
  }
  static async getDownloadUrl(object: Fruit | null): Promise<string | null> {
    if (object == null) {
      console.log("object is null");
      return null;
    }
    await FruitPocketBaseCollection.getDb();
    const obj = await this.getRow(object.docId);
    if (obj == null) {
      console.log("object is not found");
      return null;
    } else {
      const fileName = obj.fileName;
      const downloadUrl = `${pb.baseUrl}/api/files/${obj.collectionId}/${obj.id}/${fileName}`;
      console.log("다운로드 URL:", downloadUrl);
      return downloadUrl;
    }
  }
}
