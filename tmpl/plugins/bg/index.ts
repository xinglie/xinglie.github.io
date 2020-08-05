/*
    author:xinglie.lkf@alibaba-inc.com
*/
import Magix, { Magix5 } from '../../lib/magix';
import Wallpapger from '../../os/wallpaper';
import XAgent from '../../lib/agent';
import Cron from '../../lib/cron';
Magix.applyStyle('@:index.css');
let Host = 'http://wallpaper.apc.360.cn/index.php?c=WallPaper&a=getAppsByCategory&cid=9&count=40&from=360chrome&start=';
let StartTime = 30 * 60 * 1000;
let ListTime = 1 * 60 * 60 * 1000;
let GetLast = () => {
    let start = Math.floor(400 * Math.random());
    let cache = localStorage.getItem('ls#bg.random');
    let last = 0,
        exist = 0;
    if (cache) {
        let o = JSON.parse(cache);
        if (o['@:{expire}'] > Date.now()) {
            start = o['@:{start}'];
            exist = 1;
        } else {
            last = o['@:{start}'];
        }
    }
    return {
        exist,
        start,
        last
    }
};
export default Magix.View.extend({
    tmpl: '@:index.html',
    assign() {
        return false;
    },
    async render() {
        try {
            let { start, last, exist } = GetLast();
            XAgent.clear(Host + last, true);
            console.log(start, last, exist);
            if (!exist) {
                localStorage.setItem('ls#bg.random', JSON.stringify({
                    '@:{expire}': StartTime + Date.now(),
                    '@:{start}': start
                }));
            }
            let result = await XAgent.request(Host + start, ListTime, true);
            let data = JSON.parse(result);
            let list = [];
            if (data && data.data) {
                list = data.data;
            }
            this.digest({
                list
            });
            this['@:{start.random}'](list);
        } catch{
            this.digest();
        }
    },
    '@:{start.random}'(list) {
        if (!this['@:{random.started}']) {
            this['@:{random.started}'] = 1;
            let work = () => {
                let rdm = Math.floor(Math.random() * list.length);
                let one = list[rdm];
                let src = one.url;
                let thumb = src.replace('bdr/__85', 'bdr/200_120_60');
                Wallpapger["@:{set.wallpaper}"](thumb, src);
            };
            //1小时自动换一次壁纸
            Cron["@:{add.task}"](work, 4 * 60 * 60 * 1000, true);
            this.on('destroy', () => {
                Cron["@:{remove.task}"](work);
            });
        }
    },
    '@:{set.url}<click>'(e: Magix5.MagixMouseEvent) {
        let { thumb, src } = e.params;
        Wallpapger["@:{set.wallpaper}"](thumb, src);
    }
});