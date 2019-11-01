/*
    author:xinglie.lkf@alibaba-inc.com
*/
'ref@./index.less';
import Magix from '../../lib/magix';
import XAgent from '../../lib/agent';
let ExtractReg = /<a\s+href="(\/html\/gndy\/dyzz[^"]+)"\s+class="unlink"[^>]*>*([\s\S]+?)<\/a>[\s\S]*?<font[^>]*>日期：([^\s]+)/g;
let VideoInfoServer1 = 'https://www.xiaopian.com';
let VideoInfoServer2 = 'https://www.dytt8.net';
let Page = '/html/gndy/dyzz/index.html';
export default Magix.View.extend({
    tmpl: '@dytt.html',
    async  render() {
        let mark = Magix.mark(this, '@{render}');
        let [result1, result2] = await Promise.all([
            XAgent.request(VideoInfoServer1 + Page, 0, true),
            XAgent.request(VideoInfoServer2 + Page, 0, true)
        ]);
        if (mark()) {
            let videos = [];
            let videos1 = [];
            let videos2 = [];
            result1.replace(ExtractReg, (m, link, title, date) => {
                videos1.push({
                    link: VideoInfoServer1 + link,
                    title,
                    date
                });
                return '';
            });
            result2.replace(ExtractReg, (m, link, title, date) => {
                videos2.push({
                    link: VideoInfoServer1 + link,
                    title,
                    date
                });
                return '';
            });
            let max = videos1.length + videos2.length;
            for (let i = 0; i < max; i++) {
                let r = Math.floor(Math.random() * 2),
                    e;
                if (r == 0) {
                    e = videos1.pop();
                } else {
                    e = videos2.pop();
                }
                if (!e) {
                    e = videos1.length ? videos1.pop() : videos2.pop();
                }
                videos.push(e);
            }
            this.digest({
                videos
            });
        }
    }
});