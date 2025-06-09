import { New, NewQdrant } from "./_";

async function main() {
    console.log("start");

    await NewQdrant.reset(); // Start with a clean slate

    try {
        const new1 = new New();
        new1.text = "저는 딸기를 좋아합니다"
        const new2 = new New();
        new2.text = "자동차는 전기로 충전합니다"
        const new3 = new New();
        new3.text = "에펠탑은 프랑스에 있습니다"

        await NewQdrant.upsertMany([new1, new2, new3]);

        const result1 = await NewQdrant.get(new1.docId);
        console.log(`result1: ${result1?.text}`);

        const result2 = await NewQdrant.search("딸기", 5);
        console.log(`result2: ${result2.map(r => r.text).join(", ")}`);

        await NewQdrant.delete(new1.docId);

        const results = await NewQdrant.getAll();
        console.log(`results: ${results.map(r => r.text).join(", ")}`);

    } finally {
        // Ensure the collection is cleaned up even if errors occur
        await NewQdrant.reset();
    }
}

main().catch(err => {
    console.error(err);
    process.exit(1);
});

export {};
