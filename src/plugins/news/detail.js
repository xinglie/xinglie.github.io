/*!1.0.5 kooboy_li@163.com*/
/*
    generate by magix-composer@1.0.5
    https://github.com/thx/magix-composer
    author: xinglie.lkf@alibaba-inc.com
    loader:module
 */

import Magix  from "../../lib/magix.js";
import Bridge  from "./bridge.js";
export default Magix.View.extend({
    tmpl: ($$, $_create,$_viewId,$n)=> { 
let $_temp,$vnode_0=[],
{
	url,}=$$
$vnode_0.push($_create('iframe',{'src': $n(url),'sandbox': 'allow-scripts allow-same-origin allow-popups','frameborder': 'no','style': 'width:100%;height:100%','scrolling': 'yes',})); 

return $_create($_viewId,0,$vnode_0); } ,
    init() {
        let watch = this.render.bind(this);
        this.on('destroy', () => {
            Bridge.off('_bZ', watch);
        });
        Bridge.on('_bZ', watch);
    },
    render() {
        let doc = Bridge["_ca"]();
        let comment = Bridge["_cb"]();
        let url = doc.skipURL || doc.url;
        if (comment) {
            url = '//3g.163.com/touch/comment.html?docid=' + doc.docid;
        }
        url = url.replace(/^https?:/i, '');
        this.digest({
            url
        });
    }
});
