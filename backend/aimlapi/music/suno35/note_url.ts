import { generateSuno35MusicUrl } from "./_"; // 실제 경로로 수정
import dotenv from "dotenv";

async function main() {
    console.log("start");

    try {
        dotenv.config();

        // 음악 생성 및 두 개의 URL을 받아옴
        let audioData = await generateSuno35MusicUrl("A happy and upbeat song");

        console.log(`audioData: ${audioData}`);

        // 두 개의 URL이 반환되었는지 확인
        if (audioData && audioData.length >= 2) {
            let musicUrl1 = audioData[0].audio_url;
            let musicUrl2 = audioData[1].audio_url;

            console.log("Generated music URL 1: ", musicUrl1);
            console.log("Generated music URL 2: ", musicUrl2);
        } else {
            console.error("Not enough audio data returned.");
        }
    } catch (err) {
        console.error(err);
        process.exit(1);
    }

    console.log("end");
}

main().catch(err => {
    console.error(err);
    process.exit(1);
});
