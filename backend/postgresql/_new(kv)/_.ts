import { LegoUtil } from "../../../util";
import postgres from "postgres";
import { Base64 } from "js-base64";
import pgPromise from "pg-promise"; // pg-promise 임포트

import path from "path";

// 무료 디비 서버
// https://admin.alwaysdata.com/database/?type=mysql -> hostAddress:mysql-[user id].alwaysdata.net -> 가서 phpmyadmin에 가서 데이터베이스 하나 만들고 그거 하단에 적어두기
//
const dbName = "databaseName";
const userName = "userName";
const password = "password"; // do not use #,*..etc special characters in password
const portNumber = 3306; // 5432
const hostAddress = "hostAddress";

const connectionDetails = {
  host: hostAddress,
  port: portNumber,
  database: dbName,
  user: userName,
  password: password,
  // ssl: { rejectUnauthorized: false } // 필요시 SSL 옵션 추가
};

export class New {
  constructor() {
    this.docId = "app";
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

  docId: string = "app";

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
    // object.b000 = parseInt(queryParams["b000"]) === 1;
    // object.r000 = parseFloat(queryParams["r000"] || "0");
    // object.t000 = new Date(parseInt(queryParams["t000"] || "0", 10));
    // object.l000 = JSON.parse(queryParams["l000"] || "[]");
    // object.m000 = JSON.parse(queryParams["m000"] || "{}");
    // object.c000 = OtherModel.fromDataString(queryParams["c000"] || new OtherModel().toDataString());
    // object.j000 = (JSON.parse(queryParams["j000"] || "[]") || []).map((item: string) => OtherModel.fromDataString(item));
    // object.e000 = SomeEnumHelper.fromString(queryParams["e000"] || SomeEnum.notSelected);
    object.docId = queryParams["docId"] || "app";

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
      // e000: this.e000,
      docId: this.docId,
    };
  }

  static fromMap(queryParams: any): New {
    const object = new New();

    // object.s000 = queryParams.s000 || '';
    // object.i000 = Number(queryParams.i000 || 0);
    // object.b000 = queryParams.b000 === 1;
    // object.r000 = queryParams.r000 || 0.0;
    // object.t000 = new Date(parseInt(queryParams.t000) || 0);
    // object.l000 = JSON.parse(queryParams.l000 || '[]');
    // object.m000 = JSON.parse(queryParams.m000 || '{}');
    // object.c000 = OtherModel.fromDataString(queryParams.c000 || new OtherModel().toDataString());
    // object.j000 = (JSON.parse(queryParams.j000 || '[]') || []).map((item: string) => OtherModel.fromDataString(item));
    // object.e000 = SomeEnumHelper.fromString(queryParams.e000 || SomeEnum.notSelected);
    object.docId = queryParams.docId || "app";

    return object;
  }
}

export class NewPostgresql {
  // pg-promise 초기화
  private static pgp = pgPromise({
    capSQL: true, // 선택 사항
  });

  // 데이터베이스 연결 객체
  private static db = NewPostgresql.pgp(connectionDetails);

  // createIndex: public. 제거. 기존 방식 유지하되 DDL 실행 시도.
  static async createIndex(columns: string[]) {
    const sql = this._createIndexSqlString(columns); // 내부 함수에서 public. 제거 필요
    try {
      // db.none으로 DDL 실행 시도
      await NewPostgresql.db.none(sql);
    } catch (error) {
      throw error;
    }
  }

  static _createIndexSqlString(columns: string[]): string {
    let indexName = `idx_new_${columns.join("_")}`;
    indexName = indexName.replace(/\(.*?\)/g, "");
    const tableName = `"New"`; // 대소문자 구분 위해 따옴표 사용 가정
    const columnString = columns.map((c) => `"${c}"`).join(", ");
    return `CREATE INDEX IF NOT EXISTS "${indexName}" ON ${tableName} (${columnString});`;
  }
  static async createTable() {
    const createTableSQL: string =
      `CREATE TABLE IF NOT EXISTS "New" (` +
      `"docId" TEXT PRIMARY KEY DEFAULT 'app'` +
      // `,"s000" TEXT` +
      // `,"i000" BIGINT` +
      // `,"b000" INTEGER CHECK("b000" IN (0, 1))` +
      // `,"r000" DOUBLE PRECISION` +
      // `,"t000" BIGINT` +
      // `,"l000" TEXT` +
      // `,"m000" TEXT` +
      // `,"c000" TEXT` +
      // `,"j000" TEXT` +
      // `,"e000" TEXT` +
      `)`;

    await NewPostgresql.db.none(createTableSQL);
  }

