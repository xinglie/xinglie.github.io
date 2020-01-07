/*!1.0.5 kooboy_li@163.com*/
/*
    generate by magix-composer@1.0.5
    https://github.com/thx/magix-composer
    author: xinglie.lkf@alibaba-inc.com
    loader:module
 */
import "../../gallery/mx-more/index.js";
/*
    author:xinglie.lkf@alibaba-inc.com
*/
import Magix  from "../../lib/magix.js";
export default Magix.View.extend({
    tmpl: ($$, $_create,$_viewId,$n,$eu)=> { 
let $_temp,$vnode_0=[],
{
	rnd,}=$$,
$vnode_1,
$text
$vnode_0.push($_create('div',{'mx-view': '~xl/gallery/mx-more/index?placeholder='+($eu(rnd)),}));$vnode_1=[$_create(0,0,'gogo')];$vnode_0.push($_create('button',{'_': '_','mx-click': $_viewId+'go()',},$vnode_1)); 

return $_create($_viewId,0,$vnode_0); } ,
    render() {
        this.digest();
    },
    'go<click>'() {
        this.digest({
            rnd: Math.random()
        });
        this.owner.unmountVframe();
    }
});
