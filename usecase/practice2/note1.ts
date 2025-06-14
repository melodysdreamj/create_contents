import {requestBookSubTitleGpt4oParsedChat} from "../../backend/openai/4o_json/book_sub_titles/_";
import {requestGpt4oChat} from "../../backend/openai/4o/_new/_";
import {Book, BookSqlite} from "../../backend/sqlite/book/_";

async function main() {
    console.log("start");

    let titles = (await requestBookSubTitleGpt4oParsedChat("자기개발책을 쓰는중인데 괜찮은 제목 5개를 물음표로 끝나도록 한국어로 적어줘")).subtitles;

    console.log(titles);

    for(let title of titles) {
        console.log(title);

        const content = await requestGpt4oChat(`"${title}"를 제목으로 자기개발 본문을 작성해줘. 마크다운문법등은 사용하지말고 3~4문단으로 읽기 쉽게 만들어줘`) ?? '';
        console.log(content);

        const bookObj = new Book();
        bookObj.title = title;
        bookObj.contents = content;

        await BookSqlite.upsert(bookObj);


    }

}

main().catch(err => {
    console.error(err);
    process.exit(1);
}).finally(async () => {});;

export {};
