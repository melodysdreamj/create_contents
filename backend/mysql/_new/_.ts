import { LegoUtil } from "../../../util";
import mariadb, { Connection, createPool } from "mariadb";
import path from "path";

// 무료 디비 서버
// https://admin.alwaysdata.com/database/?type=mysql -> hostAddress:mysql-[user id].alwaysdata.net -> 가서 phpmyadmin에 가서 데이터베이스 하나 만들고 그거 하단에 적어두기
//
const dbName = "databaseName";
const userName = "userName";
const password = "password";
const portNumber = 3306; // 5432
const hostAddress = "hostAddress";

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
    // object.b000 = queryParams["b000"] === "true";
    // object.r000 = parseFloat(queryParams["r000"] || "0");
    // object.t000 = new Date(parseInt(queryParams["t000"] || "0", 10));
    // object.l000 = JSON.parse(queryParams["l000"] || "[]");
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
    // object.t000 = new Date(queryParams.t000 || 0);
    // object.l000 = JSON.parse(queryParams.l000 || '[]');
    // object.m000 = JSON.parse(queryParams.m000 || '{}');
    // object.c000 = OtherModel.fromDataString(queryParams.c000 || new OtherModel().toDataString());
    // object.j000 = (JSON.parse(queryParams.j000 || '[]') || []).map((item: string) => OtherModel.fromDataString(item));
    // object.e000 = SomeEnumHelper.fromString(queryParams.e000 || SomeEnum.notSelected);
    object.docId = queryParams.docId;

    return object;
  }
}

export class NewMySql {
  static pool = mariadb.createPool({
    host: hostAddress,
    user: userName,
    password: password,
    database: dbName,
    port: portNumber,
    // connectionLimit: 300,
    acquireTimeout: 20000000,
    leakDetectionTimeout: 20000,
  });

  async createIndex(name: string, columns: string[]) {
    if (columns.length == 0) return;

    let indexName = `idx_${name}`; //`idx_${columns.join("_")}`;
    indexName = indexName.replace(/\(.*?\)/g, ""); // (~) 가 이름에 있으면 지움 주로 문자열등에서 유용하게 사용

    const sql = `CREATE INDEX ${indexName} ON NewModel (${columns.join(", ")})`;

    try {
      const conn = await NewMySql.pool.getConnection();
      await conn.query(sql);
      console.log(`Index ${indexName} created successfully`);
    } catch (error) {
      console.error("Error creating index:", error);
      throw error;
    }
  }

  static async createTable() {
    const createTableSQL: string =
      `CREATE TABLE IF NOT EXISTS New(` +
      `docId VARCHAR(512) PRIMARY KEY` +
      // `,s000 LONGTEXT` +
      // `,i000 BIGINT` +
      // `,b000 INTEGER CHECK(b000 IN (0, 1))` +
      // `,r000 DOUBLE` +
      // `,t000 BIGINT` +
      // `,l000 LONGTEXT` +
      // `,m000 LONGTEXT` +
      // `,c000 LONGTEXT` +
      // `,j000 LONGTEXT` +
      // `,j020 LONGTEXT` +
      // `,e000 LONGTEXT` +
      `)  ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE utf8mb4_general_ci;`;

    const conn = await NewMySql.pool.getConnection();
    await conn.execute(createTableSQL);
    conn.release();
  }

  static async insert(object: New) {
    const sql =
      `insert into New (` +
      `docId` +
      // `,s000` +
      // `,i000` +
      // `,b000` +
      // `,r000` +
      // `,t000` +
      // `,l000` +
      // `,m000` +
      // `,c000` +
      // `,j000` +
      // `,e000` +
      `) values (` +
      "?" + // docId
      // ",?" + // s000
      // ",?" + // i000
      // ",?" + // b000
      // ",?" + // r000
      // ",?" + // t000
      // ",?" + // l000
      // ",?" + // m000
      // ",?" + // c000
      // ",?" + // j000
      // ",?" + // e000
      `)`;

    const values = [
      object.docId,
      // object.s000,
      // object.i000,
      // object.b000 ? 1 : 0,
      // object.r000,
      // object.t000.getTime(),
      // JSON.stringify(object.l000),
      // JSON.stringify(object.m000),
      // object.c000.toDataString(),
      // JSON.stringify(object.j000.map((model: OtherModel) => model.toDataString())),
      // object.e000,
    ];

    const conn = await NewMySql.pool.getConnection();
    await conn.query(sql, values);
    await conn.commit();
    await conn.release();
  }

