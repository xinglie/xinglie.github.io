/*
    author:xinglie.lkf@alibaba-inc.com
*/
import Magix, { Magix5 } from '../../lib/magix';
import List from './vip';
Magix.applyStyle('@index.less');
export default Magix.View.extend({
    tmpl: '@index.html',
    init(data) {
        this.assign(data);
        this.set({
            si: 0,
            url: ''
        });
    },
    assign(data) {
        this.set(data);
        return true;
    },
    render() {
        this.digest({
            list: List
        });
    },
    '@{update}<change>'(e: Magix5.MagixMouseEvent) {
        let target = e.eventTarget as HTMLSelectElement;
        let si = target.selectedIndex;
        this.set({
            si
        });
    },
    '@{update.input}<change>'(e) {
        let target = e.eventTarget as HTMLInputElement;
        let url = target.value;
        this.set({
            url
        });
    },
    '@{play}<click>'() {
        this.digest();
    }
});