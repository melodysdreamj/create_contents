import urlParser from 'js-video-url-parser';
import { channelId, videoId } from '@gonetone/get-youtube-id-by-url';

async function main() {
    console.log("start");

    let videoInfo = await videoId('https://www.youtube.com/watch?v=HRb7B9fPhfA');
    console.log('1:' , videoInfo);

    videoInfo = await videoId('https://www.youtube.com/embed/BOr-RKGHOJ8?autoplay=1&loop=1&mute=1&playsinline=1&playlist=BOr-RKGHOJ8');
    console.log('2:', videoInfo);

    videoInfo = await videoId('https://www.invalidlink.com');
    console.log('3:', videoInfo);

    videoInfo = await videoId('https://www.youtube.com/watch?v=dQw4w9WgXcQ');
    console.log('4:', videoInfo);

    videoInfo = await videoId('https://youtu.be/dQw4213w9WgXcQ213');
    console.log('5:', videoInfo);

    videoInfo = await videoId('https://www.youtube.com/watch?v=dQw4w9WgXcQ&t=45s');
    console.log('6:', videoInfo);

    videoInfo = await videoId('https://www.youtube.com/playlist?list=PLl-K7zZEsYLmnJ_FpMOZgyg6XcIGBu2OX');
    console.log('7:', videoInfo);

    videoInfo = await videoId('https://www.youtube.com/watch?v=dQw4w9WgXcQ&list=PLl-K7zZEsYLmnJ_FpMOZgyg6XcIGBu2OX&index=3');
    console.log('8:', videoInfo);

    videoInfo = await videoId('https://www.youtube.com/channel/UC_x5XG1OV2P6uZZ5FSM9Ttw');
    console.log('9:', videoInfo);

    videoInfo = await videoId('https://www.youtube.com/c/GoogleDevelopers');
    console.log('10:', videoInfo);

    videoInfo = await videoId('https://www.youtube.com/watch?v=dQw4w9WgXcQ&live');
    console.log('11:', videoInfo);

    videoInfo = await videoId('https://www.youtube.com/watch?v=dQw4w9WgXcQ&start=60&end=120');
    console.log('12:', videoInfo);

    videoInfo = await videoId('https://www.youtube.com/results?search_query=cat+videos');
    console.log('13:', videoInfo);

    videoInfo = await videoId('https://www.youtube.com/shorts/dQw4w9WgXcQ');
    console.log('14:', videoInfo);

    videoInfo = await videoId('https://www.youtube.com/post/abc12345');
    console.log('15:', videoInfo);
}

main().catch(err => {
    console.error(err);
    process.exit(1);
}).finally(async () => {});;

export {};
