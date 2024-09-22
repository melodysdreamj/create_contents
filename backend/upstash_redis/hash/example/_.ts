import dotenv from "dotenv";
import { Redis } from "@upstash/redis";

export class ExampleRedisHash {

    private static ref: any;

    private static _ready = false;

    static async getDb() {
        if (ExampleRedisHash._ready) return;
        dotenv.config();
        // 로그인 (아이디와 비밀번호 설정 필요)
        ExampleRedisHash.ref = new Redis({
            url: process.env.UPSTASH_URL,
            token: process.env.UPSTASH_TOKEN,
        });

        ExampleRedisHash._ready = true;
    }

    // 해시 데이터 저장 및 업데이트 (필드-값 추가)
    static async upsert(key: string, field: string, value: string): Promise<void> {
        await ExampleRedisHash.getDb();
        await ExampleRedisHash.ref.hset(`hash:Example:${key}`, field, value);
    }

    // 해시에서 특정 필드 값을 가져오기
    static async get(key: string, field: string): Promise<string | null> {
        try {
            await ExampleRedisHash.getDb();
            const result = await ExampleRedisHash.ref.hget(`hash:Example:${key}`, field);
            return result as string;
        } catch (e) {
            console.log(e);
            return null;
        }
    }

    // 해시에서 모든 필드-값 쌍 가져오기
    static async getAll(key: string): Promise<Record<string, string> | null> {
        try {
            await ExampleRedisHash.getDb();
            const result = await ExampleRedisHash.ref.hgetall(`hash:Example:${key}`);
            return result as Record<string, string>;
        } catch (e) {
            console.log(e);
            return null;
        }
    }

    // 해시에서 특정 필드 삭제
    static async deleteField(key: string, field: string): Promise<number | null> {
        try {
            await ExampleRedisHash.getDb();
            const result = await ExampleRedisHash.ref.hdel(`hash:Example:${key}`, field);
            return result as number;
        } catch (e) {
            console.log(e);
            return null;
        }
    }

    // 전체 해시 삭제
    static async delete(key: string): Promise<void> {
        try {
            await ExampleRedisHash.getDb();
            await ExampleRedisHash.ref.del(`hash:Example:${key}`);
        } catch (e) {
            console.log(e);
        }
    }

    // 특정 필드가 존재하는지 확인
    static async exists(key: string, field: string): Promise<boolean> {
        try {
            await ExampleRedisHash.getDb();
            const result = await ExampleRedisHash.ref.hexists(`hash:Example:${key}`, field);
            return result === 1;
        } catch (e) {
            console.log(e);
            return false;
        }
    }

    // 해시의 특정 필드 값을 정수형으로 증가
    static async incrementBy(key: string, field: string, increment: number): Promise<number | null> {
        try {
            await ExampleRedisHash.getDb();
            const result = await ExampleRedisHash.ref.hincrby(`hash:Example:${key}`, field, increment);
            return result as number;
        } catch (e) {
            console.log(e);
            return null;
        }
    }

    // 해시의 특정 필드 값을 실수형으로 증가
    static async incrementByFloat(key: string, field: string, increment: number): Promise<number | null> {
        try {
            await ExampleRedisHash.getDb();
            const result = await ExampleRedisHash.ref.hincrbyfloat(`hash:Example:${key}`, field, increment);
            return result as number;
        } catch (e) {
            console.log(e);
            return null;
        }
    }

    // 해시의 모든 필드 이름 가져오기
    static async getFields(key: string): Promise<string[] | null> {
        try {
            await ExampleRedisHash.getDb();
            const result = await ExampleRedisHash.ref.hkeys(`hash:Example:${key}`);
            return result as string[];
        } catch (e) {
            console.log(e);
            return null;
        }
    }

    // 해시의 모든 필드 값 가져오기
    static async getValues(key: string): Promise<string[] | null> {
        try {
            await ExampleRedisHash.getDb();
            const result = await ExampleRedisHash.ref.hvals(`hash:Example:${key}`);
            return result as string[];
        } catch (e) {
            console.log(e);
            return null;
        }
    }
}
