/*
    author:xinglie.lkf@alibaba-inc.com
*/
import Magix from '../../lib/magix';
import Player from './player';
Magix.applyStyle('@index.less');
export default Magix.View.extend({
    tmpl: '@index.html',
    init() {
        Player.on('@{when.song.end}', () => {
            if (this.get('mode') == 'rdm') {
                let active = this.get('active');
                Player["@{next.song}"](active.channel_id);
            } else {
                Player["@{replay}"]();
            }
        });
        Player.on('@{when.status.change}', (e) => {
            let state = {} as {
                play: boolean
                buffer: boolean,
                reset: boolean
            };
            if (Magix.has(e, 'play')) {
                state.play = e.play;
            }
            if (Magix.has(e, 'buffer')) {
                state.buffer = e.buffer;
            }
            this.digest(state);
        });
        Player.on('@{when.history.change}', () => {
            this.set({
                reset: false
            });
            this.render();
        });
        Player.on('@{when.song.change}', e => {
            console.log('song change', e.song);
            this.digest({
                reset: true,
                song: e.song
            });
        })
        this.set({
            cshow: false,
            reset: true,
            mode: 'rdm',
            song: {
                title: '软件作者',
                artist: '行列'
            }
        });
    },
    render() {
        this.digest({
            ptip: Player["@{get.pre.tip}"](),
            ntip: Player["@{get.next.tip}"](),
            undo: Player["@{can.undo}"]()
        });
    },
    '@{toggle.play.state}'() {
        let play = this.get('play');
        if (play) {
            Player["@{set.pause}"]();
        } else {
            Player["@{set.play}"]();
        }
    },
    '@{update.channel}<change>'(e) {
        this.digest({
            active: e.channel
        });
        Player["@{next.song}"](e.channel.channel_id, true);
    },
    '@{update.status}<click>'() {
        this['@{toggle.play.state}']();
    },
    '@{toggle.channels}<click>'() {
        this.digest({
            cshow: !this.get('cshow')
        });
    },
    '@{next.song}<click>'() {
        let active = this.get('active');
        Player["@{next.song}"](active.channel_id);
    },
    '@{pre.song}<click>'() {
        Player["@{pre.song}"]();
    },
    '@{update.mode}<click>'() {
        let mode = this.get('mode');
        if (mode == 'rdm') {
            this.digest({
                mode: 'circle'
            });
        } else {
            this.digest({
                mode: 'rdm'
            });
        }
    },
    '$doc<keyup>'(e: KeyboardEvent) {
        if (Player["@{can.operate}"]()) {
            let code = e.keyCode;
            if (code == 13 ||//enter
                code == 32) {//space
                this['@{toggle.play.state}']();
            } else if (code == 80) {//p
                Player["@{pre.song}"]();
            } else if (code == 78) {//n
                let active = this.get('active');
                Player["@{next.song}"](active.channel_id);
            } else if (code == 67) {//c
                this.digest({
                    cshow: !this.get('cshow')
                });
            }
        }
    },
    '$doc<visibilitychange>'() {
        Player["@{set.eco}"](document.hidden);
    },
    '$doc<click>'(e) {
        if (Player["@{can.operate}"]() &&
            this.get('cshow')) {
                if(!Magix.inside(e.target, this.root)){
                    this.digest({
                        cshow:false
                    });
                }
        }
    }
});