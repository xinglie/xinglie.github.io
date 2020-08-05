import Magix, { Magix5 } from '../lib/magix';
import Exchange from './exchange';
import DialogCtrl from './ctrl';
let AddDialogToList = (list, options) => {
    let added = false;
    if (!list['\x00' + options.appId]) {
        list['\x00' + options.appId] = 1;
        list.push(options);
        added = true;
    }
    return added;
};
'ref@:./theme/index.css';
export default Magix.View.extend({
    tmpl: '@:./taskbar.html',
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
        Exchange.on('@:{when.dialog.add}', e => {
            if (AddDialogToList(list, e)) {
                delayUpdate();
            }
        });
        Exchange.on('@:{when.dialog.remove}', e => {
            for (let i = list.length; i--;) {
                if (list[i].appId == e.id) {
                    list.splice(i, 1);
                    delete list['\x00' + e.id];
                    delayUpdate();
                    break;
                }
            }
        });
        Exchange.on('@:{when.dialog.active}', e => {
            delayUpdate(true, e.id);
        });
        Exchange.on('@:{when.dialog.deactive}', () => {
            delayUpdate(true);
        });
        this.set({
            list
        });
    },
    render() {
        let list = this.get('list');
        let dialogs = DialogCtrl["@:{get.list}"]();
        for (let d of dialogs) {
            AddDialogToList(list, d);
        }
        this.digest();
    },
    '@:{active.item}<click>'(e: Magix5.MagixMouseEvent) {
        let { id } = e.params;
        DialogCtrl["@:{active}"](id, true);
    },
    '@:{min.dialogs}<click>'() {
        DialogCtrl["@:{toggle.min.all}"]();
    }
});