/*
    author:xinglie.lkf@alibaba-inc.com
*/
import Magix, { Magix5 } from '../../lib/magix';
Magix.applyStyle('@index.css');
export default Magix.View.extend({
    tmpl: '@index.html',
    async render() {
        try {
            let raw = await fetch('https://jsonp.afeld.me/?url=http%3A%2F%2Fwallpaper.apc.360.cn%2Findex.php%3Fc%3DWallPaper%26a%3DgetAppsByCategory%26cid%3D9%26start%3D0%26count%3D20%26from%3D360chrome');
            let data = await raw.json();
            let list = [];
            if (data && data.data) {
                list = data.data;
            }
            this.digest({
                list
            });
        } catch{
            this.digest();
        }
    },
    '@{set.url}<click>'(e: Magix5.MagixMouseEvent) {
        let { thumb, src } = e.params;
        let bg = Magix.node('g_bg');
        bg.style.backgroundImage = `url(${thumb})`;
        bg.innerHTML=`<img src="${src}" class="@scoped.style:global-bg"/>`;
    }
});