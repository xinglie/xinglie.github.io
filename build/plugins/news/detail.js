import e from"../../lib/magix.js";import t from"./bridge.js";export default e.View.extend({tmpl:(e,t,i)=>{let r,{url:o}=e;return r=[t("iframe",{src:o,sandbox:"allow-scripts allow-same-origin allow-popups",frameborder:"no",style:"width:100%;height:100%",scrolling:"yes"})],t(i,0,r)},init(){let e=this.render.bind(this);this.on("destroy",(()=>{t.off("_bO",e)})),t.on("_bO",e)},render(){let e=t._bQ(),i=t._bR(),r=e.skipURL||e.url;i&&(r="//3g.163.com/touch/comment.html?docid="+e.docid),r=r.replace(/^https?:/i,""),this.digest({url:r})}});