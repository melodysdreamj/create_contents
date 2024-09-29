import {ExampleRedisHash} from "./_";

async function main() {
    console.log("start");

// 해시에 필드-값 추가
    await ExampleRedisHash.upsert("myhash", "field1", "value1");
    await ExampleRedisHash.upsert("myhash", "field2", "value2");

// 특정 필드의 값 가져오기
    const field1Value = await ExampleRedisHash.get("myhash", "field1");
    console.log(field1Value); // "value1"

// 해시의 모든 필드-값 쌍 가져오기
    const allFields = await ExampleRedisHash.getAll("myhash");
    console.log(allFields); // { field1: "value1", field2: "value2" }

// 특정 필드 삭제
    await ExampleRedisHash.deleteField("myhash", "field1");
    const updatedHash = await ExampleRedisHash.getAll("myhash");
    console.log(updatedHash); // { field2: "value2" }

// 해시 삭제
    await ExampleRedisHash.delete("myhash");

// 필드 존재 여부 확인
    const exists = await ExampleRedisHash.exists("myhash", "field2");
    console.log(exists); // false

// 필드 값 정수로 증가
    await ExampleRedisHash.upsert("myhash", "count", "10");
    await ExampleRedisHash.incrementBy("myhash", "count", 5);
    const countValue = await ExampleRedisHash.get("myhash", "count");
    console.log(countValue); // "15"

// 필드 값 실수로 증가
    await ExampleRedisHash.incrementByFloat("myhash", "count", 2.5);
    const floatValue = await ExampleRedisHash.get("myhash", "count");
    console.log(floatValue); // "17.5"

}

main().catch(err => {
    console.error(err);
    process.exit(1);
});

export {};
