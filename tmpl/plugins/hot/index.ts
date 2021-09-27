import Dragdrop from '../../gallery/mx-dragdrop/index';
import Agent from '../../lib/agent';
import Cron from '../../lib/cron';
import Magix from '../../lib/magix';
Magix.applyStyle('@:index.less');
let sort = (a, b) => Date.parse(b.ctime) - Date.parse(a.ctime);
let svg = '<svg viewBox="0 0 1052 1024"><path d="M454.438 1024C302.958 835.56 124.213 693.17 0 648.331l294.779-176.927 142.087 276.298S668.326 186.925 1033.998 0c-7.877 133.605-44.232 249.335 18.48 392.028C891.91 428.383 562.594 828.895 454.438 1024z" fill="green"/></svg>';
let svgId = Magix.guid('@:{drag.delete.id}');
let handler = {
    '@:{show}'(x, y) {
        let node = Magix.node(svgId);
        if (!node) {
            node = document.createElement('div');
            node.id = svgId;
            node.innerHTML = svg;
            node.className = '@:./index.less:handler';
            document.body.appendChild(node);
        }
        let nodeStyle = node.style;
        nodeStyle.display = '';
        nodeStyle.left = (x + 12) + 'px';
        nodeStyle.top = (y + 8) + 'px';
    },
    '@:{hide}'() {
        let node = Magix.node(svgId);
        if (node) {
            node.style.display = 'none';
        }
    }
}
export default Magix.View.extend({
    tmpl: '@:index.html',
    init() {
        let work = this.render.bind(this);
        Cron["@:{add.task}"](work, 30 * 60 * 1000, false, '@:{update.hot.news}');
        this.on('destroy', () => {
            Cron["@:{remove.task}"](work);
        });
        this.set({
            news: []
        });
        this['@:{added}'] = {};
    },
    assign() {
        return false;
    },
    async render() {
        let mark = Magix.mark(this, '@:{update.render}');
        try {
            let data = await Agent.request('//api.tianapi.com/topnews/index?key=b9b7f0a5e92206c91cb09d93c4c24ca4');
            let json = JSON.parse(data);
            if (json &&
                json.newslist &&
                mark()) {
                let news = this.get('news');
                let added = this['@:{added}'];
                let receive = json.newslist;
                for (let e of receive) {
                    if (!added[e.title]) {
                        added[e.title] = 1;
                        news.push(e);
                    }
                }
                news = news.sort(sort);
                news.splice(50, 100);
                await this.digest({
                    news
                });
                if (mark()) {
                    let node = Magix.node(`s_${this.id}`);
                    node.scrollTop = 0;
                }
            }
        } catch{

        }
    },
    '@:{open.news}<click>'(e) {
        if (!this['@:{dragged}']) {
            let { n, i } = e.params;
            window.open(n.url);
            let news = this.get('news');
            news.splice(i, 1);
            this.digest({ news });
        }
    },
    '@:{drag.to.remove}<mousedown>'(e) {
        let { i } = e.params,
            dragged = false,
            shown;
        this['@:{drag.drop}'](e, (ev: MouseEvent) => {
            dragged = dragged || Math.abs(ev.pageX - e.pageX) > 10 || Math.abs(ev.pageY - e.pageY) > 10;
            if (dragged) {
                this['@:{dragged}'] = 1;
                if (!Magix.inside(ev.target as HTMLElement, this.root)) {
                    shown = 1;
                    handler["@:{show}"](ev.pageX, ev.pageY);
                } else if (shown) {
                    shown = 0;
                    //console.log('hode');
                    handler["@:{hide}"]();
                }
            }
        }, (ev: MouseEvent) => {
            if (!Magix.inside(ev.target as HTMLElement, this.root)) {
                let news = this.get('news');
                news.splice(i, 1);
                this.digest({ news });
            }
            handler["@:{hide}"]();
            setTimeout(() => {
                delete this['@:{dragged}'];
            });
        });
    }
}).merge(Dragdrop);