/*!1.0.5 kooboy_li@163.com*/
/*
    generate by magix-composer@1.0.5
    https://github.com/thx/magix-composer
    author: xinglie.lkf@alibaba-inc.com
    loader:module
 */
let $quick_p_1_static_node;
let $quick_p_2_static_node;
let $quick_p_0_static_attr={'_': '_','class': 'xl-ax',};
/*
    author:xinglie.lkf@taobao.com
 */

import Magix  from "../../lib/magix.js";
Magix.applyStyle("xl-j",".xl-ax{line-height:26px}.xl-ay{font-size:24px;font-weight:700;margin:30px auto 10px;text-align:center}.xl-az{padding:20px}.xl-az,.xl-aA{position:absolute}.xl-aA{top:350px;left:150px;width:100px;height:40px;font-size:18px}");
export default Magix.View.extend({
    tmpl: ($$, $_create,$_viewId)=> { 
let $_temp,$vnode_0=[],
$vnode_1,
$vnode_2,
$text,
$vnode_3

if($quick_p_1_static_node){
$vnode_1=[$quick_p_1_static_node];
}else{
$vnode_2=[$_create(0,0,'独立(粒)钻石')];
$vnode_1=[$quick_p_1_static_node=$_create('div',{'class': 'xl-ay',},$vnode_2)];
}

if($quick_p_2_static_node){
$vnode_1.push($quick_p_2_static_node);
}else{
$vnode_2=[$_create(0,0,'        独立钻石起源于法国，是一种风靡世界的益智游戏与中国发明的“华容道”、匈牙利人发明的“魔方”， 并称为“智力游戏界的三大不可思议”')];$vnode_2.push($_create('br',0,0,0,1),$_create(0,0,'        它类似于跳棋，但不能走步，只能跳。走棋时棋子跳过相邻的棋子到空位上，并把跳过的棋子吃掉。棋子可以沿棋盘的格线横跳、纵跳，但不能斜跳'));$vnode_3=[$_create(0,0,'了解更多')];$vnode_2.push($_create('a',{'href': 'http://baike.baidu.com/link?url=Y89UVVwKi6EoiGnuYAGVH78PV5NjcJVtJL4wALCqbEUr67Hyq89LeX9bnCHFWd5zNFYAM6qESkMkhJj6Qrg4kq','target': '_blank','rel': 'noopener noreferrer',},$vnode_3),$_create('br',0,0,0,1),$_create('br',0,0,0,1),$_create(0,0,'该游戏基于'));$vnode_3=[$_create(0,0,'Magix')];$vnode_2.push($_create('a',{'href': 'https://github.com/thx/magix','target': '_blank','rel': 'noopener noreferrer',},$vnode_3),$_create(0,0,'制作，Magix是一个'));$vnode_3=[$_create(0,0,'区块管理框架')];$vnode_2.push($_create('a',{'href': 'https://github.com/thx/magix/issues/11','target': '_blank','rel': 'noopener noreferrer',},$vnode_3));$vnode_1.push($quick_p_2_static_node=$_create('span',{'class': 'xl-az',},$vnode_2));
}
$vnode_2=[$_create(0,0,'开始游戏')];$vnode_1.push($_create('button',{'class': 'xl-aA xl-aw','mx-click': $_viewId+'start()',},$vnode_2));$vnode_0.push($_create('div',$quick_p_0_static_attr,$vnode_1)); 

return $_create($_viewId,0,$vnode_0); } ,
    render() {
        let me = this;
        me.digest();
    },
    'start<click>': function () {
        Magix.dispatch(this.root, 'start');
    }
});
