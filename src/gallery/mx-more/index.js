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
Magix.applyStyle("xl-a",".xl-L{font-size:20px;text-align:center;line-height:60px}");
export default Magix.View.extend({
    tmpl: ($$, $_create,$_viewId,$n)=> { 
let $_temp,$vnode_0=[],
{
	offset,
	placeholder,}=$$,
$vnode_1,
$text
$vnode_1=[$_create(0,0,$n(placeholder))];$vnode_0.push($_create('div',{'class': 'xl-L','style': 'height:'+$n(offset+60)+'px;margin-top:-'+$n(offset)+'px;padding-top:'+$n(offset)+'px',},$vnode_1)); 

return $_create($_viewId,0,$vnode_0); } ,
    init() {
        let observer = new IntersectionObserver(entries => {
            let entry = entries[0];
            if (entry.isIntersecting) {
                Magix.dispatch(this.root, 'intersect');
            }
        });
        observer.observe(this.root);
        this.ondestroy = () => {
            observer.unobserve(this.root);
        };
    },
    assign(data) {
        this.set({
            placeholder: data.placeholder || '更多加载中...',
            offset: data.offset || 200
        });
        return true;
    },
    render() {
        this.digest();
    }
});
