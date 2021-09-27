/*
    author:https://github.com/xinglie
*/
'ref@:./index.less';
import Magix, { Magix5 } from '../../lib/magix';
import Cron from '../../lib/cron';
import Player from './player';
export default Magix.View.extend({
    tmpl: '@:channels.html',
    init() {
        let update = this.render.bind(this);
        Cron["@:{add.task}"](update, 1.2 * 24 * 60 * 60 * 1000, false, '@:{cron.player.channels}');
        this.ondestroy = () => {
            Cron["@:{remove.task}"](update);
        };
    },
    async render() {
        let marker = Magix.mark(this, '@:{render}');
        try {
            let data = await Player["@:{get.channels.with.active}"]();
            if (marker()) {
                this.digest(data);
            }
        } catch{
            if (marker()) {
                this.digest({
                    error: '获取分类失败，请刷新重试'
                });
            }
        }
    },
    '@:{update.channel}<click>'(e: Magix5.MagixMouseEvent) {
        let { channel } = e.params;
        Magix.dispatch(this.root, 'change', {
            channel
        });
        this.digest({
            channel
        });
    }
});