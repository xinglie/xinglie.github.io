import"../../gallery/mx-slider/index.js";let $quick_t_0_static_attr={class:"xl-aP"};import Magix from"../../lib/magix.js";import Player from"./player.js";let FastStep=5,TimeCache=new Magix.Cache(500,100),FormatTime=e=>{if(e|=0,TimeCache.has(e))return TimeCache.get(e);let t=e/60|0,r=e-60*t,i=("0"+t).slice(-2)+":"+("0"+r).slice(-2);return TimeCache.set(e,i),i};export default Magix.View.extend({tmpl:(e,t,r,i,a,s,n)=>{let u,l=[],{format:c,current:d,percent:m,buffered:o,duration:p}=e;return u=[t(0,0,i(c(d)))],l.push(t("span",$quick_t_0_static_attr,u),t("div",{$:"percent,buffered",class:"xl-aL","mx-update":r+"\x1e_bm()","mx-change":r+"\x1e_bn()","mx-view":"~xl/gallery/mx-slider/index?value="+n(s,m,"\x1ed")+"&buffer=true&bufferValue="+n(s,o,"\x1ee")})),u=[t(0,0,i(c(p)))],l.push(t("span",$quick_t_0_static_attr,u)),t(r,0,l)},init(){this.set({duration:0,current:0,buffered:0,format:FormatTime}),Player.on("_aK",e=>{if(!this.get("stop")){let{duration:t,current:r}=e,i=0;t>0&&(i=r/t),this.digest({percent:i,duration:t,current:r,buffered:e.buffered})}})},render(){this.digest()},"_bm<update>"(e){this.digest({stop:!0,current:this.get("duration")*e.percent})},"_bn<change>"(e){this.set({stop:!1});let t=this.get("duration")*e.percent;Player._bh(t)},"$doc<keydown>"(e){let{keyCode:t}=e,r=37==t,i=39==t;if(r||i){let{duration:e,current:t}=this.get();r?t-=FastStep:i&&(t+=FastStep),t<0?t=0:t>e&&(t=e),Player._bh(t)}}});