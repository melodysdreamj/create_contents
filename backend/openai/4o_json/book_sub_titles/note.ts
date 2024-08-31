import {requestBookSubTitleGpt4oParsedChat} from "./_";

async function main() {
    console.log("start");

    const subtitles = await requestBookSubTitleGpt4oParsedChat("자기개발책을 쓰는중인데 괜찮은 제목 10개를 물음표로 끝나도록 한국어로 적어줘");
    console.log(subtitles.subtitles);

}

main().catch(err => {
    console.error(err);
    process.exit(1);
});

export {};
