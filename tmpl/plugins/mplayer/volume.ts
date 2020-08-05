/*
    author:xinglie.lkf@alibaba-inc.com
*/
'ref@:./index.less';
import Magix, { Magix5 } from '../../lib/magix';
import Player from './player';
export default Magix.View.extend({
    tmpl: '@:volume.html',
    init() {
        this.set({
            volume: 1,
            mute: false
        });
        Player.on('@:{when.volume.change}', e => {
            this.digest({
                volume: e.volume
            });
        });
    },
    render() {
        this.digest();
    },
    '@:{update.volume}<update,change>'(e) {
        Player["@:{set.volume}"](e.percent);
    },
    '@:{toggle.mute}<click>'() {
        this.digest({
            mute: Player["@:{set.mute}"]()
        });
    },
    '$doc<keyup>'(e: Magix5.MagixKeyboardEvent) {
        if (Player["@:{can.operate}"]()) {
            if (e.keyCode == 77) {//m
                this.digest({
                    mute: Player["@:{set.mute}"]()
                });
            }
        }
    }
});