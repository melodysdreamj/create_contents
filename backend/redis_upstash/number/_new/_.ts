import dotenv from "dotenv";
import {Redis} from "@upstash/redis";

export class NewRedisNumber {

    private static ref: Redis;

    private static _ready = false;

    static async getDb() {
        if (NewRedisNumber._ready) return;
        dotenv.config();
        // 로그인 (아이디와 비밀번호 설정 필요)
        NewRedisNumber.ref = new Redis({
            url: `https://${process.env.UPSTASH_URL}`,
            token: process.env.UPSTASH_TOKEN,
        });

        NewRedisNumber._ready = true;
    }

    static async upsert(key: string, value: number): Promise<void> {
        await NewRedisNumber.getDb();
        await NewRedisNumber.ref.set(`num:New:${key}`, value);
    }

    static async get(key: string): Promise<number | null> {
        try {
            await NewRedisNumber.getDb();
            const result = await NewRedisNumber.ref.get(`num:New:${key}`);
            return result as number;
        } catch (e) {
            console.log(e);
            return null;
        }
    }

    static async delete(key: string): Promise<void> {
        await NewRedisNumber.getDb();
        await NewRedisNumber.ref.del(`num:New:${key}`);
    }

    static async increment(key: string): Promise<number | null> {
        try {
            await NewRedisNumber.getDb();
            const result = await NewRedisNumber.ref.incr(`num:New:${key}`);
            return result as number;
        } catch (e) {
            console.log(e);
            return null;
        }
    }

    static async decrement(key: string): Promise<number | null> {
        try {
            await NewRedisNumber.getDb();
            const result = await NewRedisNumber.ref.decr(`num:New:${key}`);
            return result as number;
        } catch (e) {
            console.log(e);
            return null;
        }
    }

    // 실수 값을 더하는 함수
    static async incrementByFloat(key: string, value: number): Promise<number | null> {
        try {
            await NewRedisNumber.getDb();
            const result = await NewRedisNumber.ref.incrbyfloat(`num:New:${key}`, value);
            return result as number; // 문자열을 숫자로 변환
        } catch (e) {
            console.log(e);
            return null;
        }
    }

    // 실수 값을 빼는 함수
    static async decrementByFloat(key: string, value: number): Promise<number | null> {
        try {
            await NewRedisNumber.getDb();
            // 값을 빼려면 음수 값을 더하면 됨
            const result = await NewRedisNumber.ref.incrbyfloat(`num:New:${key}`, -value);
            return result as number
        } catch (e) {
            console.log(e);
            return null;
        }
    }
}
