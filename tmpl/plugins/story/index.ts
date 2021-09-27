/*
    author:https://github.com/xinglie
*/
import Magix, { Magix5 } from '../../lib/magix';
import Agent from '../../lib/agent';
import DialogCtrl from '../../os/ctrl';
Magix.applyStyle('@:./index.css');
let extractBooksRegexp = /<h1\s+class="tcleft title">([\s\S]+?)<\/h1>\s*<table class='booklist'>([\S\s]+?)<\/table>/g;
let extractTitleReg = /《([^》]+)》/;
let extractListReg = /<td class="time"><a href="([^"]+)" target="_blank">([\s\S]+?)<\/a><\/td>/g;
let base = 'https://www.92gushi.com/'
let GetCatetoriesAndList = async () => {
    let result = await Agent.request(base, 24 * 60 * 60 * 1000, true, 'gb2312');
    let books = [];
    result.replace(extractBooksRegexp, (_, titleContent, listContent) => {
        let title = '';
        let links = [];
        titleContent.replace(extractTitleReg, (_, t) => title = t);
        listContent.replace(extractListReg, (_, link, text) => {
            links.push({
                link: base + link,
                text
            });
            return _;
        });
        books.push({
            id: Magix.guid('b_'),
            title,
            links
        });
        return _;
    });
    return books;
};
let Options = {
    icon: '<svg viewBox="0 0 1024 1024"><path fill="#ed6d00" d="M1012 262.3v-58.9h-32.5v616.8c-150.7 24.5-288.3 46.7-424.6 68.9.2.5 15.7 32.8 26 33l384.5-.1c16.8-.9 44.6-46.5 46.5-73.4V262.3z"/><path fill="#ed6d00" d="M684 128.8c-98.2 17.8-152.4 65.5-147.8 182.2l.1 540.2c189.9-73.2 388.8-57.7 388.8-57.7l-.3-53.3s.3-413.5.3-638.1c-88 9.2-165.5 13.1-241.1 26.7zM60.2 921.9l382.6.1c10.4-.3 25.9-33 25.9-33.1-136.3-22.1-272-44.3-422.7-68.9V203.5H12v643.3c.8 26.6 31.1 74.3 48.2 75.1zM468.7 889z"/><path fill="#ed6d00" d="M490.7 851.1l.1-540.2c4.7-116.7-49.7-164.4-147.8-182.2-75.6-13.6-153-17.4-241.1-26.8 0 224.5.3 638 .3 638l-.4 53.3c.1.2 199-15.3 388.9 57.9zm64.2 37.9v-.1z"/></svg>',
    appId: 'story_detail',
    width: 500,
    height: 650,
    min: true,
    close: true,
    view: '@:./detail'
};
export default Magix.View.extend({
    tmpl: '@:index.html',
    async render() {
        try {
            let mark = Magix.mark(this, '@:{render}');
            if (mark()) {
                let books = await GetCatetoriesAndList();
                this.digest({
                    selected: books[0].id,
                    books
                });
            }
        } catch (e) {
            this.digest({
                error: e
            });
        }
    },
    '@:{change.category}<click>'(e: Magix5.MagixMouseEvent) {
        let { id } = e.params;
        this.digest({
            selected: id
        });
    },
    '@:{open.details}<click>'(e: Magix5.MagixMouseEvent) {
        let { link, title } = e.params;
        let options = {
            ...Options,
            data: link,
            title
        };
        DialogCtrl["@:{create}"](this, options);
    }
});