let $quick_g_0_static_attr={class:"xl-K xl-J"},$quick_g_1_static_attr={class:"xl-L"},$quick_g_2_static_attr={class:"xl-M"},$quick_g_3_static_attr={class:"xl-O"},$quick_g_4_static_attr={class:"xl-P"};import Magix from"../../lib/magix.js";import List from"./db.js";Magix.applyStyle("xlc",'[mx-view*="/blog"]{background:#3f3e3c}.xl-J:after,.xl-J:before{content:" ";display:table}.xl-J:after{clear:both}.xl-K{width:1080px;margin:0 auto 20px}.xl-L{margin:20px 5px;background:#222;box-shadow:0 1px 0 hsla(0,0%,100%,.1),inset 0 1px 1px rgba(0,0,0,.7);width:530px;color:#b9b9b9;border-radius:6px;float:left}.xl-M{padding:0 0 0 20px;font:16px/50px Microsoft YaHei,Arial,Helvetica,sans-serif}.xl-N{color:#a6a6a6;text-decoration:none;-webkit-transition:all 1s ease;transition:all 1s ease}.xl-N:hover{padding-left:20px;color:#fff}.xl-O{overflow:hidden;line-height:24px;height:50px;padding:0 20px 5px;color:#616161}.xl-P{background:rgba(1,1,1,.3);border-radius:0 0 6px 6px;padding:0 10px 0 18px;color:#3f3e3c}');export default Magix.View.extend({tmpl:(t,a,i,e)=>{let l,r,s,x,c,o=[],{list:_}=t;l=[];for(let t=0,i=_,o=i.length;t<o;t++){let o=i[t];c=[a(0,0,e(o.title))],x=[a("a",{class:"xl-N",href:e(o.href),target:"_blank",rel:"noopener noreferrer"},c)],s=[a("h2",$quick_g_2_static_attr,x)],x=[a(0,0,e(o.desc))],s.push(a("div",$quick_g_3_static_attr,x)),x=[a(0,0,e(o.date))],s.push(a("div",$quick_g_4_static_attr,x)),r=[a("div",$quick_g_1_static_attr,s)],l.push(...r)}return o.push(a("div",$quick_g_0_static_attr,l)),a(i,0,o)},render(){this.digest({list:List})}});