  static async insert(object: New) {
    const sql =
      `insert into "New" (` +
      `"docId"` +
      // `,"s000"` +
      // `,"i000"` +
      // `,"b000"` +
      // `,"r000"` +
      // `,"t000"` +
      // `,"l000"` +
      // `,"m000"` +
      // `,"c000"` +
      // `,"j000"` +
      // `,"e000"` +
      `) values (` +
      "${docId}" +
      // ',${s000}' +
      // ',${i000}' +
      // ',${b000}' +
      // ',${r000}' +
      // ',${t000}' +
      // ',${l000}' +
      // ',${m000}' +
      // ',${c000}' +
      // ',${j000}' +
      // ',${e000}' +
      `)`;

    await NewPostgresql.db.none(sql, object.toMap());
  }

  // Update 함수 전체 필드 포함
  static async update(object: New) {
    const sql =
      `update "New" set ` +
      '"docId" = ${docId}' +
      // ',"s000" = ${s000}' +
      // ',"i000" = ${i000}' +
      // ',"b000" = ${b000}' +
      // ',"r000" = ${r000}' +
      // ',"t000" = ${t000}' +
      // ',"l000" = ${l000}' +
      // ',"m000" = ${m000}' +
      // ',"c000" = ${c000}' +
      // ',"j000" = ${j000}' +
      // ',"e000" = ${e000}' +
      ' where "docId" = ${docId}';

    await NewPostgresql.db.none(sql, object.toMap());
  }

  static async upsert(object: New) {
    if ((await this.get()) == null) {
      await this.insert(object);
    } else {
      await this.update(object);
    }
  }

  static async get(): Promise<New | null> {
    const sql = 'SELECT * FROM "New" WHERE "docId" = ${docId}';
    const params = { docId: "app" };
    const result = await NewPostgresql.db.oneOrNone(sql, params);

    if (result == null) {
      return null;
    }

    return NewPostgresql.fromMap(result);
  }

  static async getAll(): Promise<New[]> {
    const sql = 'SELECT * FROM "New"';
    // console.log("Executing SQL for getAll:", sql);
    const results = await NewPostgresql.db.any(sql);
    // console.log(`getAll completed. Fetched ${results.length} rows.`);
    return results.map((row) => NewPostgresql.fromMap(row));
  }

  // static async getByI000(value: number): Promise<New | null> {
  //   const sql = 'SELECT * FROM "New" WHERE "i000" = ${value}'; // 컬럼명, 테이블명 확인
  //   const params = { value };
  //   const result = await NewPostgresql.db.oneOrNone(sql, params);
  //   return result ? NewPostgresql.fromMap(result) : null;
  // }

  static async resetTable() {
    // 테이블명 대소문자 주의
    const sql = 'DROP TABLE IF EXISTS "New"'; // public. 제거
    // console.log("Executing SQL for resetTable:", sql);
    await NewPostgresql.db.none(sql);
    // console.log("Table New dropped (if existed).");

    new NewPostgresql();
  }

  static fromMap(queryParams: any): New {
    const object = new New();

    if (queryParams.docId != null) object.docId = queryParams.docId;

    // object.s000 = queryParams["s000"] || ""
    // object.i000 = Number(queryParams.i000 || 0);
    // object.b000 = queryParams.b000 === 1;
    // object.r000 = queryParams.r000 || 0.0;
    // object.t000 = new Date(parseInt(queryParams.t000) || 0);
    // object.l000 = JSON.parse(queryParams.l000 ?? '[]');
    // object.m000 = JSON.parse(queryParams.m000 ?? '{}');
    // object.c000 = OtherModel.fromDataString(queryParams.c000 || new OtherModel().toDataString());
    // object.j000 = (JSON.parse(queryParams.j000 ?? '[]') || []).map((item: string) => OtherModel.fromDataString(item));
    // object.e000 = SomeEnumHelper.fromString(queryParams.e000 ?? SomeEnum.notSelected);

    object.docId = queryParams.docId;

    return object;
  }

  // 어플리케이션 종료 시 커넥션 풀 닫기 함수 추가 권장
  static async closeConnection() {
    console.log("Closing database connection pool...");
    await NewPostgresql.pgp.end(); // pg-promise 연결 풀 종료
    console.log("Database connection pool closed.");
  }
}
