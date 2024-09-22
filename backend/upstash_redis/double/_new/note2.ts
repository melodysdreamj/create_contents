async function main() {
    console.log("start");

    // 하나의 숫자를 1억번 증가시키고 실행시간 측정

    var num = 0;
    var start = new Date().getTime();
    for (let i = 0; i < 1000000000; i++) {
        num++;
    }
    console.log(num);
    var end = new Date().getTime();
    console.log("Execution Time: ", end-start);
}

main().catch(err => {
    console.error(err);
    process.exit(1);
});

export {};
