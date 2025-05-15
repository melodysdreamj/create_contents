import { LegoUtil } from "../../../util";
import sqlite3 from "sqlite3";
import path from "path";
import { Talk } from "./talk";
export class ShareGptData {
  constructor() {
    this.docId = LegoUtil.randomString(10);
  }
  talks: Talk[] = [];
  docId: string = "";
  toDataString(): string {
    return btoa(
      Array.from(
        new TextEncoder().encode(
          new URLSearchParams({
            talks: JSON.stringify(
              this.talks.map((model: Talk) => model.toDataString())
            ),
            docId: this.docId,
          }).toString()
        )
      )
        .map((byte) => String.fromCharCode(byte))
        .join("")
    );
  }
  static fromDataString(dataString: string): ShareGptData {
    const queryParams = Object.fromEntries(
      new URLSearchParams(atob(dataString))
    );
    const object = new ShareGptData();
    object.talks = (JSON.parse(queryParams["talks"] || "[]") || []).map(
      (item: string) => Talk.fromDataString(item)
    );
    object.docId = queryParams["docId"] || "";
    return object;
  }
  toMap(): object {
    return {
      talks: JSON.stringify(
        this.talks.map((model: Talk) => model.toDataString())
      ),
      docId: this.docId,
    };
  }
  static fromMap(queryParams: any): ShareGptData {
    const object = new ShareGptData();
    object.talks = (JSON.parse(queryParams.talks || "[]") || []).map(
      (item: string) => Talk.fromDataString(item)
    );
    object.docId = queryParams.docId;
    return object;
  }
}
export class ShareGptDataSqlite {
  private static dbInstance: sqlite3.Database;
  static async getDb(): Promise<sqlite3.Database> {
    if (!this.dbInstance) {
      const dbPath = path.join(__dirname, "ShareGptData.db");
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
    const sql = `CREATE INDEX ${indexName} ON ShareGptData (${columns.join(
      ", "
    )})`;
    return new Promise((resolve, reject) => {
      ShareGptDataSqlite.dbInstance.run(sql, (err) => {
        if (err) reject(err);
        else resolve();
      });
    });
  }
  private static async createTable() {
    const createTableSQL: string =
      `CREATE TABLE IF NOT EXISTS ShareGptData(` +
      `docId TEXT PRIMARY KEY` +
      `,talks TEXT` +
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
      ShareGptDataSqlite.dbInstance.run(query, params, (err) => {
        if (err) reject(err);
        else resolve();
      });
    });
  }
  static async getQuery<T>(query: string, params: any[]): Promise<T> {
    return new Promise((resolve, reject) => {
      ShareGptDataSqlite.dbInstance.get(query, params, (err, row: T) => {
        if (err) reject(err);
        else resolve(row);
      });
    });
  }
  static async getAllQuery<T>(query: string, params: any[]): Promise<T[]> {
    return new Promise((resolve, reject) => {
      ShareGptDataSqlite.dbInstance.all(query, params, (err, rows: T[]) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });
  }
  static async insert(object: ShareGptData) {
    await ShareGptDataSqlite.getDb();
    const sql =
      `insert into ShareGptData (` +
      `docId` +
      `,talks` +
      `) values (` +
      "?" + // docId
      ",?" + // talks
      `)`;
    const values = [
      object.docId,
      JSON.stringify(object.talks.map((model: Talk) => model.toDataString())),
    ];
    await this.runQuery(sql, values);
  }
  static async update(object: ShareGptData) {
    await ShareGptDataSqlite.getDb();
    const sql =
      `update ShareGptData set ` +
      `docId = ?` +
      `,talks = ?` +
      ` where docId = ?`;
    const values = [
      object.docId,
      JSON.stringify(object.talks.map((model: Talk) => model.toDataString())),
      object.docId,
    ];
    await this.runQuery(sql, values);
  }
  static async upsert(object: ShareGptData) {
    if ((await this.get(object.docId)) == null) {
      await this.insert(object);
    } else {
      await this.update(object);
    }
  }
  static async delete(docId: string) {
    await ShareGptDataSqlite.getDb();
    const sql = `delete from ShareGptData where docId = ?`;
    await this.runQuery(sql, [docId]);
  }
  static async get(docId: string): Promise<ShareGptData | null> {
    await ShareGptDataSqlite.getDb();
    const sql = `select * from ShareGptData where docId = ?`;
    const values = [docId];
    let xs = await this.getQuery(sql, values);
    if (xs === undefined) {
      return null;
    }
    return ShareGptData.fromMap(xs);
  }
  static async getAll() {
    await ShareGptDataSqlite.getDb();
    const sql = `select * from ShareGptData`;
    let xs = await this.getAllQuery(sql, []);
    const result: ShareGptData[] = [];
    for (let i = 0; i < xs.length; i++) {
      result.push(ShareGptData.fromMap(xs[i]));
    }
    console.log("result: ", xs.length);
    return result;
  }
  static async getByI000(value: number) {
    await ShareGptDataSqlite.getDb();
    const sql = `select * from ShareGptData where i000 = ?`;
    const values = [value];
    let xs = await this.getAllQuery(sql, values);
    const result: ShareGptData[] = [];
    for (let i = 0; i < xs.length; i++) {
      result.push(ShareGptData.fromMap(xs[i]));
    }
    console.log("result: ", xs.length);
    return result;
  }
  static async deleteAll() {
    await this.runQuery(`DELETE FROM ShareGptData`, []);
  }
  static async resetTable() {
    await ShareGptDataSqlite.getDb();
    const sql = `delete from ShareGptData`;
    await this.runQuery(sql, []);
    await ShareGptDataSqlite.getDb();
  }
}
