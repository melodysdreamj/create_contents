import {ExampleRedisNumber} from "./_";

async function main() {
    console.log("start");

    await ExampleRedisNumber.upsert("foo", 123);

    const data = await ExampleRedisNumber.increment('foo');
    console.log(data);
}

main().catch(err => {
    console.error(err);
    process.exit(1);
});

export {};
