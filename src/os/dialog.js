/*!1.0.5 kooboy_li@163.com*/
/*
    generate by magix-composer@1.0.5
    https://github.com/thx/magix-composer
    author: xinglie.lkf@alibaba-inc.com
    loader:module
 */
let $quick_c_0_static_node;
import Magix  from "../lib/magix.js";
import Dragdrop  from "../gallery/mx-dragdrop/index.js";
import DialogCtrl  from "./ctrl.js";
import Exchange  from "./exchange.js";
let WinShowState = 1;
let WinHideState = 2;
let WinMaxState = 4;
let WinNormalState = 8;
let MinSize = 50;

export default Magix.View.extend({
    tmpl: ($$, $_create,$_viewId,$n,$eu,$_ref,$i)=> { 
let $_temp,$vnode_0=[],
{
	show,
	active,
	maxState,
	left,
	top,
	width,
	height,
	zIndex,
	id,
	appId,
	icon,
	title,
	min,
	max,
	close,
	view,
	scroll,
	data,
	resize,}=$$,
$$_class,
$$_style,
$vnode_1,
$vnode_2,
$vnode_3,
$text
$vnode_1=[];$vnode_3=[$_create(0,1,$n(icon))];;$$_class='xl-i';if(active){;$$_class+=' xl-j';};
$vnode_2=[$_create('div',{'class': $$_class,},$vnode_3),$_create(0,0,$n(title))];$vnode_1.push($_create('div',{'class': 'xl-h','mx-mousedown': $_viewId+'_a_()','id': $n(appId)+'_d_t',},$vnode_2));$vnode_2=[];
if(min){

$vnode_3=[$_create('span',{'_': '_','class': 'xl-m xl-o','mx-click': $_viewId+'_V()',})];$vnode_2.push(...$vnode_3);
}
if(max){
;$$_class='xl-m xl-p';if(maxState){;$$_class+=' xl-r';};
$vnode_3=[$_create('span',{'mx-click': $_viewId+'_W()','class': $$_class,})];$vnode_2.push(...$vnode_3);
}
if(close){

$vnode_3=[$_create('span',{'_': 'a','class': 'xl-m xl-n','mx-click': $_viewId+'_X()',})];$vnode_2.push(...$vnode_3);
};$$_class='xl-k';if(active){;$$_class+=' xl-q';};$vnode_1.push($_create('div',{'class': $$_class,},$vnode_2));
if($quick_c_0_static_node){
$vnode_2=[$quick_c_0_static_node];
}else{
$vnode_3=[$_create(0,0,'loading...')];
$vnode_2=[$quick_c_0_static_node=$_create('div',{'_': 'b','class': 'xl-w',},$vnode_3)];
}
;$$_class='xl-u';if(scroll){;$$_class+=' xl-v';};$vnode_1.push($_create('div',{'$': 'maxState,data','mx-view': $n(view)+'?maxState='+$i($_ref,maxState,'_')+'&data='+$i($_ref,data,'a'),'class': $$_class,},$vnode_2));;$$_style='';if(active){;$$_style+='display:none';};$vnode_1.push($_create('div',{'class': 'xl-x','style': $$_style,}),$_create('div',{'class': 'xl-x xl-y','id': $n(id)+'_mk',}));
if(resize&&!maxState){
;$$_class='xl-s';if(active){;$$_class+=' xl-t';};
$vnode_2=[$_create('div',{'mx-mousedown': $_viewId+'_aa()','class': $$_class,})];$vnode_1.push(...$vnode_2);
};$$_class='xl-g xl-z';if(show){;$$_class+=' xl-A';};if(active){;$$_class+=' xl-l';}$$_style='';if(!maxState){;$$_style+='left:'+$n(left)+'px;top:'+$n(top)+'px;width:'+$n(width)+'px;height:'+$n(height)+'px;';};$$_style+='z-index:'+$n(zIndex);$vnode_0.push($_create('div',{'id': $n(id)+'_d','mx-mousedown': $_viewId+'_Y()','class': $$_class,'style': $$_style,},$vnode_1)); 

return $_create($_viewId,0,$vnode_0); } ,
    mixins: [Dragdrop],
    init(data) {
        let state = data.maxState ? WinMaxState : WinNormalState;
        state |= WinHideState;
        this['_L'] = state;
        Exchange.fire('_M', {
            icon: data.icon,
            title: data.title,
            appId: data.appId
        });
        let root = this.root;
        this.on('destroy', () => {
            //console.log(this.id,'destroy',this.get('view'));
            DialogCtrl["_A"](this.get('appId'));
            root.parentNode.removeChild(root);
            Exchange.fire('_N', {
                id: this.get('appId')
            });
        });
    },
    assign(data) {
        this.set(data);
        return true;
    },
    render() {
        this.digest();
    },
    '_O'() {
        let state = this['_L'];
        if (state & WinHideState) {
            this['_L'] = state ^ WinHideState | WinShowState;
            this.root.style.display = '';
            this.digest({
                show: true
            });
        }
    },
    '_G'() {
        let state = this['_L'];
        if (state & WinShowState) {
            this['_L'] = state ^ WinShowState | WinHideState;
            DialogCtrl["_B"](this.get('appId'));
            Exchange.fire('_P', {
                id: this.get('appId')
            });
            this.digest({
                show: false
            });
            this.root.style.display = 'none';
        }
    },
    '_z'() {
        let show = this.get('show');
        if (show) {
            this.digest({
                active: true
            });
        }
        else {
            this.set({
                active: true
            });
            this['_O']();
        }
        Exchange.fire('_Q', {
            id: this.get('appId')
        });
    },
    '_I'() {
        //console.log(this.id,'deactive',this.get('view'));
        this.digest({
            active: false
        });
        Exchange.fire('_R', {
            id: this.get('appId')
        });
    },
    '_S'() {
        let n = Magix.node(this.id + '_mk');
        if (n) {
            n.style.display = 'block';
        }
    },
    '_T'() {
        let n = Magix.node(this.id + '_mk');
        if (n) {
            n.style.display = 'none';
        }
    },
    '_U'() {
        let state = this['_L'];
        //let node = Magix.node('d_' + this.id);
        if (state & WinMaxState) {
            this['_L'] = state ^ WinMaxState | WinNormalState;
            this.digest({
                maxState: false
            });
        }
        else {
            this['_L'] = state ^ WinNormalState | WinMaxState;
            this.digest({
                maxState: true
            });
        }
    },
    '_V<click>'() {
        this['_G']();
    },
    '_W<click>'() {
        this['_U']();
    },
    '_X<click>'(e) {
        //console.log(this.id,'close');
        this.owner.unmountVframe();
    },
    '_Y<mousedown>'() {
        DialogCtrl["_z"](this.get('appId'));
    },
    '_a_<mousedown>'(e) {
        let state = this['_L'];
        let root = getComputedStyle(document.body);
        let taskbarHeight = parseInt(root.getPropertyValue('--xl-_'));
        let viewportWidth = document.body.clientWidth;
        let viewportHeight = document.body.clientHeight - taskbarHeight;
        let rootStyle = Magix.node(this.id + '_d').style;
        let { left, top, width } = this.get();
        let moved = false;
        this['_S']();
        this['_d'](e, (ev) => {
            moved = true;
            if ((state & WinMaxState) == WinMaxState) { //max state
                return;
            }
            let offsetX = ev.pageX - e.pageX;
            let newX = offsetX + left;
            if (newX < MinSize - width) {
                newX = MinSize - width;
            }
            else if (newX > viewportWidth - MinSize) {
                newX = viewportWidth - MinSize;
            }
            let offsetY = ev.pageY - e.pageY;
            let newY = offsetY + top;
            if (newY < 0) {
                newY = 0;
            }
            else if (newY > viewportHeight - MinSize + taskbarHeight) {
                newY = viewportHeight - MinSize + taskbarHeight;
            }
            rootStyle.left = newX + 'px';
            rootStyle.top = newY + 'px';
            this.set({
                left: newX,
                top: newY
            });
        }, ev => {
            this['_T']();
            if (!moved && this.get('max')) {
                let now = Date.now();
                if (this['_Z']) {
                    let diff = now - this['_Z'];
                    if (diff < 300) {
                        this['_Z'] = '';
                        this['_U']();
                    }
                    else {
                        this['_Z'] = now;
                    }
                }
                else {
                    this['_Z'] = now;
                }
            }
        });
    },
    '_aa<mousedown>'(e) {
        let rootStyle = Magix.node(this.id + '_d').style;
        let { width, height, minWidth, minHeight } = this.get();
        this['_S']();
        this['_d'](e, (ev) => {
            let newWidth = ev.pageX - e.pageX + width;
            if (newWidth < minWidth) {
                newWidth = minWidth;
            }
            let newHeight = ev.pageY - e.pageY + height;
            if (newHeight < minHeight) {
                newHeight = minHeight;
            }
            rootStyle.width = newWidth + 'px';
            rootStyle.height = newHeight + 'px';
            this.set({
                width: newWidth,
                height: newHeight
            });
        }, () => {
            this['_T']();
        });
    }
});
