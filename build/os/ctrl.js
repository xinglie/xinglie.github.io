import Magix from"../lib/magix.js";let GlobalDialogs=[],Prefix="\x1f",BaseZIndex=5e3,WinMinWidth=150,WinMinHeight=100,Position=0;export default{_n(l,i){GlobalDialogs.push(l),GlobalDialogs[Prefix+l]={_l:BaseZIndex+i,_m:1}},_p(l){delete GlobalDialogs[Prefix+l];for(let i=GlobalDialogs.length;i--;)if(GlobalDialogs[i]==l){GlobalDialogs.splice(i,1);break}this._o()},_m(l){GlobalDialogs[Prefix+l]._m=1},_q(l){GlobalDialogs[Prefix+l]._m=0,this._o()},_r(l,i){let o=i.appId;if(GlobalDialogs[Prefix+o])this._o(o);else{let e=document.createElement("div"),a=GlobalDialogs.length;e.id=o,document.body.append(e);let s=Object.assign({},i),n=s.dockX,g=s.dockY,t=0;g||(g=30*Position+30,t=1),n||(n=30*Position+150,t=1),t&&++Position>5&&(Position=0),s.left=n,s.top=g,s.zIndex=BaseZIndex+a,s.minWidth||(s.minWidth=WinMinWidth),s.minHeight||(s.minHeight=WinMinHeight),l.owner.mountVframe(e,"~xl/os/dialog",s),this._n(o,a),this._o(o)}},_s(l){let i,o,e;for(let a=GlobalDialogs.length;a--;)if(l){if(GlobalDialogs[a]==l){GlobalDialogs.splice(a,1),o=!0,i=l;break}}else if(i=GlobalDialogs[a],(e=GlobalDialogs[Prefix+i])._m){GlobalDialogs.splice(a,1),o=!0;break}return o&&GlobalDialogs.push(i),o?i:null},_t(){for(let l=GlobalDialogs.length;l--;){let i=GlobalDialogs[l],o=GlobalDialogs[Prefix+i];if(o._l!=BaseZIndex+l){o._l=BaseZIndex+l;let e=Magix.node(i),a=Magix.Vframe.byNode(e);a&&a.invoke("assign",[{zIndex:BaseZIndex+l}])&&a.invoke("render")}}},_o(l,i){let o,e,a;l!=GlobalDialogs._u?((a=GlobalDialogs[Prefix+GlobalDialogs._u])&&a._w&&(a._w=0,(o=Magix.node(GlobalDialogs._u))&&(e=Magix.Vframe.byNode(o))&&e.invoke("_x")),(l=this._s(l))?((a=GlobalDialogs[Prefix+l])._w||(a._w=1,a._m=1,(o=Magix.node(l))&&(e=Magix.Vframe.byNode(o))&&e.invoke("_o"),GlobalDialogs._u=l),this._t()):GlobalDialogs._u=""):i&&(o=Magix.node(l))&&(e=Magix.Vframe.byNode(o))&&(e.invoke("_v"),(a=GlobalDialogs[Prefix+l])._m=0)}};