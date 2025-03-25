
const cheerio = require('cheerio');

module.exports = {
    id: '1stnovel',
    name: '1stNovel',
    site: 'https://1stnovel.com',

    search: async (query) => {
        const url = `https://1stnovel.com/?s=${encodeURIComponent(query)}`;
        const res = await fetch(url);
        const body = await res.text();
        const $ = cheerio.load(body);
        const novels = [];

        $('.post-title a').each((i, elem) => {
            novels.push({
                title: $(elem).text().trim(),
                url: $(elem).attr('href'),
                cover: 'https://1stnovel.com/wp-content/uploads/2023/11/cropped-1stnovel-logo-180x180.png'
            });
        });

        return novels;
    },

    fetchManga: async (url) => {
        const res = await fetch(url);
        const body = await res.text();
        const $ = cheerio.load(body);
        const chapters = [];

        $('.wp-manga-chapter a').each((i, elem) => {
            chapters.unshift({
                name: $(elem).text().trim(),
                url: $(elem).attr('href'),
            });
        });

        return {
            title: $('.post-title h1').text().trim(),
            author: $('.author-content').text().trim(),
            genres: $('.genres-content a').map((i, el) => $(el).text().trim()).get(),
            chapters
        };
    },

    fetchChapter: async (url) => {
        const res = await fetch(url);
        const body = await res.text();
        const $ = cheerio.load(body);
        return $('.reading-content').html();
    }
};
