import { LegoUtil } from "../../../../util";
import Memcached from "memcached";
import { Sub } from "../../../data_class/example/sub";
import {
  TestEnumTest,
  TestEnumTestHelper,
} from "../../../data_class/example/test_enum";
const memcached = new Memcached("localhost:11211"); // 서버 주소는 상황에 맞게 변경 가능
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
export class CheckMemCached {
  static async upsert(object: Check): Promise<void> {
    const key = object.docId;
    const value = object.toDataString();
    const lifetime = 600; // 데이터의 유효기간을 600초(10분)으로 설정
    return new Promise((resolve, reject) => {
      memcached.set(key, value, lifetime, (err) => {
        if (err) {
          return reject(err);
        }
        resolve();
      });
    });
  }
  static async get(docId: string): Promise<Check | null> {
    return new Promise((resolve, reject) => {
      memcached.get(docId, (err, data) => {
        if (err) {
          console.log(err);
          return reject(err);
        }
        if (data) {
          try {
            const object = Check.fromDataString(data);
            resolve(object);
          } catch (e) {
            console.log("Error parsing data:", e);
            resolve(null);
          }
        } else {
          resolve(null); // 데이터가 없을 경우 null 반환
        }
      });
    });
  }
  static async delete(docId: string): Promise<void> {
    return new Promise((resolve, reject) => {
      memcached.del(docId, (err) => {
        if (err) {
          console.log(err);
          return reject(err);
        }
        resolve();
      });
    });
  }
}
