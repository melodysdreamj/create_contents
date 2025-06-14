import { Example2, Example2MemCached } from "./_";

async function main() {
    console.log("start");

    // 100만개의 랜덤 데이터를 생성하여 Memcached에 저장하고 시간 측정
    const start = Date.now();
    let lastDocId = "";

    // 비동기 요청을 병렬로 처리하기 위한 배열
    const promises: Promise<void>[] = [];

    for (let i = 0; i < 1000000; i++) {
        let obj = new Example2();
        // 랜덤 문자열 생성
        obj.docId = Math.random().toString(36).substr(2, 11);
        lastDocId = obj.docId;

        // upsert 작업을 비동기적으로 실행하고 Promise 배열에 저장
        promises.push(Example2MemCached.upsert(obj));

        // 병렬 처리의 성능을 너무 많이 사용하지 않도록 작은 배치로 나누는 것이 좋습니다.
        // 예를 들어, 1000개씩 처리하는 방식으로 조정 가능
        if (promises.length >= 1000) {
            await Promise.all(promises); // 1000개씩 처리하고 대기
            promises.length = 0; // 배열 초기화
        }
    }

    // 남은 작업 처리
    if (promises.length > 0) {
        await Promise.all(promises);
    }

    const end = Date.now();
    console.log(`100만개 저장 시간: ${end - start}ms`);

    // 마지막으로 저장된 문자열을 Memcached에서 가져와 확인
    console.log(`마지막 문자열 가져오기 테스트: ${(await Example2MemCached.get(lastDocId))?.docId}`);
}

main().catch(err => {
    console.error(err);
    process.exit(1);
}).finally(async () => {});;

export {};
