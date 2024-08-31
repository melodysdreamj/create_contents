import { requestBookSubTitleGpt4oParsedChat } from "../../backend/openai/4o_json/book_sub_titles/_";
import { requestGpt4oChat } from "../../backend/openai/4o/_new/_";
import { Book, BookSqlite } from "../../backend/sqlite/book/_";
import { Document, Packer, Paragraph, HeadingLevel } from "docx";
import * as fs from "fs";

async function main() {
    console.log("start");

    // 데이터베이스에서 모든 책의 제목과 내용 가져오기
    let titleAndContents = await BookSqlite.getAll();

    // 책 제목과 내용을 문서에 추가하기 위해 섹션을 생성
    const sections = titleAndContents.map((titleAndContent) => {
        const title = titleAndContent.title;
        const content = titleAndContent.contents;

        // 본문 내용을 두 번의 줄바꿈으로 구분된 단락으로 분리
        const paragraphs = content.split("\n").map((paragraph) =>
            new Paragraph(paragraph.trim()) // 각 단락을 개별 Paragraph로 생성
        );

        // 본문이 끝났을 때 두 개의 빈 줄 추가
        paragraphs.push(new Paragraph("")); // 빈 줄 하나 추가
        paragraphs.push(new Paragraph("")); // 빈 줄 두 개 추가
        paragraphs.push(new Paragraph("")); // 빈 줄 세 개 추가

        // 문서에 추가할 소제목과 내용
        return [
            new Paragraph({
                text: title,
                heading: HeadingLevel.HEADING_2, // 워드 문서에서 소제목 형식
            }),
            ...paragraphs, // 본문 내용 추가 (각 단락이 개별 Paragraph 객체로 추가됨)
        ];
    }).flat(); // 모든 소제목과 내용을 단일 배열로 합침

    // 문서 생성 시 메타데이터와 섹션 포함
    const doc = new Document({
        sections: [
            {
                properties: {},
                children: sections, // 문서의 섹션을 설정
            },
        ],
        creator: "Author Name",  // 문서 작성자 이름 설정
        title: "Complete Book Document",
        description: "A document containing a list of books and their contents",
    });

    // 워드 문서 저장
    const buffer = await Packer.toBuffer(doc); // static 메서드로 변경

    fs.writeFileSync("./data/docs/Complete_Book_Document.docx", buffer);

    console.log("Document created successfully.");
}

main().catch((err) => {
    console.error(err);
    process.exit(1);
});

export {};
