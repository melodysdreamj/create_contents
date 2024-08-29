import {searchDuckDuckGo} from "./_";


async function main() {
    console.log("start");
    var results = await searchDuckDuckGo('인천 송도');
    console.log(results);

}

main().catch(err => {
    console.error(err);
    process.exit(1);
});

export {};
