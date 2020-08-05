/*
    author:xinglie.lkf@alibaba-inc.com
*/
'ref@:./index.less';
import Magix, { Magix5 } from '../../lib/magix';
import Player from './player';
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
    })/*.replace(MetaReg, (m, key, content) => {
            if (Magix.has(MetaInfos, key)) {
                metas.push(`${MetaInfos[key]}：${content}`);
            }
            return '';
        })*/.replace(lineReg, (m, g, c) => {
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
    tmpl: '@:lyric.html',
    init() {
        Player.on('@:{when.history.change}', e => {
            this['@:{update.lyric}'](e.song);
        });
        Player.on('@:{when.song.time.update}', e => {
            this['@:{scroll.lyric}'](e.current);
        });
        Player.on('@:{when.song.change}', () => {
            this['@:{clear.cache}']();
        });
        this.set({
            topmost: false
        });
    },
    '@:{clear.cache}'() {
        delete this['@:{lyrics}'];
        delete this['@:{lyric.start}'];
        delete this['@:{lyric.end}'];
        delete this['@:{lyric.active}'];
        delete this['@:{lyric.is.error}'];
        this['@:{scroll.lyric}'](0);
    },
    async '@:{update.lyric}'(song) {
        let marker = Magix.mark(this, '@:{update.lyric}');
        try {
            let { lyric } = await Player["@:{fetch.song.lyric}"](song);
            if (marker()) {
                this['@:{lyrics}'] = ParseLyric(lyric);
            }
        } catch{
            this['@:{lyric.is.error}'] = true;
        }
    },
    '@:{scroll.lyric}'(time) {
        let lyrics = this['@:{lyrics}'];
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
            if (idx < 0) idx = 0;
            if (this['@:{lyric.end}'] != end ||
                this['@:{lyric.start}'] != start ||
                this['@:{lyric.active}'] != idx) {
                this['@:{lyric.end}'] = end;
                this['@:{lyric.start}'] = start;
                this['@:{lyric.active}'] = idx;
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
        } else {
            this.digest({
                lyrics: this['@:{lyric.is.error}'] ? ErrorLyric : NoLyric
            });
        }
    },
    render() {
        this.digest({
            lyrics: NoLyric
        });
    },
    '@:{stop}<mousedown>'(e: MouseEvent) {
        e.stopPropagation();
    },
    '@:{toggle.topmost}<click>'() {
        let tm = !this.get('topmost');
        this.root.style.zIndex = tm ? '60000' : '';
        this.digest({
            topmost: tm
        });
    }
});