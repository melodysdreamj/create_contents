import { LegoUtil } from "../../../../util";
import { Redis } from "@upstash/redis";
import { Sub } from "../../../data_class/example/sub";
import {
  TestEnumTest,
  TestEnumTestHelper,
} from "../../../data_class/example/test_enum";
import dotenv from "dotenv";
import { createClient, RedisClientType } from "redis";
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
export class CheckRedis {
  private static ref: RedisClientType | null = null;
  private static isDotenvLoaded = false;
  private static async getDb(): Promise<RedisClientType> {
    if (!CheckRedis.isDotenvLoaded) {
      dotenv.config();
      CheckRedis.isDotenvLoaded = true;
    }
    if (CheckRedis.ref) return CheckRedis.ref;
    const redisHost = process.env.REDIS_HOST || "127.0.0.1"; // 기본값: 로컬호스트
    const redisPort = process.env.REDIS_PORT || "6379"; // 기본값: 6379
    const redisPassword = process.env.REDIS_PASSWORD || ""; // 비밀번호 (없을 경우 빈 문자열)
    const client = createClient({
      socket: {
        host: redisHost,
        port: parseInt(redisPort, 10),
      },
      password: redisPassword || undefined,
    }) as unknown as RedisClientType; // 타입을 명시적으로 캐스팅
    client.on("error", (err) => console.log("Redis Client Error", err));
    await client.connect();
    CheckRedis.ref = client;
    console.log(`Connected to Redis at ${redisHost}:${redisPort}`);
    return CheckRedis.ref;
  }
  static async upsert(object: Check): Promise<void> {
    const redis = await CheckRedis.getDb(); // Redis 연결 인스턴스 가져오기
    await redis.set(`class:Check:${object.docId}`, object.toDataString());
  }
  static async get(docId: string): Promise<Check | null> {
    try {
      const redis = await CheckRedis.getDb(); // Redis 연결 인스턴스 가져오기
      const result = await redis.get(`class:Check:${docId}`);
      return result ? Check.fromDataString(result) : null;
    } catch (e) {
      console.log(e);
      return null;
    }
  }
  static async delete(docId: string): Promise<void> {
    const redis = await CheckRedis.getDb(); // Redis 연결 인스턴스 가져오기
    await redis.del(`class:Check:${docId}`);
  }
  static async disconnect(): Promise<void> {
    if (CheckRedis.ref) {
      await CheckRedis.ref.quit();
      CheckRedis.ref = null;
      console.log("Disconnected from Redis");
    }
  }
}
