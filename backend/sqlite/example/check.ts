import { LegoUtil } from "../../../util";
import sqlite3 from "sqlite3";
import path from "path";
import { TestEnumTest, TestEnumTestHelper } from "./test_enum";
import { Sub } from "./sub";
export class CheckSqlite {
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
  static fromDataString(dataString: string): CheckSqlite {
    const queryParams = Object.fromEntries(
      new URLSearchParams(atob(dataString))
    );
    const object = new CheckSqlite();
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
  static fromMap(queryParams: any): CheckSqlite {
    const object = new CheckSqlite();
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
export class CheckSqliteSqlite {
  private static dbInstance: sqlite3.Database;
  static async getDb(): Promise<sqlite3.Database> {
    if (!this.dbInstance) {
      const dbPath = path.join(__dirname, "CheckSqlite.db");
      this.dbInstance = await new Promise<sqlite3.Database>(
        (resolve, reject) => {
          const db = new sqlite3.Database(dbPath, (err) => {
            if (err) {
              reject(err);
            } else {
              resolve(db);
            }
          });
        }
      );
      await this.createTable();
    }
    return this.dbInstance;
  }
  static createIndex(columns: string[]): Promise<void> {
    if (columns.length == 0) return Promise.resolve();
    let indexName = `idx_${columns.join("flux_dev")}`;
    indexName = indexName.replace(/\(.*?\)/g, ""); // (~) 가 이름에 있으면 지움 주로 문자열등에서 유용하게 사용
    const sql = `CREATE INDEX ${indexName} ON CheckSqlite (${columns.join(
      ", "
    )})`;
    return new Promise((resolve, reject) => {
      CheckSqliteSqlite.dbInstance.run(sql, (err) => {
        if (err) reject(err);
        else resolve();
      });
    });
  }
  private static async createTable() {
    const createTableSQL: string =
      `CREATE TABLE IF NOT EXISTS CheckSqlite(` +
      `docId TEXT PRIMARY KEY` +
      `,i000 INTEGER` +
      `,b000 INTEGER CHECK(b000 IN (0, 1))` +
      `,r000 REAL` +
      `,t000 INTEGER` +
      `,l000 TEXT` +
      `,m000 TEXT` +
      `,c000 TEXT` +
      `,j000 TEXT` +
      `,e000 TEXT` +
      `)`;
    await new Promise<void>((resolve, reject) => {
      this.dbInstance.run(createTableSQL, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }
  static async runQuery(query: string, params: any[]): Promise<void> {
    return new Promise((resolve, reject) => {
      CheckSqliteSqlite.dbInstance.run(query, params, (err) => {
        if (err) reject(err);
        else resolve();
      });
    });
  }
  static async getQuery<T>(query: string, params: any[]): Promise<T> {
    return new Promise((resolve, reject) => {
      CheckSqliteSqlite.dbInstance.get(query, params, (err, row: T) => {
        if (err) reject(err);
        else resolve(row);
      });
    });
  }
  static async getAllQuery<T>(query: string, params: any[]): Promise<T[]> {
    return new Promise((resolve, reject) => {
      CheckSqliteSqlite.dbInstance.all(query, params, (err, rows: T[]) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });
  }
  static async insert(object: CheckSqlite) {
    await CheckSqliteSqlite.getDb();
    const sql =
      `insert into CheckSqlite (` +
      `docId` +
      `,i000` +
      `,b000` +
      `,r000` +
      `,t000` +
      `,l000` +
      `,m000` +
      `,c000` +
      `,j000` +
      `,e000` +
      `) values (` +
      "?" + // docId
      ",?" + // i000
      ",?" + // b000
      ",?" + // r000
      ",?" + // t000
      ",?" + // l000
      ",?" + // m000
      ",?" + // c000
      ",?" + // j000
      ",?" + // e000
      `)`;
    const values = [
      object.docId,
      object.i000,
      object.b000 ? 1 : 0,
      object.r000,
      object.t000.getTime(),
      JSON.stringify(object.l000),
      JSON.stringify(object.m000),
      object.c000.toDataString(),
      JSON.stringify(object.j000.map((model: Sub) => model.toDataString())),
      object.e000,
    ];
    await this.runQuery(sql, values);
  }
  static async update(object: CheckSqlite) {
    await CheckSqliteSqlite.getDb();
    const sql =
      `update CheckSqlite set ` +
      `docId = ?` +
      `,i000 = ?` +
      `,b000 = ?` +
      `,r000 = ?` +
      `,t000 = ?` +
      `,l000 = ?` +
      `,m000 = ?` +
      `,c000 = ?` +
      `,j000 = ?` +
      `,e000 = ?` +
      ` where docId = ?`;
    const values = [
      object.docId,
      object.i000,
      object.b000 ? 1 : 0,
      object.r000,
      object.t000.getTime(),
      JSON.stringify(object.l000),
      JSON.stringify(object.m000),
      object.c000.toDataString(),
      JSON.stringify(object.j000.map((model: Sub) => model.toDataString())),
      object.e000,
      object.docId,
    ];
    await this.runQuery(sql, values);
  }
  static async upsert(object: CheckSqlite) {
    if ((await this.get(object.docId)) == null) {
      await this.insert(object);
    } else {
      await this.update(object);
    }
  }
  static async delete(docId: string) {
    await CheckSqliteSqlite.getDb();
    const sql = `delete from CheckSqlite where docId = ?`;
    await this.runQuery(sql, [docId]);
  }
  static async get(docId: string): Promise<CheckSqlite | null> {
    await CheckSqliteSqlite.getDb();
    const sql = `select * from CheckSqlite where docId = ?`;
    const values = [docId];
    let xs = await this.getQuery(sql, values);
    if (xs === undefined) {
      return null;
    }
    return CheckSqlite.fromMap(xs);
  }
  static async getAll() {
    await CheckSqliteSqlite.getDb();
    const sql = `select * from CheckSqlite`;
    let xs = await this.getAllQuery(sql, []);
    const result: CheckSqlite[] = [];
    for (let i = 0; i < xs.length; i++) {
      result.push(CheckSqlite.fromMap(xs[i]));
    }
    console.log("result: ", xs.length);
    return result;
  }
  static async getByI000(value: number) {
    await CheckSqliteSqlite.getDb();
    const sql = `select * from CheckSqlite where i000 = ?`;
    const values = [value];
    let xs = await this.getAllQuery(sql, values);
    const result: CheckSqlite[] = [];
    for (let i = 0; i < xs.length; i++) {
      result.push(CheckSqlite.fromMap(xs[i]));
    }
    console.log("result: ", xs.length);
    return result;
  }
  static async deleteAll() {
    await this.runQuery(`DELETE FROM CheckSqlite`, []);
  }
  static async resetTable() {
    await CheckSqliteSqlite.getDb();
    const sql = `delete from CheckSqlite`;
    await this.runQuery(sql, []);
    await CheckSqliteSqlite.getDb();
  }
}
