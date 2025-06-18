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
    // object.m000 = JSON.parse(queryParams["m000"] || "{}");
    // object.c000 = OtherModel.fromDataString(queryParams["c000"] || new OtherModel().toDataString());
    // object.j000 = (JSON.parse(queryParams["j000"] || "[]") || []).map((item: string) => OtherModel.fromDataString(item));
    // object.e000 = SomeEnumHelper.fromString(queryParams["e000"] || SomeEnum.notSelected);
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
    object.docId = queryParams.docId;

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

  static async createIndex() {
    const sql1 = ""
    const sql2 = ""
    try {
      // db.none으로 DDL 실행 시도
      await NewPostgresql.db.none(sql1);
      await NewPostgresql.db.none(sql2);
    } catch (error) {
      throw error;
    }
  }

  
  static async createTable() {
    const createTableSQL: string =
      `CREATE TABLE IF NOT EXISTS "New" (` +
      `"docId" TEXT PRIMARY KEY` +
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
    const sql =
      `INSERT INTO "New" (` +
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
      `) VALUES (` +
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
      `) ON CONFLICT ("docId") DO UPDATE SET ` +
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
      ``;
    await NewPostgresql.db.none(sql, object.toMap());
  }

  static async upsertMany(objects: New[]) {
    if (!objects || objects.length === 0) {
      return;
    }

    // 삽입 또는 업데이트할 컬럼을 정의합니다. 주석을 해제하면 쿼리에 자동으로 포함됩니다.
    const columns = [
      "docId",
      // 's000',
      // 'i000',
      // 'b000',
      // 'r000',
      // 't000',
      // 'l000',
      // 'm000',
      // 'c000',
      // 'j000',
      // 'e000',
    ];

    // pg-promise의 ColumnSet을 사용하여 대량 삽입/업데이트를 위한 준비를 합니다.
    const cs = new NewPostgresql.pgp.helpers.ColumnSet(columns, {
      table: "New",
    });

    // ON CONFLICT...DO UPDATE SET... 부분을 미리 생성합니다.
    const updateQuery = cs.assignColumns({ from: "EXCLUDED" });

    // 대용량 데이터를 처리하기 위해 트랜잭션 내에서 데이터를 작은 묶음(chunk)으로 나눕니다.
    // 이는 SQL 쿼리 길이 제한 및 메모리 문제를 방지합니다.
    const chunkSize = 10000; // 한 번의 쿼리로 처리할 데이터 수

    await NewPostgresql.db.tx(async (t) => {
      const queries = [];
      for (let i = 0; i < objects.length; i += chunkSize) {
        const chunk = objects.slice(i, i + chunkSize);
        const data = chunk.map((obj) => obj.toMap());

        // 현재 chunk에 대한 대량 삽입 쿼리를 생성합니다.
        const insertQuery = NewPostgresql.pgp.helpers.insert(data, cs);

        // 최종 쿼리를 조합합니다.
        const sql = `${insertQuery} ON CONFLICT ("docId") DO UPDATE SET ${updateQuery}`;

        // 트랜잭션에 쿼리를 추가합니다.
        queries.push(t.none(sql));
      }
      // 모든 chunk에 대한 쿼리를 하나의 트랜잭션으로 실행합니다.
      return t.batch(queries);
    });
  }

  static async delete(docId: string) {
    const sql = 'DELETE FROM "New" WHERE "docId" = ${docId}';
    const params = { docId };
    const result = await NewPostgresql.db.result(sql, params);
  }

  static async get(docId: string): Promise<New | null> {
    const sql = 'SELECT * FROM "New" WHERE "docId" = ${docId}';
    const params = { docId };
    const result = await NewPostgresql.db.oneOrNone(sql, params);

    if (result == null) {
      return null;
    }

    return NewPostgresql.fromMap(result);
  }

  static async getAll(): Promise<New[]> {
    const allResults: New[] = [];
    const chunkSize = 100000; // 한 번에 가져올 데이터 묶음 크기
    let lastDocId: string | null = null;
    let keepFetching = true;

    while (keepFetching) {
      let sql: string;
      const params: any = { chunkSize };

      if (lastDocId === null) {
        // 첫 페이지 조회: 단순히 docId로 정렬하여 상위 N개를 가져옵니다.
        sql = 'SELECT * FROM "New" ORDER BY "docId" LIMIT ${chunkSize}';
      } else {
        // 다음 페이지 조회 (키셋 페이지네이션):
        // OFFSET 대신 마지막으로 가져온 docId보다 큰 다음 N개를 가져옵니다.
        // 이 방식은 인덱스를 효율적으로 사용하여 매우 빠릅니다.
        sql =
          'SELECT * FROM "New" WHERE "docId" > ${lastDocId} ORDER BY "docId" LIMIT ${chunkSize}';
        params.lastDocId = lastDocId;
      }

      try {
        const chunk = await NewPostgresql.db.any(sql, params);

        if (chunk.length > 0) {
          allResults.push(...chunk.map((row) => NewPostgresql.fromMap(row)));

          // 다음 조회를 위해 이번에 가져온 데이터의 마지막 docId를 기록합니다.
          lastDocId = chunk[chunk.length - 1].docId;
        }

        // 가져온 데이터가 요청한 묶음 크기보다 작으면, 더 이상 데이터가 없는 것이므로 루프를 중단합니다.
        if (chunk.length < chunkSize) {
          keepFetching = false;
        }
      } catch (error) {
        console.error(
          "Error fetching a chunk in getAll with keyset pagination:",
          error
        );
        throw new Error(`Error fetching data from New: ${error}`);
      }
    }

    return allResults;
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
