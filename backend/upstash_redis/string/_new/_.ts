import dotenv from "dotenv";
import {Redis} from "@upstash/redis";

export class NewRedisString {

    private static ref: Redis;

    private static _ready = false;

    static async getDb() {
        if (NewRedisString._ready) return;
        dotenv.config();
        // 로그인 (아이디와 비밀번호 설정 필요)
        NewRedisString.ref = new Redis({
            url: `https://${process.env.UPSTASH_URL}`,
            token: process.env.UPSTASH_TOKEN,
        });

        NewRedisString._ready = true;
    }

    // 문자열을 저장하거나 업데이트하는 함수
    static async upsert(key: string, value: string): Promise<void> {
        await NewRedisString.getDb();
        await NewRedisString.ref.set(`str:New:${key}`, value);
    }

    // 문자열을 가져오는 함수
    static async get(key: string): Promise<string | null> {
        try {
            await NewRedisString.getDb();
            const result = await NewRedisString.ref.get(`str:New:${key}`);
            return result as string; // 문자열 반환
        } catch (e) {
            console.log(e);
            return null;
        }
    }

    // 문자열을 삭제하는 함수
    static async delete(key: string): Promise<void> {
        await NewRedisString.getDb();
        await NewRedisString.ref.del(`str:New:${key}`);
    }

    // 문자열에 값을 추가하는 함수 (기존 문자열에 append)
    static async append(key: string, value: string): Promise<number | null> {
        try {
            await NewRedisString.getDb();
            const result = await NewRedisString.ref.append(`str:New:${key}`, value);
            return result as number; // 추가된 후 전체 문자열 길이 반환
        } catch (e) {
            console.log(e);
            return null;
        }
    }

    // 문자열의 길이를 반환하는 함수
    static async strlen(key: string): Promise<number | null> {
        try {
            await NewRedisString.getDb();
            const result = await NewRedisString.ref.strlen(`str:New:${key}`);
            return result as number; // 문자열 길이 반환
        } catch (e) {
            console.log(e);
            return null;
        }
    }

    // 특정 범위의 문자열을 가져오는 함수 (substring)
    static async getRange(key: string, start: number, end: number): Promise<string | null> {
        try {
            await NewRedisString.getDb();
            const result = await NewRedisString.ref.getrange(`str:New:${key}`, start, end);
            return result as string; // 해당 범위의 문자열 반환
        } catch (e) {
            console.log(e);
            return null;
        }
    }

    // 문자열을 특정 인덱스에서 교체하는 함수 (부분 문자열 수정)
    static async setRange(key: string, offset: number, value: string): Promise<number | null> {
        try {
            await NewRedisString.getDb();
            const result = await NewRedisString.ref.setrange(`str:New:${key}`, offset, value);
            return result as number; // 수정된 후 전체 문자열 길이 반환
        } catch (e) {
            console.log(e);
            return null;
        }
    }
}
