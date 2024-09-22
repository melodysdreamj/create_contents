import {ExampleRedisString} from "./_";

async function main() {
    console.log("start");

    // 문자열 저장
    await ExampleRedisString.upsert("mykey", "Hello, World!");

    // 문자열 가져오기
    const value = await ExampleRedisString.get("mykey");
    console.log(value); // "Hello, World!"

    // 문자열에 값 추가
    await ExampleRedisString.append("mykey", " Redis!");
    const updatedValue = await ExampleRedisString.get("mykey");
    console.log(updatedValue); // "Hello, World! Redis!"

    // 문자열 길이 가져오기
    const length = await ExampleRedisString.strlen("mykey");
    console.log(length); // 문자열 길이 출력

    // 문자열 범위 가져오기
    const substring = await ExampleRedisString.getRange("mykey", 0, 4);
    console.log(substring); // "Hello"

    // 문자열 교체하기
    await ExampleRedisString.setRange("mykey", 7, "Redis");
    const modifiedValue = await ExampleRedisString.get("mykey");
    console.log(modifiedValue); // "Hello, Redis! Redis!"

}

main().catch(err => {
    console.error(err);
    process.exit(1);
});

export {};
