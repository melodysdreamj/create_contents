import dotenv from "dotenv";
import { Redis } from "@upstash/redis";

export class NewRedisList {

    private static ref: any;

    private static _ready = false;

    static async getDb() {
        if (NewRedisList._ready) return;
        dotenv.config();
        // 로그인 (아이디와 비밀번호 설정 필요)
        NewRedisList.ref = new Redis({
            url: process.env.UPSTASH_URL,
            token: process.env.UPSTASH_TOKEN,
        });

        NewRedisList._ready = true;
    }

    // 리스트에 값을 저장하거나 업데이트하는 함수 (기존 리스트 덮어쓰기)
    static async upsert(key: string, values: string[]): Promise<void> {
        await NewRedisList.getDb();
        // 기존 리스트를 삭제한 후 새 값을 추가 (기존 리스트 덮어쓰기)
        await NewRedisList.ref.del(`list:New:${key}`);
        await NewRedisList.ref.rpush(`list:New:${key}`, ...values);
    }

    // 리스트를 가져오는 함수
    static async get(key: string): Promise<string[] | null> {
        try {
            await NewRedisList.getDb();
            const result = await NewRedisList.ref.lrange(`list:New:${key}`, 0, -1);
            return result as string[]; // 리스트 반환
        } catch (e) {
            console.log(e);
            return null;
        }
    }

    // 리스트를 삭제하는 함수
    static async delete(key: string): Promise<void> {
        await NewRedisList.getDb();
        await NewRedisList.ref.del(`list:New:${key}`);
    }

    // 리스트의 왼쪽에 값 추가 (LPUSH)
    static async lpush(key: string, value: string): Promise<number | null> {
        try {
            await NewRedisList.getDb();
            const result = await NewRedisList.ref.lpush(`list:New:${key}`, value);
            return result as number; // 리스트 길이 반환
        } catch (e) {
            console.log(e);
            return null;
        }
    }

    // 리스트의 오른쪽에 값 추가 (RPUSH)
    static async rpush(key: string, value: string): Promise<number | null> {
        try {
            await NewRedisList.getDb();
            const result = await NewRedisList.ref.rpush(`list:New:${key}`, value);
            return result as number; // 리스트 길이 반환
        } catch (e) {
            console.log(e);
            return null;
        }
    }

    // 리스트의 왼쪽에서 값 제거 (LPOP)
    static async lpop(key: string): Promise<string | null> {
        try {
            await NewRedisList.getDb();
            const result = await NewRedisList.ref.lpop(`list:New:${key}`);
            return result as string;
        } catch (e) {
            console.log(e);
            return null;
        }
    }

    // 리스트의 오른쪽에서 값 제거 (RPOP)
    static async rpop(key: string): Promise<string | null> {
        try {
            await NewRedisList.getDb();
            const result = await NewRedisList.ref.rpop(`list:New:${key}`);
            return result as string;
        } catch (e) {
            console.log(e);
            return null;
        }
    }

    // 리스트의 특정 범위 조회 (LRANGE)
    static async getRange(key: string, start: number, end: number): Promise<string[] | null> {
        try {
            await NewRedisList.getDb();
            const result = await NewRedisList.ref.lrange(`list:New:${key}`, start, end);
            return result as string[];
        } catch (e) {
            console.log(e);
            return null;
        }
    }

    // 리스트의 길이 반환 (LLEN)
    static async getLength(key: string): Promise<number | null> {
        try {
            await NewRedisList.getDb();
            const result = await NewRedisList.ref.llen(`list:New:${key}`);
            return result as number;
        } catch (e) {
            console.log(e);
            return null;
        }
    }

    // 리스트에서 특정 인덱스의 값 가져오기 (LINDEX)
    static async getByIndex(key: string, index: number): Promise<string | null> {
        try {
            await NewRedisList.getDb();
            const result = await NewRedisList.ref.lindex(`list:New:${key}`, index);
            return result as string;
        } catch (e) {
            console.log(e);
            return null;
        }
    }

    // 리스트에서 특정 인덱스의 값 설정 (LSET)
    static async setByIndex(key: string, index: number, value: string): Promise<string | null> {
        try {
            await NewRedisList.getDb();
            await NewRedisList.ref.lset(`list:New:${key}`, index, value);
            return value; // 설정된 값 반환
        } catch (e) {
            console.log(e);
            return null;
        }
    }

    // 리스트에서 특정 값 제거 (LREM)
    static async removeValue(key: string, count: number, value: string): Promise<number | null> {
        try {
            await NewRedisList.getDb();
            const result = await NewRedisList.ref.lrem(`list:New:${key}`, count, value);
            return result as number; // 제거된 요소 개수 반환
        } catch (e) {
            console.log(e);
            return null;
        }
    }
}
