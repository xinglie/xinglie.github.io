/*!1.0.2 kooboy_li@163.com*/
let e,t={cellpadding:"0",cellspacing:"1",class:"xl-au"},l={colspan:"20",class:"xl-aG"},a={class:"xl-aB"};import i from"../../lib/magix.js";import s from"../../gallery/mx-dragdrop/index.js";i.applyStyle("xlj",'[mx-view^="~xl/plugins/diamond/game"]{padding:5px}.xl-au{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.xl-av{text-align:center;width:60px;height:60px}.xl-aw{background:url(//img.alicdn.com/tfs/TB1B3EYXkH0gK0jSZPiXXavapXa-60-60.jpg) no-repeat}.xl-ax{display:inline-block;width:40px;height:40px}.xl-ay{background:url(//img.alicdn.com/tfs/TB1KawWXeL2gK0jSZFmXXc7iXXa-40-40.gif) no-repeat}.xl-az{background:url(//img.alicdn.com/tfs/TB1mJoTXa67gK0jSZFHXXa9jVXa-40-40.gif) no-repeat;position:absolute;left:-100000px}.xl-aA{left:320px;top:395px;width:112px}.xl-aB,.xl-aA{position:absolute;height:22px}.xl-aB{left:350px;top:45px}.xl-aC{left:320px}.xl-aD,.xl-aC{position:absolute;top:340px;height:22px}.xl-aD{left:384px}.xl-aE:before{content:"\u221a";color:green;font-weight:700}.xl-aF:before,.xl-aE:before{position:absolute;top:0;right:3px}.xl-aF:before{content:"x";color:red}.xl-aF,.xl-aE{position:relative}.xl-aG{font-size:12px;padding:5px 6px}');let x=[[[-1,-1,0,0,0,-1,-1],[-1,-1,0,1,0,-1,-1],[0,0,1,1,1,0,0],[0,0,0,1,0,0,0],[0,0,0,1,0,0,0],[-1,-1,0,0,0,-1,-1],[-1,-1,0,0,0,-1,-1]],[[-1,-1,0,0,0,-1,-1],[-1,-1,0,1,0,-1,-1],[0,0,0,1,0,0,0],[0,1,1,1,1,1,0],[0,0,0,1,0,0,0],[-1,-1,0,1,0,-1,-1],[-1,-1,0,0,0,-1,-1]],[[-1,-1,0,1,0,-1,-1],[-1,-1,0,1,0,-1,-1],[0,1,1,1,1,1,0],[0,0,0,1,0,0,0],[0,0,0,1,0,0,0],[-1,-1,1,1,1,-1,-1],[-1,-1,1,1,1,-1,-1]],[[-1,-1,0,1,0,-1,-1],[-1,-1,1,1,1,-1,-1],[0,1,1,1,1,1,0],[0,0,0,1,0,0,0],[0,0,0,1,0,0,0],[-1,-1,1,1,1,-1,-1],[-1,-1,1,1,1,-1,-1]],[[-1,-1,0,0,0,-1,-1],[-1,-1,0,0,0,-1,-1],[0,0,0,1,0,0,0],[0,0,1,1,1,0,0],[0,1,1,1,1,1,0],[-1,-1,0,0,0,-1,-1],[-1,-1,0,0,0,-1,-1]],[[-1,-1,0,0,0,-1,-1],[-1,-1,0,1,0,-1,-1],[0,0,1,1,1,0,0],[0,1,1,1,1,1,0],[1,1,1,1,1,1,1],[-1,-1,0,0,0,-1,-1],[-1,-1,0,0,0,-1,-1]],[[-1,-1,0,1,0,-1,-1],[-1,-1,1,1,1,-1,-1],[0,1,1,1,1,1,0],[1,1,1,1,1,1,1],[0,1,1,1,1,1,0],[-1,-1,1,1,1,-1,-1],[-1,-1,0,0,0,-1,-1]],[[-1,-1,1,1,1,-1,-1],[-1,-1,1,1,1,-1,-1],[1,1,0,1,1,1,1],[1,1,1,1,1,1,1],[1,1,1,1,1,1,1],[-1,-1,1,1,1,-1,-1],[-1,-1,1,1,1,-1,-1]],[[-1,-1,1,1,1,-1,-1],[-1,-1,1,1,1,-1,-1],[1,1,1,1,1,1,1],[1,1,1,0,1,1,1],[1,1,1,1,1,1,1],[-1,-1,1,1,1,-1,-1],[-1,-1,1,1,1,-1,-1]]],n={8:"\u4f20\u7edf\u578b",7:"\u6234\u7ef4\u65af\u8df3\u8dc3",6:"\u4e94\u8fb9\u5f62",5:"\u5927\u91d1\u5b57\u5854",4:"\u91d1\u5b57\u5854",3:"\u53f0\u706f",2:"\u53e4\u5b57\u5f62",1:"\u5927\u5341\u5b57",0:"\u5341\u5b57\u67b6"},o="\u4e00\u4e8c\u4e09\u56db\u4e94\u516d\u4e03\u516b\u4e5d".split(""),p={5:"\u9887\u597d",4:"\u5f88\u597d",3:"\u806a\u660e",2:"\u5c16\u5b50",1:"\u5927\u5e08"},r="\u6e38\u620f\u7ed3\u675f\uff0c\u6ca1\u6709\u53ef\u4ee5\u79fb\u52a8\u7684\u9752\u86d9\u4e86\uff5e<br/>\u60a8\u7684\u6210\u7ee9\u662f\uff1a{score}<br/>\u5355\u51fb\u4e0a\u4e0b\u4e00\u5173\u6216\u91cd\u65b0\u5f00\u59cb\u65b0\u7684\u6e38\u620f";export default i.View.extend({tmpl:(i,s,x,n)=>{let o,p,r,c,f,y,g,h,d=[],{size:u,result:_,tip:b,desc:m,id:k}=i;p=[];for(let t=0,l=u.length;t<l;t++){c=[];for(let l=0,a=u[t].length;l<a;l++)f=[],-1!=u[t][l]?(g=[],1===u[t][l]&&(h=[s("span",{class:"xl-ax xl-ay",x:n(l),y:n(t),"mx-mousedown":x+"\x1e_aE()"})],g.push(...h)),y=[s("td",{class:"xl-av xl-aw",id:"main_"+n(l)+"_"+n(t)},g)],f.push(...y)):(y=e?[e]:[e=s("td",{_:"_",class:"xl-av"})],f.push(...y)),c.push(...f);r=[s("tr",0,c)],p.push(...r)}return c=[s(0,1,n(_))],r=[s("td",l,c)],p.push(s("tr",0,r)),o=[s("tbody",0,p)],d.push(s("table",t,o)),p=[s(0,0,n(b))],o=[s("div",0,p)],p=[s(0,0,n(m))],o.push(s("div",0,p)),d.push(s("div",a,o),s("span",{class:"xl-ax xl-az",id:n(k)+"_active"})),o=[s(0,0,"\u4e0a\u4e00\u5173")],d.push(s("button",{_:"a",class:"xl-ap xl-aC","mx-click":x+"\x1e_aG()"},o)),o=[s(0,0,"\u4e0b\u4e00\u5173")],d.push(s("button",{_:"b",class:"xl-ap xl-aD","mx-click":x+"\x1e_aF()"},o)),o=[s(0,0,"\u91cd\u65b0\u5f00\u59cb")],d.push(s("button",{_:"c",class:"xl-aA xl-ap","mx-click":x+"\x1e_aH()"},o)),s(x,0,d)},mixins:[s],init(){this._aw=0,this.set({result:"\u9f20\u6807\u62d6\u52a8\u4efb\u610f\u9752\u86d9\u5f00\u59cb\uff0c\u62d6\u52a8\u8fc7\u7a0b\u4e2d\u4f1a\u6709\u76f8\u5e94\u7684\u63d0\u793a<br/>\u60a8\u9700\u8981\u62d6\u52a8\u9752\u86d9\u8df3\u8fc7\u5176\u5b83\u9752\u86d9\uff0c\u8df3\u8fc7\u7684\u88ab\u5403\u6389\uff0c\u5269\u4f59\u9752\u86d9\u8d8a\u5c11\u8d8a\u597d<br/>\u5f53\u53ea\u5269\u4e00\u4e2a\u9752\u86d9\uff0c\u4e14\u5728\u6b63\u4e2d\u4f4d\u7f6e\u65f6\uff0c\u5219\u662f\u6700\u7ec8\u7684\u80dc\u5229"})},render(){let e=this._aw,t=x[e],l=[];for(let e=0;e<t.length;e++)l.push(t[e].slice());this._ax=l,this.digest({size:l,desc:n[e],tip:"\u7b2c"+o[e]+"\u5173"})},"{change.level}"(e){let t,l=x.length-1,a=this;e?a._aw<l&&(a._aw++,t=1):a._aw>0&&(a._aw--,t=1),t&&a.render()},_aB(){let e=this._ax,t={},l=0,a=!0;for(let t=0,i=e.length,s=i-2;t<i;t++){for(let i=0,x=e[t].length,n=x-2;i<x;i++)if(-1!=e[t][i])if(e[t][i]&&l++,t<s){if(i<n){if(1==e[t][i]){if(1==e[t][i+1]&&0===e[t][i+2]){a=!1;break}if(1==e[t+1][i]&&0===e[t+2][i]){a=!1;break}}else if(0===e[t][i]){if(1==e[t][i+1]&&1==e[t][i+2]){a=!1;break}if(1==e[t+1][i]&&1==e[t+2][i]){a=!1;break}}}else if(1==e[t][i]){if(1==e[t+1][i]&&0===e[t+2][i]){a=!1;break}}else if(0===e[t][i]&&1==e[t+1][i]&&1==e[t+2][i]){a=!1;break}}else if(1==e[t][i]){if(1==e[t][i+1]&&0===e[t][i+2]){a=!1;break}}else if(0===e[t][i]&&1==e[t][i+1]&&1==e[t][i+2]){a=!1;break}if(!a)break}return t._ay=a,t._az=a&&1==l&&1==e[3][3],t._aA=l,t},_aC(e,t){let l=null,a=this.root.getBoundingClientRect(),i=(e.x-a.left)/60|0,s=(e.y-a.top)/60|0,x=this._ax;return i<x[0].length&&s<x.length&&(!t||t.x!=i||t.y!=s)&&(l={x:i,y:s}),l},_aD(e,t){let l={can:!1,eatList:[]},a=!0,i=[],s=!1,x=this._ax;if(x[t.y][t.x])return l;if((e={x:e.x,y:e.y}).y==t.y){for(;e.x!=t.x;)if(t.x>e.x?e.x++:e.x--,a){if(1!=x[e.y][e.x]){s=!0;break}i.push({x:e.x,y:e.y}),a=!1}else if(e.x!=t.x){if(0!==x[e.y][e.x]){s=!0;break}a=!0}s||(l.can=!0,l.eatList=i)}else if(e.x==t.x){for(;e.y!=t.y;)if(t.y>e.y?e.y++:e.y--,a){if(1!=x[e.y][e.x]){s=!0;break}i.push({x:e.x,y:e.y}),a=!1}else if(e.y!=t.y){if(0!==x[e.y][e.x]){s=!0;break}a=!0}s||(l.can=!0,l.eatList=i)}return l},"_aE<mousedown>"(e){let t=this,l=e.eventTarget,a=l.getBoundingClientRect(),s=i.node(this.id+"_active"),x=t.root.getBoundingClientRect();l.style.visibility="hidden";let n,o,c=a.left-x.left,f=a.top-x.top;s.style.left=c+"px",s.style.top=f+"px";let y,g,h={x:l.getAttribute("x"),y:l.getAttribute("y")};this._d(e,l=>{l.preventDefault(),n=l.pageX-e.pageX+c,o=l.pageY-e.pageY+f,s.style.left=n+"px",s.style.top=o+"px";let a=t._aC({x:l.pageX,y:l.pageY},h),x=a!=g;if(a&&g&&(x=a.x!=g.x||a.y!=g.y),x&&(g=a,y&&(y.style.opacity=1,y.classList.remove("xl-aE"),y.classList.remove("xl-aF")),a&&(y=i.node("main_"+a.x+"_"+a.y)))){y.style.opacity=.7,t._aD(h,a).can?y.classList.add("xl-aE"):y.classList.add("xl-aF")}},e=>{let a=t._aC({x:e.pageX,y:e.pageY},h),i=!1;if(a){let e=t._aD(h,a);if(e.can){let l=t._ax;l[h.y][h.x]=0,l[a.y][a.x]=1;for(let t,a=0,i=e.eatList.length;a<i;a++)l[(t=e.eatList[a]).y][t.x]=0;if((e=t._aB())._ay){let t;t=e._az?"\u5929\u624d\uff01":p[e._aA]?p[e._aA]+"\uff0c\u8fd8\u6709"+e._aA+"\u4e2a\u9752\u86d9":"\u4e00\u822c\uff0c\u8fd8\u6709"+e._aA+"\u4e2a\u9752\u86d9",this.set({result:r.replace("{score}",t)})}i=!0}else l.style.visibility="visible"}else l.style.visibility="visible";s.style.left="-10000px",y&&(y.style.opacity=1,y.classList.remove("xl-aE"),y.classList.remove("xl-aF")),i&&this.digest({size:this._ax})})},"_aF<click>":function(){this["{change.level}"](!0)},"_aG<click>":function(){this["{change.level}"]()},"_aH<click>":function(){this.render()}});