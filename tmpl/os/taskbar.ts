import Magix, { Magix5 } from '../lib/magix';
import Exchange from './exchange';
import DialogCtrl from './ctrl';
'ref@./theme/index.css';
export default Magix.View.extend({
    tmpl: '@./taskbar.html',
    init() {
        let list = [], timer;
        let delayUpdate = (updateActive?: boolean, activeId?: string) => {
            clearTimeout(timer);
            if (updateActive) {
                this.set({
                    active: activeId
                });
            }
            timer = setTimeout(() => {
                console.log('update', activeId);
                this.digest({
                    list
                });
            }, 50);
        };
        Exchange.on('@{when.dialog.add}', e => {
            list.push(e.options);
            delayUpdate();
        });
        Exchange.on('@{when.dialog.remove}', e => {
            for (let i = list.length; i--;) {
                if (list[i].appId == e.id) {
                    list.splice(i, 1);
                    delayUpdate();
                    break;
                }
            }
        });
        Exchange.on('@{when.dialog.active}', e => {
            delayUpdate(true, e.id);
        });
        Exchange.on('@{when.dialog.deactive}', () => {
            delayUpdate(true);
        });
        this.set({
            list
        });
    },
    render() {
        this.digest();
    },
    '@{active.item}<click>'(e: Magix5.MagixMouseEvent) {
        let { id } = e.params;
        DialogCtrl["@{active}"](id, true);
    }
});