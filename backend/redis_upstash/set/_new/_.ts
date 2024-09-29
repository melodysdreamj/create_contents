import dotenv from "dotenv";
import { Redis } from "@upstash/redis";

export class NewRedisSet {

    private static ref: Redis;

    private static _ready = false;

    static async getDb() {
        if (NewRedisSet._ready) return;
        dotenv.config();
        // 로그인 (아이디와 비밀번호 설정 필요)
        NewRedisSet.ref = new Redis({
            url: `https://${process.env.UPSTASH_URL}`,
            token: process.env.UPSTASH_TOKEN,
        });

        NewRedisSet._ready = true;
    }

    // Set에 값 저장 (중복 방지)
    static async add(key: string, value: string): Promise<number | null> {
        try {
            await NewRedisSet.getDb();
            const result = await NewRedisSet.ref.sadd(`set:New:${key}`, value);
            return result as number; // 추가된 요소 개수 반환 (중복 제외)
        } catch (e) {
            console.log(e);
            return null;
        }
    }

    // Set에서 값 제거
    static async remove(key: string, value: string): Promise<number | null> {
        try {
            await NewRedisSet.getDb();
            const result = await NewRedisSet.ref.srem(`set:New:${key}`, value);
            return result as number; // 제거된 요소 개수 반환
        } catch (e) {
            console.log(e);
            return null;
        }
    }

    // Set 전체 조회
    static async getMembers(key: string): Promise<string[] | null> {
        try {
            await NewRedisSet.getDb();
            const result = await NewRedisSet.ref.smembers(`set:New:${key}`);
            return result as string[]; // Set의 모든 멤버 반환
        } catch (e) {
            console.log(e);
            return null;
        }
    }

    // 특정 값이 Set에 존재하는지 확인
    static async isMember(key: string, value: string): Promise<boolean> {
        try {
            await NewRedisSet.getDb();
            const result = await NewRedisSet.ref.sismember(`set:New:${key}`, value);
            return result === 1; // 존재하면 true 반환
        } catch (e) {
            console.log(e);
            return false;
        }
    }

    // Set의 크기 (멤버 수) 반환
    static async size(key: string): Promise<number | null> {
        try {
            await NewRedisSet.getDb();
            const result = await NewRedisSet.ref.scard(`set:New:${key}`);
            return result as number; // Set의 요소 개수 반환
        } catch (e) {
            console.log(e);
            return null;
        }
    }

    // Set 삭제
    static async delete(key: string): Promise<void> {
        try {
            await NewRedisSet.getDb();
            await NewRedisSet.ref.del(`set:New:${key}`);
        } catch (e) {
            console.log(e);
        }
    }

    // Set 간의 교집합 반환
    static async intersect(keys: string[]): Promise<string[] | null> {
        try {
            await NewRedisSet.getDb();
            if (keys.length === 0) return null;
            const [firstKey, ...restKeys] = keys.map(key => `set:New:${key}`);
            const result = await NewRedisSet.ref.sinter(firstKey, ...restKeys);
            return result as string[];
        } catch (e) {
            console.log(e);
            return null;
        }
    }

    // Set 간의 합집합 반환
    static async union(keys: string[]): Promise<string[] | null> {
        try {
            await NewRedisSet.getDb();
            if (keys.length === 0) return null;
            const [firstKey, ...restKeys] = keys.map(key => `set:New:${key}`);
            const result = await NewRedisSet.ref.sunion(firstKey, ...restKeys);
            return result as string[];
        } catch (e) {
            console.log(e);
            return null;
        }
    }

    // Set 간의 차집합 반환
    static async difference(keys: string[]): Promise<string[] | null> {
        try {
            await NewRedisSet.getDb();
            if (keys.length === 0) return null;
            const [firstKey, ...restKeys] = keys.map(key => `set:New:${key}`);
            const result = await NewRedisSet.ref.sdiff(firstKey, ...restKeys);
            return result as string[];
        } catch (e) {
            console.log(e);
            return null;
        }
    }
}
