/*!1.0.5 kooboy_li@163.com*/
/*
    generate by magix-composer@1.0.5
    https://github.com/thx/magix-composer
    author: xinglie.lkf@alibaba-inc.com
    loader:module
 */
let $quick_k_0_static_attr={'class': 'xl-U xl-_',};
let $quick_k_1_static_attr={'class': 'xl-V',};
let $quick_k_2_static_attr={'class': 'xl-W',};
let $quick_k_3_static_attr={'class': 'xl-Y',};
let $quick_k_4_static_attr={'class': 'xl-Z',};
import Magix  from "../../lib/magix.js";
import List  from "./db.js";
Magix.applyStyle("xl-f","[mx-view^=\"~xl/plugins/blog/index\"]{background:#3f3e3c}.xl-U{width:1080px;margin:0 auto 20px}.xl-V{margin:20px 5px;background:#222;box-shadow:0 1px 0 hsla(0,0%,100%,.1),inset 0 1px 1px rgba(0,0,0,.7);width:530px;color:#b9b9b9;border-radius:6px;float:left}.xl-W{padding:0 0 0 20px;font:16px/50px Microsoft YaHei,Arial,Helvetica,sans-serif}.xl-X{color:#a6a6a6;text-decoration:none;-webkit-transition:all 1s ease;transition:all 1s ease}.xl-X:hover{padding-left:20px;color:#fff}.xl-Y{overflow:hidden;line-height:24px;height:50px;padding:0 20px 5px;color:#616161}.xl-Z{background:rgba(1,1,1,.3);border-radius:0 0 6px 6px;padding:0 10px 0 18px;color:#3f3e3c}");
export default Magix.View.extend({
    tmpl: ($$, $_create,$_viewId,$n)=> { 
let $_temp,$vnode_0=[],
{
	list,}=$$,
$vnode_1,
$vnode_2,
$vnode_3,
$vnode_4,
$vnode_5,
$text
$vnode_1=[];
for(let $q_c_aubbqqww=list.length,$q_key_kupatm=0;$q_key_kupatm<$q_c_aubbqqww;$q_key_kupatm++){
let a=list[$q_key_kupatm];
$vnode_5=[$_create(0,0,$n(a.title))];
$vnode_4=[$_create('a',{'class': 'xl-X','href': $n(a.href),'target': '_blank','rel': 'noopener noreferrer',},$vnode_5)];
$vnode_3=[$_create('h2',$quick_k_2_static_attr,$vnode_4)];$vnode_4=[$_create(0,0,$n(a.desc))];$vnode_3.push($_create('div',$quick_k_3_static_attr,$vnode_4));$vnode_4=[$_create(0,0,$n(a.date))];$vnode_3.push($_create('div',$quick_k_4_static_attr,$vnode_4));
$vnode_2=[$_create('div',$quick_k_1_static_attr,$vnode_3)];$vnode_1.push(...$vnode_2);
}$vnode_0.push($_create('div',$quick_k_0_static_attr,$vnode_1)); 

return $_create($_viewId,0,$vnode_0); } ,
    assign() {
        return false;
    },
    render() {
        this.digest({
            list: List
        });
    }
});
