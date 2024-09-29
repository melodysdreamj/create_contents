import { LegoUtil } from "../../../../util";
import Memcached from 'memcached';

// Memcached 서버 연결 설정 (localhost에서 실행되는 Memcached 서버)
const memcached = new Memcached('localhost:11211'); // 서버 주소는 상황에 맞게 변경 가능

export class NewMemCached {

    // 데이터를 캐시에 저장 (문자열 키와 값, 업데이트 및 삽입)
    static async upsert(key: string, value: string, lifetime: number = 600): Promise<void> {
        return new Promise((resolve, reject) => {
            memcached.set(key, value, lifetime, (err) => {
                if (err) {
                    return reject(err);
                }
                resolve();
            });
        });
    }

    // 데이터를 캐시에서 가져오기 (문자열 키로 값 반환)
    static async get(key: string): Promise<string | null> {
        return new Promise((resolve, reject) => {
            memcached.get(key, (err, data) => {
                if (err) {
                    console.log(err);
                    return reject(err);
                }

                if (data) {
                    resolve(data as string); // 데이터를 문자열로 반환
                } else {
                    resolve(null); // 데이터가 없을 경우 null 반환
                }
            });
        });
    }

    // 데이터를 캐시에서 삭제 (문자열 키로 삭제)
    static async delete(key: string): Promise<void> {
        return new Promise((resolve, reject) => {
            memcached.del(key, (err) => {
                if (err) {
                    console.log(err);
                    return reject(err);
                }
                resolve();
            });
        });
    }
}

