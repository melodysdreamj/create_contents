import { LegoUtil } from "../../../util";
import postgres from "postgres";
import { Base64 } from "js-base64";
import pgPromise from "pg-promise"; // pg-promise 임포트
import path from "path";
import { TestEnumTest, TestEnumTestHelper } from "./test_enum";
import { Sub } from "./sub";
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
};
export class Check {
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
  static fromDataString(dataString: string): Check {
    const queryParams = Object.fromEntries(
      new URLSearchParams(atob(dataString))
    );
    const object = new Check();
    object.s000 = queryParams["s000"] || "";
    object.i000 = parseInt(queryParams["i000"] || "0", 10);
    object.b000 = parseInt(queryParams["b000"]) === 1;
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
  static fromMap(queryParams: any): Check {
    const object = new Check();
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
export class CheckPostgresql {
  private static pgp = pgPromise({
    capSQL: true, // 선택 사항
  });
  private static db = CheckPostgresql.pgp(connectionDetails);
  static async createIndex(columns: string[]) {
    const sql = this._createIndexSqlString(columns); // 내부 함수에서 public. 제거 필요
    try {
      await CheckPostgresql.db.none(sql);
    } catch (error) {
      throw error;
    }
  }
  static _createIndexSqlString(columns: string[]): string {
    let indexName = `idx_new_${columns.join("_")}`;
    indexName = indexName.replace(/\(.*?\)/g, "");
    const tableName = `"CheckModel"`; // 대소문자 구분 위해 따옴표 사용 가정
    const columnString = columns.map((c) => `"${c}"`).join(", ");
    return `CREATE INDEX IF NOT EXISTS "${indexName}" ON ${tableName} (${columnString});`;
  }
  static async createTable() {
    const createTableSQL: string =
      `CREATE TABLE IF NOT EXISTS "Check" (` +
      `"docId" TEXT PRIMARY KEY` +
      `,"s000" TEXT` +
      `,"i000" BIGINT` +
      `,"b000" INTEGER CHECK(b000 IN (0, 1))` +
      `,"r000" DOUBLE PRECISION` +
      `,"t000" BIGINT` +
      `,"l000" TEXT` +
      `,"m000" TEXT` +
      `,"c000" TEXT` +
      `,"j000" TEXT` +
      `,"e000" TEXT` +
      `)`;
    await CheckPostgresql.db.none(createTableSQL);
  }
  static async insert(object: Check) {
    const sql =
      `insert into "Check" (` +
      `"docId"` +
      `,"s000"` +
      `,"i000"` +
      `,"b000"` +
      `,"r000"` +
      `,"t000"` +
      `,"l000"` +
      `,"m000"` +
      `,"c000"` +
      `,"j000"` +
      `,"e000"` +
      `) values (` +
      "${docId}" +
      ",${s000}" +
      ",${i000}" +
      ",${b000}" +
      ",${r000}" +
      ",${t000}" +
      ",${l000}" +
      ",${m000}" +
      ",${c000}" +
      ",${j000}" +
      ",${e000}" +
      `)`;
    await CheckPostgresql.db.none(sql, object.toMap());
  }
  static async update(object: Check) {
    const sql =
      `update "Check" set ` +
      '"docId" = ${docId}' +
      ',"s000" = ${s000}' +
      ',"i000" = ${i000}' +
      ',"b000" = ${b000}' +
      ',"r000" = ${r000}' +
      ',"t000" = ${t000}' +
      ',"l000" = ${l000}' +
      ',"m000" = ${m000}' +
      ',"c000" = ${c000}' +
      ',"j000" = ${j000}' +
      ',"e000" = ${e000}' +
      ' where "docId" = ${docId}';
    await CheckPostgresql.db.none(sql, object.toMap());
  }
  static async upsert(object: Check) {
    if ((await this.get(object.docId)) == null) {
      await this.insert(object);
    } else {
      await this.update(object);
    }
  }
  static async delete(docId: string) {
    const sql = 'DELETE FROM "Check" WHERE "docId" = ${docId}';
    const params = { docId };
    const result = await CheckPostgresql.db.result(sql, params);
  }
  static async get(docId: string): Promise<Check | null> {
    const sql = 'SELECT * FROM "Check" WHERE "docId" = ${docId}';
    const params = { docId };
    const result = await CheckPostgresql.db.oneOrNone(sql, params);
    if (result == null) {
      return null;
    }
    return CheckPostgresql.fromMap(result);
  }
  static async getAll(): Promise<Check[]> {
    const sql = 'SELECT * FROM "Check"';
    const results = await CheckPostgresql.db.any(sql);
    return results.map((row) => CheckPostgresql.fromMap(row));
  }
  static async resetTable() {
    const sql = 'DROP TABLE IF EXISTS "Check"'; // public. 제거
    await CheckPostgresql.db.none(sql);
    new CheckPostgresql();
  }
  static fromMap(queryParams: any): Check {
    const object = new Check();
    if (queryParams.docId != null) object.docId = queryParams.docId;
    object.s000 = queryParams["s000"] || "";
    object.i000 = Number(queryParams.i000 || 0);
    object.b000 = queryParams.b000 === 1;
    object.r000 = queryParams.r000 || 0.0;
    object.t000 = new Date(queryParams.t000 || 0);
    object.l000 = JSON.parse(queryParams.l000 ?? "[]");
    object.m000 = JSON.parse(queryParams.m000 ?? "{}");
    object.c000 = Sub.fromDataString(
      queryParams.c000 || new Sub().toDataString()
    );
    object.j000 = (JSON.parse(queryParams.j000 ?? "[]") || []).map(
      (item: string) => Sub.fromDataString(item)
    );
    object.e000 = TestEnumTestHelper.fromString(
      queryParams.e000 ?? TestEnumTest.notSelected
    );
    object.docId = queryParams.docId;
    return object;
  }
  static async closeConnection() {
    console.log("Closing database connection pool...");
    await CheckPostgresql.pgp.end(); // pg-promise 연결 풀 종료
    console.log("Database connection pool closed.");
  }
}
