import Magix from"../lib/magix.js";import Tools from"../plugins/tool.js";export default Magix.View.extend({tmpl:(t,e,o,i)=>{let l,s=[],{tools:d}=t;for(let t=0,o=d,x=o.length;t<x;t++){let d=o[t];l=[e("div",{"mx-view":i(d.view),class:"xl-E",style:i(d.dockXKey)+":"+i(d.dockX)+"px;"+i(d.dockYKey)+":"+i(d.dockY)+"px;width:"+i(d.width)+"px;height:"+i(d.height)+"px;"})],s.push(...l)}return e(o,0,s)},render(){this.digest({tools:Tools})}});