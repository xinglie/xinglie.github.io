let e,s,l={class:"xl-cn"},r={class:"xl-cp"},a={class:"xl-cq"},t={class:"xl-cr"},i={class:"xl-cx"};import c from"../../lib/magix.js";import n from"../../lib/agent.js";let o=/\.fm-discovery\{[\s\S]+?url\(([^()]+)\)[\s\S]+?<a\s+href="\/([^"]+)"\s+class="q"\s+data-toggle="tooltip"\s+title="[^"]+"\s+data-placement="top">([\S\s]+?)<\/a>[\s\S]+<a[^>]+?rel="nofollow"\s+href="([^"]+)">\s*(\u8c46\u74e3[\S\s]+?)<\/a>[\s\S]+<a[^>]+?rel="nofollow"\s+href="([^"]+)">\s*(IMDB[\S\s]+?)<\/a>[\s\S]+<p\s+class="x-kankan-desc">([\s\S]+?)<\/p>/,d=/<div\s+class="x-kankan-full-desc"\s+style="display:\s*none;">([\s\S]+?)<\/div>/;export default c.View.extend({tmpl:(c,n,o,d)=>{let m,p,x,h,b,f,g,{videoInfo:k,loading:u}=c;return g=[n("div",{class:"xl-co",style:"background-image:url("+k.img+")"})],p="",p+=u?"\u5207\u6362\u4e2d...":"\u6362\u4e00\u6362",x=[n(0,p)],g.push(n("button",{type:"button",class:"xl-b5 xl-cy","mx5-click":o+"\x1e_b1()"},x)),h=[n(0,k.name)],b=[n("a",{class:"xl-cs xl-ct",href:k.detail,rel:"noopener noreferrer",target:"_blank"},h)],f=[n("div",t,b)],h=[e||(e=n(0,"\u817e\u8baf"))],b=[n("a",{href:"https://v.qq.com/x/search/?q="+d(k.name),class:"xl-cs xl-cu xl-cw",rel:"noopener noreferrer",title:"\u4f7f\u7528\u817e\u8baf\u641c\u7d22"+k.name,target:"_blank"},h)],h=[s||(s=n(0,"\u7231\u5947\u827a"))],b.push(n("a",{href:"http://so.iqiyi.com/so/q_"+d(k.name),class:"xl-cs xl-cu xl-cw",rel:"noopener noreferrer",title:"\u4f7f\u7528\u7231\u5947\u4e16\u641c\u7d22"+k.name,target:"_blank"},h)),h=[n(0,k.dbScore)],b.push(n("a",{href:k.dbLink,rel:"noopener noreferrer",target:"_blank",class:"xl-cs xl-cv xl-cw"},h)),h=[n(0,k.imdbScore)],b.push(n("a",{href:k.imdbLink,rel:"noopener noreferrer",target:"_blank",class:"xl-cs xl-cv xl-cw"},h)),f.push(n("div",i,b)),x=[n("div",a,f)],f=[n(0,k.desc,1)],x.push(n("div",0,f)),g.push(n("div",r,x)),m=[n("div",l,g)],n(o,0,m)},async render(){try{let e=c.mark(this,"_aH"),s=await n.request("http://dianying.fm/",0,!0);if(e()){let e={img:"",detail:"",name:"",dbLink:"",dbScore:"",imdbLink:"",imdbScore:"",desc:""};s.replace(o,((s,l,r,a,t,i,c,n,o)=>(e.img=l,e.detail="http://dianying.fm/"+r,e.name=a.trim(),e.dbLink=t,e.dbScore=i.trim(),e.imdbLink=c,e.imdbScore=n.trim(),e.desc=o.trim(),o.replace(d,((s,l)=>(e.desc=l.trim(),s))),s))),this.digest({loading:!1,videoInfo:e})}}catch(e){alert(e),this.set({loading:!1})}},"_b1<click>"(){this.get("loading")||(this.digest({loading:!0}),this.render())}});