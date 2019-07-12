/*
    author:xinglie.lkf@alibaba-inc.com
*/
import Magix, { Magix5 } from '../../lib/magix';
Magix.applyStyle('@index.css');
let Categories = null;
let CategoriesPending = 0;
let CategoriesPendingList = [];
let GetCategories = () => {
    return new Promise((resolve, reject) => {
        if (Categories) {
            resolve(Categories);
        } else if (CategoriesPending) {
            CategoriesPendingList.push([resolve, reject]);
        } else {
            CategoriesPending = 1;
            CategoriesPendingList.push([resolve, reject]);
            fetch('https://jsonp.afeld.me/?url=http%3A%2F%2Fwallpaper.apc.360.cn%2Findex.php%3Fc%3DWallPaperAndroid%26a%3DgetAllCategories').then(r => r.json()).then(data => {
                CategoriesPending = 0;
                for (let [resolve] of CategoriesPendingList) {
                    resolve(Categories = data.data);
                }
            }).catch(ex => {
                CategoriesPending = 0;
                for (let [, reject] of CategoriesPendingList) {
                    reject(ex);
                }
            });
        }
    });
};
let GetWallPaper = (cId, start, count) => {
    return fetch(`https://jsonp.afeld.me/?url=${encodeURIComponent(`http://wallpaper.apc.360.cn/index.php?c=WallPaper&a=getAppsByCategory&cid=${cId}&start=${start}&count=${count}`)}`).then(r => r.json()) as Promise<{
        data: []
    }>;
};
export default Magix.View.extend({
    tmpl: '@index.html',
    init() {
        this.set({
            size: 20,
            start: 0,
            list: []
        });
    },
    async render() {
        try {
            let categories = await GetCategories();
            let cId = this.get('cId');
            let mark = Magix.mark(this, '@{render}');
            if (!cId) {
                cId = categories[0].id;
            }
            let start = this.get('start');
            let list = this.get('list');
            let size = this.get('size');
            let wrap = await GetWallPaper(cId, start, size);
            if (mark()) {
                list.push(...wrap.data);
                delete this['@{data.loading}'];
                this.digest({
                    cId,
                    loading: false,
                    cats: categories,
                    list
                });
            }
        } catch (ex) {
            delete this['@{data.loading}'];
            this.digest({
                error: ex
            });
        }
    },
    '@{change.category}<click>'(e: Magix5.MagixMouseEvent) {
        let { id } = e.params;
        this.digest({
            list: [],
            loading: true,
            cId: id
        });
        this.root.scrollTop = 0;
        this.render();
    },
    '@{set.url}<click>'(e: Magix5.MagixMouseEvent) {
        let { thumb, src } = e.params;
        let bg = Magix.node('g_bg');
        bg.style.backgroundImage = `url(${thumb})`;
        bg.innerHTML=`<img src="${src}" class="@scoped.style:global-bg"/>`;
    },
    '$win<scroll>&capture'(e) {
        if (e.target == this.root &&
            !this['@{data.loading}']) {
            let node = this.root;
            if (node.scrollTop + node.offsetHeight + 200 > node.scrollHeight) {
                this['@{data.loading}'] = 1;
                let next = this.get('start') + this.get('size');
                this.set({
                    start: next
                });
                this.render();
            }
        }
    }
});