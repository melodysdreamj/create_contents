import dotenv from "dotenv";
import { Redis } from "@upstash/redis";

export class NewRedisGeo {

    private static ref: Redis;

    private static _ready = false;

    static async getDb() {
        if (NewRedisGeo._ready) return;
        dotenv.config();
        // 로그인 (아이디와 비밀번호 설정 필요)
        NewRedisGeo.ref = new Redis({
            url: `https://${process.env.UPSTASH_URL}`,
            token: process.env.UPSTASH_TOKEN,
        });

        NewRedisGeo._ready = true;
    }

    // 위치 데이터를 저장하거나 업데이트하는 함수 (GEOADD 사용)
    static async upsert(key: string, longitude: number, latitude: number, member: string): Promise<void> {
        await NewRedisGeo.getDb();
        await NewRedisGeo.ref.geoadd(`geo:New:${key}`, { longitude, latitude, member });
    }

// 가까운 위치 데이터 100개 가져오기 (반경을 포함하여 검색)
    static async getNearby(key: string, longitude: number, latitude: number, radius: number,count: number): Promise<any[] | null> {
        try {
            await NewRedisGeo.getDb();
            const result = await NewRedisGeo.ref.geosearch(
                `geo:New:${key}`,
                {
                    type: "FROMLONLAT",
                    coordinate: { lon: longitude, lat: latitude }
                },
                {
                    type: "BYRADIUS",
                    radius: radius,
                    radiusType: 'KM'
                },
                "ASC",
                {
                    count: { limit: count },
                    withDist: true
                }
            );
            return result;
        } catch (e) {
            console.log(e);
            return null;
        }
    }


    // 특정 멤버(위치 데이터)를 삭제하는 함수
    static async deleteMember(key: string, member: string): Promise<void> {
        await NewRedisGeo.getDb();
        await NewRedisGeo.ref.zrem(`geo:New:${key}`, member); // GEO 데이터는 Sorted Set 내부에 저장됨
    }

    // 특정 위치와의 거리를 가져오는 함수 (GEODIST 사용)
    static async getDistance(key: string, member1: string, member2: string): Promise<number | null> {
        try {
            await NewRedisGeo.getDb();
            const result = await NewRedisGeo.ref.geodist(`geo:New:${key}`, member1, member2, 'KM');
            return result ? parseFloat(String(result)) : null; // 두 위치 사이의 거리 반환 (km 단위)
        } catch (e) {
            console.log(e);
            return null;
        }
    }

    // 멤버의 좌표를 가져오는 함수 (GEOHASH 사용)
    static async getCoordinates(key: string, member: string): Promise<any[] | null> {
        try {
            await NewRedisGeo.getDb();
            const result = await NewRedisGeo.ref.geopos(`geo:New:${key}`, member);
            return result; // 멤버의 좌표 반환
        } catch (e) {
            console.log(e);
            return null;
        }
    }

    // 멤버의 Geohash를 가져오는 함수 (GEOHASH 사용)
    static async getGeoHash(key: string, member: string): Promise<string | null> {
        try {
            await NewRedisGeo.getDb();
            const result = await NewRedisGeo.ref.geohash(`geo:New:${key}`, member);
            return result ? result[0] : null; // 멤버의 Geohash 반환
        } catch (e) {
            console.log(e);
            return null;
        }
    }
}
