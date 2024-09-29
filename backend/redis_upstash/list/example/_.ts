import dotenv from "dotenv";
import { Redis } from "@upstash/redis";

export class ExampleRedisList {

    private static ref: Redis;

    private static _ready = false;

    static async getDb() {
        if (ExampleRedisList._ready) return;
        dotenv.config();
        // 로그인 (아이디와 비밀번호 설정 필요)
        ExampleRedisList.ref = new Redis({
            url: `https://${process.env.UPSTASH_URL}`,
            token: process.env.UPSTASH_TOKEN,
        });

        ExampleRedisList._ready = true;
    }

    // 리스트에 값을 저장하거나 업데이트하는 함수 (기존 리스트 덮어쓰기)
    static async upsert(key: string, values: string[]): Promise<void> {
        await ExampleRedisList.getDb();
        // 기존 리스트를 삭제한 후 새 값을 추가 (기존 리스트 덮어쓰기)
        await ExampleRedisList.ref.del(`list:Example:${key}`);
        await ExampleRedisList.ref.rpush(`list:Example:${key}`, ...values);
    }

    // 리스트를 가져오는 함수
    static async get(key: string): Promise<string[] | null> {
        try {
            await ExampleRedisList.getDb();
            const result = await ExampleRedisList.ref.lrange(`list:Example:${key}`, 0, -1);
            return result as string[]; // 리스트 반환
        } catch (e) {
            console.log(e);
            return null;
        }
    }

    // 리스트를 삭제하는 함수
    static async delete(key: string): Promise<void> {
        await ExampleRedisList.getDb();
        await ExampleRedisList.ref.del(`list:Example:${key}`);
    }

    // 리스트의 왼쪽에 값 추가 (LPUSH)
    static async lpush(key: string, value: string): Promise<number | null> {
        try {
            await ExampleRedisList.getDb();
            const result = await ExampleRedisList.ref.lpush(`list:Example:${key}`, value);
            return result as number; // 리스트 길이 반환
        } catch (e) {
            console.log(e);
            return null;
        }
    }

    // 리스트의 오른쪽에 값 추가 (RPUSH)
    static async rpush(key: string, value: string): Promise<number | null> {
        try {
            await ExampleRedisList.getDb();
            const result = await ExampleRedisList.ref.rpush(`list:Example:${key}`, value);
            return result as number; // 리스트 길이 반환
        } catch (e) {
            console.log(e);
            return null;
        }
    }

    // 리스트의 왼쪽에서 값 제거 (LPOP)
    static async lpop(key: string): Promise<string | null> {
        try {
            await ExampleRedisList.getDb();
            const result = await ExampleRedisList.ref.lpop(`list:Example:${key}`);
            return result as string;
        } catch (e) {
            console.log(e);
            return null;
        }
    }

    // 리스트의 오른쪽에서 값 제거 (RPOP)
    static async rpop(key: string): Promise<string | null> {
        try {
            await ExampleRedisList.getDb();
            const result = await ExampleRedisList.ref.rpop(`list:Example:${key}`);
            return result as string;
        } catch (e) {
            console.log(e);
            return null;
        }
    }

    // 리스트의 특정 범위 조회 (LRANGE)
    static async getRange(key: string, start: number, end: number): Promise<string[] | null> {
        try {
            await ExampleRedisList.getDb();
            const result = await ExampleRedisList.ref.lrange(`list:Example:${key}`, start, end);
            return result as string[];
        } catch (e) {
            console.log(e);
            return null;
        }
    }

    // 리스트의 길이 반환 (LLEN)
    static async getLength(key: string): Promise<number | null> {
        try {
            await ExampleRedisList.getDb();
            const result = await ExampleRedisList.ref.llen(`list:Example:${key}`);
            return result as number;
        } catch (e) {
            console.log(e);
            return null;
        }
    }

    // 리스트에서 특정 인덱스의 값 가져오기 (LINDEX)
    static async getByIndex(key: string, index: number): Promise<string | null> {
        try {
            await ExampleRedisList.getDb();
            const result = await ExampleRedisList.ref.lindex(`list:Example:${key}`, index);
            return result as string;
        } catch (e) {
            console.log(e);
            return null;
        }
    }

    // 리스트에서 특정 인덱스의 값 설정 (LSET)
    static async setByIndex(key: string, index: number, value: string): Promise<string | null> {
        try {
            await ExampleRedisList.getDb();
            await ExampleRedisList.ref.lset(`list:Example:${key}`, index, value);
            return value; // 설정된 값 반환
        } catch (e) {
            console.log(e);
            return null;
        }
    }

    // 리스트에서 특정 값 제거 (LREM)
    static async removeValue(key: string, count: number, value: string): Promise<number | null> {
        try {
            await ExampleRedisList.getDb();
            const result = await ExampleRedisList.ref.lrem(`list:Example:${key}`, count, value);
            return result as number; // 제거된 요소 개수 반환
        } catch (e) {
            console.log(e);
            return null;
        }
    }
}
