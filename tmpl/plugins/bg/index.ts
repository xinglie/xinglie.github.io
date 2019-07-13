/*
    author:xinglie.lkf@alibaba-inc.com
*/
import Magix, { Magix5 } from '../../lib/magix';
import Wallpapger from '../../os/wallpaper';
Magix.applyStyle('@index.css');
export default Magix.View.extend({
    tmpl: '@index.html',
    async render() {
        try {
            let start = Math.floor(100 * Math.random());
            let raw = await fetch('https://jsonp.afeld.me/?url=http%3A%2F%2Fwallpaper.apc.360.cn%2Findex.php%3Fc%3DWallPaper%26a%3DgetAppsByCategory%26cid%3D9%26start%3D' + start + '%26count%3D20%26from%3D360chrome');
            let data = await raw.json();
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