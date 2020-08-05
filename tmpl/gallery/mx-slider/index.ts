/*
    author:xinglie.lkf@alibaba-inc.com
*/
import Magix, { Magix5 } from '../../lib/magix';
import Dragdrop from '../mx-dragdrop/index';
Magix.applyStyle('@:index.less');
export default Magix.View.extend({
    tmpl: '@:index.html',
    assign(data) {
        if (!this['@:{dragging}']) {
            this.set(data);
            return true;
        }
        console.log('prevent');
        return false;
    },
    render() {
        this.digest();
    },
    '@:{update.range}<click>'(e: Magix5.MagixMouseEvent) {
        let bound = e.eventTarget.getBoundingClientRect();
        let p = (e.pageX - bound.left) / bound.width;
        this.digest({
            value: p
        });
        Magix.dispatch(this.root, 'change', {
            percent: p
        });
    },
    '@:{start.drag}<mousedown>'(e: Magix5.MagixMouseEvent) {
        let bound = Magix.node('t_' + this.id).getBoundingClientRect();
        let v = this.get('value') || 0;
        this['@:{dragging}'] = 1;
        this['@:{drag.drop}'](e, (ev) => {
            let diff = ev.pageX - e.pageX;
            let p = diff / bound.width + v;
            if (p > 1) p = 1;
            else if (p < 0) p = 0;
            this.digest({
                value: p
            });
            Magix.dispatch(this.root, 'update', {
                percent: p
            });
        }, () => {
            Magix.dispatch(this.root, 'change', {
                percent: this.get('value')
            });
            delete this['@:{dragging}'];
        });
    }
}).merge(Dragdrop);