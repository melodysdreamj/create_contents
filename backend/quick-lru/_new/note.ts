import { New, NewQuickLRU } from './_';

async function main() {
    console.log("start");

    let obj1 = new New();
    obj1.docId = "123";

    let result1 = NewQuickLRU.get("123");
    console.log(result1);

    let result2 = NewQuickLRU.isExist("123");
    console.log(result2);

    NewQuickLRU.set(obj1);

    let result3 = NewQuickLRU.get("123");
    console.log(result3);

    let result4 = NewQuickLRU.isExist("123");
    console.log(result4);

    // 2000개 추가하고 다시 콘솔찍어보기
    for (let i = 0; i < 2000; i++) {
        let obj = new New();
        obj.docId = i.toString();
        NewQuickLRU.set(obj);
    }

    let result5 = NewQuickLRU.get("123");
    console.log(result5);




}

main().catch(err => {
    console.error(err);
    process.exit(1);
}).finally(async () => {});;

export { };
