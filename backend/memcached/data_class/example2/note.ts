import {Example2, Example2MemCached} from "./_";

async function main() {
    console.log("start");
    
    // 100만개의 랜덤 데이터를 생성하여 Memcached에 저장 하고 시간측정
    const start = Date.now();
    let lastDocId = "";
    for(let i = 0; i < 1000000; i++) {
        let obj = new Example2();
        // 랜덤문자열
        obj.docId = Math.random().toString(36).substr(2, 11);
        lastDocId = obj.docId;
        Example2MemCached.upsert(obj);
    }
    const end = Date.now();
    console.log(`100만개 저장 시간: ${end - start}ms`);
    console.log(`마지막 문자열 가져오기 테스트: ${await Example2MemCached.get(lastDocId)}`);
}

main().catch(err => {
    console.error(err);
    process.exit(1);
});

export {};
