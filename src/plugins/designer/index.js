/*!1.0.5 kooboy_li@163.com*/
/*
    generate by magix-composer@1.0.5
    https://github.com/thx/magix-composer
    author: xinglie.lkf@alibaba-inc.com
    loader:module
 */
let $quick_root_o_1_static_node;
import Magix  from "../../lib/magix.js";
export default Magix.View.extend({
    tmpl: ($$, $_create,$_viewId)=> { 
if(!$quick_root_o_1_static_node){
let $_temp,$vnode_0=[]
$vnode_0.push($_create('iframe',{'sandbox': 'allow-scripts allow-same-origin allow-popups','allowfullscreen': true,'src': '//xinglie.github.io/report-designer/iot.html','frameborder': 'no','style': 'width:100%;height:100%','scrolling': 'yes',})); 
$quick_root_o_1_static_node=$_create($_viewId,0,$vnode_0);
}
return $quick_root_o_1_static_node } ,
    assign() {
        return false;
    },
    render() {
        this.digest();
    }
});
