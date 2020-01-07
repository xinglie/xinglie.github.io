/*!1.0.5 kooboy_li@163.com*/
/*
    generate by magix-composer@1.0.5
    https://github.com/thx/magix-composer
    author: xinglie.lkf@alibaba-inc.com
    loader:module
 */
import "../../gallery/mx-slider/index.js";
let $quick_B_0_static_attr={'class': 'xl-bH',};
/*
    author:xinglie.lkf@alibaba-inc.com
*/

import Magix  from "../../lib/magix.js";
import Player  from "./player.js";
let FastStep = 5;
let TimeCache = new Magix.Cache(500, 100);
let FormatTime = time => {
    time = time | 0;
    if (TimeCache.has(time)) {
        return TimeCache.get(time);
    }
    let m = (time / 60) | 0;
    let s = time - m * 60;
    let r = ('0' + m).slice(-2) + ':' + ('0' + s).slice(-2);
    TimeCache.set(time, r);
    return r;
};
export default Magix.View.extend({
    tmpl: ($$, $_create,$_viewId,$n,$eu,$_ref,$i)=> { 
let $_temp,$vnode_0=[],
{
	format,
	current,
	percent,
	buffered,
	duration,}=$$,
$vnode_1,
$text
$vnode_1=[$_create(0,0,$n(format(current)))];$vnode_0.push($_create('span',$quick_B_0_static_attr,$vnode_1),$_create('div',{'$': 'percent,buffered','class': 'xl-bD','mx-update': $_viewId+'_bT()','mx-change': $_viewId+'_bU()','mx-view': '~xl/gallery/mx-slider/index?value='+$i($_ref,percent,'f')+'&buffer=true&bufferValue='+$i($_ref,buffered,'g'),}));$vnode_1=[$_create(0,0,$n(format(duration)))];$vnode_0.push($_create('span',$quick_B_0_static_attr,$vnode_1)); 

return $_create($_viewId,0,$vnode_0); } ,
    init() {
        this.set({
            duration: 0,
            current: 0,
            buffered: 0,
            format: FormatTime
        });
        Player.on('_bq', e => {
            if (!this.get('stop')) {
                let { duration, current } = e;
                let percent = 0;
                if (duration > 0) {
                    percent = current / duration;
                }
                this.digest({
                    percent,
                    duration,
                    current,
                    buffered: e.buffered
                });
            }
        });
    },
    render() {
        this.digest();
    },
    '_bT<update>'(e) {
        this.digest({
            stop: true,
            current: this.get('duration') * e.percent
        });
    },
    '_bU<change>'(e) {
        this.set({
            stop: false
        });
        let time = this.get('duration') * e.percent;
        Player["_bO"](time);
    },
    '$doc<keydown>'(e) {
        //37 left  39 right
        let { keyCode } = e;
        let left = keyCode == 37;
        let right = keyCode == 39;
        if (left || right) {
            let { duration, current } = this.get();
            if (left) {
                current -= FastStep;
            }
            else if (right) {
                current += FastStep;
            }
            if (current < 0)
                current = 0;
            else if (current > duration)
                current = duration;
            Player["_bO"](current);
        }
    }
});
