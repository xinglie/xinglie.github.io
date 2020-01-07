/*!1.0.5 kooboy_li@163.com*/
/*
    generate by magix-composer@1.0.5
    https://github.com/thx/magix-composer
    author: xinglie.lkf@alibaba-inc.com
    loader:module
 */
let $quick_d_0_static_attr={'class': 'xl-e',};
let $quick_d_1_static_attr={'class': 'xl-f',};
import Magix  from "../lib/magix.js";
import Apps  from "../plugins/app.js";

import DialogCtrl  from "./ctrl.js";
let AppsMap = Magix.toMap(Apps, 'appId');
export default Magix.View.extend({
    tmpl: ($$, $_create,$_viewId,$n,$eu,$_ref,$i)=> { 
let $_temp,$vnode_0=[],
{
	items,}=$$,
$vnode_1,
$vnode_2,
$vnode_3,
$text

for(let $q_c_zrfkkuee=items.length,$q_key_phpawgvln=0;$q_key_phpawgvln<$q_c_zrfkkuee;$q_key_phpawgvln++){
let item=items[$q_key_phpawgvln];
$vnode_3=[$_create(0,1,$n(item.app.icon))];
$vnode_2=[$_create('div',$quick_d_0_static_attr,$vnode_3)];$vnode_3=[$_create(0,0,$n(item.app.title))];$vnode_2.push($_create('div',$quick_d_1_static_attr,$vnode_3));
$vnode_1=[$_create('div',{'class': 'xl-d','style': 'left:'+$n(item.left)+'px;top:'+$n(item.top)+'px','mx-click': $_viewId+'_ah({app:\''+$i($_ref,item.app,'b.'+($q_key_phpawgvln)+'.c')+'\'})',},$vnode_2)];$vnode_0.push(...$vnode_1);
} 

return $_create($_viewId,0,$vnode_0); } ,
    init() {
        let root = getComputedStyle(document.body);
        let width = parseInt(root.getPropertyValue('--xl-a'), 10);
        let height = parseInt(root.getPropertyValue('--xl-b'), 10);
        let gap = parseInt(root.getPropertyValue('--xl-c'), 10);
        let taskbarHeight = parseInt(root.getPropertyValue('--xl-_'));
        this['_ac'] = width;
        this['_ad'] = height;
        this['_ae'] = gap;
        this['_af'] = taskbarHeight;
        let { params } = Magix.parseUrl(location.href);
        if (params.open) {
            let opens = params.open.split(',');
            for (let o of opens) {
                let i = AppsMap[o];
                if (i) {
                    DialogCtrl["_C"](this, i);
                }
            }
        }
    },
    '_ag'() {
        let width = this['_ac'];
        let height = this['_ad'];
        let gap = this['_ae'];
        let taskbarHeight = this['_af'];
        let viewportHeight = document.body.clientHeight - taskbarHeight;
        let startX = gap;
        let startY = gap;
        let items = [];
        for (let e of Apps) {
            items.push({
                app: e,
                left: startX,
                top: startY
            });
            let nextY = startY + height + gap;
            if (nextY + height >= viewportHeight) {
                nextY = gap;
                startX += width + gap;
            }
            startY = nextY;
        }
        this.set({
            items
        });
    },
    render() {
        this['_ag']();
        this.digest();
    },
    '_ah<click>'(e) {
        let { app } = e.params;
        if (app.url) {
            window.open(app.url);
        }
        else {
            DialogCtrl["_C"](this, app);
        }
    },
    '$win<resize>'() {
        this.render();
    }
});
