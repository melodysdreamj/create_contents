import dotenv from "dotenv";
import { Redis } from "@upstash/redis";

export class NewRedisSortedSet {

    private static ref: Redis;

    private static _ready = false;

    static async getDb() {
        if (NewRedisSortedSet._ready) return;
        dotenv.config();
        // 로그인 (아이디와 비밀번호 설정 필요)
        NewRedisSortedSet.ref = new Redis({
            url: `https://${process.env.UPSTASH_URL}`,
            token: process.env.UPSTASH_TOKEN,
        });

        NewRedisSortedSet._ready = true;
    }

    // Sorted Set에 요소 추가 (점수와 함께)
    static async add(key: string, value: string, score: number): Promise<number | null> {
        try {
            await NewRedisSortedSet.getDb();
            const result = await NewRedisSortedSet.ref.zadd(`sortedset:New:${key}`, { score, member: value });
            return result as number; // 추가된 요소 개수 반환
        } catch (e) {
            console.log(e);
            return null;
        }
    }

    // Sorted Set에서 요소 제거
    static async remove(key: string, value: string): Promise<number | null> {
        try {
            await NewRedisSortedSet.getDb();
            const result = await NewRedisSortedSet.ref.zrem(`sortedset:New:${key}`, value);
            return result as number; // 제거된 요소 개수 반환
        } catch (e) {
            console.log(e);
            return null;
        }
    }

    // Sorted Set에서 특정 범위의 요소 가져오기 (오름차순)
    static async getRange(key: string, start: number, end: number): Promise<string[] | null> {
        try {
            await NewRedisSortedSet.getDb();
            const result = await NewRedisSortedSet.ref.zrange(`sortedset:New:${key}`, start, end);
            return result as string[];
        } catch (e) {
            console.log(e);
            return null;
        }
    }

    // Sorted Set에서 특정 범위의 요소 가져오기 (내림차순)
    static async getRangeByScoreDesc(key: string, start: number, end: number): Promise<string[] | null> {
        try {
            await NewRedisSortedSet.getDb();
            // zrange를 사용하고 내림차순으로 정렬
            const result = await NewRedisSortedSet.ref.zrange(`sortedset:New:${key}`, start, end, { rev: true });
            return result as string[];
        } catch (e) {
            console.log(e);
            return null;
        }
    }

    // 특정 값의 순위 조회 (오름차순 기준)
    static async getRank(key: string, value: string): Promise<number | null> {
        try {
            await NewRedisSortedSet.getDb();
            const result = await NewRedisSortedSet.ref.zrank(`sortedset:New:${key}`, value);
            return result as number; // 0-based index로 순위 반환
        } catch (e) {
            console.log(e);
            return null;
        }
    }

    // 특정 값의 순위 조회 (내림차순 기준)
    static async getRankDesc(key: string, value: string): Promise<number | null> {
        try {
            await NewRedisSortedSet.getDb();
            const result = await NewRedisSortedSet.ref.zrevrank(`sortedset:New:${key}`, value);
            return result as number;
        } catch (e) {
            console.log(e);
            return null;
        }
    }

    // 특정 값의 점수 조회
    static async getScore(key: string, value: string): Promise<number | null> {
        try {
            await NewRedisSortedSet.getDb();
            const result = await NewRedisSortedSet.ref.zscore(`sortedset:New:${key}`, value);
            return result as number;
        } catch (e) {
            console.log(e);
            return null;
        }
    }

    // Sorted Set의 크기 (요소 개수) 조회
    static async size(key: string): Promise<number | null> {
        try {
            await NewRedisSortedSet.getDb();
            const result = await NewRedisSortedSet.ref.zcard(`sortedset:New:${key}`);
            return result as number;
        } catch (e) {
            console.log(e);
            return null;
        }
    }

    // 특정 범위의 점수를 가진 요소들 가져오기
    static async getRangeByScore(key: string, minScore: number, maxScore: number): Promise<string[] | null> {
        try {
            await NewRedisSortedSet.getDb();
            // zrange 사용, 점수 기반으로 범위 지정
            const result = await NewRedisSortedSet.ref.zrange(`sortedset:New:${key}`, minScore, maxScore, {
                byScore: true,  // 점수 기반으로 정렬
                withScores: false,  // 점수 포함 여부 (false로 설정 가능)
            });
            return result as string[];
        } catch (e) {
            console.log(e);
            return null;
        }
    }

    // 전체 Sorted Set 삭제
    static async delete(key: string): Promise<void> {
        try {
            await NewRedisSortedSet.getDb();
            await NewRedisSortedSet.ref.del(`sortedset:New:${key}`);
        } catch (e) {
            console.log(e);
        }
    }
}
