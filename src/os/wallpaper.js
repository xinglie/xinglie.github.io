/*!1.0.5 kooboy_li@163.com*/
/*
    generate by magix-composer@1.0.5
    https://github.com/thx/magix-composer
    author: xinglie.lkf@alibaba-inc.com
    loader:module
 */

import Magix  from "../lib/magix.js";
let Bridge = Object.assign({}, Magix.Event);

export default Magix.View.extend({
    tmpl: ($$, $_create,$_viewId,$n)=> { 
let $_temp,$vnode_0=[],
{
	src,}=$$,
$vnode_1

if(src){

$vnode_1=[$_create('img',{'src': $n(src),'class': 'xl-a',},0,0,1)];$vnode_0.push(...$vnode_1);
} 

return $_create($_viewId,0,$vnode_0); } ,
    init() {
        let setWapper = e => {
            if (this.get('src') != e.src) {
                let mark = Magix.mark(this, '_ak');
                this.digest({
                    src: ''
                });
                this.root.style.backgroundImage = `url(${e.thumb})`;
                setTimeout(() => {
                    if (mark()) {
                        this.digest({
                            src: e.src
                        });
                    }
                }, 20);
            }
        };
        Bridge.on('_al', setWapper);
        this.on('destroy', () => {
            Bridge.off('_al', setWapper);
        });
    },
    render() {
        this.digest();
    }
}, {
    '_am'(thumb, src) {
        Bridge.fire('_al', {
            thumb,
            src
        });
    }
});
