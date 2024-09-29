import {ExampleRedisList} from "./_";

async function main() {
    console.log("start");

// 리스트 저장 (새 리스트로 업서트)
    await ExampleRedisList.upsert("mylist", ["item1", "item2", "item3"]);

// 리스트 조회
    const list = await ExampleRedisList.get("mylist");
    console.log(list); // ["item1", "item2", "item3"]

// 리스트의 왼쪽에 값 추가
    await ExampleRedisList.lpush("mylist", "newItem");
    const updatedList = await ExampleRedisList.get("mylist");
    console.log(updatedList); // ["newItem", "item1", "item2", "item3"]

// 리스트 삭제
    await ExampleRedisList.delete("mylist");

}

main().catch(err => {
    console.error(err);
    process.exit(1);
});

export {};
