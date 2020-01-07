/*!1.0.5 kooboy_li@163.com*/
/*
    generate by magix-composer@1.0.5
    https://github.com/thx/magix-composer
    author: xinglie.lkf@alibaba-inc.com
    loader:module
 */
import "../../gallery/mx-more/index.js";
let $quick_E_1_static_node;
let $quick_E_0_static_attr={'class': 'xl-bQ',};
let $quick_E_2_static_attr={'class': 'xl-c_',};
let $quick_E_3_static_attr={'class': 'xl-bU',};
let $quick_E_4_static_attr={'class': 'xl-bW',};
let $quick_E_5_static_attr={'class': 'xl-bY',};
let $quick_E_6_static_attr={'class': 'xl-bZ',};
import Magix  from "../../lib/magix.js";
import DialogCtrl  from "../../os/ctrl.js";
import Bridge  from "./bridge.js";
import Cron  from "../../lib/cron.js";
import XAgent  from "../../lib/agent.js";
Magix.applyStyle("xl-o",".xl-bQ{height:28px;line-height:28px;padding:0 26px;background:#ddd;color:#333;position:-webkit-sticky;position:sticky;top:0}.xl-bR{float:left;padding:0 5px;cursor:pointer}.xl-bS{background:#fff}.xl-bT{display:inline-grid;grid-template-columns:70% 30%;grid-template-rows:86%;grid-template-areas:\"xl-b xl-a\" \"xl-_ xl-_\";width:410px;height:120px;margin:10px;padding:5px;background:#fafafa;border-radius:4px;-webkit-transition:box-shadow .25s;transition:box-shadow .25s;cursor:pointer}.xl-bT:hover{box-shadow:0 3px 6px 0 rgba(0,0,0,.08)}.xl-bU{font-size:18px;padding:5px}.xl-bV{grid-area:xl-_;color:#aaa;font-size:12px}.xl-bW{width:120px;height:80px;-webkit-box-align:center;align-items:center}.xl-bX{width:auto;height:auto;max-width:100%;max-height:100%}.xl-bY,.xl-bZ{display:inline-block;height:22px;line-height:22px}.xl-bY{max-width:190px;overflow:hidden}.xl-bZ{float:right}.xl-c_{display:table}");
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
let NeteaseJSONP = (id, start, end) => {
    return new Promise((resolve, reject) => {
        let url = API.replace('{id}', id)
            .replace('{start}', start.toString())
            .replace('{end}', end.toString())
            .replace('{guid}', Magix.guid('thx_'));
        XAgent.request(url, 0, true).then(r => {
            let d = JSON.parse(r.slice(9, -1));
            resolve(d[id + 'wangning']);
        }).catch(reject);
    });
};
let Options = {
    icon: '<svg viewBox="0 0 1039 1024"><path d="M906.589 0H132.688A132.79 132.79 0 0 0 0 132.688v605.318a132.79 132.79 0 0 0 132.688 132.79h220.411l70.828 102.882a116.181 116.181 0 0 0 191.422 0l70.828-102.922H906.59a132.79 132.79 0 0 0 132.79-132.79V132.688A132.79 132.79 0 0 0 906.589 0zm48.458 738.006a48.52 48.52 0 0 1-48.458 48.459H641.866l-95.894 139.409a31.951 31.951 0 0 1-52.667 0l-95.895-139.41H132.688a48.52 48.52 0 0 1-48.458-48.458V132.688a48.52 48.52 0 0 1 48.458-48.458h773.9a48.52 48.52 0 0 1 48.459 48.458z" fill="#1ACAD8"/><path d="M288.665 368.176a63.33 63.33 0 1 0 63.33 63.33 63.33 63.33 0 0 0-63.33-63.33zm230.973 0a63.33 63.33 0 1 0 63.33 63.33 63.33 63.33 0 0 0-63.33-63.33zm230.973 0a63.33 63.33 0 1 0 63.331 63.33 63.33 63.33 0 0 0-63.33-63.33z" fill="#1ACAD8"/></svg>',
    appId: 'news_detail',
    title: '新闻详情',
    width: 500,
    height: 650,
    min: true,
    close: true,
    dockY: 30,
    view: "~xl/plugins/news/detail"
};
let OpenSubDialog = (view, doc, comment) => {
    Bridge["_c_"](doc, comment);
    DialogCtrl["_C"](view, Options);
};
//let start = '#aaa';
//let end = '#f00';
let max = 10000;
let GetColor = num => {
    let start = [170, 170, 170];
    let diffs = [255 - 170, -170, -170];
    let p = num / max;
    if (p > 1)
        p = 1;
    let end = [];
    for (let i = 0; i < diffs.length; i++) {
        let n = (diffs[i] * p + start[i]) | 0;
        let s = `0${n.toString(16)}`.slice(-2);
        end.push(s);
    }
    return `#${end.join('')}`;
};
export default Magix.View.extend({
    tmpl: ($$, $_create,$_viewId,$n,$eu,$_ref,$i,$eq)=> { 
let $_temp,$vnode_0=[],
{
	cats,
	active,
	loading,
	error,
	list,
	getColor,}=$$,
$vnode_1,
$vnode_2,
$$_class,
$vnode_3,
$text,
$vnode_4,
$vnode_5,
$vnode_6,
$vnode_7
$vnode_1=[];
for(let $q_c_xzlcuff=cats.length,$q_key_jeuznxt=0;$q_key_jeuznxt<$q_c_xzlcuff;$q_key_jeuznxt++){
let cat=cats[$q_key_jeuznxt];
$vnode_3=[$_create(0,0,$n(cat.text))];;$$_class='xl-bR';if(cat.id==active){;$$_class+=' xl-bS';};
$vnode_2=[$_create('div',{'mx-click': ((cat.id!=active))&&($_viewId+'_cf({id:\''+($eq(cat.id))+'\'})'),'class': $$_class,},$vnode_3)];$vnode_1.push(...$vnode_2);
}$vnode_0.push($_create('div',$quick_E_0_static_attr,$vnode_1));
if(loading){

if($quick_E_1_static_node){
$vnode_1=[$quick_E_1_static_node];
}else{
$vnode_2=[$_create(0,0,'loading...')];
$vnode_1=[$quick_E_1_static_node=$_create('div',{'_': '_','class': 'xl-w',},$vnode_2)];
}
$vnode_0.push(...$vnode_1);
}else if(error){
$vnode_1=[$_create(0,0,$n(error))];$vnode_0.push(...$vnode_1);
}else{
$vnode_2=[];
for(let $q_c_hzuybiye=list.length,$q_key_wgosoublop=0;$q_key_wgosoublop<$q_c_hzuybiye;$q_key_wgosoublop++){
let d=list[$q_key_wgosoublop];
$vnode_5=[$_create(0,0,$n(d.title))];
$vnode_4=[$_create('div',$quick_E_3_static_attr,$vnode_5)];
$vnode_5=[$_create('img',{'loading': 'lazy','class': 'xl-bX','src': $n(d.imgsrc),},0,0,1)];$vnode_4.push($_create('div',$quick_E_4_static_attr,$vnode_5));$vnode_6=[$_create(0,0,'来源：'+$n(d.source))];
$vnode_5=[$_create('span',$quick_E_5_static_attr,$vnode_6)];$vnode_6=[$_create(0,0,$n(d.ptime)+' ')];$vnode_7=[$_create(0,0,'评论：'+$n(d.commentCount))];$vnode_6.push($_create('span',{'style': 'color:'+$n(getColor(d.commentCount)),},$vnode_7));$vnode_5.push($_create('span',$quick_E_6_static_attr,$vnode_6));$vnode_4.push($_create('div',{'class': 'xl-bV','mx-click': $_viewId+'_ch({detail:\''+$i($_ref,d,'i.'+($q_key_wgosoublop))+'\'})',},$vnode_5));
$vnode_3=[$_create('div',{'class': 'xl-bT','mx-click': $_viewId+'_cg({detail:\''+$i($_ref,d,'i.'+($q_key_wgosoublop))+'\'})',},$vnode_4)];$vnode_2.push(...$vnode_3);
}
$vnode_1=[$_create('div',$quick_E_2_static_attr,$vnode_2),$_create('div',{'_': 'a','mx-intersect': $_viewId+'_aT()','mx-view': '~xl/gallery/mx-more/index?placeholder=%E6%9B%B4%E5%A4%9A%E6%96%B0%E9%97%BB%E5%8A%A0%E8%BD%BD%E4%B8%AD...',})];$vnode_0.push(...$vnode_1);
} 

return $_create($_viewId,0,$vnode_0); } ,
    init() {
        this.set({
            active: Categories[0].id,
            cats: Categories,
            list: [],
            start: 0,
            size: 20,
            getColor: GetColor,
            loading: true
        });
        let autoUpdate = () => {
            let start = this.get('start');
            if (start === 0 ||
                this.root.scrollTop < 50) {
                this.root.scrollTop = 0;
                this.set({
                    list: []
                });
                this['_cc']();
                console.log('news updating');
            }
            else {
                console.log('ignore update news');
            }
        };
        Cron["_s"](autoUpdate, 10 * 60 * 1000, false, '_cd');
        this.ondestroy = () => {
            Cron["_t"](autoUpdate);
        };
    },
    assign() {
        return false;
    },
    async '_cc'() {
        try {
            let id = this.get('active');
            let start = this.get('start');
            let size = this.get('size');
            let mark = Magix.mark(this, '_ce');
            let data = await NeteaseJSONP(id, start, size);
            if (mark()) {
                let list = this.get('list');
                list.push(...data);
                this.digest({
                    error: null,
                    loading: false,
                    list
                });
            }
            else {
                console.log('ignore');
            }
        }
        catch (e) {
            this.digest({
                loading: false,
                error: e
            });
        }
        delete this['_aS'];
    },
    render() {
        this['_cc']();
    },
    '_cf<click>'(e) {
        let { id } = e.params;
        this.root.scrollTop = 0;
        this.digest({
            list: [],
            loading: true,
            active: id,
            start: 0
        });
        this['_cc']();
    },
    '_cg<click>'(e) {
        if (!e.fromComment) {
            let { detail } = e.params;
            OpenSubDialog(this, detail);
        }
    },
    '_ch<click>'(e) {
        e.fromComment = true;
        let { detail } = e.params;
        OpenSubDialog(this, detail, true);
    },
    '_aT<intersect>'() {
        if (!this.get('loading') &&
            !this['_aS']) {
            this['_aS'] = 1;
            let next = this.get('start') + this.get('size');
            this.set({
                start: next
            });
            this['_cc']();
        }
    }
});
