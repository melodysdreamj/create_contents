import {ExampleRedisString} from "./_";

async function main() {
    console.log("start");

    // 100만개 랜덤문자 쓰고 시간 측정
    let start = Date.now();
    for (let i = 0; i < 1000000; i++) {
        let str = String.fromCharCode(Math.floor(Math.random() * 26) + 97);
        await ExampleRedisString.upsert(str, str);
    }
    console.log(`100만개 랜덤문자 쓰기: ${Date.now() - start}ms`);

}

main().catch(err => {
    console.error(err);
    process.exit(1);
});

export {};
