import { LegoUtil } from "../../../../util";
import Memcached from "memcached";
const memcached = new Memcached("localhost:11211"); // 서버 주소는 상황에 맞게 변경 가능
export class Example2 {
  constructor() {
    this.docId = LegoUtil.randomString(10);
  }
  docId: string = "";
  toDataString(): string {
    return btoa(
      Array.from(
        new TextEncoder().encode(
          new URLSearchParams({
            docId: this.docId,
          }).toString()
        )
      )
        .map((byte) => String.fromCharCode(byte))
        .join("")
    );
  }
  static fromDataString(dataString: string): Example2 {
    const queryParams = Object.fromEntries(
      new URLSearchParams(atob(dataString))
    );
    const object = new Example2();
    object.docId = queryParams["docId"] || "";
    return object;
  }
  toMap(): object {
    return {
      docId: this.docId,
    };
  }
  static fromMap(queryParams: any): Example2 {
    const object = new Example2();
    object.docId = queryParams.docId;
    return object;
  }
}
export class Example2MemCached {
  static async upsert(object: Example2): Promise<void> {
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
  static async get(docId: string): Promise<Example2 | null> {
    return new Promise((resolve, reject) => {
      memcached.get(docId, (err, data) => {
        if (err) {
          console.log(err);
          return reject(err);
        }
        if (data) {
          try {
            const object = Example2.fromDataString(data);
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