  static async update(object: New) {
    const sql =
      `update New set ` +
      `docId = ?` +
      // `,s000 = ?` +
      // `,i000 = ?` +
      // `,b000 = ?` +
      // `,r000 = ?` +
      // `,t000 = ?` +
      // `,l000 = ?` +
      // `,m000 = ?` +
      // `,c000 = ?` +
      // `,j000 = ?` +
      // `,e000 = ?` +
      ` where docId = ?`;

    const values = [
      object.docId,
      // object.s000,
      // object.i000,
      // object.b000 ? 1 : 0,
      // object.r000,
      // object.t000.getTime(),
      // JSON.stringify(object.l000),
      // JSON.stringify(object.m000),
      // object.c000.toDataString(),
      // JSON.stringify(object.j000.map((model: OtherModel) => model.toDataString())),
      // object.e000,
      object.docId,
    ];
    const conn = await NewMySql.pool.getConnection();
    await conn.query(sql, values);
    await conn.commit();
    await conn.release();
  }

  static async insertBulk(objects: New[]) {
    const sql =
      `insert into New (` +
      `docId` +
      // `,s000` +
      // `,i000` +
      // `,b000` +
      // `,r000` +
      // `,t000` +
      // `,l000` +
      // `,m000` +
      // `,c000` +
      // `,j000` +
      // `,e000` +
      `) values (` +
      "?" + // docId
      // ",?" + // s000
      // ",?" + // i000
      // ",?" + // b000
      // ",?" + // r000
      // ",?" + // t000
      // ",?" + // l000
      // ",?" + // m000
      // ",?" + // c000
      // ",?" + // j000
      // ",?" + // e000
      `)`;

    const conn = await NewMySql.pool.getConnection();

    try {
      await conn.beginTransaction();

      for (const object of objects) {
        const values = [
          object.docId,
          // object.s000,
          // object.i000,
          // object.b000 ? 1 : 0,
          // object.r000,
          // object.t000.getTime(),
          // JSON.stringify(object.l000),
          // JSON.stringify(object.m000),
          // object.c000.toDataString(),
          // JSON.stringify(object.j000.map((model: OtherModel) => model.toDataString())),
          // object.e000,
        ];

        await conn.query(sql, values);
      }
      await conn.commit();
    } catch (error) {
      await conn.rollback();
      console.error("Error inserting multiple rows into the database:", error);
    }
    await conn.release();
  }

  static async upsert(object: New) {
    if ((await this.get(object.docId)) == null) {
      await this.insert(object);
    } else {
      await this.update(object);
    }
  }

  static async delete(docId: string) {
    const sql = `delete from New where docId = ?`;
    const values = [docId];

    const conn = await NewMySql.pool.getConnection();
    await conn.query(sql, values);
    await conn.commit();
    await conn.release();
  }

  static async get(docId: string): Promise<New | null> {
    const sql = `select * from New where docId = ?`;
    const values = [docId];

    const conn = await NewMySql.pool.getConnection();
    let xs = await conn.query(sql, values);
    await conn.release();

    if (xs.length == 0) {
      return null;
    }
    // console.log('xs[0][docid]: ', xs[0]['DocId'])
    return NewMySql.fromMap(xs[0]);
  }

  static async getAll() {
    const sql = `select * from New`;

    const conn = await NewMySql.pool.getConnection();
    let xs = await conn.query(sql);
    await conn.release();
    // let xs = await NewMySql.sqlDb.unsafe(sql).execute();

    const result: New[] = [];

    for (let i = 0; i < xs.length; i++) {
      result.push(NewMySql.fromMap(xs[i]));
    }

    console.log("result: ", xs.length);

    return result;
  }

  static async getByI000(value: number) {
    const sql = `select * from New where i000 = ?`;
    const values = [value];

    const conn = await NewMySql.pool.getConnection();
    let xs = await conn.query(sql, values);
    await conn.release();
    // let xs = await NewMySql.sqlDb.unsafe(sql).execute();

    console.log(xs.length);
    if (xs.length == 0) {
      return null;
    }
    // console.log('xs[0][docid]: ', xs[0]['DocId'])
    return NewMySql.fromMap(xs[0]);
  }

  static async resetTable() {
    const sql = `drop table NewModel`;

    const conn = await NewMySql.pool.getConnection();
    let xs = await conn.query(sql);
    await conn.commit();
    await conn.release();

    new NewMySql();

    return;
  }

  static fromMap(queryParams: any): New {
    const object = new New();

    if (queryParams.docId != null) object.docId = queryParams.docId;

    // object.s000 = queryParams["s000"] || "";
    // object.i000 = Number(queryParams.i000 || 0);
    // object.b000 = queryParams.b000 === 1;
    // object.r000 = queryParams.r000 || 0.0;
    // object.t000 = new Date(queryParams.t000 || 0);
    // object.l000 = JSON.parse(queryParams.l000 || '[]');
    // object.m000 = JSON.parse(queryParams.m000 || '{}');
    // object.c000 = OtherModel.fromDataString(queryParams.c000 || new OtherModel().toDataString());
    // object.j000 = (JSON.parse(queryParams.j000 || '[]') || []).map((item: string) => OtherModel.fromDataString(item));
    // object.e000 = SomeEnumHelper.fromString(queryParams.e000 || SomeEnum.notSelected);

    object.docId = queryParams.docId;

    return object;
  }
}
