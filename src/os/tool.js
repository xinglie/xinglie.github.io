/*!1.0.5 kooboy_li@163.com*/
/*
    generate by magix-composer@1.0.5
    https://github.com/thx/magix-composer
    author: xinglie.lkf@alibaba-inc.com
    loader:module
 */

import Magix  from "../lib/magix.js";

import Tools  from "../plugins/tool.js";
export default Magix.View.extend({
    tmpl: ($$, $_create,$_viewId,$n)=> { 
let $_temp,$vnode_0=[],
{
	tools,}=$$,
$vnode_1

for(let $q_c_hqbdsoiv=tools.length,$q_key_zwjoark=0;$q_key_zwjoark<$q_c_hqbdsoiv;$q_key_zwjoark++){
let tool=tools[$q_key_zwjoark];

$vnode_1=[$_create('div',{'mx-view': $n(tool.view),'class': 'xl-J','style': $n(tool.dockXKey)+':'+$n(tool.dockX)+'px;'+$n(tool.dockYKey)+':'+$n(tool.dockY)+'px;width:'+$n(tool.width)+'px;height:'+$n(tool.height)+'px;',})];$vnode_0.push(...$vnode_1);
} 

return $_create($_viewId,0,$vnode_0); } ,
    render() {
        this.digest({
            tools: Tools
        });
    }
});
