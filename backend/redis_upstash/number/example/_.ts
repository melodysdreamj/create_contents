import dotenv from "dotenv";
import {Redis} from "@upstash/redis";

export class ExampleRedisNumber {

    private static ref: Redis;

    private static _ready = false;

    static async getDb() {
        if (ExampleRedisNumber._ready) return;
        dotenv.config();
        // 로그인 (아이디와 비밀번호 설정 필요)


        ExampleRedisNumber.ref = new Redis({
            url: `https://${process.env.UPSTASH_URL}`,
            token: process.env.UPSTASH_TOKEN,
        })

        ExampleRedisNumber._ready = true;
    }

    static async upsert(key: string, value: number): Promise<void> {
        await ExampleRedisNumber.getDb();
        await ExampleRedisNumber.ref.set(`int:Example:${key}`, value)
    }


    static async get(key: string): Promise<number | null> {
        try {
            await ExampleRedisNumber.getDb();
            const result = await ExampleRedisNumber.ref.get(`int:Example:${key}`)
            return result as number;
        } catch (e) {
            console.log(e);
            return null;
        }
    }

    static async delete(key: string): Promise<void> {
        await ExampleRedisNumber.getDb();
        await ExampleRedisNumber.ref.del(`int:Example:${key}`)
    }

    static async increment(key: string): Promise<number | null> {
        try {
            await ExampleRedisNumber.getDb();
            const result = await ExampleRedisNumber.ref.incr(`int:Example:${key}`)
            return result as number;
        } catch (e) {
            console.log(e);
            return null;
        }
    }

    static async decrement(key: string): Promise<number | null> {
        try {
            await ExampleRedisNumber.getDb();
            const result = await ExampleRedisNumber.ref.decr(`int:Example:${key}`)
            return result as number;
        } catch (e) {
            console.log(e);
            return null;
        }
    }
}
