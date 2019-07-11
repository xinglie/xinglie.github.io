var __awaiter=this&&this.__awaiter||function(t,e,i,s){return new(i||(i=Promise))(function(a,n){function h(t){try{r(s.next(t))}catch(t){n(t)}}function o(t){try{r(s.throw(t))}catch(t){n(t)}}function r(t){t.done?a(t.value):new i(function(e){e(t.value)}).then(h,o)}r((s=s.apply(t,e||[])).next())})};import Magix from"../../lib/magix.js";let APIHost="https://jirenguapi.applinzi.com/fm",MAX_HISTORY=50,RedoList=[],UndoList=[],SongLyricCache=new Magix.Cache(200,50);export default Object.assign({_aV:()=>fetch(`${APIHost}/getChannels.php`).then(t=>t.json()),_aW:t=>fetch(`${APIHost}/getSong.php?channel=${t}`).then(t=>t.json()),_aS(t){let e=`${APIHost}/getLyric.php?sid=${t}`;return SongLyricCache.has(e)?Promise.resolve(SongLyricCache.get(e)):fetch(e).then(t=>t.json()).then(t=>(SongLyricCache.set(e,t),Promise.resolve(t)))},_ao(){return __awaiter(this,void 0,void 0,function*(){let{channels:t}=yield this._aV();return{active:t[0],channels:t}})},_ba(t){if(this._aX){clearTimeout(this._aY);let e=this._aZ;e||(e={play:!1,buffer:!1});let i=["play","buffer"];for(let s of i)Magix.has(t,s)||(t[s]=e[s]);this._aZ=t,this._aY=setTimeout(()=>{let s=!1;if(e=this._b_){for(let a of i)if(e[a]!=t[a]){s=!0;break}}else s=!0;s&&this.fire("_at",this._b_=t)},50)}},_bb(){let t=this._aX;if(t){let e=t.buffered,i=0;e.length&&(i=e.end(e.length-1)/t.duration),this.fire("_aK",{duration:t.duration,current:t.currentTime,buffered:i})}},_bf(){if(!this._aX){let t,e=new Audio;e.onprogress=(()=>{this._bb()}),e.onerror=(()=>{clearTimeout(t),t=setTimeout(()=>{this.fire("_aq")},2e3)}),e.onended=(()=>{clearTimeout(t),t=setTimeout(()=>{this.fire("_aq")},1e3)}),e.onvolumechange=(()=>{this.fire("_bc",{volume:e.volume})}),e.oncanplay=(()=>{this._ba({buffer:!1})}),e.onwaiting=(()=>{this._ba({buffer:!0})}),e.ontimeupdate=(()=>{this._bd||this._bb()}),e.onplaying=(()=>{this._ba({play:!0})}),e.ondurationchange=(()=>{this._bd||this._bb()}),e.onpause=(()=>{this._ba({play:e.ended})}),e.onloadedmetadata=(()=>{let t=this._be,e=!1;for(let i of UndoList)if(i.sid==t.sid){e=!0;break}if(!e)for(let i of RedoList)if(i.sid==t.sid){e=!0;break}e||UndoList.push(t),UndoList.length>MAX_HISTORY&&UndoList.shift(),this.fire("_au",{song:t})}),this._aX=e}},_bg(t){this._bf(),this._aX.src=t.url,this._aX.play().catch(t=>{}),this._be=t},_bh(t){if(this._aX){let e=this._aX.seekable,i=e.length;if(i){let s=e.start(0),a=e.end(i-1);t>=s&&t<=a&&(this._aX.currentTime=t)}else{let t=this._aX.buffered;if(t.length){let e=t.end(t.length-1);this._aX.currentTime=e}}}},_bj(t,e,i){clearTimeout(this._bi),this._bi=setTimeout(()=>{this._ar(t,e)},i)},_ar(t,e){return __awaiter(this,void 0,void 0,function*(){if(this._az(),this._ba({buffer:!0}),e||(e=0==RedoList.length),e)try{let i=Magix.mark(this,"_ar"),{song:s}=yield this._aW(t);if(i()){let i=s[0];i.url?(this.fire("_av",{song:i}),this._bg(i)):this._bj(t,e,50)}}catch(i){this._bj(t,e,2e3)}else{let t=RedoList.pop();UndoList.push(t),this._bg(t),this.fire("_av",{song:t})}})},_aE(){if(UndoList.length>1){this._az(),this._ba({buffer:!0});let t=UndoList.pop();RedoList.push(t),t=UndoList[UndoList.length-1],this._bg(t),this.fire("_av",{song:t})}},_aH(){return this._aX},_ay:()=>UndoList.length>1,_bk(t){this._aX&&(this._aX.volume=t)},_az(){this._aX&&this._aX.pause()},_aA(){this._aX&&this._aX.play()},_bl(){let t=this._aX;return!!t&&(t.muted=!t.muted,t.muted)},_as(){this._aX&&(this._aX.currentTime=0,this._aX.play())},_aw(){if(UndoList.length>1){let t=UndoList[UndoList.length-2];return"\u4e0a\u4e00\u9996\uff1a"+t.title+"-"+t.artist}return"\u4e0a\u4e00\u9996\uff1a\u6682\u65e0\u5386\u53f2\u6b4c\u66f2"},_ax(){if(RedoList.length){let t=RedoList[RedoList.length-1];return"\u4e0b\u4e00\u9996\uff1a"+t.title+"-"+t.artist}return"\u4e0b\u4e00\u9996\uff1a\u968f\u673a\u6b4c\u66f2"},_aI(t){this._bd=t,t||this._bb()}},Magix.Event);