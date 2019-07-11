import Magix from"../lib/magix.js";import Dragdrop from"../gallery/mx-dragdrop/index.js";import DialogCtrl from"./ctrl.js";import Exchange from"./exchange.js";let WinShowState=1,WinHideState=2,WinMaxState=4,WinNormalState=8,MinSize=50;export default Magix.View.extend({tmpl:(t,i,e,s)=>{let a,l,h,d,n,o=[],{show:x,active:p,maxState:_,left:g,top:r,width:m,height:c,zIndex:S,id:y,appId:u,icon:w,title:M,min:W,max:f,close:v,view:k,scroll:I,resize:z}=t;return h=[],n=[i(0,1,s(w))],a="xl-g",p&&(a+=" xl-h"),d=[i("div",{class:a},n),i(0,0,s(M))],h.push(i("div",{class:"xl-f","mx-mousedown":e+"\x1e_N()",id:s(u)+"_d_t"},d)),d=[],W&&(n=[i("span",{_:"_",class:"xl-k xl-m","mx-click":e+"\x1e_I()"})],d.push(...n)),f&&(a="xl-k xl-n",_&&(a+=" xl-p"),n=[i("span",{"mx-click":e+"\x1e_J()",class:a})],d.push(...n)),v&&(n=[i("span",{_:"a",class:"xl-k xl-l","mx-click":e+"\x1e_K()"})],d.push(...n)),a="xl-i",p&&(a+=" xl-o"),h.push(i("div",{class:a},d)),a="xl-s",I&&(a+=" xl-t"),h.push(i("div",{"mx-view":s(k),class:a})),l="",p&&(l+="display:none"),h.push(i("div",{class:"xl-u",style:l}),i("div",{class:"xl-u xl-v",id:s(y)+"_mk"})),z&&!_&&(a="xl-q",p&&(a+=" xl-r"),d=[i("div",{"mx-mousedown":e+"\x1e_O()",class:a})],h.push(...d)),a="xl-e xl-w",x&&(a+=" xl-x"),p&&(a+=" xl-j"),l="",_||(l+="left:"+s(g)+"px;top:"+s(r)+"px;width:"+s(m)+"px;height:"+s(c)+"px;"),l+="z-index:"+s(S),o.push(i("div",{id:s(y)+"_d","mx-mousedown":e+"\x1e_L()",class:a,style:l},h)),i(e,0,o)},mixins:[Dragdrop],init(t){this.assign(t);let i=t.maxState?WinMaxState:WinNormalState;i|=WinHideState,this._y=i,Exchange.fire("_z",{options:t});let e=this.root;this.on("destroy",()=>{DialogCtrl._p(this.get("appId")),e.parentNode.removeChild(e),Exchange.fire("_A",{id:this.get("appId")})})},assign(t){return this.set(t),!0},render(){this.digest()},_B(){let t=this._y;t&WinHideState&&(this._y=t^WinHideState|WinShowState,this.root.style.display="",this.digest({show:!0}))},_v(){let t=this._y;t&WinShowState&&(this._y=t^WinShowState|WinHideState,DialogCtrl._q(this.get("appId")),Exchange.fire("_C",{id:this.get("appId")}),this.digest({show:!1}),this.root.style.display="none")},_o(){this.get("show")?this.digest({active:!0}):(this.set({active:!0}),this._B()),Exchange.fire("_D",{id:this.get("appId")})},_x(){this.digest({active:!1}),Exchange.fire("_E",{id:this.get("appId")})},_F(){let t=Magix.node(this.id+"_mk");t&&(t.style.display="block")},_G(){let t=Magix.node(this.id+"_mk");t&&(t.style.display="none")},_H(){let t=this._y;t&WinMaxState?(this._y=t^WinMaxState|WinNormalState,this.digest({maxState:!1})):(this._y=t^WinNormalState|WinMaxState,this.digest({maxState:!0}))},"_I<click>"(){this._v()},"_J<click>"(){this._H()},"_K<click>"(t){this.owner.unmountVframe()},"_L<mousedown>"(){DialogCtrl._o(this.get("appId"))},"_N<mousedown>"(t){let i=this._y,e=getComputedStyle(document.body),s=parseInt(e.getPropertyValue("--xl-_")),a=document.body.clientWidth,l=document.body.clientHeight-s,h=Magix.node(this.id+"_d").style,{left:d,top:n,width:o}=this.get(),x=!1;this._F(),this._d(t,e=>{if(x=!0,(i&WinMaxState)==WinMaxState)return;let p=e.pageX-t.pageX+d;p<MinSize-o?p=MinSize-o:p>a-MinSize&&(p=a-MinSize);let _=e.pageY-t.pageY+n;_<0?_=0:_>l-MinSize+s&&(_=l-MinSize+s),h.left=p+"px",h.top=_+"px",this.set({left:p,top:_})},t=>{if(this._G(),!x&&this.get("max")){let t=Date.now();if(this._M){t-this._M<300?(this._M="",this._H()):this._M=t}else this._M=t}})},"_O<mousedown>"(t){let i=Magix.node(this.id+"_d").style,{width:e,height:s,minWidth:a,minHeight:l}=this.get();this._F(),this._d(t,h=>{let d=h.pageX-t.pageX+e;d<a&&(d=a);let n=h.pageY-t.pageY+s;n<l&&(n=l),i.width=d+"px",i.height=n+"px",this.set({width:d,height:n})},()=>{this._G()})}});