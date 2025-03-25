
const cheerio = require('cheerio');

module.exports = {
    id: '1stnovel',
    name: '1stNovel',
    site: 'https://1stnovel.com',

    search: async (query) => {
        const url = `https://1stnovel.com/search?keyword=${encodeURIComponent(query)}`;
        const res = await fetch(url);
        const body = await res.text();
        const $ = cheerio.load(body);
        const novels = [];

        $('.novel-item').each((i, elem) => {
            novels.push({
                title: $(elem).find('.novel-title').text().trim(),
                url: $(elem).find('a').attr('href'),
                cover: $(elem).find('img').attr('src'),
            });
        });

        return novels;
    },

    fetchManga: async (url) => {
        const res = await fetch(url);
        const body = await res.text();
        const $ = cheerio.load(body);
        const chapters = [];

        $('.chapter-list a').each((i, elem) => {
            chapters.push({
                name: $(elem).text().trim(),
                url: $(elem).attr('href'),
            });
        });

        return {
            title: $('h1.novel-title').text().trim(),
            author: $('.novel-author').text().trim(),
            genres: $('.novel-genres').text().trim().split(','),
            chapters
        };
    },

    fetchChapter: async (url) => {
        const res = await fetch(url);
        const body = await res.text();
        const $ = cheerio.load(body);
        return $('.chapter-content').html();
    }
};
