/*!1.0.5 kooboy_li@163.com*/
/*
    generate by magix-composer@1.0.5
    https://github.com/thx/magix-composer
    author: xinglie.lkf@alibaba-inc.com
    loader:module
 */
let $quick_s_0_static_node;
import Magix  from "../../lib/magix.js";
//import Frontend from 'http://localhost/frontend/src/fe.js';
import Frontend  from "https://xinglie.github.io/frontend/build/fe.js";
export default Magix.View.extend({
    tmpl: ($$, $_create,$_viewId,$n)=> { 
let $_temp,$vnode_0=[],
{
	id,}=$$,
$vnode_1,
$vnode_2,
$text

if($quick_s_0_static_node){
$vnode_1=[$quick_s_0_static_node];
}else{
$vnode_2=[$_create(0,0,'loading...')];
$vnode_1=[$quick_s_0_static_node=$_create('div',{'_': '_','class': 'xl-w',},$vnode_2)];
}
$vnode_0.push($_create('div',{'id': 'fe_'+$n(id),},$vnode_1)); 

return $_create($_viewId,0,$vnode_0); } ,
    init() {
        this.on('destroy', () => {
            Frontend.unmount('fe_' + this.id);
        });
    },
    assign() {
        return false;
    },
    render() {
        this.digest();
        this.root.id = Magix.guid('_s_');
        Frontend.mount('fe_' + this.id, {
            logo: 0,
            hash: 0,
            scrollId: this.root.id
        });
    }
});
