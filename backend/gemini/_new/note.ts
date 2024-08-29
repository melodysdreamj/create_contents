async function main() {
    console.log("start");
}

main().catch(err => {
    console.error(err);
    process.exit(1);
});

export {};
