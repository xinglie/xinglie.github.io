/*!1.0.5 kooboy_li@163.com*/
/*
    generate by magix-composer@1.0.5
    https://github.com/thx/magix-composer
    author: xinglie.lkf@alibaba-inc.com
    loader:module
 */
import "./explain.js";
import "./game.js";
let $quick_r_0_static_node;
import Magix  from "../../lib/magix.js";
Magix.applyStyle("xl-i",".xl-aw{border:none;color:#333;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;background:#f96447;border-radius:5px}");
export default Magix.View.extend({
    tmpl: ($$, $_create,$_viewId)=> { 
let $_temp,$vnode_0=[],
{
	state,}=$$,
$vnode_1

if(state=='desc'){

$vnode_1=[$_create('div',{'_': '_','mx-view': '~xl/plugins/diamond/explain','mx-start': $_viewId+'_aK()',})];$vnode_0.push(...$vnode_1);
}else{

if($quick_r_0_static_node){
$vnode_1=[$quick_r_0_static_node];
}else{

$vnode_1=[$quick_r_0_static_node=$_create('div',{'_': 'a','mx-view': '~xl/plugins/diamond/game',})];
}
$vnode_0.push(...$vnode_1);
} 

return $_create($_viewId,0,$vnode_0); } ,
    init() {
        this.set({
            state: 'desc'
        });
    },
    assign() {
        return false;
    },
    render() {
        this.digest();
    },
    '_aK<start>'(e) {
        this.digest({
            state: 'start'
        });
    }
});
