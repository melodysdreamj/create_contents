import { LegoUtil } from "../../../util";
import sqlite3 from "sqlite3";
import path from "path";
export class Book {
  constructor() {
    this.docId = LegoUtil.randomString(10);
  }
  title: string = "";
  contents: string = "";
  docId: string = "";
  toDataString(): string {
    return btoa(
      Array.from(
        new TextEncoder().encode(
          new URLSearchParams({
            title: this.title,
            contents: this.contents,
            docId: this.docId,
          }).toString()
        )
      )
        .map((byte) => String.fromCharCode(byte))
        .join("")
    );
  }
  static fromDataString(dataString: string): Book {
    const queryParams = Object.fromEntries(
      new URLSearchParams(atob(dataString))
    );
    const object = new Book();
    object.title = queryParams["title"] || "";
    object.contents = queryParams["contents"] || "";
    object.docId = queryParams["docId"] || "";
    return object;
  }
  toMap(): object {
    return {
      title: this.title,
      contents: this.contents,
      docId: this.docId,
    };
  }
  static fromMap(queryParams: any): Book {
    const object = new Book();
    object.title = queryParams.title || "";
    object.contents = queryParams.contents || "";
    object.docId = queryParams.docId;
    return object;
  }
}
export class BookSqlite {
  private static dbInstance: sqlite3.Database;
  static async getDb(): Promise<sqlite3.Database> {
    if (!this.dbInstance) {
      const dbPath = path.join(__dirname, "Book.db");
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
    const sql = `CREATE INDEX ${indexName} ON Book (${columns.join(", ")})`;
    return new Promise((resolve, reject) => {
      BookSqlite.dbInstance.run(sql, (err) => {
        if (err) reject(err);
        else resolve();
      });
    });
  }
  private static async createTable() {
    const createTableSQL: string =
      `CREATE TABLE IF NOT EXISTS Book(` +
      `docId TEXT PRIMARY KEY` +
      `,title TEXT` +
      `,contents TEXT` +
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
      BookSqlite.dbInstance.run(query, params, (err) => {
        if (err) reject(err);
        else resolve();
      });
    });
  }
  static async getQuery<T>(query: string, params: any[]): Promise<T> {
    return new Promise((resolve, reject) => {
      BookSqlite.dbInstance.get(query, params, (err, row: T) => {
        if (err) reject(err);
        else resolve(row);
      });
    });
  }
  static async getAllQuery<T>(query: string, params: any[]): Promise<T[]> {
    return new Promise((resolve, reject) => {
      BookSqlite.dbInstance.all(query, params, (err, rows: T[]) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });
  }
  static async insert(object: Book) {
    await BookSqlite.getDb();
    const sql =
      `insert into Book (` +
      `docId` +
      `,title` +
      `,contents` +
      `) values (` +
      "?" + // docId
      ",?" + // title
      ",?" + // contents
      `)`;
    const values = [object.docId, object.title, object.contents];
    await this.runQuery(sql, values);
  }
  static async update(object: Book) {
    await BookSqlite.getDb();
    const sql =
      `update Book set ` +
      `docId = ?` +
      `,title = ?` +
      `,contents = ?` +
      ` where docId = ?`;
    const values = [object.docId, object.title, object.contents, object.docId];
    await this.runQuery(sql, values);
  }
  static async upsert(object: Book) {
    if ((await this.get(object.docId)) == null) {
      await this.insert(object);
    } else {
      await this.update(object);
    }
  }
  static async delete(docId: string) {
    await BookSqlite.getDb();
    const sql = `delete from Book where docId = ?`;
    await this.runQuery(sql, [docId]);
  }
  static async get(docId: string): Promise<Book | null> {
    await BookSqlite.getDb();
    const sql = `select * from Book where docId = ?`;
    const values = [docId];
    let xs = await this.getQuery(sql, values);
    if (xs === undefined) {
      return null;
    }
    return Book.fromMap(xs);
  }
  static async getAll() {
    await BookSqlite.getDb();
    const sql = `select * from Book`;
    let xs = await this.getAllQuery(sql, []);
    const result: Book[] = [];
    for (let i = 0; i < xs.length; i++) {
      result.push(Book.fromMap(xs[i]));
    }
    console.log("result: ", xs.length);
    return result;
  }
  static async getByI000(value: number) {
    await BookSqlite.getDb();
    const sql = `select * from Book where i000 = ?`;
    const values = [value];
    let xs = await this.getAllQuery(sql, values);
    const result: Book[] = [];
    for (let i = 0; i < xs.length; i++) {
      result.push(Book.fromMap(xs[i]));
    }
    console.log("result: ", xs.length);
    return result;
  }
  static async deleteAll() {
    await this.runQuery(`DELETE FROM Book`, []);
  }
  static async resetTable() {
    await BookSqlite.getDb();
    const sql = `delete from Book`;
    await this.runQuery(sql, []);
    await BookSqlite.getDb();
  }
}
