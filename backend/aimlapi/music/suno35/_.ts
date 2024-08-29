import path from "path";
import fs from "fs";
import dotenv from "dotenv";
const axios = require('axios');

// Suno 3.5 모델에서 음악을 생성하고 두 개의 URL을 반환하는 함수
export async function generateSuno35MusicUrl(prompt: string): Promise<any[] | null> {
    try {
        dotenv.config();
        console.log("Music generation started");

        const url = 'https://api.aimlapi.com/generate';
        const headers = {
            "Authorization": `Bearer ${process.env.AIMLAPI_KEY}`,
        };
        const payload = {
            'prompt': prompt,
            // 'tags': 'dance, energetic',
            // 'title': 'Dance Track',
            'make_instrumental': false,
            'wait_audio': true,
            'model': 'chirp-v3-5',
        };

        const response = await axios.post(url, payload, { headers: headers });

        // Response data is expected to be audio data in array buffer format.
        if (response.data) {
            // console.log(response.data);
            // console.log(response.data.length);
            console.log("Music generation successful");
            return response.data;  // Return audio data
        } else {
            console.error("No audio data returned from the API");
            return null;
        }
    } catch (err) {
        console.error("Error generating music: ", err);
        return null;
    }
}

// URL에서 음악을 다운로드하고 로컬에 저장하는 함수
export async function downloadAndSaveSuno35Music(audioUrl: string, savePath: string): Promise<string | null> {
    try {
        // 파일의 경로를 설정합니다.
        const filePath = path.resolve(savePath);

        // axios를 사용하여 audio_url에서 바이너리 데이터를 가져옵니다.
        const response = await axios.get(audioUrl, { responseType: 'arraybuffer' });

        // 파일을 mp3로 저장합니다.
        fs.writeFileSync(filePath, response.data);
        console.log(`Audio saved to ${filePath}`);
        return savePath;
    } catch (error) {
        console.error("Error downloading audio:", error);
        return null;
    }
}

// Suno 3.5 음악 생성 후 두 개의 파일로 각각 저장하는 함수
export async function generateSuno35MusicSaveMusic(prompt: string): Promise<void> {
    dotenv.config();

    const audioData = await generateSuno35MusicUrl(prompt);

    if (audioData && audioData.length >= 2) {
        const musicUrl1 = audioData[0].audio_url;
        const musicUrl2 = audioData[1].audio_url;

        console.log(`Music URL 1: ${musicUrl1}`);
        console.log(`Music URL 2: ${musicUrl2}`);

        const savePath1 = path.resolve('./data/music/suno35/output1.mp3');
        const savePath2 = path.resolve('./data/music/suno35/output2.mp3');

        const dirPath1 = path.dirname(savePath1);
        const dirPath2 = path.dirname(savePath2);

        // 폴더가 없으면 생성
        if (!fs.existsSync(dirPath1)) {
            fs.mkdirSync(dirPath1, { recursive: true });
        }
        if (!fs.existsSync(dirPath2)) {
            fs.mkdirSync(dirPath2, { recursive: true });
        }

        // 첫 번째 음악 다운로드 및 저장
        await downloadAndSaveSuno35Music(musicUrl1, savePath1);

        // 두 번째 음악 다운로드 및 저장
        await downloadAndSaveSuno35Music(musicUrl2, savePath2);

    } else {
        console.error("Not enough audio data returned.");
    }
}
