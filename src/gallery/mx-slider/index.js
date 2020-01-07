/*!1.0.5 kooboy_li@163.com*/
/*
    generate by magix-composer@1.0.5
    https://github.com/thx/magix-composer
    author: xinglie.lkf@alibaba-inc.com
    loader:module
 */

/*
    author:xinglie.lkf@alibaba-inc.com
*/
import Magix  from "../../lib/magix.js";
import Dragdrop  from "../mx-dragdrop/index.js";
Magix.applyStyle("xl-b","[mx-view*=\"/mx-slider/index\"]{position:relative;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.xl-M{height:4px;background:#fff;cursor:pointer;border-radius:2px}.xl-N{width:8px;height:8px;border-radius:50%;cursor:pointer;top:-2px;margin-left:-4px;box-shadow:0 0 0 2px rgba(136,203,251,.41)}.xl-O,.xl-N{background:#88cbfb;position:absolute}.xl-O{top:0}.xl-P,.xl-O{height:4px;border-radius:2px}.xl-P{background:#999}");
export default Magix.View.extend({
    tmpl: ($$, $_create,$_viewId,$n)=> { 
let $_temp,$vnode_0=[],
{
	id,
	buffer,
	bufferValue,
	value,}=$$,
$vnode_1,
$vnode_2
$vnode_1=[];
if(buffer){

$vnode_2=[$_create('div',{'class': 'xl-P','style': 'width:'+$n(bufferValue*100)+'%',})];$vnode_1.push(...$vnode_2);
}$vnode_1.push($_create('div',{'class': 'xl-O','style': 'width:'+$n(value*100)+'%',}));$vnode_0.push($_create('div',{'class': 'xl-M','id': 't_'+$n(id),'mx-click': $_viewId+'_j()',},$vnode_1),$_create('div',{'class': 'xl-N','style': 'left:'+$n(value*100)+'%','mx-mousedown': $_viewId+'_k()',})); 

return $_create($_viewId,0,$vnode_0); } ,
    mixins: [Dragdrop],
    assign(data) {
        if (!this['_i']) {
            this.set(data);
            return true;
        }
        console.log('prevent');
        return false;
    },
    render() {
        this.digest();
    },
    '_j<click>'(e) {
        let bound = e.eventTarget.getBoundingClientRect();
        let p = (e.pageX - bound.left) / bound.width;
        this.digest({
            value: p
        });
        Magix.dispatch(this.root, 'change', {
            percent: p
        });
    },
    '_k<mousedown>'(e) {
        let bound = Magix.node('t_' + this.id).getBoundingClientRect();
        let v = this.get('value') || 0;
        this['_i'] = 1;
        this['_d'](e, (ev) => {
            let diff = ev.pageX - e.pageX;
            let p = diff / bound.width + v;
            if (p > 1)
                p = 1;
            else if (p < 0)
                p = 0;
            this.digest({
                value: p
            });
            Magix.dispatch(this.root, 'update', {
                percent: p
            });
        }, () => {
            Magix.dispatch(this.root, 'change', {
                percent: this.get('value')
            });
            delete this['_i'];
        });
    }
});
