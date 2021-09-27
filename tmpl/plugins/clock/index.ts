/*
    author:https://github.com/xinglie
*/
import Magix, { Magix5 } from '../../lib/magix';
import Cron from '../../lib/cron';
import Dragdrop from '../../gallery/mx-dragdrop/index';
Magix.applyStyle('@:index.less');
export default Magix.View.extend({
    tmpl: '@:./index.html',
    assign() {
        return false;
    },
    async render() {
        let mark = Magix.mark(this, '@{render}');
        await this.digest();
        if (mark()) {
            let second = Magix.node<HTMLDivElement>('s_' + this.id);
            let minute = Magix.node<HTMLDivElement>('m_' + this.id);
            let hour = Magix.node<HTMLDivElement>('h_' + this.id);
            let work = () => {
                let now = new Date();
                let seconds = (now.getSeconds() * 1000 + now.getMilliseconds()) / 1000;
                let minutes = (now.getMinutes() * 60 + seconds) / 60;
                let hours = (now.getHours() * 60 + minutes) / 60;
                second.style.transform = `rotate(${seconds * 6 - 90}deg)`;
                minute.style.transform = `rotate(${minutes * 6 - 90}deg)`;
                hour.style.transform = `rotate(${hours * 30 - 90}deg)`;
            };
            Cron["@:{add.task}"](work, 0, true, '@:{cron.clock.id}');
            this.on('destroy', () => {
                Cron["@:{remove.task}"](work);
            });
        }
    },
    '@:{move.clock}<mousedown>'(e: Magix5.MagixMouseEvent) {
        let target = this.root;
        let right = parseInt(getComputedStyle(target).right);
        let bottom = parseInt(getComputedStyle(target).bottom);
        this['@:{drag.drop}'](e, (ev: MouseEvent) => {
            let ox = e.pageX - ev.pageX;
            let oy = e.pageY - ev.pageY;
            let newX = right + ox;
            let newY = bottom + oy;
            target.style.right = newX + 'px';
            target.style.bottom = newY + 'px';
        });
    }
}).merge(Dragdrop);