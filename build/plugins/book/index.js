let e,t,a,l,r,o,s,i,p,n={class:"xl-5"},h={class:"xl-2"},c={class:"xl-6"},x={class:"xl-7"},u={class:"xl-a_"},d={value:"value"};import f from"../../lib/magix.js";import g from"./db.js";f.applyStyle("xl-g",".xl-1{background-color:#fff;border:1px solid #ccc;box-shadow:none;box-sizing:border-box;flex:0.3;font-size:16px;height:30px;outline:none;padding:3px 4px;vertical-align:middle;width:100%}.xl-2{flex:0.6}.xl-3{cursor:pointer;float:left;padding:0 8px}.xl-4{background:#fafafa;color:#000}.xl-5{align-items:center;background:#f96447;color:#fff;display:flex;font-size:16px;height:40px;line-height:40px;padding:0 10px}.xl-6{background:#fafafa;color:#333;font-weight:700;height:28px;line-height:28px;position:sticky;top:0}.xl-6,.xl-7{padding:0 26px}.xl-8{padding:5px 0}.xl-9{border-bottom:1px solid #f3f3f3}.xl-a_{background:#fafafa;bottom:0;height:30px;line-height:30px;position:sticky}.xl-aa,.xl-a_{padding:0 26px}.xl-aa{font-size:16px;height:50px;line-height:50px}.xl-ab{margin-right:10px;text-decoration:none}.xl-ab:hover{text-decoration:underline}");let b=(e,t)=>e.py.localeCompare(t.py),y=[{name:"\u4e66\u540d",key:"py"},{name:"\u4f5c\u8005",key:"apy"},{name:"\u51fa\u7248",key:"ppy"}],m={py:["title","category","author","translater","publisher"],apy:["author","category","title","translater","publisher"],cpy:["category","title","author","translater","publisher"],ppy:["publisher","category","title","author","translater"]},k={py:["py","title"],apy:["apy","author"],cpy:["cpy","category"],ppy:["ppy","publisher"]},_={title:"\u4e66\u540d",category:"\u5927\u7c7b",author:"\u4f5c\u8005",translater:"\u7ffb\u8bd1",publisher:"\u51fa\u7248"},v=e=>e.title.replace(/-/g," ")+" "+e.author;export default f.View.extend({tmpl:(f,g,b,y,m,k,_)=>{let v,w,j,C,q,z,S=[],{tabs:T,active:M,search:B,list:L,displays:O,keyMap:P,uncode:U,total:V}=f;j=[];for(let e=T.length,t=0;t<e;t+=1){let e=T[t];w=[g(0,e.name)],v="xl-3",e.key==M&&(v+=" xl-4"),j.push(g("li",{"mx5-click":e.key!=M&&b+"\x1e_ai({tab:'"+_(e.key)+"'})",class:v},w))}C=[g("ul",h,j),g("input",{class:"xl-1",placeholder:"\u641c\u7d22","mx5-input":b+"\x1e_al()",value:B},1,d)],S.push(g("div",n,C));let A=0;if(L.length)for(let i=L.length,p=0;p<i;p+=1){let i=L[p];j=[g(0,i.letter)],C=[g("div",c,j)],j=[];for(let p=i.books,n=p.length,h=n-1,c=0;c<n;c+=1){let i=p[c],n=c===h;w=[],A++;for(let e=O.length,t=0;t<e;t+=1){let e=O[t];i[e]&&(q=[g(0,P[e]+"\uff1a"+i[e])],w.push(g("div",0,q)))}q=[e||(e=g(0,"\u641c\u7d22\uff1a"))],z=[t||(t=g(0,"\u767e\u5ea6"))],q.push(g("a",{class:"xl-ab",href:"//www.baidu.com/s?wd="+y(U(i)),target:"_blank",rel:"noopener noreferrer"},z)),z=[a||(a=g(0,"\u6dd8\u5b9d"))],q.push(g("a",{class:"xl-ab",href:"//s.taobao.com/search?q="+y(U(i)),target:"_blank",rel:"noopener noreferrer"},z)),z=[l||(l=g(0,"\u5929\u732b"))],q.push(g("a",{class:"xl-ab",href:"//list.tmall.com/search_product.htm?q="+y(U(i)),target:"_blank",rel:"noopener noreferrer"},z)),z=[r||(r=g(0,"\u4eac\u4e1c"))],q.push(g("a",{class:"xl-ab",href:"//search.jd.com/Search?keyword="+y(U(i))+"&enc=utf-8&wq="+y(U(i)),target:"_blank",rel:"noopener noreferrer"},z)),z=[o||(o=g(0,"\u5f53\u5f53"))],q.push(g("a",{class:"xl-ab",href:"http://search.dangdang.com/?key="+y(U(i)),target:"_blank",rel:"noopener noreferrer"},z)),z=[s||(s=g(0,"\u8c46\u74e3"))],q.push(g("a",{class:"xl-ab",href:"//www.douban.com/search?cat=1001&q="+y(U(i)),target:"_blank",rel:"noopener noreferrer"},z)),w.push(g("div",0,q)),v="xl-8",n||(v+=" xl-9"),j.push(g("li",{class:v},w))}C.push(g("ul",x,j)),S.push(g("div",0,C))}else i?S.push(i):(C=[g(0,"\u6682\u65e0\u76f8\u5173\u4e66\u7c4d")],S.push(i=g("div",{_:"_",class:"xl-aa"},C)));return C=[g(0,"\u5171"+V+"\u672c\uff0c\u5f53\u524d\u5217\u8868\u6709")],j=[g(0,A)],C.push(g("span",0,j),p||(p=g(0,"\u672c"))),S.push(g("div",u,C)),g(b,0,S)},ctor(){this.set({uncode:v,active:"py"})},assign:()=>!1,render(){let e=[],t={},a=this.get("active"),l=this.get("search");for(let e of g)if(e[a]){let r=e[a][0].toLowerCase();if(l){let o=!1,s=k[a];for(let t of s)e[t].indexOf(l)>-1&&(o=!0,BarProp);o&&(t[r]||(t[r]=[]),t[r].push(e))}else t[r]||(t[r]=[]),t[r].push(e)}for(let a,l,r=48;r<123;r++)a=String.fromCharCode(r),l=t[a],l&&(l=l.sort(b),e.push({letter:a.toUpperCase(),books:l}));this.digest({total:g.length,tabs:y,list:e,displays:m[a],keyMap:_})},"_ai<click>"(e){this.set({active:e.params.tab}),this.render()},"_al<input>"(e){this.set({search:e.eventTarget.value}),clearTimeout(this._aj);let t=f.mark(this,"_ak");this._aj=setTimeout((()=>{t()&&this.render()}),500)}});