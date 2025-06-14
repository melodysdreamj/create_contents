import urlParser from 'js-video-url-parser';

async function main() {
    console.log("start");

    let videoInfo = urlParser.parse('https://www.youtube.com/watch?v=HRb7B9fPhfA');
    console.log('1:' , videoInfo);

    videoInfo = urlParser.parse('https://www.youtube.com/embed/BOr-RKGHOJ8?autoplay=1&loop=1&mute=1&playsinline=1&playlist=BOr-RKGHOJ8');
    console.log('2:', videoInfo);

    videoInfo = urlParser.parse('https://www.invalidlink.com');
    console.log('3:', videoInfo);

    videoInfo = urlParser.parse('https://www.youtube.com/watch?v=dQw4w9WgXcQ');
    console.log('4:', videoInfo);

    videoInfo = urlParser.parse('https://youtu.be/dQw4213w9WgXcQ213');
    console.log('5:', videoInfo);

    videoInfo = urlParser.parse('https://www.youtube.com/watch?v=dQw4w9WgXcQ&t=45s');
    console.log('6:', videoInfo);

    videoInfo = urlParser.parse('https://www.youtube.com/playlist?list=PLl-K7zZEsYLmnJ_FpMOZgyg6XcIGBu2OX');
    console.log('7:', videoInfo);

    videoInfo = urlParser.parse('https://www.youtube.com/watch?v=dQw4w9WgXcQ&list=PLl-K7zZEsYLmnJ_FpMOZgyg6XcIGBu2OX&index=3');
    console.log('8:', videoInfo);

    videoInfo = urlParser.parse('https://www.youtube.com/channel/UC_x5XG1OV2P6uZZ5FSM9Ttw');
    console.log('9:', videoInfo);

    videoInfo = urlParser.parse('https://www.youtube.com/c/GoogleDevelopers');
    console.log('10:', videoInfo);

    videoInfo = urlParser.parse('https://www.youtube.com/watch?v=dQw4w9WgXcQ&live');
    console.log('11:', videoInfo);

    videoInfo = urlParser.parse('https://www.youtube.com/watch?v=dQw4w9WgXcQ&start=60&end=120');
    console.log('12:', videoInfo);

    videoInfo = urlParser.parse('https://www.youtube.com/results?search_query=cat+videos');
    console.log('13:', videoInfo);

    videoInfo = urlParser.parse('https://www.youtube.com/shorts/dQw4w9WgXcQ');
    console.log('14:', videoInfo);

    videoInfo = urlParser.parse('https://www.youtube.com/post/abc12345');
    console.log('15:', videoInfo);
}

main().catch(err => {
    console.error(err);
    process.exit(1);
}).finally(async () => {});;

export {};
