/*
    author:xinglie.lkf@alibaba-inc.com
*/
import Magix from '../../lib/magix';
import XAgent from '../../lib/agent';
Magix.applyStyle('@:index.less');
let FindBestPage = (max, requested) => {
    let current;
    do {
        current = Math.ceil(Math.random() * max);
    } while (requested[current] === 1);
    requested[current] = 1;
    return current;
};
let Sort = (a, b) => a.w - b.w;
let Sina = {
    '@:{init}'() {
        this['@:{max}'] = 50;
        this['@:{requested}'] = {};
        this['@:{dest.url}'] = 'https://interface.sina.cn/tech/gif/album.d.json?format=json&num=20&page=';
    },
    '@:{request}'() {
        let dest = this['@:{dest.url}'];
        let requested = this['@:{requested}'];
        let current = FindBestPage(this['@:{max}'], requested);
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
    '@:{init}'() {
        this['@:{max}'] = 400;
        this['@:{requested}'] = {};
        this['@:{dest.url}'] = 'http://www.gaoxiaogif.com/';
    },
    '@:{request}'() {
        let dest = this['@:{dest.url}'];
        let requested = this['@:{requested}'];
        let current = FindBestPage(this['@:{max}'], requested);
        return new Promise(async resolve => {
            let tail = '';
            if (current > 1) {
                tail = `index_${current}.html`;
            }
            let list = [];
            try {
                let result = await XAgent.request(dest + tail, 0, true, 'gb2312');
                let reg = /'pic':'([^']+)','text':'([^']+)'[\s\S]+?<i\s+class="icon-clock"><\/i>([0-9\-]+)/g;
                result.replace(reg, (m, img, name, date) => {
                    list.push({
                        name,
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
    '@:{init}'() {
        this['@:{max}'] = 500;
        this['@:{requested}'] = {};
        this['@:{dest.url}'] = 'http://quicklol.com/';
    },
    '@:{request}'() {
        let dest = this['@:{dest.url}'];
        let requested = this['@:{requested}'];
        let current = FindBestPage(this['@:{max}'], requested);
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
let Zol = {
    '@:{init}'() {
        this['@:{max}'] = 102;
        this['@:{requested}'] = {};
        this['@:{dest.url}'] = 'http://xiaohua.zol.com.cn/qutu/${0}.html';
    },
    '@:{request}'() {
        let dest = this['@:{dest.url}'];
        let requested = this['@:{requested}'];
        let current = FindBestPage(this['@:{max}'], requested);
        return new Promise(async resolve => {
            let list = [];
            try {
                dest = dest.replace('${0}', current);
                let result = await XAgent.request(dest, 0, true, 'gbk');
                let reg = /<span\s+class="article-title"><[^>]+>([\s\S]+?)<\/[^>]+><\/span>[\s\S]+?<div\s+class="summary-text">[\s\S]+?src="([^"]+)"/g;
                result.replace(reg, (m, name, img) => {
                    img = img.replace(/\/t_s300x2000\//, '/t_s600x5000/');
                    list.push({
                        name,
                        img,
                        date: '',
                        from: 'xiaohua.zol.com.cn'
                    });
                    return '';
                });
            } catch{

            }
            resolve(list);
        });
    }
};
let Tuchaojie = {
    '@:{init}'() {
        this['@:{max}'] = 847;
        this['@:{requested}'] = {};
        this['@:{dest.url}'] = 'http://www.tucaojie.com/';
    },
    '@:{request}'() {
        let dest = this['@:{dest.url}'];
        let requested = this['@:{requested}'];
        let current = FindBestPage(this['@:{max}'], requested);
        return new Promise(async resolve => {
            let list = [];
            let tail = '';
            if (current > 1) {
                tail = `index_${current}.html`;
            }
            try {
                let result = await XAgent.request(dest + tail, 0, true);
                let reg = /<img[^>]+?src="[^>]*?\/(d\/file\/[^"]+)"[^>]+alt="([^"]+)"/g;
                result.replace(reg, (m, img, name) => {
                    list.push({
                        name,
                        img: dest + img,
                        date: '',
                        from: '吐槽街'
                    });
                    return '';
                });
            } catch{

            }
            resolve(list);
        });
    }
};
let Biedoul = {
    '@:{init}'() {
        this['@:{max}'] = 31099;
        this['@:{requested}'] = {};
        this['@:{dest.url}'] = 'https://www.biedoul.com/index/${0}/';
    },
    '@:{request}'() {
        let dest = this['@:{dest.url}'];
        let requested = this['@:{requested}'];
        let current = FindBestPage(this['@:{max}'], requested);
        return new Promise(async resolve => {
            let list = [];
            dest = dest.replace('${0}', current);
            try {
                let result = await XAgent.request(dest, 0, true);
                let reg = /<DD>[\S\s]+?<STRONG>([\s\S]*?)<\/STRONG>[\S\s]+?<DD>([\s\S]+?)<\/DD>/g;
                let source = /<img([^>]+?)src="(\/[^>]+)"/gi;
                result.replace(reg, (m, name, text) => {
                    text = text.replace(source, (m, prefix, src) => {
                        return `<img${prefix}src="https://www.biedoul.com${src}"`;
                    });
                    list.push({
                        name,
                        text,
                        date: '',
                        from: '别逗了'
                    });
                    return '';
                });
            } catch{

            }
            resolve(list);
        });
    }
};
let Budejie = {
    '@:{init}'() {
        this['@:{max}'] = 50;
        this['@:{requested}'] = {};
        this['@:{dest.url}'] = 'http://www.budejie.com/${0}';
    },
    '@:{request}'() {
        let dest = this['@:{dest.url}'];
        let requested = this['@:{requested}'];
        let current = FindBestPage(this['@:{max}'], requested);
        return new Promise(async resolve => {
            let list = [];
            dest = dest.replace('${0}', current);
            try {
                let result = await XAgent.request(dest, 0, true);
                let reg = /<div class="j-r-list-c-desc">\s*<a[^>]+>([\S\s]+?)<\/a>[\s\S]+?<img[^>]+?data-original="([^"]+)"/g;
                result.replace(reg, (m, name, img) => {
                    list.push({
                        name,
                        img,
                        date: '',
                        from: '百思不得姐'
                    });
                    return '';
                });
            } catch{

            }
            resolve(list);
        });
    }
};
let Xiaohua51 = {
    '@:{init}'() {
        this['@:{max}'] = 195;
        this['@:{requested}'] = {};
        this['@:{dest.url}'] = 'http://www.51xiaohua.com/ye${0}.html';
    },
    '@:{request}'() {
        let dest = this['@:{dest.url}'];
        let requested = this['@:{requested}'];
        let current = FindBestPage(this['@:{max}'], requested);
        return new Promise(async resolve => {
            let list = [];
            dest = dest.replace('${0}', current);
            try {
                let result = await XAgent.request(dest, 0, true);
                let reg = /<a href="\/baoxiaoegao\/(\d+)\.html">([\s\S]+?)<\/a>[\s\S]+?<a href="\/baoxiaoegao\/\1\.html"><img\s+src="([^"]+)"/g;
                result.replace(reg, (m, id, name, img) => {
                    list.push({
                        name,
                        img,
                        date: '',
                        from: '51笑话网'
                    });
                    return '';
                });
            } catch{

            }
            resolve(list);
        });
    }
};
let Xiaohua = {
    '@:{init}'() {
        this['@:{max}'] = 1072;
        this['@:{requested}'] = {};
        this['@:{dest.url}'] = 'https://www.xiaohua.com/duanzi?page=${0}';
    },
    '@:{request}'() {
        let dest = this['@:{dest.url}'];
        let requested = this['@:{requested}'];
        let current = FindBestPage(this['@:{max}'], requested);
        return new Promise(async resolve => {
            let list = [];
            dest = dest.replace('${0}', current);
            try {
                let result = await XAgent.request(dest, 0, true);
                let reg = /<p class="fonts">\s+<a href="\/detail\/\d+">([\s\S]+?)<\/a>/g;
                result.replace(reg, (m, text) => {
                    list.push({
                        name,
                        text,
                        date: '',
                        from: '笑话网'
                    });
                    return '';
                });
            } catch{

            }
            resolve(list);
        });
    }
};

let Soogif = {
    '@:{init}'() {
        this['@:{max}'] = 500;
        this['@:{requested}'] = {};
        this['@:{dest.url}'] = 'https://www.soogif.com/hotGif?start=${0}&size=20';
    },
    '@:{request}'() {
        let dest = this['@:{dest.url}'];
        let requested = this['@:{requested}'];
        let current = FindBestPage(this['@:{max}'], requested);
        return new Promise(async resolve => {
            let list = [];
            dest = dest.replace('${0}', current);
            try {
                let result = await XAgent.request(dest, 0, true);
                let data = JSON.parse(result);
                if (data.code == 0) {
                    let collections = data.data.result;
                    for (let c of collections) {
                        list.push({
                            name: c.title,
                            from: 'soogif.com',
                            img: c.gifurl
                        });
                    }
                }
            } catch{

            }
            resolve(list);
        });
    }
};
let Pools = [
    Soogif,
    Gaoxiao,
    Sina,
    Quicklol,
    Zol,
    Tuchaojie,
    Biedoul,
    Budejie,
    Xiaohua51,
    Xiaohua
];
export default Magix.View.extend({
    tmpl: '@:index.html',
    init() {
        let weights = [];
        for (let src of Pools) {
            src['@:{init}']();
            weights.push({
                s: src,
                w: 0
            });
        }
        this['@:{weights}'] = weights;
        this.set({
            list: []
        });
    },
    assign() {
        return false;
    },
    async render() {
        //return this.digest({list:[]});
        let weights = this['@:{weights}'];
        let max = Math.min(1 + Math.ceil(Math.random() * weights.length / 1.5), weights.length);
        let sends = weights.sort(Sort).slice(0, max);
        let ps = [];
        for (let s of sends) {
            s.w += 1;
            ps.push(s.s['@:{request}']());
        }
        let mark = Magix.mark(this, '@:{render}');
        let results = await Promise.all(ps);
        if (mark()) {
            let list = this.get('list');
            if (results.length > 1) {
                let readyCount = 0;
                let ready = {};
                do {
                    let index = Math.floor(Math.random() * results.length);
                    let dest = results[index];
                    if (!dest.length) {
                        if (ready[index] !== 1) {
                            ready[index] = 1;
                            readyCount++;
                        }
                    } else {
                        list.push(dest.pop());
                    }
                } while (readyCount != results.length);
            } else {
                list.push(...results[0]);
            }
            this.digest({
                list
            });
        }
        delete this['@:{data.loading}'];
    },
    '@:{load.more}<intersect>'() {
        if (!this['@:{data.loading}']) {
            this['@:{data.loading}'] = 1;
            this.render();
        }
    }
});