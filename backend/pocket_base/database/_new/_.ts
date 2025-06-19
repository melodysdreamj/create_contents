import { LegoUtil } from "../../../../util";
import * as fs from "fs";
import dotenv from "dotenv";

import path from "path";
import FormData from "form-data";
import axios, { AxiosResponse } from "axios";

dotenv.config();

const PocketBase = require("pocketbase").default;
// PocketBase 클라이언트 초기화
const pb = new PocketBase(process.env.POCKET_BASE_URL);

export class New {
  constructor() {
    this.docId = LegoUtil.randomString(10);
  }

  // s000: string = "";
  // i000: number = 0;
  // b000: boolean = false;
  // r000: number = 0.0;
  // t000: Date = new Date(0);
  // l000: string[] = [];
  // m000: { [key: string]: any } = {};
  // c000: OtherModel = new OtherModel();
  // j000 : OtherModel[] = [];
  // e000: SomeEnum = SomeEnum.notSelected;
  fileName: string = "";

  docId: string = "";

  toDataString(): string {
    return btoa(
      Array.from(
        new TextEncoder().encode(
          new URLSearchParams({
            // s000: this.s000,
            // i000: this.i000.toString(),
            // b000: this.b000.toString(),
            // r000: this.r000.toString(),
            // t000: this.t000.getTime().toString(),
            // l000: JSON.stringify(this.l000),
            // m000: JSON.stringify(this.m000),
            // c000: this.c000.toDataString(),
            // j000: JSON.stringify(this.j000.map((model: OtherModel) => model.toDataString())),
            // e000: this.e000,
            fileName: this.fileName,
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

    // object.s000 = queryParams["s000"] || "";
    // object.i000 = parseInt(queryParams["i000"] || "0", 10);
    // object.b000 = queryParams["b000"] === "true";
    // object.r000 = parseFloat(queryParams["r000"] || "0");
    // object.t000 = new Date(parseInt(queryParams["t000"] || "0", 10));
    // object.l000 = JSON.parse(queryParams["l000"] || "[]");
    // object.m000 = JSON.parse(queryParams["m000"] || "{}");
    // object.c000 = OtherModel.fromDataString(queryParams["c000"] || new OtherModel().toDataString());
    // object.j000 = (JSON.parse(queryParams["j000"] || "[]") || []).map((item: string) => OtherModel.fromDataString(item));
    // object.e000 = SomeEnumHelper.fromString(queryParams["e000"] || SomeEnum.notSelected);
    object.fileName = queryParams["fileName"] || "";
    object.docId = queryParams["docId"] || "";

    return object;
  }

  toMap(): object {
    return {
      // s000: this.s000,
      // i000: this.i000,
      // b000: this.b000 ? 1 : 0,
      // r000: this.r000,
      // t000: this.t000.getTime(),
      // l000: JSON.stringify(this.l000),
      // m000: JSON.stringify(this.m000),
      // c000: this.c000.toDataString(),
      // j000: JSON.stringify(this.j000.map((model: OtherModel) => model.toDataString())),
      // j001: JSON.stringify(this.j001.map((model: OtherModel) => model.toDataString())),
      // e000: this.e000,
      fileName: this.fileName,
      docId: this.docId,
    };
  }

  static fromMap(queryParams: any): New {
    const object = new New();

    // object.s000 = queryParams.s000 || '';
    // object.i000 = Number(queryParams.i000 || 0);
    // object.b000 = queryParams.b000 === 1 || queryParams.b000 === true;
    // object.r000 = queryParams.r000 || 0.0;
    // object.t000 = new Date(queryParams.t000 || 0);
    // object.l000 = JSON.parse(queryParams.l000 || '[]');
    // object.m000 = JSON.parse(queryParams.m000 || '{}');
    // object.c000 = OtherModel.fromDataString(queryParams.c000 || new OtherModel().toDataString());
    // object.j000 = (JSON.parse(queryParams.j000 || '[]') || []).map((item: string) => OtherModel.fromDataString(item));
    // object.e000 = SomeEnumHelper.fromString(queryParams.e000 || SomeEnum.notSelected);
    object.fileName = queryParams.fileName || "";
    object.docId = queryParams.docId;

    return object;
  }
}

export class NewPocketBaseCollection {
  static _ready = false;

  static async getDb() {
    if (NewPocketBaseCollection._ready) return;
    dotenv.config();

    // URL 끝에 있을 수 있는 슬래시를 제거하여 주소를 정규화합니다.
    pb.baseUrl = (process.env.POCKET_BASE_URL || "").replace(/\/$/, "");

    console.log("Connecting to PocketBase at (normalized):", pb.baseUrl);
    // 어드민 로그인 (아이디와 비밀번호 설정 필요)
    console.log(
      "Trying to auth as ADMIN with email:",
      process.env.POCKET_BASE_ADMIN_EMAIL
    );
    await pb.admins.authWithPassword(
      process.env.POCKET_BASE_ADMIN_EMAIL,
      process.env.POCKET_BASE_ADMIN_PASSWORD
    );
    NewPocketBaseCollection._ready = true;
  }

  static async createTable() {
    await NewPocketBaseCollection.getDb();
    const collectionData = {
      name: "New",
      type: "base",
      fields: [
        { name: "docId", type: "text", required: true, unique: true },
        // {name: 's000', type: 'text', required: false},
        // {name: 'i000', type: 'number', required: false},
        // {name: 'b000', type: 'bool', required: false},
        // {name: 'r000', type: 'number', required: false},
        // {name: 't000', type: 'number', required: false},
        // {name: 'l000', type: 'text', required: false},
        // {name: 'm000', type: 'text', required: false},
        // {name: 'c000', type: 'text', required: false},
        // {name: 'j000', type: 'text', required: false},
        // {name: 'e000', type: 'text', required: false},
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
      // 컬렉션 생성 요청
      const collection = await pb.collections.create(collectionData);
      console.log("컬렉션 생성 완료:", collection);
    } catch (error) {
      console.error("컬렉션 생성 실패:", error);
    }
  }

  static async insert(object: New): Promise<string> {
    await NewPocketBaseCollection.getDb();

    const recordData = {
      docId: object.docId,
      // s000: object.s000,
      // i000: object.i000,
      // b000: object.b000 ? 1 : 0,
      // r000: object.r000,
      // t000: object.t000.getTime(),
      // l000: JSON.stringify(object.l000),
      // m000: JSON.stringify(object.m000),
      // c000: object.c000.toDataString(),
      // j000: JSON.stringify(object.j000.map((model: OtherModel) => model.toDataString())),
      // e000: object.e000,
      fileName: object.fileName,
    };

    // 레코드 삽입 요청
    const record = await pb.collection("New").create(recordData);
    console.log("레코드 삽입 완료:", record);

    return record.id;
  }

  static async upsert(object: New): Promise<string | null> {
    await NewPocketBaseCollection.getDb();

    const rawObj = await this.getRow(object.docId);

    if (rawObj == null) {
      return await this.insert(object);
    } else {
      const updatedData = {
        docId: object.docId,
        // s000: object.s000,
        // i000: object.i000,
        // b000: object.b000 ? 1 : 0,
        // r000: object.r000,
        // t000: object.t000.getTime(),
        // l000: JSON.stringify(object.l000),
        // m000: JSON.stringify(object.m000),
        // c000: object.c000.toDataString(),
        // j000: JSON.stringify(object.j000.map((model: OtherModel) => model.toDataString())),
        // e000: object.e000,
        fileName: object.fileName,
      };

      try {
        const updatedRecord = await pb
          .collection("New")
          .update(rawObj.id, updatedData);
        return updatedRecord.id;
      } catch (e) {
        console.log("failed to upsert", e);
        return null;
      }
    }
  }

  static async delete(docId: string) {
    await NewPocketBaseCollection.getDb();

    const rawObj = await this.getRow(docId);

    if (rawObj != null) {
      await pb.collection("New").delete(rawObj.id);
    } else {
      console.log("failed to delete because object is not found");
    }
  }

  static async get(docId: string): Promise<New | null> {
    await NewPocketBaseCollection.getDb();

    try {
      const xs = await pb
        .collection("New")
        .getFirstListItem(`docId="${docId}"`);

      return New.fromMap(xs);
    } catch (e) {
      // console.log(e);
      return null;
    }
  }

  static async getRow(docId: string): Promise<any> {
    await NewPocketBaseCollection.getDb();

    try {
      return await pb.collection("New").getFirstListItem(`docId="${docId}"`);
    } catch (e) {
      // console.log(e);
      return null;
    }
  }

  static async getAll(): Promise<New[]> {
    await NewPocketBaseCollection.getDb();

    try {
      let page = 1;
      const perPage = 100; // 한 번에 가져올 레코드 수
      let allRecords: any[] = [];
      let hasMore = true;

      while (hasMore) {
        // 각 페이지별 레코드 리스트 가져오기
        const resultList = await pb
          .collection("New")
          .getList({ page: page, perPage: perPage });
        // 레코드를 allRecords 배열에 추가
        allRecords = allRecords.concat(resultList.items);

        // 더 이상 레코드가 없으면 종료
        if (resultList.items.length < perPage) {
          hasMore = false;
        }

        // 다음 페이지로 이동
        page += 1;
      }

      const result: New[] = [];

      for (let i = 0; i < allRecords.length; i++) {
        result.push(New.fromMap(allRecords[i]));
      }

      return result;
    } catch (e) {
      console.log(e);
      return [];
    }
  }

  static async getByI000(value: number): Promise<New | null> {
    await NewPocketBaseCollection.getDb();

    try {
      const xs = await pb.collection("New").getFirstListItem(`i000=${value}`);

      return New.fromMap(xs);
    } catch (e) {
      return null;
    }
  }

  static async deleteAll() {
    await NewPocketBaseCollection.getDb();

    let page = 1;
    const perPage = 100; // 한 번에 가져올 레코드 수
    let allRecords: any[] = [];
    let hasMore = true;

    while (hasMore) {
      // 각 페이지별 레코드 리스트 가져오기
      const resultList = await pb
        .collection("New")
        .getList({ page: page, perPage: perPage });
      // 레코드를 allRecords 배열에 추가
      allRecords = allRecords.concat(resultList.items);

      // 더 이상 레코드가 없으면 종료
      if (resultList.items.length < perPage) {
        hasMore = false;
      }

      // 다음 페이지로 이동
      page += 1;
    }

    for (let i = 0; i < allRecords.length; i++) {
      await pb.collection("New").delete(allRecords[i].id);
    }

    console.log("All records are deleted");
  }

  static async resetTable() {
    await NewPocketBaseCollection.getDb();

    // 모든 컬렉션 목록 가져오기
    const collections: any[] = await pb.collections.getFullList(); // 컬렉션 목록의 타입을 any로 설정

    // 이름으로 컬렉션 찾기
    const collectionToDelete = collections.find(
      (collection: any) => collection.name === "New"
    );

    if (collectionToDelete) {
      // 컬렉션 삭제 요청
      await pb.collections.delete(collectionToDelete.id);
      console.log("컬렉션 삭제 완료:", "New");
    } else {
      console.log("컬렉션을 찾을 수 없습니다:", "New");
    }

    await NewPocketBaseCollection.createTable();
  }

  static async upsertFile(object: New, filePath: string) {
    // 먼저 해당하는 파일이 있는지 확인후, 있을경우 업데이트 없을경우 삽입

    await NewPocketBaseCollection.getDb();

    const obj = await this.getRow(object.docId);

    try {
      if (obj == null) {
        // 이런경우 아직 디비에도 없는 경우, 먼저 디비에 삽입
        let id = await this.insert(object);

        // FormData 객체 생성
        const formData = new FormData();
        formData.append("fileName", fs.createReadStream(filePath), {
          filename: path.basename(filePath),
        });
        // Axios를 사용하여 업로드 요청 수행
        const uploadResponse: AxiosResponse<any> = await axios.patch(
          `${pb.baseUrl}/api/collections/New/records/${id}`,
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
      } else {
        // 이경우는 디비에 있는 셈, 업로드만 하면 됨
        const formData = new FormData();
        formData.append("fileName", fs.createReadStream(filePath), {
          filename: path.basename(filePath),
        });
        // Axios를 사용하여 업로드 요청 수행
        const uploadResponse: AxiosResponse<any> = await axios.patch(
          `${pb.baseUrl}/api/collections/New/records/${obj.id}`,
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

  static async downloadFile(object: New, filePath: string): Promise<boolean> {
    // 먼저 해당하는 파일이 서버에 있는지 확인후, 있을경우 다운로드 없을경우 실패

    await NewPocketBaseCollection.getDb();

    const obj = await this.getRow(object.docId);

    if (obj == null) {
      console.log("object is not found");
      return false;
    } else {
      try {
        // Axios를 사용하여 다운로드 요청 수행
        const downloadResponse: AxiosResponse<any> = await axios.get(
          `${pb.baseUrl}/api/files/${obj.collectionId}/${obj.id}/${obj.fileName}`,
          {
            responseType: "stream",
            headers: {
              Authorization: `Bearer ${pb.authStore.token}`, // 인증 토큰 헤더에 추가
            },
          }
        );

        // 파일 스트림 생성
        const fileStream = fs.createWriteStream(filePath);
        // 다운로드한 파일 스트림을 파일로 저장
        downloadResponse.data.pipe(fileStream);

        return true;
      } catch (e) {
        console.log("failed to download", e);
        return false;
      }
    }
  }

  static async getDownloadUrl(object: New | null): Promise<string | null> {
    if (object == null) {
      console.log("object is null");
      return null;
    }

    await NewPocketBaseCollection.getDb();

    const obj = await this.getRow(object.docId);

    if (obj == null) {
      console.log("object is not found");
      return null;
    } else {
      // 해당 레코드에서 파일이름을 가져옴
      const fileName = obj.fileName;
      // 파일 다운로드 URL 생성
      const downloadUrl = `${pb.baseUrl}/api/files/${obj.collectionId}/${obj.id}/${fileName}`;
      console.log("다운로드 URL:", downloadUrl);

      return downloadUrl;
    }
  }
}
