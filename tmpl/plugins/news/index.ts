import Magix, { Magix5 } from '../../lib/magix';
import DialogCtrl from '../../os/ctrl';
import Bridge from './bridge';
Magix.applyStyle('@./index.css');
let Categories = [{ text: '全部', id: 'BBM54PGA' },
{ text: '娱乐', id: 'BA10TA81' },
{ text: '体育', id: 'BA8E6OEO' },
{ text: '财经', id: 'BA8EE5GM' },
{ text: '军事', id: 'BAI67OGG' },
{ text: '科技', id: 'BA8D4A3R' },
{ text: '手机', id: 'BAI6I0O5' },
{ text: '数码', id: 'BAI6JOD9' },
{ text: '时尚', id: 'BA8F6ICN' },
{ text: '游戏', id: 'BAI6RHDK' },
{ text: '教育', id: 'BA8FF5PR' },
{ text: '健康', id: 'BDC4QSV3' },
{ text: '旅游', id: 'BEO4GINL' }];
let API = 'https://3g.163.com/touch/reconstruct/article/list/{id}wangning/{start}-{end}.html?_={guid}';
declare global {
    interface Window {
        artiList: (data) => void
    }
}
let NeteasePools = {};
window.artiList = (data) => {
    let script = document.currentScript as HTMLScriptElement;
    let src = script.src;
    let back = NeteasePools[src];
    if (back) {
        back(data);
        delete NeteasePools[src];
    }
};
let NeteaseJSONP = (id: string,
    start: number,
    end: number) => {
    return new Promise<[]>((resolve, reject) => {
        let script = document.createElement('script');
        let called = false;
        let clean = () => {
            script.parentNode.removeChild(script);
        };
        let url = API.replace('{id}', id)
            .replace('{start}', start.toString())
            .replace('{end}', end.toString())
            .replace('{guid}', Magix.guid('thx_'));
        NeteasePools[url] = data => {
            if (!called) {
                let realData = data[id + 'wangning'];
                called = true;
                resolve(realData);
            }
        };
        script.onload = () => {
            setTimeout(() => {
                clean();
                if (!called) {
                    reject(`load ${url} error`);
                }
            }, 50);
        };
        script.onerror = () => {
            clean();
            reject(`load ${url} error`);
        };
        script.src = url;
        document.body.append(script);
    });
};
let Options = {
    icon: '<svg viewBox="0 0 1039 1024"><path d="M906.589 0H132.688A132.79 132.79 0 0 0 0 132.688v605.318a132.79 132.79 0 0 0 132.688 132.79h220.411l70.828 102.882a116.181 116.181 0 0 0 191.422 0l70.828-102.922H906.59a132.79 132.79 0 0 0 132.79-132.79V132.688A132.79 132.79 0 0 0 906.589 0zm48.458 738.006a48.52 48.52 0 0 1-48.458 48.459H641.866l-95.894 139.409a31.951 31.951 0 0 1-52.667 0l-95.895-139.41H132.688a48.52 48.52 0 0 1-48.458-48.458V132.688a48.52 48.52 0 0 1 48.458-48.458h773.9a48.52 48.52 0 0 1 48.459 48.458z" fill="#1ACAD8"/><path d="M288.665 368.176a63.33 63.33 0 1 0 63.33 63.33 63.33 63.33 0 0 0-63.33-63.33zm230.973 0a63.33 63.33 0 1 0 63.33 63.33 63.33 63.33 0 0 0-63.33-63.33zm230.973 0a63.33 63.33 0 1 0 63.331 63.33 63.33 63.33 0 0 0-63.33-63.33z" fill="#1ACAD8"/></svg>',
    appId: 'aaa',
    title: '网易新闻详情',
    width: 450,
    height: 650,
    min: true,
    close: true,
    dockY: 30,
    view: '@./detail'
};
let OpenSubDialog = (view, doc) => {
    Bridge["@{save.document}"](doc);
    DialogCtrl["@{create}"](view, Options);
};
export default Magix.View.extend({
    tmpl: '@index.html',
    init() {
        this.set({
            active: Categories[0].id,
            cats: Categories,
            list: [],
            start: 0,
            size: 20,
            loading: true
        });
    },
    async '@{load.data}'() {
        try {
            let id = this.get('active');
            let start = this.get('start');
            let size = this.get('size');
            let mark = Magix.mark(this, '@{get.news.list}');
            let data = await NeteaseJSONP(id, start, size);
            if (mark()) {
                let list = this.get('list');
                list.push(...data);
                this.digest({
                    loading: false,
                    list
                });
            } else {
                console.log('ignore');
            }
        } catch (e) {
            this.digest({
                error: e
            });
        }
        delete this['@{data.loading}'];
    },
    render() {
        this['@{load.data}']();
    },
    '@{change.category}<click>'(e: Magix5.MagixMouseEvent) {
        let { id } = e.params;
        this.root.scrollTop = 0;
        this.digest({
            list: [],
            loading: true,
            active: id,
            start: 0
        });
        this['@{load.data}']();
    },
    '@{open.news}<click>'(e: Magix5.MagixMouseEvent) {
        let { detail } = e.params;
        OpenSubDialog(this, detail);
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
                this['@{load.data}']();
            }
        }
    }
})