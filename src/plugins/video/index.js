/*!1.0.5 kooboy_li@163.com*/
/*
    generate by magix-composer@1.0.5
    https://github.com/thx/magix-composer
    author: xinglie.lkf@alibaba-inc.com
    loader:module
 */
let $quick_M_2_static_node;
let $quick_M_3_static_node;
let $quick_M_0_static_attr={'class': 'xl-co',};
let $quick_M_1_static_attr={'class': 'xl-cv',};
let $special_2={'value':'value',};
let $special_4={'selected':'selected',};
/*
    author:xinglie.lkf@alibaba-inc.com
*/
import Magix  from "../../lib/magix.js";
import List  from "./vip.js";
Magix.applyStyle("xl-q",".xl-cn{height:30px;box-sizing:border-box}.xl-co{background:#fff;padding:2px 10px}.xl-cp{height:130px;position:absolute;top:-31px;width:100%;-webkit-transition:top .25s;transition:top .25s}.xl-cp:hover{top:0}.xl-cq{width:calc(70% - 110px);height:26px;outline:none;font-size:16px;padding:0 4px;border-radius:4px;box-sizing:border-box;border:1px solid #ccc}.xl-cr{width:30%;border:1px solid #ccc}.xl-cs,.xl-cr{height:26px;outline:none;font-size:16px;padding:0 4px;background:none;margin-left:10px}.xl-cs{width:80px;border-radius:4px}.xl-ct{width:98%;height:calc(100% - 40px);margin:0 1%}.xl-cu{width:100%;margin:0;height:100%}.xl-cv{height:28px;line-height:28px;padding:0 26px;background:#f5f5f5;color:#333;margin-top:5px}.xl-cw{float:left;padding:0 5px;cursor:pointer}.xl-cx{background:#fff}.xl-cy{height:calc(100% - 73px);overflow:auto}.xl-cz{margin:10px;padding:5px 5px 0;background:#fafafa;border-radius:4px;-webkit-transition:box-shadow .25s;transition:box-shadow .25s;float:left}.xl-cz:hover{box-shadow:0 3px 6px 0 rgba(0,0,0,.08)}.xl-cA{width:250px;height:140px}.xl-cB{width:105px;height:140px}.xl-cC{height:25px;line-height:25px}.xl-cD{width:105px;overflow:hidden;text-overflow:ellipsis}.xl-cE{float:left;font-weight:700;color:#333;margin-left:4px;font-size:16px}.xl-cF{float:right;color:#aaa}.xl-cG,.xl-cG:visited{color:#45b6f7;text-decoration:none;margin:0 4px}.xl-cG:active,.xl-cG:hover{text-decoration:underline;color:#42a5df}.xl-cH,.xl-cH:visited{color:#1000f9;text-decoration:underline;margin:0 10px}.xl-cH:active,.xl-cH:hover{text-decoration:none;color:#0b00a4}.xl-cI{padding:20px 0;font-size:16px;text-align:center}.xl-cJ{height:36px;line-height:36px;padding:0 30px}.xl-cK{font-size:16px;font-style:italic;width:30px;display:inline-block;text-align:right}.xl-cL{padding:20px;height:calc(100% - 40px);position:relative}.xl-cM{height:100%;background-size:cover;background-position:center 0;opacity:.6;background-color:#000}.xl-cN{position:absolute;bottom:40px;left:50px;right:50px;padding:20px;color:#fff;background:rgba(0,0,0,.73)}.xl-cO{display:-webkit-box;display:flex;-webkit-box-align:end;align-items:flex-end}.xl-cP{font-size:22px;font-weight:700}.xl-cQ,.xl-cQ:visited{text-decoration:none}.xl-cQ:focus,.xl-cQ:hover{text-decoration:underline}.xl-cR{color:#86c2f7}.xl-cS{color:orange}.xl-cT{color:#00ab00}.xl-cU{margin:0 5px}.xl-cV{margin-left:auto}.xl-cW{position:absolute;right:40px;top:40px;color:#fff;background-color:#5d5d5d}");
let Tabs = [
    {
        name: '搜视网',
        id: 'tvsou',
        view: "~xl/plugins/video/tvsou"
    }, {
        name: '全视频',
        id: 'qsp',
        view: "~xl/plugins/video/qsp"
    }, {
        name: '80s手机电影',
        id: '80s',
        view: "~xl/plugins/video/80s"
    }
];
export default Magix.View.extend({
    tmpl: ($$, $_create,$_viewId,$n,$eu,$_ref,$i,$eq)=> { 
let $_temp,$vnode_0=[],
{
	list,
	si,
	maxState,
	url,
	played,
	tabs,
	active,}=$$,
$text,
$$_class,
$vnode_1,
$vnode_2,
$vnode_3,
$vnode_4,
$vnode_5
let dest=list[si].url;;
$vnode_2=[$_create('input',{'class': 'xl-cq','placeholder': '请输入/粘贴播放地址','mx-change': $_viewId+'_cn()','value': $n(url),},0,$special_2,1)];$vnode_3=[];
for(let $q_c_xhtayyt=list.length,index=0;index<$q_c_xhtayyt;index++){
let proxy=list[index];
$vnode_5=[$_create(0,0,$n(proxy.name))];
$vnode_4=[$_create('option',{'value': $n(proxy.url),'selected': (index==si),},$vnode_5,$special_4)];$vnode_3.push(...$vnode_4);
}$vnode_2.push($_create('select',{'class': 'xl-cr','mx-change': $_viewId+'_cm()',},$vnode_3));$vnode_3=[$_create(0,0,'播放')];$vnode_2.push($_create('button',{'_': '_','type': 'button','class': 'xl-cs','mx-click': $_viewId+'_co()',},$vnode_3));
$vnode_1=[$_create('div',$quick_M_0_static_attr,$vnode_2)];;$$_class='xl-cn';if(maxState&&dest){;$$_class+=' xl-cp';};$vnode_0.push($_create('div',{'class': $$_class,},$vnode_1));
if(played&&dest&&url){
;$$_class='xl-ct';if(maxState){;$$_class+=' xl-cu';};
$vnode_1=[$_create('iframe',{'src': $n(dest)+$n(encodeURIComponent(url)),'sandbox': 'allow-scripts allow-same-origin','allowfullscreen': true,'scrolling': 'no','frameborder': '0','class': $$_class,})];$vnode_0.push(...$vnode_1);
}else{
$vnode_1=[];let current;;$vnode_2=[];
for(let $q_c_tumrqhbr=tabs.length,$q_key_fuxbrbdbxlk=0;$q_key_fuxbrbdbxlk<$q_c_tumrqhbr;$q_key_fuxbrbdbxlk++){
let tab=tabs[$q_key_fuxbrbdbxlk];
$vnode_4=[$_create(0,0,$n(tab.name))];;$$_class='xl-cw';if(tab.id==active){;current=tab;$$_class+=' xl-cx';};
$vnode_3=[$_create('div',{'mx-click': ((tab.id!=active))&&($_viewId+'_cf({id:\''+($eq(tab.id))+'\'})'),'class': $$_class,},$vnode_4)];$vnode_2.push(...$vnode_3);
}$vnode_1.push($_create('div',$quick_M_1_static_attr,$vnode_2));
if(current){

if($quick_M_2_static_node){
$vnode_3=[$quick_M_2_static_node];
}else{
$vnode_4=[$_create(0,0,'电影列表加载中...')];
$vnode_3=[$quick_M_2_static_node=$_create('div',{'_': 'a','class': 'xl-cI',},$vnode_4)];
}

$vnode_2=[$_create('div',{'mx-view': $n(current.view),'class': 'xl-cy',},$vnode_3)];$vnode_1.push(...$vnode_2);
}else{

if($quick_M_3_static_node){
$vnode_2=[$quick_M_3_static_node];
}else{
$vnode_3=[$_create(0,0,'请从上方选择查看的电影来源')];
$vnode_2=[$quick_M_3_static_node=$_create('div',{'_': 'b','class': 'xl-cI',},$vnode_3)];
}
$vnode_1.push(...$vnode_2);
}$vnode_0.push(...$vnode_1);
} 

return $_create($_viewId,0,$vnode_0); } ,
    init(data) {
        this.assign(data);
        this.set({
            tabs: Tabs,
            active: '',
            si: 0,
            url: ''
        });
    },
    assign(data) {
        this.set(data);
        return true;
    },
    render() {
        this.digest({
            list: List
        });
    },
    '_cm<change>'(e) {
        let target = e.eventTarget;
        let si = target.selectedIndex;
        this.set({
            si
        });
    },
    '_cn<change>'(e) {
        let target = e.eventTarget;
        let url = target.value;
        this.set({
            url
        });
    },
    '_co<click>'() {
        this.digest({
            played: true
        });
    },
    '_cf<click>'(e) {
        this.digest({
            active: e.params.id
        });
    }
});
