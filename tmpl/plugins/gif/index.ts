/*
    author:xinglie.lkf@alibaba-inc.com
*/
import Magix from '../../lib/magix';
import XAgent from '../../lib/agent';
Magix.applyStyle('@index.less');
let Sina = {
    '@{init}'() {
        this['@{current}'] = 1;
        this['@{dest.url}'] = 'https://interface.sina.cn/tech/gif/album.d.json?format=json&num=20&page=';
    },
    '@{request}'() {
        let dest = this['@{dest.url}'];
        let current = this['@{current}']++;
        return new Promise(async resolve => {
            let list = [];
            try {
                let result = await XAgent.request(dest + current, 0, true);
                let data = JSON.parse(result);
                if (data.data) {
                    for (let e of data.data) {
                        list.push({
                            name: e.name,
                            img: e.img_url,
                            date: e.createtime,
                            from: '新浪趣图'
                        });
                    }
                }
            } catch{

            }
            resolve(list);
        });
    }
};
let Gaoxiao = {
    '@{init}'() {
        this['@{current}'] = 1;
        this['@{dest.url}'] = 'http://www.gaoxiaogif.com/';
    },
    '@{request}'() {
        let dest = this['@{dest.url}'];
        let current = this['@{current}']++;
        return new Promise(async resolve => {
            let tail = '';
            if (current > 1) {
                tail = `index_${current}.html`;
            }
            let list = [];
            try {
                let result = await XAgent.request(dest + tail, 0, true);
                let reg = /'pic':'([^']+)','text':'([^']+)'[\s\S]+?<i\s+class="icon-clock"><\/i>([0-9\-]+)/g;
                result.replace(reg, (m, img, name, date) => {
                    list.push({
                        name: '',//不支持charset gb2312
                        img,
                        date,
                        from: '搞笑GIF图片集'
                    });
                    return '';
                });
            } catch{

            }
            resolve(list);
        });
    }
};
let Quicklol = {
    '@{init}'() {
        this['@{current}'] = 1;
        this['@{dest.url}'] = 'http://quicklol.com/';
    },
    '@{request}'() {
        let dest = this['@{dest.url}'];
        let current = this['@{current}']++;
        return new Promise(async resolve => {
            let tail = '';
            if (current > 1) {
                tail = `page/${current}/`;
            }
            let list = [];
            try {
                let result = await XAgent.request(dest + tail, 0, true);
                let reg = /<img[\s\S]+?class="[^"]+?wp-image-\d+"\s+src="([^"]+)"[\s\S]+?data-a2a-title="([^"]+)"/g;
                result.replace(reg, (m, img, name) => {
                    list.push({
                        name,
                        img,
                        from: 'quicklol.com'
                    });
                    return '';
                });
            } catch{

            }
            resolve(list);
        });
    }
};
// let Giphy = {
//     '@{init}'() {
//         this['@{current}'] = 1;
//         this['@{dest.url}'] = 'https://giphy.com/search/funny/${0}?is=1&json=true';
//     },
//     '@{request}'() {
//         let dest = this['@{dest.url}'];
//         let current = this['@{current}']++;
//         return new Promise(async resolve => {
//             let list = [];
//             try {
//                 dest = dest.replace('${0}', current);
//                 let result = await XAgent.request(dest, 0, true);
//                 let data = JSON.parse(result);
//                 if (data.gifs) {
//                     for (let e of data.gifs) {
//                         list.push({
//                             name: e.title,
//                             img: e.images.original.webp,
//                             date: e.update_datetime,
//                             from: 'giphy.com'
//                         });
//                     }
//                 }
//             } catch{

//             }
//             resolve(list);
//         });
//     }
// };
let Pools = [Gaoxiao, Sina, Quicklol];
export default Magix.View.extend({
    tmpl: '@index.html',
    init() {
        for (let src of Pools) {
            src['@{init}']();
        }
        this.set({
            list: []
        });
    },
    assign() {
        return false;
    },
    async render() {
        let index = Math.floor(Math.random() * Pools.length);
        let source = Pools[index];
        let result = await source["@{request}"]() as [];
        let list = this.get('list');
        list.push(...result);
        this.digest({
            list
        });
        delete this['@{data.loading}'];
    },
    '$win<scroll>&capture'(e) {
        if (e.target == this.root &&
            !this['@{data.loading}']) {
            let node = this.root;
            if (node.scrollTop + node.offsetHeight + 500 > node.scrollHeight) {
                console.log('loading...');
                this['@{data.loading}'] = 1;
                this.render();
            }
        }
    }
});