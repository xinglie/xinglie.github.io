/*!1.0.5 kooboy_li@163.com*/
/*
    generate by magix-composer@1.0.5
    https://github.com/thx/magix-composer
    author: xinglie.lkf@alibaba-inc.com
    loader:module
 */
import "./device.js";
let $quick_f_0_static_node;
let $quick_f_3_static_node;
let $quick_f_2_static_attr={'class': 'xl-H',};
import Magix  from "../lib/magix.js";
import Exchange  from "./exchange.js";
import DialogCtrl  from "./ctrl.js";
let AddDialogToList = (list, options) => {
    let added = false;
    if (!list['\x00' + options.appId]) {
        list['\x00' + options.appId] = 1;
        list.push(options);
        added = true;
    }
    return added;
};

export default Magix.View.extend({
    tmpl: ($$, $_create,$_viewId,$n,$eu,$_ref,$i,$eq)=> { 
let $_temp,$vnode_0=[],
{
	list,
	active,}=$$,
$vnode_1,
$vnode_2,
$$_class,
$vnode_3,
$text

if($quick_f_0_static_node){
$vnode_1=[$quick_f_0_static_node];
}else{

$vnode_2=[$_create('path',{'fill': '#fff','d': 'M846.483 734.991c41.052 0 74.33-33.281 74.33-74.33V214.684c0-41.052-33.277-74.333-74.33-74.333H177.517c-41.052 0-74.33 33.281-74.33 74.333v445.977c0 41.049 33.277 74.33 74.33 74.33h222.989v74.33H136.974c-18.66 0-33.786 15.126-33.786 33.786v6.757c0 18.66 15.126 33.786 33.786 33.786h750.052c18.66 0 33.786-15.126 33.786-33.786v-6.757c0-18.66-15.126-33.786-33.786-33.786H586.33v-74.33h260.153zm-594.636-74.33c-41.052 0-74.33-33.281-74.33-74.333V289.013c0-41.052 33.277-74.33 74.33-74.33h520.307c41.049 0 74.33 33.277 74.33 74.33v297.315c0 41.052-33.281 74.333-74.33 74.333H251.847zm520.306-322.092c0-27.368-25.882-49.555-57.81-49.555H309.66c-31.928 0-57.814 22.187-57.814 49.555V536.78c0 27.364 25.885 49.552 57.814 49.552h404.684c31.928 0 57.81-22.187 57.81-49.552V338.569z',},0,0,1)];
$vnode_1=[$quick_f_0_static_node=$_create('svg',{'class': 'xl-F','viewBox': '0 0 1024 1024',},$vnode_2)];
}
$vnode_0.push($_create('div',{'_': '_','class': 'xl-D xl-E','title': '显示桌面','mx-click': $_viewId+'_aj()',},$vnode_1));
for(let $q_c_nqqh=list.length,$q_key_ppimwi=0;$q_key_ppimwi<$q_c_nqqh;$q_key_ppimwi++){
let item=list[$q_key_ppimwi];
$vnode_3=[$_create(0,1,$n(item.icon))];
$vnode_2=[$_create('span',$quick_f_2_static_attr,$vnode_3),$_create(0,0,$n(item.title))];;$$_class='xl-G';if(item.appId==active){;$$_class+=' xl-I';};
$vnode_1=[$_create('div',{'title': $n(item.title),'mx-click': $_viewId+'_ai({id:\''+($eq(item.appId))+'\'})','id': $n(item.appId)+'_tb_i','class': $$_class,},$vnode_2)];$vnode_0.push(...$vnode_1);
}
if($quick_f_3_static_node){
$vnode_0.push($quick_f_3_static_node);
}else{
$vnode_0.push($quick_f_3_static_node=$_create('div',{'_': 'a','mx-view': '~xl/os/device','class': 'xl-K',}));
}
 

return $_create($_viewId,0,$vnode_0); } ,
    init() {
        let list = [], timer;
        let delayUpdate = (updateActive, activeId) => {
            clearTimeout(timer);
            if (updateActive) {
                this.set({
                    active: activeId
                });
            }
            timer = setTimeout(() => {
                console.log('update', activeId);
                this.digest({
                    list
                });
            }, 50);
        };
        Exchange.on('_M', e => {
            if (AddDialogToList(list, e)) {
                delayUpdate();
            }
        });
        Exchange.on('_N', e => {
            for (let i = list.length; i--;) {
                if (list[i].appId == e.id) {
                    list.splice(i, 1);
                    delete list['\x00' + e.id];
                    delayUpdate();
                    break;
                }
            }
        });
        Exchange.on('_Q', e => {
            delayUpdate(true, e.id);
        });
        Exchange.on('_R', () => {
            delayUpdate(true);
        });
        this.set({
            list
        });
    },
    render() {
        let list = this.get('list');
        let dialogs = DialogCtrl["_y"]();
        for (let d of dialogs) {
            AddDialogToList(list, d);
        }
        this.digest();
    },
    '_ai<click>'(e) {
        let { id } = e.params;
        DialogCtrl["_z"](id, true);
    },
    '_aj<click>'() {
        DialogCtrl["_J"]();
    }
});
