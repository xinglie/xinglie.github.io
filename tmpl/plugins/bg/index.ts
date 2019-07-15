/*
    author:xinglie.lkf@alibaba-inc.com
*/
import Magix, { Magix5 } from '../../lib/magix';
import Wallpapger from '../../os/wallpaper';
import Fetch from '../../lib/fetch';
Magix.applyStyle('@index.css');
let Host = 'https://jsonp.afeld.me/?url=http%3A%2F%2Fwallpaper.apc.360.cn%2Findex.php%3Fc%3DWallPaper%26a%3DgetAppsByCategory%26cid%3D9%26count%3D20%26from%3D360chrome%26start%3D';
let StartTime = 30 * 60 * 1000;
let ListTime = 1 * 60 * 60 * 1000;
let GetLast = () => {
    let start = Math.floor(200 * Math.random());
    let cache = localStorage.getItem('ls#bg.random');
    let last = 0,
        exist = 0;
    if (cache) {
        let o = JSON.parse(cache);
        if (o['@{expire}'] > Date.now()) {
            start = o['@{start}'];
            exist = 1;
        } else {
            last = o['@{start}'];
        }
    }
    return {
        exist,
        start,
        last
    }
};
export default Magix.View.extend({
    tmpl: '@index.html',
    async render() {
        try {
            let { start, last, exist } = GetLast();
            Fetch.clear(Host + last, ListTime);
            console.log(start, last, exist);
            if (!exist) {
                localStorage.setItem('ls#bg.random', JSON.stringify({
                    '@{expire}': StartTime + Date.now(),
                    '@{start}': start
                }));
            }
            let data = await Fetch(Host + start, ListTime);
            let list = [];
            if (data && data.data) {
                list = data.data;
            }
            this.digest({
                list
            });
            // let rdm = Math.floor(Math.random() * list.length);
            // let one = list[rdm];
            // let src = one.url;
            // let thumb = src.replace('bdr/__85', 'bdr/200_120_60');
            // Wallpapger["@{set.wallpaper}"](thumb, src);
        } catch{
            this.digest();
        }
    },
    '@{set.url}<click>'(e: Magix5.MagixMouseEvent) {
        let { thumb, src } = e.params;
        Wallpapger["@{set.wallpaper}"](thumb, src);
    }
});