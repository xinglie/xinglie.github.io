/*!1.0.2 kooboy_li@163.com*/
import e from"../../lib/magix.js";import t from"./bridge.js";export default e.View.extend({tmpl:(e,t,i,r)=>{let o=[],{url:l}=e;return o.push(t("iframe",{src:r(l),sandbox:"allow-scripts allow-same-origin allow-popups",frameborder:"no",style:"width:100%;height:100%",scrolling:"yes"})),t(i,0,o)},init(){let e=this.render.bind(this);this.on("destroy",()=>{t.off("_bU",e)}),t.on("_bU",e)},render(){let e=t._bW(),i=t._bX(),r=e.skipURL||e.url;i&&(r="//3g.163.com/touch/comment.html?docid="+e.docid),r=r.replace(/^https?:/i,""),this.digest({url:r})}});