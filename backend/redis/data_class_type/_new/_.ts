import { LegoUtil } from "../../../../util";
import { createClient, RedisClientType } from "redis";
import dotenv from "dotenv";

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

export class NewRedis {
  private static ref: RedisClientType | null = null;
  private static isDotenvLoaded = false;

  // Redis 연결을 관리하는 싱글톤 메서드
  private static async getDb(): Promise<RedisClientType> {
    // dotenv가 아직 로드되지 않았다면 로드
    if (!NewRedis.isDotenvLoaded) {
      dotenv.config();
      NewRedis.isDotenvLoaded = true;
    }

    // 이미 연결이 되어 있으면 해당 Redis 인스턴스를 반환
    if (NewRedis.ref) return NewRedis.ref;

    // 환경변수에서 IP, 포트, 비밀번호 설정 로드
    const redisHost = process.env.REDIS_HOST || "127.0.0.1"; // 기본값: 로컬호스트
    const redisPort = process.env.REDIS_PORT || "6379"; // 기본값: 6379
    const redisPassword = process.env.REDIS_PASSWORD || ""; // 비밀번호 (없을 경우 빈 문자열)

    // 로컬 또는 원격 Redis 연결 설정
    const client = createClient({
      socket: {
        host: redisHost,
        port: parseInt(redisPort, 10),
      },
      password: redisPassword || undefined,
    }) as unknown as RedisClientType; // 타입을 명시적으로 캐스팅

    // 에러 핸들링
    client.on("error", (err) => console.log("Redis Client Error", err));

    // Redis 연결
    await client.connect();

    // Redis 인스턴스를 저장
    NewRedis.ref = client;
    console.log(`Connected to Redis at ${redisHost}:${redisPort}`);

    return NewRedis.ref;
  }

  // 데이터를 삽입하거나 업데이트하는 메서드 (UPSERT)
  static async upsert(object: New): Promise<void> {
    const redis = await NewRedis.getDb(); // Redis 연결 인스턴스 가져오기
    await redis.set(`class:New:${object.docId}`, object.toDataString());
  }

  // 데이터를 가져오는 메서드
  static async get(docId: string): Promise<New | null> {
    try {
      const redis = await NewRedis.getDb(); // Redis 연결 인스턴스 가져오기
      const result = await redis.get(`class:New:${docId}`);
      return result ? New.fromDataString(result) : null;
    } catch (e) {
      console.log(e);
      return null;
    }
  }

  // 데이터를 삭제하는 메서드
  static async delete(docId: string): Promise<void> {
    const redis = await NewRedis.getDb(); // Redis 연결 인스턴스 가져오기
    await redis.del(`class:New:${docId}`);
  }

  // Redis 연결을 종료하는 메서드 (필요한 경우)
  static async disconnect(): Promise<void> {
    if (NewRedis.ref) {
      await NewRedis.ref.quit();
      NewRedis.ref = null;
      console.log("Disconnected from Redis");
    }
  }
}
