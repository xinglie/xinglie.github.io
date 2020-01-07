/*!1.0.5 kooboy_li@163.com*/
/*
    generate by magix-composer@1.0.5
    https://github.com/thx/magix-composer
    author: xinglie.lkf@alibaba-inc.com
    loader:module
 */
import "../../gallery/mx-slider/index.js";
let $quick_C_0_static_node;
let $quick_C_2_static_node;
let $quick_C_4_static_attr={'class': 'xl-bF',};
/*
    author:xinglie.lkf@alibaba-inc.com
*/

import Magix  from "../../lib/magix.js";
import Player  from "./player.js";
export default Magix.View.extend({
    tmpl: ($$, $_create,$_viewId,$n,$eu,$_ref,$i)=> { 
let $_temp,$vnode_0=[],
{
	mute,
	volume,}=$$,
$$_title,
$vnode_1,
$vnode_2,
$vnode_3,
$text
$vnode_1=[];
if(mute){

if($quick_C_0_static_node){
$vnode_2=[$quick_C_0_static_node];
}else{

$vnode_3=[$_create('path',{'d': 'M856.573 512l89.179 89.179a31.53 31.53 0 1 1-44.589 44.589l-89.178-89.18-89.18 89.179a31.53 31.53 0 1 1-44.589-44.589L767.395 512l-89.179-89.18a31.53 31.53 0 1 1 44.589-44.589l89.18 89.179 89.179-89.179a31.53 31.53 0 1 1 44.589 44.589zM566.985 953h-2a41.806 41.806 0 0 1-25.786-8.86c.013.124.017.249.031.373L264.44 743H118.985a50 50 0 0 1-50-50V333a50 50 0 0 1 50-50h142.727L539.23 79.487c-.014.123-.018.249-.031.372A41.808 41.808 0 0 1 564.985 71h2a42 42 0 0 1 42 42v2c0 .1-.007.2-.008.3h.008v793.4l-.008-.006c0 .1.008.2.008.3v2a42 42 0 0 1-42 42.006zm-358-595a15 15 0 0 0-15-15h-50a15 15 0 0 0-15 15v310a15 15 0 0 0 15 15h50a15 15 0 0 0 15-15V358zm340-167.7c-.051.063-.111.119-.163.181a19.991 19.991 0 0 0-33.656-11.934L283.985 335c-.087 0-.17.011-.256.013.053.133.091.273.141.407a32.988 32.988 0 0 0-14.621 23.469c-.089.009-.175.028-.264.035v306.152c.089.007.175.026.264.035a32.988 32.988 0 0 0 14.621 23.469c-.05.134-.088.274-.141.407.086 0 .169.013.256.013l231.181 156.451a19.991 19.991 0 0 0 33.656-11.934c.052.062.112.118.163.181V190.3z','fill': '#fff',},0,0,1)];
$vnode_2=[$quick_C_0_static_node=$_create('svg',{'_': '_','viewBox': '0 0 1024 1024',},$vnode_3)];
}
$vnode_1.push(...$vnode_2);
}else{

if($quick_C_2_static_node){
$vnode_2=[$quick_C_2_static_node];
}else{

$vnode_3=[$_create('path',{'d': 'M693.5 366.931v-.448a30.5 30.5 0 1 1 28.792-52.6 229.988 229.988 0 0 1 1.421 395.417 29.5 29.5 0 1 1-30.213-49.973v-.258a170.031 170.031 0 0 0 0-292.138zm16.959 479.033c-.006-.011-.013-.02-.018-.031A30 30 0 1 1 693.5 788.6v-.21c117.136-37.263 202-146.909 202-276.39s-84.864-239.127-202-276.39v-.033a30 30 0 0 1 5-59.577c7.729 0 9.95 1.148 10.465 1.906-.433 1.038.459.676 0 0a3.271 3.271 0 0 1 .14-.3C851.82 221.777 955.5 354.773 955.5 512c0 156.729-103.026 289.375-245.041 333.964zM566.5 953h-2a41.806 41.806 0 0 1-25.786-8.86c.013.124.017.249.031.373L263.955 743H118.5a50 50 0 0 1-50-50V333a50 50 0 0 1 50-50h142.727L538.745 79.487c-.014.123-.018.249-.031.372A41.808 41.808 0 0 1 564.5 71h2a42 42 0 0 1 42 42v2c0 .1-.007.2-.008.3h.008v793.4l-.008-.006c0 .1.008.2.008.3v2a42 42 0 0 1-42 42.006zm-358-595a15 15 0 0 0-15-15h-50a15 15 0 0 0-15 15v310a15 15 0 0 0 15 15h50a15 15 0 0 0 15-15V358zm340-167.7c-.051.063-.111.119-.163.181a19.991 19.991 0 0 0-33.656-11.934L283.5 335c-.087 0-.17.011-.256.013.053.133.091.273.141.407a32.988 32.988 0 0 0-14.621 23.469c-.089.009-.175.028-.264.035v306.152c.089.007.175.026.264.035a32.988 32.988 0 0 0 14.621 23.469c-.05.134-.088.274-.141.407.086 0 .169.013.256.013l231.181 156.451a19.991 19.991 0 0 0 33.656-11.934c.052.062.112.118.163.181V190.3z','fill': '#fff',},0,0,1)];
$vnode_2=[$quick_C_2_static_node=$_create('svg',{'_': 'a','viewBox': '0 0 1024 1024',},$vnode_3)];
}
$vnode_1.push(...$vnode_2);
};$$_title='点击';if(mute){;$$_title+='开启音量';}else{;$$_title+='静音';};$vnode_0.push($_create('span',{'class': 'xl-bz','mx-click': $_viewId+'_bW()','title': $$_title,},$vnode_1),$_create('div',{'$': 'volume','class': 'xl-bG','mx-update': $_viewId+'_bV()','mx-change': $_viewId+'_bV()','mx-view': '~xl/gallery/mx-slider/index?value='+$i($_ref,volume,'h'),}));$vnode_1=[$_create(0,0,$n((volume*100).toFixed(0)))];$vnode_0.push($_create('span',$quick_C_4_static_attr,$vnode_1)); 

return $_create($_viewId,0,$vnode_0); } ,
    init() {
        this.set({
            volume: 1,
            mute: false
        });
        Player.on('_bJ', e => {
            this.digest({
                volume: e.volume
            });
        });
    },
    render() {
        this.digest();
    },
    '_bV<update,change>'(e) {
        Player["_bR"](e.percent);
    },
    '_bW<click>'() {
        this.digest({
            mute: Player["_bS"]()
        });
    },
    '$doc<keyup>'(e) {
        if (Player["_bc"]()) {
            if (e.keyCode == 77) { //m
                this.digest({
                    mute: Player["_bS"]()
                });
            }
        }
    }
});
