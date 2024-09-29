import { createClient, RedisClientType } from 'redis';
import dotenv from 'dotenv';

export class ExampleRedisString {

    private static ref: RedisClientType | null = null;
    private static isDotenvLoaded = false;

    // Redis 연결을 관리하는 싱글톤 메서드
    private static async getDb(): Promise<RedisClientType> {
        // dotenv가 아직 로드되지 않았다면 로드
        if (!ExampleRedisString.isDotenvLoaded) {
            dotenv.config(); // .env 파일에서 환경 변수 로드
            ExampleRedisString.isDotenvLoaded = true;
        }

        // 이미 연결이 되어 있으면 해당 Redis 인스턴스를 반환
        if (ExampleRedisString.ref) return ExampleRedisString.ref;

        // 환경변수에서 IP, 포트, 비밀번호 설정 로드
        const redisHost = process.env.REDIS_HOST || '127.0.0.1';  // 기본값: 로컬호스트
        const redisPort = process.env.REDIS_PORT || '6379';       // 기본값: 6379
        const redisPassword = process.env.REDIS_PASSWORD || '';   // 비밀번호 (없을 경우 빈 문자열)

        // 로컬 또는 원격 Redis 연결 설정
        const client = createClient({
            socket: {
                host: redisHost,
                port: parseInt(redisPort, 10)
            },
            password: redisPassword || undefined
        }) as unknown as RedisClientType;  // 타입을 명시적으로 캐스팅

        // 에러 핸들링
        client.on('error', (err) => console.log('Redis Client Error', err));

        // Redis 연결
        await client.connect();

        // Redis 인스턴스를 저장
        ExampleRedisString.ref = client;
        console.log(`Connected to Redis at ${redisHost}:${redisPort}`);

        return ExampleRedisString.ref;
    }

    // 데이터를 삽입하거나 업데이트하는 메서드 (UPSERT)
    static async upsert(key: string, value: string): Promise<void> {
        const redis = await ExampleRedisString.getDb();  // Redis 연결 인스턴스 가져오기
        await redis.set(`str:Example:${key}`, value);
    }

    // 데이터를 가져오는 메서드
    static async get(key: string): Promise<string | null> {
        try {
            const redis = await ExampleRedisString.getDb();  // Redis 연결 인스턴스 가져오기
            const result = await redis.get(`str:Example:${key}`);
            return result as string; // 문자열 반환
        } catch (e) {
            console.log(e);
            return null;
        }
    }

    // 데이터를 삭제하는 메서드
    static async delete(key: string): Promise<void> {
        const redis = await ExampleRedisString.getDb();  // Redis 연결 인스턴스 가져오기
        await redis.del(`str:Example:${key}`);
    }

    // 문자열에 값을 추가하는 함수 (기존 문자열에 append)
    static async append(key: string, value: string): Promise<number | null> {
        try {
            const redis = await ExampleRedisString.getDb();
            const result = await redis.append(`str:Example:${key}`, value);
            return result as number; // 추가된 후 전체 문자열 길이 반환
        } catch (e) {
            console.log(e);
            return null;
        }
    }

    // 문자열의 길이를 반환하는 함수
    static async strLen(key: string): Promise<number | null> {
        try {
            const redis = await ExampleRedisString.getDb();
            const result = await redis.strLen(`str:Example:${key}`);
            return result as number; // 문자열 길이 반환
        } catch (e) {
            console.log(e);
            return null;
        }
    }

    // 특정 범위의 문자열을 가져오는 함수 (substring)
    static async getRange(key: string, start: number, end: number): Promise<string | null> {
        try {
            const redis = await ExampleRedisString.getDb();
            const result = await redis.getRange(`str:Example:${key}`, start, end);
            return result as string; // 해당 범위의 문자열 반환
        } catch (e) {
            console.log(e);
            return null;
        }
    }

    // 문자열을 특정 인덱스에서 교체하는 함수 (부분 문자열 수정)
    static async setRange(key: string, offset: number, value: string): Promise<number | null> {
        try {
            const redis = await ExampleRedisString.getDb();
            const result = await redis.setRange(`str:Example:${key}`, offset, value);
            return result as number; // 수정된 후 전체 문자열 길이 반환
        } catch (e) {
            console.log(e);
            return null;
        }
    }
}