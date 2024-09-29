import {ExampleRedisSet} from "./_";

async function main() {
    console.log("start");

// Set에 값 추가
    await ExampleRedisSet.add("myset", "value1");
    await ExampleRedisSet.add("myset", "value2");

// Set 조회
    const members = await ExampleRedisSet.getMembers("myset");
    console.log(members); // ["value1", "value2"]

// 특정 값이 Set에 존재하는지 확인
    const isMember = await ExampleRedisSet.isMember("myset", "value1");
    console.log(isMember); // true

// Set에서 값 제거
    await ExampleRedisSet.remove("myset", "value2");
    const updatedMembers = await ExampleRedisSet.getMembers("myset");
    console.log(updatedMembers); // ["value1"]

// Set의 크기 확인
    const size = await ExampleRedisSet.size("myset");
    console.log(size); // 1

// Set 삭제
    await ExampleRedisSet.delete("myset");

// 교집합 구하기
    await ExampleRedisSet.add("set1", "apple");
    await ExampleRedisSet.add("set1", "banana");
    await ExampleRedisSet.add("set2", "banana");
    await ExampleRedisSet.add("set2", "cherry");

    const intersection = await ExampleRedisSet.intersect(["set1", "set2"]);
    console.log(intersection); // ["banana"]

// 합집합 구하기
    const unionSet = await ExampleRedisSet.union(["set1", "set2"]);
    console.log(unionSet); // ["apple", "banana", "cherry"]

// 차집합 구하기
    const differenceSet = await ExampleRedisSet.difference(["set1", "set2"]);
    console.log(differenceSet); // ["apple"]


}

main().catch(err => {
    console.error(err);
    process.exit(1);
});

export {};
