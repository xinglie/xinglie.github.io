/*!1.0.5 kooboy_li@163.com*/
/*
    generate by magix-composer@1.0.5
    https://github.com/thx/magix-composer
    author: xinglie.lkf@alibaba-inc.com
    loader:module
 */
import "../../gallery/mx-more/index.js";
let $quick_t_0_static_attr={'class': 'xl-aO',};
let $quick_t_1_static_attr={'class': 'xl-aP',};
let $quick_t_2_static_attr={'class': 'xl-aQ',};
let $quick_t_3_static_attr={'class': 'xl-aS',};
let $quick_t_4_static_attr={'class': 'xl-aU',};
let $quick_t_5_static_attr={'class': 'xl-aR',};
/*
    author:xinglie.lkf@alibaba-inc.com
*/
import Magix  from "../../lib/magix.js";
import XAgent  from "../../lib/agent.js";
Magix.applyStyle("xl-l",".xl-aO{margin:10px}.xl-aP{margin-bottom:10px;border:1px solid #ccc;border-radius:5px}.xl-aQ{font-size:16px;font-weight:700;margin:5px 0 0 10px}.xl-aR{height:18px;margin-left:10px;font-size:12px}.xl-aS{padding:10px;min-height:100px}.xl-aT{width:auto;height:auto;max-width:100%;min-height:50px;position:relative}.xl-aT:before{content:\"图片无法显示⊙﹏⊙\";position:absolute;display:-webkit-inline-box;display:inline-flex;top:-4px;left:0;height:calc(100% + 8px);width:calc(100% + 200px);background-color:#ebebeb;border-radius:4px;-webkit-box-pack:center;justify-content:center;-webkit-box-align:center;align-items:center;color:#a2a2a2}.xl-aU{font-size:18px}");
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
    '_aO'() {
        this['_aL'] = 50;
        this['_aM'] = {};
        this['_aN'] = 'https://interface.sina.cn/tech/gif/album.d.json?format=json&num=20&page=';
    },
    '_aP'() {
        let dest = this['_aN'];
        let requested = this['_aM'];
        let current = FindBestPage(this['_aL'], requested);
        return new Promise(async (resolve) => {
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
            }
            catch (_a) {
            }
            resolve(list);
        });
    }
};
let Gaoxiao = {
    '_aO'() {
        this['_aL'] = 400;
        this['_aM'] = {};
        this['_aN'] = 'http://www.gaoxiaogif.com/';
    },
    '_aP'() {
        let dest = this['_aN'];
        let requested = this['_aM'];
        let current = FindBestPage(this['_aL'], requested);
        return new Promise(async (resolve) => {
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
            }
            catch (_a) {
            }
            resolve(list);
        });
    }
};
let Quicklol = {
    '_aO'() {
        this['_aL'] = 500;
        this['_aM'] = {};
        this['_aN'] = 'http://quicklol.com/';
    },
    '_aP'() {
        let dest = this['_aN'];
        let requested = this['_aM'];
        let current = FindBestPage(this['_aL'], requested);
        return new Promise(async (resolve) => {
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
            }
            catch (_a) {
            }
            resolve(list);
        });
    }
};
let Zol = {
    '_aO'() {
        this['_aL'] = 102;
        this['_aM'] = {};
        this['_aN'] = 'http://xiaohua.zol.com.cn/qutu/${0}.html';
    },
    '_aP'() {
        let dest = this['_aN'];
        let requested = this['_aM'];
        let current = FindBestPage(this['_aL'], requested);
        return new Promise(async (resolve) => {
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
            }
            catch (_a) {
            }
            resolve(list);
        });
    }
};
let Tuchaojie = {
    '_aO'() {
        this['_aL'] = 847;
        this['_aM'] = {};
        this['_aN'] = 'http://www.tucaojie.com/';
    },
    '_aP'() {
        let dest = this['_aN'];
        let requested = this['_aM'];
        let current = FindBestPage(this['_aL'], requested);
        return new Promise(async (resolve) => {
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
            }
            catch (_a) {
            }
            resolve(list);
        });
    }
};
let Biedoul = {
    '_aO'() {
        this['_aL'] = 31099;
        this['_aM'] = {};
        this['_aN'] = 'https://www.biedoul.com/index/${0}/';
    },
    '_aP'() {
        let dest = this['_aN'];
        let requested = this['_aM'];
        let current = FindBestPage(this['_aL'], requested);
        return new Promise(async (resolve) => {
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
            }
            catch (_a) {
            }
            resolve(list);
        });
    }
};
let Budejie = {
    '_aO'() {
        this['_aL'] = 50;
        this['_aM'] = {};
        this['_aN'] = 'http://www.budejie.com/${0}';
    },
    '_aP'() {
        let dest = this['_aN'];
        let requested = this['_aM'];
        let current = FindBestPage(this['_aL'], requested);
        return new Promise(async (resolve) => {
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
            }
            catch (_a) {
            }
            resolve(list);
        });
    }
};
let Xiaohua51 = {
    '_aO'() {
        this['_aL'] = 195;
        this['_aM'] = {};
        this['_aN'] = 'http://www.51xiaohua.com/ye${0}.html';
    },
    '_aP'() {
        let dest = this['_aN'];
        let requested = this['_aM'];
        let current = FindBestPage(this['_aL'], requested);
        return new Promise(async (resolve) => {
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
            }
            catch (_a) {
            }
            resolve(list);
        });
    }
};
let Xiaohua = {
    '_aO'() {
        this['_aL'] = 1072;
        this['_aM'] = {};
        this['_aN'] = 'https://www.xiaohua.com/duanzi?page=${0}';
    },
    '_aP'() {
        let dest = this['_aN'];
        let requested = this['_aM'];
        let current = FindBestPage(this['_aL'], requested);
        return new Promise(async (resolve) => {
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
            }
            catch (_a) {
            }
            resolve(list);
        });
    }
};
let Soogif = {
    '_aO'() {
        this['_aL'] = 500;
        this['_aM'] = {};
        this['_aN'] = 'https://www.soogif.com/hotGif?start=${0}&size=20';
    },
    '_aP'() {
        let dest = this['_aN'];
        let requested = this['_aM'];
        let current = FindBestPage(this['_aL'], requested);
        return new Promise(async (resolve) => {
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
            }
            catch (_a) {
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
    tmpl: ($$, $_create,$_viewId,$n)=> { 
let $_temp,$vnode_0=[],
{
	list,}=$$,
$vnode_1,
$vnode_2,
$vnode_3,
$vnode_4,
$text,
$vnode_5,
$vnode_6
$vnode_1=[];
for(let $q_c_cdkligb=list.length,$q_key_mhrohlfa=0;$q_key_mhrohlfa<$q_c_cdkligb;$q_key_mhrohlfa++){
let image=list[$q_key_mhrohlfa];
$vnode_4=[$_create(0,0,$n(image.name))];
$vnode_3=[$_create('div',$quick_t_2_static_attr,$vnode_4)];$vnode_4=[];
if(image.text){
$vnode_6=[$_create(0,1,$n(image.text))];
$vnode_5=[$_create('div',$quick_t_4_static_attr,$vnode_6)];$vnode_4.push(...$vnode_5);
}
if(image.img){

$vnode_5=[$_create('img',{'loading': 'lazy','class': 'xl-aT','src': $n(image.img),},0,0,1)];$vnode_4.push(...$vnode_5);
}$vnode_3.push($_create('div',$quick_t_3_static_attr,$vnode_4));$vnode_4=[$_create(0,0,'来源:'+$n(image.from)+' '+$n(image.date))];$vnode_3.push($_create('div',$quick_t_5_static_attr,$vnode_4));
$vnode_2=[$_create('div',$quick_t_1_static_attr,$vnode_3)];$vnode_1.push(...$vnode_2);
}$vnode_1.push($_create('div',{'_': '_','mx-intersect': $_viewId+'_aT()','mx-view': '~xl/gallery/mx-more/index',}));$vnode_0.push($_create('div',$quick_t_0_static_attr,$vnode_1)); 

return $_create($_viewId,0,$vnode_0); } ,
    init() {
        let weights = [];
        for (let src of Pools) {
            src['_aO']();
            weights.push({
                s: src,
                w: 0
            });
        }
        this['_aQ'] = weights;
        this.set({
            list: []
        });
    },
    assign() {
        return false;
    },
    async render() {
        //return this.digest({list:[]});
        let weights = this['_aQ'];
        let max = Math.min(1 + Math.ceil(Math.random() * weights.length / 1.5), weights.length);
        let sends = weights.sort(Sort).slice(0, max);
        let ps = [];
        for (let s of sends) {
            s.w += 1;
            ps.push(s.s['_aP']());
        }
        let mark = Magix.mark(this, '_aR');
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
                    }
                    else {
                        list.push(dest.pop());
                    }
                } while (readyCount != results.length);
            }
            else {
                list.push(...results[0]);
            }
            this.digest({
                list
            });
        }
        delete this['_aS'];
    },
    '_aT<intersect>'() {
        if (!this['_aS']) {
            this['_aS'] = 1;
            this.render();
        }
    }
});
