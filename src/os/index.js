/*!1.0.5 kooboy_li@163.com*/
/*
    generate by magix-composer@1.0.5
    https://github.com/thx/magix-composer
    author: xinglie.lkf@alibaba-inc.com
    loader:module
 */
import "./wallpaper.js";
import "./tool.js";
import "./icon.js";
import "./taskbar.js";
let $quick_e_0_static_node;
let $quick_e_1_static_node;
let $quick_e_2_static_node;
import Magix  from "../lib/magix.js";

export default Magix.View.extend({
    tmpl: ($$, $_create,$_viewId,$n)=> { 
let $_temp,$vnode_0=[],
{
	id,}=$$

if($quick_e_0_static_node){
$vnode_0.push($quick_e_0_static_node);
}else{
$vnode_0.push($quick_e_0_static_node=$_create('div',{'_': '_','mx-view': '~xl/os/wallpaper','class': 'xl-a',}));
}

if($quick_e_1_static_node){
$vnode_0.push($quick_e_1_static_node);
}else{
$vnode_0.push($quick_e_1_static_node=$_create('div',{'_': 'a','mx-view': '~xl/os/tool','class': 'xl-c',}));
}

if($quick_e_2_static_node){
$vnode_0.push($quick_e_2_static_node);
}else{
$vnode_0.push($quick_e_2_static_node=$_create('div',{'_': 'b','mx-view': '~xl/os/icon','class': 'xl-b',}));
}
$vnode_0.push($_create('div',{'mx-view': '~xl/os/taskbar','class': 'xl-C','id': $n(id)+'_tb',})); 

return $_create($_viewId,0,$vnode_0); } ,
    render() {
        this.digest();
    }
});
