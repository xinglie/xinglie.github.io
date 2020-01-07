/*!1.0.5 kooboy_li@163.com*/
/*
    generate by magix-composer@1.0.5
    https://github.com/thx/magix-composer
    author: xinglie.lkf@alibaba-inc.com
    loader:module
 */
import "./time.js";
import "./lyric.js";
import "./channels.js";
let $quick_z_1_static_node;
let $quick_z_3_static_node;
let $quick_z_4_static_node;
let $quick_z_8_static_node;
let $quick_z_13_static_node;
let $quick_z_14_static_node;
let $quick_z_0_static_attr={'class': 'xl-bw',};
let $quick_z_2_static_attr={'d': 'M660.823 334.436H641.59c-9.072 0-16.402 7.33-16.402 16.403v132.6c-1.887-1.523-3.92-3.047-6.242-4.426L393.37 339.299c-25.548-15.822-46.45-4.21-46.45 25.91v293.582c0 30.047 20.684 41.297 45.942 25.04l226.663-146.392c2.033-1.306 3.92-2.758 5.662-4.21v139.424c0 9.073 7.33 16.403 16.402 16.403h19.233c9.073 0 16.403-7.331 16.403-16.403V350.839c0-9.073-7.331-16.403-16.403-16.403z','fill': '#fff',};
let $quick_z_11_static_attr={'class': 'xl-bN',};
let $quick_z_12_static_attr={'class': 'xl-by',};
/*
    author:xinglie.lkf@alibaba-inc.com
*/
import Magix  from "../../lib/magix.js";
import Dragdrop  from "../../gallery/mx-dragdrop/index.js";
import Player  from "./player.js";
Magix.applyStyle("xl-n",".xl-bk{position:relative;color:#fff;height:30px;top:-65px;-webkit-transition:top .2s;transition:top .2s}.xl-bl{scrollbar-width:thin;-ms-overflow-style:none}.xl-bl::-webkit-scrollbar{height:0;width:0}.xl-bl:hover::-webkit-scrollbar{width:2px}.xl-bl::-webkit-scrollbar-corner{height:0;width:0}.xl-bl::-webkit-scrollbar-thumb{background:hsla(0,0%,100%,.47);border-radius:2px}.xl-bl::-webkit-scrollbar-thumb:hover{background:#fff}.xl-bm{position:absolute;background:rgba(0,0,0,.53);height:190px;width:672px;-webkit-transition:all .25s;transition:all .25s;overflow:auto;padding:4px;top:52px;border-radius:4px;right:0;z-index:1}.xl-bn{height:480px;width:672px}.xl-bo{top:0}.xl-bp{top:0;right:5px;width:20px;height:22px}.xl-bq{width:78px;float:left;height:90px;text-align:center;cursor:pointer;border:1px solid transparent;border-radius:5px;margin:2px}.xl-bq:hover{opacity:.6;border-color:hsla(0,0%,100%,.2)}.xl-br{border-color:#fff}.xl-br:hover{opacity:1;border-color:#fff}.xl-bs{display:-webkit-inline-box;display:inline-flex;-webkit-box-align:center;align-items:center;width:68px;height:60px}.xl-bt{width:auto;height:auto;max-width:100%;max-height:100%}.xl-bu{width:50px;height:50px;border:1px solid #fff;float:left;background-size:cover;background-repeat:no-repeat;background-color:#aaa;margin:-12px 2px 2px}.xl-bv{width:8px;height:8px;background:#333;border-radius:50%;margin:50%;-webkit-transform:translate(-4px,-4px);transform:translate(-4px,-4px);box-shadow:0 0 0 3px hsla(0,0%,100%,.73)}.xl-bw{height:30px;line-height:30px;background:#333;position:relative;z-index:2;width:600px;padding:0 5px;border-radius:4px}.xl-bx{font-size:12px;float:left;width:100px;overflow:hidden;margin:0 5px;position:relative}.xl-by{position:absolute;left:0;top:0;background:#333;width:100px}@-webkit-keyframes xl-a{0%{-webkit-transform:rotate(0deg);transform:rotate(0deg)}to{-webkit-transform:rotate(1turn);transform:rotate(1turn)}}@keyframes xl-a{0%{-webkit-transform:rotate(0deg);transform:rotate(0deg)}to{-webkit-transform:rotate(1turn);transform:rotate(1turn)}}.xl-bu{border-radius:50%;-webkit-animation:xl-a 8s linear infinite;animation:xl-a 8s linear infinite;border-width:3px;cursor:pointer}.xl-bz{border:1px solid transparent;cursor:pointer;border-radius:2px;width:20px;height:20px;float:left;display:block;margin-top:4px}.xl-bz:hover{opacity:.6;border-color:#fff}.xl-bA{cursor:not-allowed;opacity:.6}.xl-bA:hover{border-color:transparent}.xl-bB{border-color:#fff}.xl-bC{height:30px;display:-webkit-inline-box;display:inline-flex;-webkit-box-align:center;align-items:center;float:left}.xl-bD{width:240px}.xl-bE{-webkit-transform:rotate(180deg);transform:rotate(180deg)}.xl-bF{font-size:12px}.xl-bG{width:80px;margin:0 10px}.xl-bH{font-size:12px;margin:0 10px}.xl-bI{text-align:center;position:absolute;border-radius:4px;width:400px;height:60px;left:210px;top:65px;background:rgba(0,0,0,.53);overflow:hidden;z-index:1;cursor:move}.xl-bJ{font-size:12px;line-height:20px;color:#ddd;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;height:20px;overflow:hidden}.xl-bK{font-weight:700;font-size:14px;opacity:1;color:#fff}.xl-bL{position:absolute;right:5px;top:0;width:14px;height:14px}@-webkit-keyframes xl-b{0%{-webkit-transform:translate(0);transform:translate(0)}to{-webkit-transform:translate(-50%);transform:translate(-50%)}}@keyframes xl-b{0%{-webkit-transform:translate(0);transform:translate(0)}to{-webkit-transform:translate(-50%);transform:translate(-50%)}}.xl-bM{-webkit-animation:xl-b 20s linear infinite;animation:xl-b 20s linear infinite;border-spacing:0;display:table}.xl-bN{white-space:nowrap;min-width:100px;display:table-cell}.xl-bO{-webkit-animation-play-state:paused;animation-play-state:paused}.xl-bP{-webkit-animation-name:none;animation-name:none;padding-left:0}");
export default Magix.View.extend({
    tmpl: ($$, $_create,$_viewId,$n)=> { 
let $_temp,$vnode_0=[],
{
	active,
	buffer,
	song,
	play,
	undo,
	ptip,
	reset,
	ntip,
	mode,
	error,
	cshow,}=$$,
$$_class,
$vnode_1,
$vnode_2,
$vnode_3,
$text,
$vnode_4,
$vnode_5,
$$_title,
$vnode_6
$vnode_1=[];
if(active){
let animPaused=buffer||!song.picture||!play;;
if($quick_z_1_static_node){
$vnode_4=[$quick_z_1_static_node];
}else{

$vnode_5=[$_create('path',$quick_z_2_static_attr,0,0,1)];
$vnode_4=[$quick_z_1_static_node=$_create('svg',{'_': '_','viewBox': '0 0 1024 1024',},$vnode_5)];
}
;$$_class='xl-bz xl-bE';if(!undo){;$$_class+=' xl-bA';};
$vnode_3=[$_create('span',{'mx-click': ((undo))&&($_viewId+'_bf()'),'title': $n(ptip),'class': $$_class,},$vnode_4)];
if($quick_z_3_static_node){
$vnode_4=[$quick_z_3_static_node];
}else{

$vnode_4=[$quick_z_3_static_node=$_create('div',{'_': 'a','class': 'xl-bv',})];
}
;$$_class='xl-bu';if(animPaused){;$$_class+=' xl-bO';};if(reset){;$$_class+=' xl-bP';};$vnode_3.push($_create('div',{'mx-click': ((!buffer&&song.picture))&&($_viewId+'_bk()'),'style': ((song.picture))!=null&&('background-image:url('+$n(song.picture)+')'),'class': $$_class,},$vnode_4));
if($quick_z_1_static_node){
$vnode_4=[$quick_z_1_static_node];
}else{

$vnode_5=[$_create('path',$quick_z_2_static_attr,0,0,1)];
$vnode_4=[$quick_z_1_static_node=$_create('svg',{'_': '_','viewBox': '0 0 1024 1024',},$vnode_5)];
}
$vnode_3.push($_create('span',{'class': 'xl-bz','mx-click': $_viewId+'_aY()','title': $n(ntip),},$vnode_4));$vnode_4=[];
if(mode=='rdm'){

if($quick_z_4_static_node){
$vnode_5=[$quick_z_4_static_node];
}else{

$vnode_6=[$_create('path',{'d': 'M229.555 408.457h103.542c5.192 0 20.672 5.192 25.863 10.382l36.245 36.245c10.382 15.573 31.054 15.573 46.534 0 15.573-10.382 15.573-31.053 0-46.534l-36.245-36.245c-15.48-15.48-46.534-31.053-72.489-31.053h-103.45c-20.671 0-31.053 15.573-31.053 31.053 0 20.579 15.573 36.152 31.053 36.152z','fill': '#fff',},0,0,1),$_create('path',{'d': 'M617.771 408.457h56.916v41.436c0 10.382 5.191 15.573 15.573 10.382l119.023-77.588c10.382-5.191 10.382-15.573 0-20.671L690.26 284.428c-10.382-5.191-15.573 0-15.573 10.382v56.824h-56.916c-51.725 0-62.106 25.863-98.351 62.106L400.397 584.303c-20.672 20.671-82.779 41.435-113.833 41.435h-56.916c-20.671 0-31.053 15.48-31.053 31.054 0 20.671 15.48 31.053 31.053 31.053h56.916c51.725 0 124.215-25.863 160.459-62.106L566.046 454.99c25.863-25.863 20.672-46.534 51.725-46.534z','fill': '#fff',},0,0,1),$_create('path',{'d': 'M809.283 646.503L690.26 563.725c-10.382-5.191-15.573 0-15.573 10.382v51.725h-56.916c-5.191 0-20.671-5.19-25.863-10.382l-36.245-36.244c-10.382-15.574-31.053-15.574-46.534 0-15.48 10.382-15.48 31.053 0 46.534l36.245 36.244c15.574 15.48 46.534 31.054 72.49 31.054h56.915v41.436c0 10.382 5.192 15.48 15.574 10.382l119.023-77.588c10.196-5.191 10.196-15.573-.093-20.764z','fill': '#fff',},0,0,1)];
$vnode_5=[$quick_z_4_static_node=$_create('svg',{'_': 'b','viewBox': '0 0 1024 1024',},$vnode_6)];
}
$vnode_4.push(...$vnode_5);
}else{

if($quick_z_8_static_node){
$vnode_5=[$quick_z_8_static_node];
}else{

$vnode_6=[$_create('path',{'fill': '#fff','d': 'M841.8 513.1c0 .1 0 .1 0 0 0 106.1-86 192.1-192 192.1H393.7c-106 0-192-86-192-192s86-192 192-192h309.8v77.1l186.8-107.8-186.8-107.9v74H392.7c-141.4 0-256.1 114.6-256.1 256.1 0 141.4 114.6 256.1 256.1 256.1h256c141.3 0 255.9-114.4 256.1-255.7h-63z',},0,0,1),$_create('path',{'fill': '#fff','d': 'M542.7 626.5V388h-10.1c-4.1 3.6-9 7.2-14.6 11-5.6 3.7-11.6 7.3-18 10.7-6.3 3.4-12.8 6.5-19.4 9.3-6.6 2.8-12.8 5-18.6 6.6v27c5.2-1.3 10.5-3.1 16-5.4 5.5-2.3 10.7-4.7 15.6-7.3 4.9-2.6 9.4-5.2 13.3-7.9 4-2.7 7-5 9-7.1v201.6h26.8z',},0,0,1)];
$vnode_5=[$quick_z_8_static_node=$_create('svg',{'_': 'c','viewBox': '0 0 1024 1024',},$vnode_6)];
}
$vnode_4.push(...$vnode_5);
};$$_title='正在';if(mode=='rdm'){;$$_title+='随机播放';}else{;$$_title+='单曲循环';};$vnode_3.push($_create('span',{'class': 'xl-bz','mx-click': $_viewId+'_bm()','title': $$_title,},$vnode_4));$vnode_4=[];$vnode_6=[$_create(0,0,$n(song.title)+'<'+$n(song.artist)+'>    ')];
$vnode_5=[$_create('div',$quick_z_11_static_attr,$vnode_6)];$vnode_6=[$_create(0,0,$n(song.title)+'<'+$n(song.artist)+'>    ')];$vnode_5.push($_create('div',$quick_z_11_static_attr,$vnode_6));;$$_class='xl-bM';if(animPaused){;$$_class+=' xl-bO';};if(reset){;$$_class+=' xl-bP';};$vnode_4.push($_create('div',{'class': $$_class,},$vnode_5));let tip;;
if(error){
tip=error;
}else if(!play&&!buffer){
tip='点击光盘开始播放';
}else if(buffer){
tip='正在缓冲...';
}
if(tip){
$vnode_6=[$_create(0,0,$n(tip))];
$vnode_5=[$_create('span',$quick_z_12_static_attr,$vnode_6)];$vnode_4.push(...$vnode_5);
}$vnode_3.push($_create('div',{'class': 'xl-bx','title': $n(song.title)+'<'+$n(song.artist)+'>',},$vnode_4));
if($quick_z_13_static_node){
$vnode_3.push($quick_z_13_static_node);
}else{
$vnode_3.push($quick_z_13_static_node=$_create('div',{'_': 'd','mx-view': '~xl/plugins/mplayer/time','class': 'xl-bC',}));
}

if($quick_z_14_static_node){
$vnode_4=[$quick_z_14_static_node];
}else{

$vnode_5=[$_create('path',{'fill': '#fff','d': 'M343.25 512h-112.5c-61.875 0-112.5 50.625-112.5 112.5V737c0 61.875 50.625 112.5 112.5 112.5h112.5c61.875 0 112.5-50.625 112.5-112.5V624.5c0-61.875-50.625-112.5-112.5-112.5zm56.25 225c0 30.938-25.313 56.25-56.25 56.25h-112.5c-30.938 0-56.25-25.313-56.25-56.25V624.5c0-30.938 25.313-56.25 56.25-56.25h112.5c30.938 0 56.25 25.313 56.25 56.25V737zM737 118.25H624.5c-61.875 0-112.5 50.625-112.5 112.5v112.5c0 61.875 50.625 112.5 112.5 112.5H737c61.875 0 112.5-50.625 112.5-112.5v-112.5c0-61.875-50.625-112.5-112.5-112.5zm56.25 225c0 30.938-25.313 56.25-56.25 56.25H624.5c-30.938 0-56.25-25.313-56.25-56.25v-112.5c0-30.938 25.313-56.25 56.25-56.25H737c30.938 0 56.25 25.313 56.25 56.25v112.5zM737 512H624.5C562.625 512 512 562.625 512 624.5V737c0 61.875 50.625 112.5 112.5 112.5H737c61.875 0 112.5-50.625 112.5-112.5V624.5c0-61.875-50.625-112.5-112.5-112.5zm56.25 225c0 30.938-25.313 56.25-56.25 56.25H624.5c-30.938 0-56.25-25.313-56.25-56.25V624.5c0-30.938 25.313-56.25 56.25-56.25H737c30.938 0 56.25 25.313 56.25 56.25V737zm-450-618.75h-112.5c-61.875 0-112.5 50.625-112.5 112.5v112.5c0 61.875 50.625 112.5 112.5 112.5h112.5c61.875 0 112.5-50.625 112.5-112.5v-112.5c0-61.875-50.625-112.5-112.5-112.5zm56.25 225c0 30.938-25.313 56.25-56.25 56.25h-112.5c-30.938 0-56.25-25.313-56.25-56.25v-112.5c0-30.938 25.313-56.25 56.25-56.25h112.5c30.938 0 56.25 25.313 56.25 56.25v112.5z',},0,0,1)];
$vnode_4=[$quick_z_14_static_node=$_create('svg',{'_': 'e','viewBox': '0 0 1024 1024',},$vnode_5)];
}
$vnode_3.push($_create('span',{'class': 'xl-bz','mx-click': $_viewId+'_bl()','title': '当前分类：'+$n(active.name),},$vnode_4));
$vnode_2=[$_create('div',$quick_z_0_static_attr,$vnode_3),$_create('div',{'_': 'f','mx-view': '~xl/plugins/mplayer/lyric','class': 'xl-bI','mx-mousedown': $_viewId+'_bn()',})];$vnode_1.push(...$vnode_2);
};$$_class='xl-bm xl-bl';if(active&&!cshow){;$$_class+=' xl-bp';};$vnode_1.push($_create('div',{'mx-view': '~xl/plugins/mplayer/channels','mx-change': $_viewId+'_aW()','class': $$_class,}));;$$_class='xl-bk';if(active){;$$_class+=' xl-bo';};$vnode_0.push($_create('div',{'class': $$_class,},$vnode_1)); 

return $_create($_viewId,0,$vnode_0); } ,
    mixins: [Dragdrop],
    init() {
        Player.on('_aX', () => {
            if (this.get('mode') == 'rdm') {
                let active = this.get('active');
                Player["_aY"](active.channel_id);
            }
            else {
                Player["_aZ"]();
            }
        });
        Player.on('_b_', (e) => {
            let state = {};
            if (Magix.has(e, 'play')) {
                state.play = e.play;
            }
            if (Magix.has(e, 'buffer')) {
                state.buffer = e.buffer;
            }
            this.digest(state);
        });
        Player.on('_ba', () => {
            this.set({
                reset: false
            });
            this.render();
        });
        Player.on('_bb', e => {
            console.log('song change', e.song);
            this.digest({
                reset: true,
                song: e.song
            });
        });
        let nms = navigator.mediaSession;
        if (nms) {
            nms.setActionHandler('play', () => {
                if (Player["_bc"]()) {
                    console.log('media session play');
                    Player['_bd']();
                    nms.playbackState = 'playing';
                }
            });
            nms.setActionHandler('pause', () => {
                if (Player["_bc"]()) {
                    console.log('media session pause');
                    Player['_be']();
                    nms.playbackState = 'paused';
                }
            });
            nms.setActionHandler('seekbackward', () => {
                console.log('seekbackward');
            });
            nms.setActionHandler('seekforward', () => {
                console.log('seekforward');
            });
            nms.setActionHandler('previoustrack', () => {
                if (Player["_bc"]()) {
                    console.log('previoustrack');
                    Player['_bf']();
                }
            });
            nms.setActionHandler('nexttrack', () => {
                if (Player["_bc"]()) {
                    console.log('nexttrack');
                    let active = this.get('active');
                    Player["_aY"](active.channel_id);
                }
            });
        }
        this.set({
            cshow: false,
            reset: true,
            mode: 'rdm',
            song: {
                title: '软件作者',
                artist: '行列'
            }
        });
    },
    assign() {
        return false;
    },
    render() {
        this.digest({
            ptip: Player["_bg"](),
            ntip: Player["_bh"](),
            undo: Player["_bi"]()
        });
    },
    '_bj'() {
        let play = this.get('play');
        if (play) {
            Player["_be"]();
        }
        else {
            Player["_bd"]();
        }
    },
    '_aW<change>'(e) {
        this.digest({
            active: e.channel
        });
        Player["_aY"](e.channel.channel_id, true);
    },
    '_bk<click>'() {
        this['_bj']();
    },
    '_bl<click>'() {
        this.digest({
            cshow: !this.get('cshow')
        });
    },
    '_aY<click>'() {
        let active = this.get('active');
        Player["_aY"](active.channel_id);
    },
    '_bf<click>'() {
        Player["_bf"]();
    },
    '_bm<click>'() {
        let mode = this.get('mode');
        if (mode == 'rdm') {
            this.digest({
                mode: 'circle'
            });
        }
        else {
            this.digest({
                mode: 'rdm'
            });
        }
    },
    '_bn<mousedown>'(e) {
        let target = e.eventTarget;
        let left = parseInt(getComputedStyle(target).left);
        let top = parseInt(getComputedStyle(target).top);
        this['_d'](e, (ev) => {
            let ox = ev.pageX - e.pageX;
            let oy = ev.pageY - e.pageY;
            let newX = left + ox;
            let newY = top + oy;
            target.style.left = newX + 'px';
            target.style.top = newY + 'px';
        });
    },
    '$doc<keyup>'(e) {
        if (Player["_bc"]()) {
            let code = e.keyCode;
            if (code == 13 || //enter
                code == 32) { //space
                this['_bj']();
            }
            else if (code == 80) { //p
                Player["_bf"]();
            }
            else if (code == 78) { //n
                let active = this.get('active');
                Player["_aY"](active.channel_id);
            }
            else if (code == 67) { //c
                this.digest({
                    cshow: !this.get('cshow')
                });
            }
        }
    },
    '$doc<visibilitychange>'() {
        Player["_bo"](document.hidden);
    },
    '$doc<click>'(e) {
        if (Player["_bc"]() &&
            this.get('cshow')) {
            if (!Magix.inside(e.target, this.root)) {
                this.digest({
                    cshow: false
                });
            }
        }
    }
});
