/*
    author:https://github.com/xinglie
*/
import Magix, { Magix5 } from '../../lib/magix';
import Wallpapger from '../../os/wallpaper';
import XAgent from '../../lib/agent';
Magix.applyStyle('@:index.css');
let Categories = null;
let CategoriesPending = 0;
let CategoriesPendingList = [];
let GetCategories = () => {
    return new Promise(async (resolve, reject) => {
        if (Categories) {
            resolve(Categories);
        } else if (CategoriesPending) {
            CategoriesPendingList.push([resolve, reject]);
        } else {
            CategoriesPending = 1;
            CategoriesPendingList.push([resolve, reject]);
            try {
                let result = await XAgent.request('http://wallpaper.apc.360.cn/index.php?c=WallPaperAndroid&a=getAllCategories', 24 * 60 * 60 * 1000, true);
                let data = JSON.parse(result);
                CategoriesPending = 0;
                for (let [resolve] of CategoriesPendingList) {
                    resolve(Categories = data.data);
                }
            } catch (ex) {
                CategoriesPending = 0;
                for (let [, reject] of CategoriesPendingList) {
                    reject(ex);
                }
            };
        }
    });
};
let GetWallPaper = async (cId, start, count) => {
    let result = await XAgent.request(`http://wallpaper.apc.360.cn/index.php?c=WallPaper&a=getAppsByCategory&cid=${cId}&start=${start}&count=${count}`, 0, true);
    let data = JSON.parse(result) as {
        data: []
    };
    return data;
};
let maxWidth = 350,
    maxHeight = 200;
let Resize = size => {
    let parts = size.split('x');
    let w = parts[0] | 0;
    let h = parts[1] | 0;
    let wr = maxWidth / w;
    let hr = maxHeight / h;
    let r = wr > hr ? hr : wr;
    return {
        width: (w * r) | 0,
        height: (h * r) | 0
    };
};
export default Magix.View.extend({
    tmpl: '@:index.html',
    init() {
        this.set({
            size: 20,
            start: 0,
            list: [],
            resize: Resize
        });
    },
    assign() {
        return false;
    },
    async render() {
        try {
            let categories = await GetCategories();
            let cId = this.get('cId');
            let mark = Magix.mark(this, '@:{render}');
            if (!cId) {
                cId = categories[0].id;
            }
            let start = this.get('start');
            let list = this.get('list');
            let size = this.get('size');
            let wrap = await GetWallPaper(cId, start, size);
            if (mark()) {
                list.push(...wrap.data);
                this.digest({
                    cId,
                    loading: false,
                    cats: categories,
                    list
                });
            }
        } catch (ex) {
            this.digest({
                error: ex
            });
        }
        delete this['@:{data.loading}'];
    },
    '@:{change.category}<click>'(e: Magix5.MagixMouseEvent) {
        let { id } = e.params;
        this.digest({
            list: [],
            loading: true,
            start: 0,
            cId: id
        });
        this.root.scrollTop = 0;
        this.render();
    },
    '@:{set.url}<click>'(e: Magix5.MagixMouseEvent) {
        let { thumb, src } = e.params;
        Wallpapger["@:{set.wallpaper}"](thumb, src);
    },
    '@:{load.more}<intersect>'() {
        if (!this.get('loading') &&
            !this['@:{data.loading}']) {
            this['@:{data.loading}'] = 1;
            let next = this.get('start') + this.get('size');
            this.set({
                start: next
            });
            this.render();
        }
    }
});