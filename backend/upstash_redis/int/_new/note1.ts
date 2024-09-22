import { Redis } from '@upstash/redis'
import dotenv from "dotenv";


async function main() {
    console.log("start");

    dotenv.config();

    const redis = new Redis({
        url: process.env.UPSTASH_URL,
        token: process.env.UPSTASH_TOKEN,
    })

    await redis.set('foo', 'bar');
    const data = await redis.get('foo');
    console.log(data);

}

main().catch(err => {
    console.error(err);
    process.exit(1);
});

export {};
