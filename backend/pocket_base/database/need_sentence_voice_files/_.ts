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

export class NeedSentenceVoiceFiles {
  constructor(docId: string) {
    this.docId = docId;
  }

  sentenceLanguage: string = "";
  originalInput: string = "";
  isGenerated: boolean = false;
  isDeployed: boolean = false;
  isStartGenerateAt: Date = new Date(0);
  updateAt: Date = new Date(0);

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
            sentenceLanguage: this.sentenceLanguage,
            originalInput: this.originalInput,
            isGenerated: this.isGenerated.toString(),
            isDeployed: this.isDeployed.toString(),
            isStartGenerateAt: this.isStartGenerateAt.getTime().toString(),
            updateAt: this.updateAt.getTime().toString(),
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

  static fromDataString(dataString: string): NeedSentenceVoiceFiles {
    const queryParams = Object.fromEntries(
      new URLSearchParams(atob(dataString))
    );

    const object = new NeedSentenceVoiceFiles(queryParams["docId"] || "");

    object.sentenceLanguage = queryParams["sentenceLanguage"] || "";
    object.originalInput = queryParams["originalInput"] || "";
    object.isGenerated = queryParams["isGenerated"] === "true";
    object.isDeployed = queryParams["isDeployed"] === "true";
    object.isStartGenerateAt = new Date(parseInt(queryParams["isStartGenerateAt"] || "0", 10));
    object.updateAt = new Date(parseInt(queryParams["updateAt"] || "0", 10));

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
      sentenceLanguage: this.sentenceLanguage,
      originalInput: this.originalInput,
      isGenerated: this.isGenerated ? 1 : 0,
      isDeployed: this.isDeployed ? 1 : 0,
      isStartGenerateAt: this.isStartGenerateAt.getTime(),
      updateAt: this.updateAt.getTime(),
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

  static fromMap(queryParams: any): NeedSentenceVoiceFiles {
    const object = new NeedSentenceVoiceFiles(queryParams.docId);

    object.sentenceLanguage = queryParams.sentenceLanguage || "";
    object.originalInput = queryParams.originalInput || "";
    object.isGenerated = queryParams.isGenerated === 1 || queryParams.isGenerated === true;
    object.isDeployed = queryParams.isDeployed === 1 || queryParams.isDeployed === true;
    object.isStartGenerateAt = new Date(queryParams.isStartGenerateAt || 0);
    object.updateAt = new Date(queryParams.updateAt || 0);
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

export class NeedSentenceVoiceFilesPocketBaseCollection {
  static _ready = false;

  static async getDb() {
    if (NeedSentenceVoiceFilesPocketBaseCollection._ready) return;
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
    NeedSentenceVoiceFilesPocketBaseCollection._ready = true;
  }

  static async createTable() {
    await NeedSentenceVoiceFilesPocketBaseCollection.getDb();
    const collectionData = {
      name: "NeedSentenceVoiceFiles",
      type: "base",
      fields: [
        { name: "docId", type: "text", required: true, unique: true },
        { name: "sentenceLanguage", type: "text", required: false },
        { name: "originalInput", type: "text", required: false },
        { name: "isGenerated", type: "bool", required: false },
        { name: "isDeployed", type: "bool", required: false },
        { name: "isStartGenerateAt", type: "number", required: false },
        { name: "updateAt", type: "number", required: false },
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

  static async insert(object: NeedSentenceVoiceFiles): Promise<string> {
    await NeedSentenceVoiceFilesPocketBaseCollection.getDb();

    const recordData = {
      docId: object.docId,
      sentenceLanguage: object.sentenceLanguage,
      originalInput: object.originalInput,
      isGenerated: object.isGenerated ? 1 : 0,
      isDeployed: object.isDeployed ? 1 : 0,
      isStartGenerateAt: object.isStartGenerateAt.getTime(),
      updateAt: object.updateAt.getTime(),
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
    const record = await pb.collection("NeedSentenceVoiceFiles").create(recordData);
    console.log("레코드 삽입 완료:", record);

    return record.id;
  }

  static async upsert(object: NeedSentenceVoiceFiles): Promise<string | null> {
    await NeedSentenceVoiceFilesPocketBaseCollection.getDb();

    const rawObj = await this.getRow(object.docId);

    if (rawObj == null) {
      return await this.insert(object);
    } else {
      const updatedData = {
        docId: object.docId,
        sentenceLanguage: object.sentenceLanguage,
        originalInput: object.originalInput,
        isGenerated: object.isGenerated ? 1 : 0,
        isDeployed: object.isDeployed ? 1 : 0,
        isStartGenerateAt: object.isStartGenerateAt.getTime(),
        updateAt: object.updateAt.getTime(),
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
          .collection("NeedSentenceVoiceFiles")
          .update(rawObj.id, updatedData);
        return updatedRecord.id;
      } catch (e) {
        console.log("failed to upsert", e);
        return null;
      }
    }
  }

  static async delete(docId: string) {
    await NeedSentenceVoiceFilesPocketBaseCollection.getDb();

    const rawObj = await this.getRow(docId);

    if (rawObj != null) {
      await pb.collection("NeedSentenceVoiceFiles").delete(rawObj.id);
    } else {
      console.log("failed to delete because object is not found");
    }
  }

  static async get(docId: string): Promise<NeedSentenceVoiceFiles | null> {
    await NeedSentenceVoiceFilesPocketBaseCollection.getDb();

    try {
      const xs = await pb
        .collection("NeedSentenceVoiceFiles")
        .getFirstListItem(`docId="${docId}"`);

      return NeedSentenceVoiceFiles.fromMap(xs);
    } catch (e) {
      // console.log(e);
      return null;
    }
  }

  static async getRow(docId: string): Promise<any> {
    await NeedSentenceVoiceFilesPocketBaseCollection.getDb();

    try {
      return await pb.collection("NeedSentenceVoiceFiles").getFirstListItem(`docId="${docId}"`);
    } catch (e) {
      // console.log(e);
      return null;
    }
  }

  static async getAll(): Promise<NeedSentenceVoiceFiles[]> {
    await NeedSentenceVoiceFilesPocketBaseCollection.getDb();

    try {
      let page = 1;
      const perPage = 100; // 한 번에 가져올 레코드 수
      let allRecords: any[] = [];
      let hasMore = true;

      while (hasMore) {
        // 각 페이지별 레코드 리스트 가져오기
        const resultList = await pb
          .collection("NeedSentenceVoiceFiles")
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

      const result: NeedSentenceVoiceFiles[] = [];

      for (let i = 0; i < allRecords.length; i++) {
        result.push(NeedSentenceVoiceFiles.fromMap(allRecords[i]));
      }

      return result;
    } catch (e) {
      console.log(e);
      return [];
    }
  }

  static async getByI000(value: number): Promise<NeedSentenceVoiceFiles | null> {
    await NeedSentenceVoiceFilesPocketBaseCollection.getDb();

    try {
      const xs = await pb.collection("NeedSentenceVoiceFiles").getFirstListItem(`i000=${value}`);

      return NeedSentenceVoiceFiles.fromMap(xs);
    } catch (e) {
      return null;
    }
  }

  static async deleteAll() {
    await NeedSentenceVoiceFilesPocketBaseCollection.getDb();

    let page = 1;
    const perPage = 100; // 한 번에 가져올 레코드 수
    let allRecords: any[] = [];
    let hasMore = true;

    while (hasMore) {
      // 각 페이지별 레코드 리스트 가져오기
      const resultList = await pb
        .collection("NeedSentenceVoiceFiles")
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
      await pb.collection("NeedSentenceVoiceFiles").delete(allRecords[i].id);
    }

    console.log("All records are deleted");
  }

  static async resetTable() {
    await NeedSentenceVoiceFilesPocketBaseCollection.getDb();

    // 모든 컬렉션 목록 가져오기
    const collections: any[] = await pb.collections.getFullList(); // 컬렉션 목록의 타입을 any로 설정

    // 이름으로 컬렉션 찾기
    const collectionToDelete = collections.find(
      (collection: any) => collection.name === "NeedSentenceVoiceFiles"
    );

    if (collectionToDelete) {
      // 컬렉션 삭제 요청
      await pb.collections.delete(collectionToDelete.id);
      console.log("컬렉션 삭제 완료:", "NeedSentenceVoiceFiles");
    } else {
      console.log("컬렉션을 찾을 수 없습니다:", "NeedSentenceVoiceFiles");
    }

    await NeedSentenceVoiceFilesPocketBaseCollection.createTable();
  }

  static async upsertFile(object: NeedSentenceVoiceFiles, filePath: string) {
    // 먼저 해당하는 파일이 있는지 확인후, 있을경우 업데이트 없을경우 삽입

    await NeedSentenceVoiceFilesPocketBaseCollection.getDb();

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
          `${pb.baseUrl}/api/collections/NeedSentenceVoiceFiles/records/${id}`,
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
          `${pb.baseUrl}/api/collections/NeedSentenceVoiceFiles/records/${obj.id}`,
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

  static async downloadFile(object: NeedSentenceVoiceFiles, filePath: string): Promise<boolean> {
    await NeedSentenceVoiceFilesPocketBaseCollection.getDb();

    try {
      const record = await this.getRow(object.docId);

      if (record && record.fileName) {
        const fileUrl = pb.getFileUrl(record, record.fileName);
        console.log("다운로드 URL:", fileUrl);
        const response: AxiosResponse<any> = await axios({
          method: "get",
          url: fileUrl,
          responseType: "arraybuffer", // 스트림 대신 arraybuffer를 사용합니다.
        });

        // 파일 저장 경로를 확인하고 필요한 경우 디렉토리를 생성합니다.
        const dir = path.dirname(filePath);
        if (!fs.existsSync(dir)) {
          fs.mkdirSync(dir, { recursive: true });
        }

        // 파일 데이터를 저장합니다.
        fs.writeFileSync(filePath, response.data);

        console.log("파일 다운로드 및 저장 완료:", filePath);
        return true;
      } else {
        console.log("다운로드할 파일이 없습니다.");
        return false;
      }
    } catch (error) {
      console.error("파일 다운로드 실패:", error);
      return false;
    }
  }

  static async getDownloadUrl(object: NeedSentenceVoiceFiles | null): Promise<string | null> {
    if (object == null) {
      console.log("object is null");
      return null;
    }

    await NeedSentenceVoiceFilesPocketBaseCollection.getDb();

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
