let $quick_l_1_static_node,$quick_l_0_static_attr={cellpadding:"0",cellspacing:"1",class:"xl-ag"},$quick_l_2_static_attr={colspan:"20",class:"xl-as"},$quick_l_3_static_attr={class:"xl-an"};import Magix from"../../lib/magix.js";import Dragdrop from"../../gallery/mx-dragdrop/index.js";Magix.applyStyle("xlg",'[mx-view$="/game"]{position:relative;padding:5px}.xl-ag{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.xl-ah{text-align:center;width:60px;height:60px}.xl-ai{background:url(//img.alicdn.com/tfs/TB1B3EYXkH0gK0jSZPiXXavapXa-60-60.jpg) no-repeat}.xl-aj{display:inline-block;width:40px;height:40px}.xl-ak{background:url(//img.alicdn.com/tfs/TB1KawWXeL2gK0jSZFmXXc7iXXa-40-40.gif) no-repeat}.xl-al{background:url(//img.alicdn.com/tfs/TB1mJoTXa67gK0jSZFHXXa9jVXa-40-40.gif) no-repeat;position:absolute;left:-100000px}.xl-am{left:320px;top:395px;width:112px}.xl-an,.xl-am{position:absolute;height:22px}.xl-an{left:350px;top:45px}.xl-ao{left:320px}.xl-ap,.xl-ao{position:absolute;top:340px;height:22px}.xl-ap{left:384px}.xl-aq:before{content:"\u221a";color:green;font-weight:700}.xl-ar:before,.xl-aq:before{position:absolute;top:0;right:3px}.xl-ar:before{content:"x";color:red}.xl-ar,.xl-aq{position:relative}.xl-as{font-size:12px;padding:5px 6px}');let GameLevels=[[[-1,-1,0,0,0,-1,-1],[-1,-1,0,1,0,-1,-1],[0,0,1,1,1,0,0],[0,0,0,1,0,0,0],[0,0,0,1,0,0,0],[-1,-1,0,0,0,-1,-1],[-1,-1,0,0,0,-1,-1]],[[-1,-1,0,0,0,-1,-1],[-1,-1,0,1,0,-1,-1],[0,0,0,1,0,0,0],[0,1,1,1,1,1,0],[0,0,0,1,0,0,0],[-1,-1,0,1,0,-1,-1],[-1,-1,0,0,0,-1,-1]],[[-1,-1,0,1,0,-1,-1],[-1,-1,0,1,0,-1,-1],[0,1,1,1,1,1,0],[0,0,0,1,0,0,0],[0,0,0,1,0,0,0],[-1,-1,1,1,1,-1,-1],[-1,-1,1,1,1,-1,-1]],[[-1,-1,0,1,0,-1,-1],[-1,-1,1,1,1,-1,-1],[0,1,1,1,1,1,0],[0,0,0,1,0,0,0],[0,0,0,1,0,0,0],[-1,-1,1,1,1,-1,-1],[-1,-1,1,1,1,-1,-1]],[[-1,-1,0,0,0,-1,-1],[-1,-1,0,0,0,-1,-1],[0,0,0,1,0,0,0],[0,0,1,1,1,0,0],[0,1,1,1,1,1,0],[-1,-1,0,0,0,-1,-1],[-1,-1,0,0,0,-1,-1]],[[-1,-1,0,0,0,-1,-1],[-1,-1,0,1,0,-1,-1],[0,0,1,1,1,0,0],[0,1,1,1,1,1,0],[1,1,1,1,1,1,1],[-1,-1,0,0,0,-1,-1],[-1,-1,0,0,0,-1,-1]],[[-1,-1,0,1,0,-1,-1],[-1,-1,1,1,1,-1,-1],[0,1,1,1,1,1,0],[1,1,1,1,1,1,1],[0,1,1,1,1,1,0],[-1,-1,1,1,1,-1,-1],[-1,-1,0,0,0,-1,-1]],[[-1,-1,1,1,1,-1,-1],[-1,-1,1,1,1,-1,-1],[1,1,0,1,1,1,1],[1,1,1,1,1,1,1],[1,1,1,1,1,1,1],[-1,-1,1,1,1,-1,-1],[-1,-1,1,1,1,-1,-1]],[[-1,-1,1,1,1,-1,-1],[-1,-1,1,1,1,-1,-1],[1,1,1,1,1,1,1],[1,1,1,0,1,1,1],[1,1,1,1,1,1,1],[-1,-1,1,1,1,-1,-1],[-1,-1,1,1,1,-1,-1]]],GameLevelsDesc={8:"\u4f20\u7edf\u578b",7:"\u6234\u7ef4\u65af\u8df3\u8dc3",6:"\u4e94\u8fb9\u5f62",5:"\u5927\u91d1\u5b57\u5854",4:"\u91d1\u5b57\u5854",3:"\u53f0\u706f",2:"\u53e4\u5b57\u5f62",1:"\u5927\u5341\u5b57",0:"\u5341\u5b57\u67b6"},GameLevelsChar="\u4e00\u4e8c\u4e09\u56db\u4e94\u516d\u4e03\u516b\u4e5d".split(""),GameResultLevel={5:"\u9887\u597d",4:"\u5f88\u597d",3:"\u806a\u660e",2:"\u5c16\u5b50",1:"\u5927\u5e08"},StartResult="\u9f20\u6807\u62d6\u52a8\u4efb\u610f\u9752\u86d9\u5f00\u59cb\uff0c\u62d6\u52a8\u8fc7\u7a0b\u4e2d\u4f1a\u6709\u76f8\u5e94\u7684\u63d0\u793a<br/>\u60a8\u9700\u8981\u62d6\u52a8\u9752\u86d9\u8df3\u8fc7\u5176\u5b83\u9752\u86d9\uff0c\u8df3\u8fc7\u7684\u88ab\u5403\u6389\uff0c\u5269\u4f59\u9752\u86d9\u8d8a\u5c11\u8d8a\u597d<br/>\u5f53\u53ea\u5269\u4e00\u4e2a\u9752\u86d9\uff0c\u4e14\u5728\u6b63\u4e2d\u4f4d\u7f6e\u65f6\uff0c\u5219\u662f\u6700\u7ec8\u7684\u80dc\u5229",PlayResult="\u6e38\u620f\u7ed3\u675f\uff0c\u6ca1\u6709\u53ef\u4ee5\u79fb\u52a8\u7684\u9752\u86d9\u4e86\uff5e<br/>\u60a8\u7684\u6210\u7ee9\u662f\uff1a{score}<br/>\u5355\u51fb\u4e0a\u4e0b\u4e00\u5173\u6216\u91cd\u65b0\u5f00\u59cb\u65b0\u7684\u6e38\u620f";export default Magix.View.extend({tmpl:(e,t,a,l)=>{let i,s,x,r,o,n,c,p,_=[],{size:g,result:f,tip:u,desc:h,id:d}=e;s=[];for(let e=0,i=g.length;e<i;e++){r=[];for(let i=0,s=g[e].length;i<s;i++)o=[],-1!=g[e][i]?(c=[],1===g[e][i]&&(p=[t("span",{class:"xl-aj xl-ak",x:l(i),y:l(e),"mx-mousedown":a+"\x1e_ai()"})],c.push(...p)),n=[t("td",{class:"xl-ah xl-ai",id:"main_"+l(i)+"_"+l(e)},c)],o.push(...n)):(n=$quick_l_1_static_node?[$quick_l_1_static_node]:[$quick_l_1_static_node=t("td",{_:"_",class:"xl-ah"})],o.push(...n)),r.push(...o);x=[t("tr",0,r)],s.push(...x)}return r=[t(0,1,l(f))],x=[t("td",$quick_l_2_static_attr,r)],s.push(t("tr",0,x)),i=[t("tbody",0,s)],_.push(t("table",$quick_l_0_static_attr,i)),s=[t(0,0,l(u))],i=[t("div",0,s)],s=[t(0,0,l(h))],i.push(t("div",0,s)),_.push(t("div",$quick_l_3_static_attr,i),t("span",{class:"xl-aj xl-al",id:l(d)+"_active"})),i=[t(0,0,"\u4e0a\u4e00\u5173")],_.push(t("button",{_:"a",class:"xl-ab xl-ao","mx-click":a+"\x1e_ak()"},i)),i=[t(0,0,"\u4e0b\u4e00\u5173")],_.push(t("button",{_:"b",class:"xl-ab xl-ap","mx-click":a+"\x1e_aj()"},i)),i=[t(0,0,"\u91cd\u65b0\u5f00\u59cb")],_.push(t("button",{_:"c",class:"xl-am xl-ab","mx-click":a+"\x1e_al()"},i)),t(a,0,_)},mixins:[Dragdrop],init(){this._aa=0,this.set({result:StartResult})},render(){let e=this._aa,t=GameLevels[e],a=[];for(let e=0;e<t.length;e++)a.push(t[e].slice());this._ab=a,this.digest({size:a,desc:GameLevelsDesc[e],tip:"\u7b2c"+GameLevelsChar[e]+"\u5173"})},"{change.level}"(e){let t,a=GameLevels.length-1,l=this;e?l._aa<a&&(l._aa++,t=1):l._aa>0&&(l._aa--,t=1),t&&l.render()},_af(){let e=this._ab,t={},a=0,l=!0;for(let t=0,i=e.length,s=i-2;t<i;t++){for(let i=0,x=e[t].length,r=x-2;i<x;i++)if(-1!=e[t][i])if(e[t][i]&&a++,t<s){if(i<r){if(1==e[t][i]){if(1==e[t][i+1]&&0===e[t][i+2]){l=!1;break}if(1==e[t+1][i]&&0===e[t+2][i]){l=!1;break}}else if(0===e[t][i]){if(1==e[t][i+1]&&1==e[t][i+2]){l=!1;break}if(1==e[t+1][i]&&1==e[t+2][i]){l=!1;break}}}else if(1==e[t][i]){if(1==e[t+1][i]&&0===e[t+2][i]){l=!1;break}}else if(0===e[t][i]&&1==e[t+1][i]&&1==e[t+2][i]){l=!1;break}}else if(1==e[t][i]){if(1==e[t][i+1]&&0===e[t][i+2]){l=!1;break}}else if(0===e[t][i]&&1==e[t][i+1]&&1==e[t][i+2]){l=!1;break}if(!l)break}return t._ac=l,t._ad=l&&1==a&&1==e[3][3],t._ae=a,t},_ag(e,t){let a=null,l=this.root.getBoundingClientRect(),i=(e.x-l.left)/60|0,s=(e.y-l.top)/60|0,x=this._ab;return i<x[0].length&&s<x.length&&(!t||t.x!=i||t.y!=s)&&(a={x:i,y:s}),a},_ah(e,t){let a={can:!1,eatList:[]},l=!0,i=[],s=!1,x=this._ab;if(x[t.y][t.x])return a;if((e={x:e.x,y:e.y}).y==t.y){for(;e.x!=t.x;)if(t.x>e.x?e.x++:e.x--,l){if(1!=x[e.y][e.x]){s=!0;break}i.push({x:e.x,y:e.y}),l=!1}else if(e.x!=t.x){if(0!==x[e.y][e.x]){s=!0;break}l=!0}s||(a.can=!0,a.eatList=i)}else if(e.x==t.x){for(;e.y!=t.y;)if(t.y>e.y?e.y++:e.y--,l){if(1!=x[e.y][e.x]){s=!0;break}i.push({x:e.x,y:e.y}),l=!1}else if(e.y!=t.y){if(0!==x[e.y][e.x]){s=!0;break}l=!0}s||(a.can=!0,a.eatList=i)}return a},"_ai<mousedown>"(e){let t=this,a=e.eventTarget,l=a.getBoundingClientRect(),i=Magix.node(this.id+"_active"),s=t.root.getBoundingClientRect();a.style.visibility="hidden";let x,r,o=l.left-s.left,n=l.top-s.top;i.style.left=o+"px",i.style.top=n+"px";let c,p,_={x:a.getAttribute("x"),y:a.getAttribute("y")};this._d(e,a=>{a.preventDefault(),x=a.pageX-e.pageX+o,r=a.pageY-e.pageY+n,i.style.left=x+"px",i.style.top=r+"px";let l=t._ag({x:a.pageX,y:a.pageY},_),s=l!=p;if(l&&p&&(s=l.x!=p.x||l.y!=p.y),s&&(p=l,c&&(c.style.opacity=1,c.classList.remove("xl-aq"),c.classList.remove("xl-ar")),l&&(c=Magix.node("main_"+l.x+"_"+l.y)))){c.style.opacity=.7,t._ah(_,l).can?c.classList.add("xl-aq"):c.classList.add("xl-ar")}},e=>{let l=t._ag({x:e.pageX,y:e.pageY},_),s=!1;if(l){let e=t._ah(_,l);if(e.can){let a=t._ab;a[_.y][_.x]=0,a[l.y][l.x]=1;for(let t,l=0,i=e.eatList.length;l<i;l++)a[(t=e.eatList[l]).y][t.x]=0;if((e=t._af())._ac){let t;t=e._ad?"\u5929\u624d\uff01":GameResultLevel[e._ae]?GameResultLevel[e._ae]+"\uff0c\u8fd8\u6709"+e._ae+"\u4e2a\u9752\u86d9":"\u4e00\u822c\uff0c\u8fd8\u6709"+e._ae+"\u4e2a\u9752\u86d9",this.set({result:PlayResult.replace("{score}",t)})}s=!0}else a.style.visibility="visible"}else a.style.visibility="visible";i.style.left="-10000px",c&&(c.style.opacity=1,c.classList.remove("xl-aq"),c.classList.remove("xl-ar")),s&&this.digest({size:this._ab})})},"_aj<click>":function(){this["{change.level}"](!0)},"_ak<click>":function(){this["{change.level}"]()},"_al<click>":function(){this.render()}});