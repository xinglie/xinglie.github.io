/*!1.0.5 kooboy_li@163.com*/
/*
    generate by magix-composer@1.0.5
    https://github.com/thx/magix-composer
    author: xinglie.lkf@alibaba-inc.com
    loader:module
 */
let $quick_y_0_static_attr={'class': 'xl-bn',};
let $quick_y_1_static_attr={'class': 'xl-bs',};
/*
    author:xinglie.lkf@alibaba-inc.com
*/

import Magix  from "../../lib/magix.js";
import Player  from "./player.js";
export default Magix.View.extend({
    tmpl: ($$, $_create,$_viewId,$n,$eu,$_ref,$i)=> { 
let $_temp,$vnode_0=[],
{
	error,
	channels,
	channel,}=$$,
$vnode_1,
$vnode_2,
$text,
$vnode_3,
$$_class,
$vnode_4,
$vnode_5
$vnode_1=[];
if(error){
$vnode_2=[$_create(0,0,$n(error))];$vnode_1.push(...$vnode_2);
}else{
$vnode_2=[];
for(let $q_c_uqdekoawg=channels.length,$q_key_qpprxrpuoq=0;$q_key_qpprxrpuoq<$q_c_uqdekoawg;$q_key_qpprxrpuoq++){
let c=channels[$q_key_qpprxrpuoq];

$vnode_5=[$_create('img',{'loading': 'lazy','class': 'xl-bt','src': $n(c.cover_small),},0,0,1)];
$vnode_4=[$_create('div',$quick_y_1_static_attr,$vnode_5)];$vnode_5=[$_create(0,0,$n(c.name))];$vnode_4.push($_create('div',0,$vnode_5));;$$_class='xl-bq';if(channel==c){;$$_class+=' xl-br';};
$vnode_3=[$_create('div',{'mx-click': ((channel!=c))&&($_viewId+'_aW({channel:\''+$i($_ref,c,'d.'+($q_key_qpprxrpuoq))+'\'})'),'class': $$_class,},$vnode_4)];$vnode_2.push(...$vnode_3);
}$vnode_1.push(...$vnode_2);
}$vnode_0.push($_create('div',$quick_y_0_static_attr,$vnode_1)); 

return $_create($_viewId,0,$vnode_0); } ,
    async render() {
        let marker = Magix.mark(this, '_aR');
        try {
            let data = await Player["_aV"]();
            if (marker()) {
                this.digest(data);
            }
        }
        catch (_a) {
            if (marker()) {
                this.digest({
                    error: '获取分类失败，请刷新重试'
                });
            }
        }
    },
    '_aW<click>'(e) {
        let { channel } = e.params;
        Magix.dispatch(this.root, 'change', {
            channel
        });
        this.digest({
            channel
        });
    }
});
