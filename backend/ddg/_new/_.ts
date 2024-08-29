import axios from 'axios';
import * as cheerio from 'cheerio';

// 검색어를 인자로 받아 덕덕고에서 검색 결과를 가져오는 함수
export async function searchDuckDuckGo(query: string) {
    try {
        // 덕덕고 검색 URL
        const url = `https://duckduckgo.com/html/?q=${encodeURIComponent(query)}`;

        // HTTP GET 요청으로 HTML 데이터 가져오기
        const { data } = await axios.get(url);

        // Cheerio를 이용해 HTML 파싱
        const $ = cheerio.load(data);

        // 검색 결과를 저장할 배열
        const results: { title: string; link: string }[] = [];

        // 검색 결과를 선택하고 배열에 저장
        $('a.result__a').each((i, element) => {
            const title = $(element).text();
            const link = $(element).attr('href') || '';
            results.push({ title, link });
        });

        return results;
    } catch (error) {
        console.error('Error searching DuckDuckGo:', error);
    }
}