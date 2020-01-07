/*!1.0.5 kooboy_li@163.com*/
/*
    generate by magix-composer@1.0.5
    https://github.com/thx/magix-composer
    author: xinglie.lkf@alibaba-inc.com
    loader:module
 */
let $quick_A_0_static_node;
/*
    author:xinglie.lkf@alibaba-inc.com
*/

import Magix  from "../../lib/magix.js";
import Player  from "./player.js";
let lineReg = /((?:\[[0-9:\.]+\])+)([^\r\n]*)/g;
//let timeSpaceReg = /\][\r\n\s]*\[/g;
let offsetReg = /\[offset\s*:\s*(\d+)\]/i;
let timeReg = /\[([0-9\.:]+)\]/g;
let Sort = (a, b) => a.time - b.time;
let MaxLines = 3;
// let MetaInfos = {
//     al: '唱片',
//     ar: '演唱',
//     au: '词作',
//     ti: '名称',
//     by: 'LRC制作'
// };
//let MetaReg = /\[(al|ar|au|ti|by):([^\[\]]+)\]/gi;
let NoLyric = [{
        text: ''
    }, {
        text: '歌词加载中...'
    }];
let ErrorLyric = [{
        text: ''
    }, {
        text: '获取歌词失败'
    }];
let ParseLyric = lyric => {
    let offset = 0;
    let lyrics = [];
    //let metas = [];
    lyric.replace(offsetReg, (m, time) => {
        offset = parseFloat(time) / 1000;
        return '';
    }) /*.replace(MetaReg, (m, key, content) => {
            if (Magix.has(MetaInfos, key)) {
                metas.push(`${MetaInfos[key]}：${content}`);
            }
            return '';
        })*/
        .replace(lineReg, (m, g, c) => {
        g.replace(timeReg, (_, time) => {
            time = time.split(':');
            let t = 0, max = time.length - 1;
            for (let i = 0; i <= max; i++) {
                t += time[i] * Math.pow(60, max - i);
            }
            t -= offset;
            if (!isNaN(t)) {
                lyrics.push({
                    time: t,
                    text: c
                });
            }
        });
    });
    //补充一下，让一行文字居中显示
    if (lyrics.length < 2) {
        lyrics.push({
            time: -1,
            text: ''
        });
    }
    lyrics = lyrics.sort(Sort);
    //console.log(lyrics,metas);
    return lyrics;
};
export default Magix.View.extend({
    tmpl: ($$, $_create,$_viewId,$n)=> { 
let $_temp,$vnode_0=[],
{
	lyrics,
	topmost,}=$$,
$vnode_1,
$$_class,
$vnode_2,
$text,
$$_title

for(let $q_c_txotta=lyrics.length,$q_key_jlzwoighg=0;$q_key_jlzwoighg<$q_c_txotta;$q_key_jlzwoighg++){
let l=lyrics[$q_key_jlzwoighg];
$vnode_2=[$_create(0,0,$n(l.text))];;$$_class='xl-bJ';if(l.active){;$$_class+=' xl-bK';};
$vnode_1=[$_create('div',{'title': $n(l.text),'class': $$_class,},$vnode_2)];$vnode_0.push(...$vnode_1);
}
if($quick_A_0_static_node){
$vnode_1=[$quick_A_0_static_node];
}else{

$vnode_2=[$_create('path',{'fill': '#fff','d': 'M511.927 261.389l192.538 192.54H319.388l192.539-192.54zm-76.868 192.588h154.032v231.045H435.059V453.977zM319.535 723.825h385.077v38.51H319.535v-38.51z',},0,0,1)];
$vnode_1=[$quick_A_0_static_node=$_create('svg',{'_': '_','viewBox': '0 0 1024 1024',},$vnode_2)];
}
;$$_class='xl-bz xl-bL';if(topmost){;$$_class+=' xl-bB';}$$_title='';if(topmost){;$$_title+='窗口已置顶';}else{;$$_title+='点击置顶窗口';};$vnode_0.push($_create('span',{'mx-click': $_viewId+'_bA()','mx-mousedown': $_viewId+'_bz()','class': $$_class,'title': $$_title,},$vnode_1)); 

return $_create($_viewId,0,$vnode_0); } ,
    init() {
        Player.on('_ba', e => {
            this['_bp'](e.song.sid);
        });
        Player.on('_bq', e => {
            this['_br'](e.current);
        });
        Player.on('_bb', () => {
            this['_bs']();
        });
        this.set({
            topmost: false
        });
    },
    '_bs'() {
        delete this['_bt'];
        delete this['_bu'];
        delete this['_bv'];
        delete this['_bw'];
        delete this['_bx'];
        this['_br'](0);
    },
    async '_bp'(sId) {
        let marker = Magix.mark(this, '_bp');
        try {
            let { lyric } = await Player["_by"](sId);
            if (marker()) {
                this['_bt'] = ParseLyric(lyric);
            }
        }
        catch (_a) {
            this['_bx'] = true;
        }
    },
    '_br'(time) {
        let lyrics = this['_bt'];
        if (lyrics) {
            let idx = 0;
            let lines = [];
            for (; idx < lyrics.length; idx++) {
                let line = lyrics[idx];
                if (line.time > time) {
                    break;
                }
            }
            let middleTop = Math.ceil(MaxLines / 2);
            let middleBottom = Math.floor(MaxLines / 2);
            let start = Math.max(idx - middleTop, 0);
            let end = Math.min(lyrics.length, idx + middleBottom);
            if (start == 0 &&
                lyrics.length > (MaxLines - 1) &&
                (end - start) < MaxLines) {
                end++;
            }
            if (end == lyrics.length &&
                lyrics.length > (MaxLines - 1) &&
                (end - start) < MaxLines) {
                start--;
            }
            idx -= 1;
            if (idx < 0)
                idx = 0;
            if (this['_bv'] != end ||
                this['_bu'] != start ||
                this['_bw'] != idx) {
                this['_bv'] = end;
                this['_bu'] = start;
                this['_bw'] = idx;
                for (let i = start; i < end; i++) {
                    lines.push({
                        text: lyrics[i].text,
                        active: i == idx
                    });
                }
                this.digest({
                    lyrics: lines
                });
            }
        }
        else {
            this.digest({
                lyrics: this['_bx'] ? ErrorLyric : NoLyric
            });
        }
    },
    render() {
        this.digest({
            lyrics: NoLyric
        });
    },
    '_bz<mousedown>'(e) {
        e.stopPropagation();
    },
    '_bA<click>'() {
        let tm = !this.get('topmost');
        this.root.style.zIndex = tm ? '60000' : '';
        this.digest({
            topmost: tm
        });
    }
});
