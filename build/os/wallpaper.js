import t from"../lib/magix.js";let s=Object.assign({},t.Event);export default t.View.extend({tmpl:(t,s,e)=>{let i=[],{src:r}=t;return r&&i.push(s("img",{src:r,class:"xl-a"},1)),s(e,0,i)},init(){let e=s=>{if(this.get("src")!=s.src){let e=t.mark(this,"_aa");this.digest({src:""}),this.root.style.backgroundImage=`url(${s.thumb})`,setTimeout((()=>{e()&&this.digest({src:s.src})}),20)}};s.on("_ab",e),this.on("destroy",(()=>{s.off("_ab",e)}))},render(){this.digest()}}).static({_ac(t,e){s.fire("_ab",{thumb:t,src:e})}});