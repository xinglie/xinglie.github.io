let e,t,l={class:"xl-cl"},r={class:"xl-cm"};import s from"../../lib/magix.js";import i from"../../lib/agent.js";let a=/<a\s+href="((?:\/show-|\/\?s=vod-read-id-)[^"]+)"\s+title="([^"]+)">\2<\/a>/g;export default s.View.extend({tmpl:(s,i,a,o)=>{let n,p,h=[],{videos:c}=s;for(let s=c.length,a=0;a<s;a+=1){let s=c[a];n=[i(0,a+1+".")],p=[i("span",r,n)],n=[i(0,s.title)],p.push(i("a",{class:"xl-cj",href:s.link,rel:"noopener noreferrer",target:"_blank"},n)),n=[e||(e=i(0,"\u817e\u8baf"))],p.push(i("a",{href:"https://v.qq.com/x/search/?q="+o(s.title),class:"xl-ci",rel:"noopener noreferrer",title:"\u4f7f\u7528\u817e\u8baf\u641c\u7d22"+s.title,target:"_blank"},n)),n=[t||(t=i(0,"\u7231\u5947\u827a"))],p.push(i("a",{href:"http://so.iqiyi.com/so/q_"+o(s.title),class:"xl-ci",rel:"noopener noreferrer",title:"\u4f7f\u7528\u7231\u5947\u4e16\u641c\u7d22"+s.title,target:"_blank"},n)),h.push(i("div",l,p))}return i(a,0,h)},async render(){try{let e=s.mark(this,"_aH"),t=await i.request("https://www.qsptv.net/topmov.html",0,!0);if(e()){let e=[];t.replace(a,((t,l,r)=>(e.push({link:"https://www.qsptv.net"+l,title:r}),""))),this.digest({videos:e})}}catch(e){alert(e)}}});