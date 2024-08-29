import { SitemapStream, streamToPromise } from "sitemap";
import {resolve} from "path";
import {createWriteStream} from "fs";
// import { createGzip } from "zlib";

async function run() {
    console.log("start");


    // const { createReadStream, createWriteStream } = require('fs');
    // const { resolve } = require('path');
    // const { createGzip } = require('zlib')
    const {
        simpleSitemapAndIndex,
        lineSeparatedURLsToSitemapOptions
    } = require('sitemap')


    let urlList = []
    for(let i = 0; i < 300; i++) {
        urlList.push({url: `https://naver.com/${i}`, changefreq: 'monthly'})
    }
    const sitemapPath = resolve('./data/managing_sitemap', 'sitemap.xml');
    const writeStream = createWriteStream(sitemapPath);
    const sitemapStream = new SitemapStream({ hostname: 'https://naver.com' });

    sitemapStream.pipe(writeStream);

    urlList.forEach(url => sitemapStream.write(url));
    sitemapStream.end();

    streamToPromise(sitemapStream).then(() => {
        console.log('done');
    }).catch((err) => {
        console.error('Error creating sitemap:', err);
    });
}

async function usage() {
    return await run()
}


usage().catch((err) => {
    console.error(err)
    process.exit(1)
})

export {}