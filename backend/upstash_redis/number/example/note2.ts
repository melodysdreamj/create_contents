import {ExampleRedisNumber} from "./_";

async function main() {
    console.log("start");

    await ExampleRedisNumber.upsert("foo2", 123.321);

    const data = await ExampleRedisNumber.get('foo2');
    console.log(data);
}

main().catch(err => {
    console.error(err);
    process.exit(1);
});

export {};
