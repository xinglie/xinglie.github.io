/*!1.0.5 kooboy_li@163.com*/
/*
    generate by magix-composer@1.0.5
    https://github.com/thx/magix-composer
    author: xinglie.lkf@alibaba-inc.com
    loader:module
 */
let $quick_n_0_static_node;
let $quick_n_1_static_node;
let $quick_n_2_static_node;
let $quick_n_3_static_node;
let $quick_n_4_static_node;
let $quick_n_5_static_node;
let $quick_n_6_static_node;
/*
    author:xinglie.lkf@alibaba-inc.com
*/
import Magix  from "../../lib/magix.js";
import Cron  from "../../lib/cron.js";
import Dragdrop  from "../../gallery/mx-dragdrop/index.js";
Magix.applyStyle("xl-h",".xl-al{background:rgba(0,0,0,.27);width:150px;height:150px;border-radius:50%;position:relative;cursor:move}.xl-am{height:2px;border-radius:1px;width:78px;top:calc(50% - 1px);left:60px;-webkit-transform-origin:15px center;transform-origin:15px center}.xl-an,.xl-am{position:absolute;background:#fff}.xl-an{height:4px;border-radius:2px;width:60px;top:calc(50% - 2px);left:63px;-webkit-transform-origin:12px center;transform-origin:12px center}.xl-ao{background:#fff;border-radius:3px;width:50px;left:65px;-webkit-transform-origin:10px center;transform-origin:10px center}.xl-ap,.xl-ao{position:absolute;height:6px;top:calc(50% - 3px)}.xl-ap{background:hsla(0,0%,100%,.4);box-shadow:0 0 0 2px rgba(0,0,0,.4);border-radius:50%;width:6px;left:calc(50% - 3px)}.xl-aq,.xl-ar,.xl-as,.xl-at,.xl-au,.xl-av{position:absolute;left:0;top:calc(50% - 2px);height:4px;width:100%}.xl-aq:after,.xl-aq:before,.xl-ar:after,.xl-ar:before,.xl-as:after,.xl-as:before,.xl-at:after,.xl-at:before,.xl-au:after,.xl-au:before,.xl-av:after,.xl-av:before{content:\" \";display:block;position:absolute;top:0;height:100%;width:4px;border-radius:50%;background:hsla(0,0%,100%,.4)}.xl-aq:before,.xl-ar:before,.xl-as:before,.xl-at:before,.xl-au:before,.xl-av:before{left:4px}.xl-aq:after,.xl-ar:after,.xl-as:after,.xl-at:after,.xl-au:after,.xl-av:after{right:4px}.xl-ar{-webkit-transform:rotate(30deg);transform:rotate(30deg)}.xl-as{-webkit-transform:rotate(60deg);transform:rotate(60deg)}.xl-at{-webkit-transform:rotate(90deg);transform:rotate(90deg)}.xl-au{-webkit-transform:rotate(120deg);transform:rotate(120deg)}.xl-av{-webkit-transform:rotate(150deg);transform:rotate(150deg)}");
export default Magix.View.extend({
    mixins: [Dragdrop],
    tmpl: ($$, $_create,$_viewId,$n)=> { 
let $_temp,$vnode_0=[],
{
	id,}=$$,
$vnode_1

if($quick_n_0_static_node){
$vnode_1=[$quick_n_0_static_node];
}else{

$vnode_1=[$quick_n_0_static_node=$_create('div',{'_': '_','class': 'xl-aq',})];
}

if($quick_n_1_static_node){
$vnode_1.push($quick_n_1_static_node);
}else{
$vnode_1.push($quick_n_1_static_node=$_create('div',{'_': 'a','class': 'xl-ar',}));
}

if($quick_n_2_static_node){
$vnode_1.push($quick_n_2_static_node);
}else{
$vnode_1.push($quick_n_2_static_node=$_create('div',{'_': 'b','class': 'xl-as',}));
}

if($quick_n_3_static_node){
$vnode_1.push($quick_n_3_static_node);
}else{
$vnode_1.push($quick_n_3_static_node=$_create('div',{'_': 'c','class': 'xl-at',}));
}

if($quick_n_4_static_node){
$vnode_1.push($quick_n_4_static_node);
}else{
$vnode_1.push($quick_n_4_static_node=$_create('div',{'_': 'd','class': 'xl-au',}));
}

if($quick_n_5_static_node){
$vnode_1.push($quick_n_5_static_node);
}else{
$vnode_1.push($quick_n_5_static_node=$_create('div',{'_': 'e','class': 'xl-av',}));
}
$vnode_1.push($_create('div',{'class': 'xl-ao','id': 'h_'+$n(id),}),$_create('div',{'class': 'xl-an','id': 'm_'+$n(id),}),$_create('div',{'class': 'xl-am','id': 's_'+$n(id),}));
if($quick_n_6_static_node){
$vnode_1.push($quick_n_6_static_node);
}else{
$vnode_1.push($quick_n_6_static_node=$_create('div',{'_': 'f','class': 'xl-ap',}));
}
$vnode_0.push($_create('div',{'class': 'xl-al','mx-mousedown': $_viewId+'_ax()',},$vnode_1)); 

return $_create($_viewId,0,$vnode_0); } ,
    assign() {
        return false;
    },
    render() {
        this.digest();
        let second = Magix.node('s_' + this.id);
        let minute = Magix.node('m_' + this.id);
        let hour = Magix.node('h_' + this.id);
        let work = () => {
            let now = new Date();
            let seconds = (now.getSeconds() * 1000 + now.getMilliseconds()) / 1000;
            let minutes = (now.getMinutes() * 60 + seconds) / 60;
            let hours = (now.getHours() * 60 + minutes) / 60;
            second.style.transform = `rotate(${seconds * 6 - 90}deg)`;
            minute.style.transform = `rotate(${minutes * 6 - 90}deg)`;
            hour.style.transform = `rotate(${hours * 30 - 90}deg)`;
        };
        Cron["_s"](work, 0, true, '_aw');
        this.on('destroy', () => {
            Cron["_t"](work);
        });
    },
    '_ax<mousedown>'(e) {
        let target = this.root;
        let right = parseInt(getComputedStyle(target).right);
        let bottom = parseInt(getComputedStyle(target).bottom);
        this['_d'](e, (ev) => {
            let ox = e.pageX - ev.pageX;
            let oy = e.pageY - ev.pageY;
            let newX = right + ox;
            let newY = bottom + oy;
            target.style.right = newX + 'px';
            target.style.bottom = newY + 'px';
        });
    }
});
