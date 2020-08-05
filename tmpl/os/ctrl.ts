import Magix, { Magix5 } from "../lib/magix";
let GlobalDialogs = [];
let Prefix = '\x1f';
let BaseZIndex = 5000;
let WinMinWidth = 150;
let WinMinHeight = 100;
let Position = 0;
let TempHiddens = [];
export default {
    '@:{add}'(app, zIndex) {
        GlobalDialogs.push(app);
        GlobalDialogs[Prefix + app.appId] = {
            '@:{zIndex}': BaseZIndex + zIndex,
            '@:{show}': 1
        };
    },
    '@:{get.list}'() {
        return GlobalDialogs;
    },
    '@:{remove}'(id) {
        delete GlobalDialogs[Prefix + id];
        for (let i = GlobalDialogs.length; i--;) {
            if (GlobalDialogs[i].appId == id) {
                GlobalDialogs.splice(i, 1);
                break;
            }
        }
        this['@:{active}']();
    },
    '@:{show}'(id) {
        let info = GlobalDialogs[Prefix + id];
        info['@:{show}'] = 1;
    },
    '@:{hide}'(id) {
        let info = GlobalDialogs[Prefix + id];
        info['@:{show}'] = 0;
        this['@:{active}']();
    },
    '@:{create}'(view: Magix5.View, app) {
        let appId = app.appId;
        if (GlobalDialogs[Prefix + appId]) {
            this['@:{active}'](appId);
            let node = Magix.node(appId);
            if (node) {
                let vf = Magix.Vframe.byNode(node);
                if (vf.invoke('assign', app)) {
                    vf.invoke('render');
                }
            }
        } else {
            TempHiddens.length = 0;
            let node = document.createElement('div'),
                zIndex = GlobalDialogs.length;
            node.id = appId;
            document.body.append(node);
            let options = Object.assign({}, app);
            let left = options.dockX;
            let top = options.dockY;
            let updatePos = 0;
            if (!top) {
                top = Position * 30 + 30;
                updatePos = 1;
            }
            if (!left) {
                left = Position * 30 + 150;
                updatePos = 1;
            }
            if (updatePos) {
                Position++;
                if (Position > 5) Position = 0;
            }
            options.left = left;
            options.top = top;
            options.zIndex = BaseZIndex + zIndex;
            if (!options.minWidth) options.minWidth = WinMinWidth;
            if (!options.minHeight) options.minHeight = WinMinHeight;
            view.owner.mountVframe(node, '@:./dialog', options);
            this['@:{add}'](options, zIndex);
            setTimeout(() => {
                this['@:{active}'](appId);
            }, 50);
        }
    },
    '@:{adjust}'(id) {
        let temp, move, info;
        for (let i = GlobalDialogs.length; i--;) {
            temp = GlobalDialogs[i];
            if (id) {
                if (temp.appId == id) {
                    GlobalDialogs.splice(i, 1);
                    move = true;
                    break;
                }
            } else {
                info = GlobalDialogs[Prefix + temp.appId];
                if (info['@:{show}']) {
                    GlobalDialogs.splice(i, 1);
                    move = true;
                    break;
                }
            }
        }
        if (move) {
            GlobalDialogs.push(temp);
        }
        return move ? temp : null;
    },
    '@:{update.z.index}'() {
        for (let i = GlobalDialogs.length; i--;) {
            let id = GlobalDialogs[i].appId;
            let info = GlobalDialogs[Prefix + id];
            if (info['@:{zIndex}'] != BaseZIndex + i) {
                info['@:{zIndex}'] = BaseZIndex + i;
                let n = Magix.node(id);
                let vf = Magix.Vframe.byNode(n);
                if (vf) {
                    if (vf.invoke('assign', [{
                        zIndex: BaseZIndex + i
                    }])) {
                        vf.invoke('render');
                    }
                }
            }
        }
    },
    '@:{active}'(id?: string, min?: boolean) {
        TempHiddens.length = 0;
        let node, vf, info;
        if (id == GlobalDialogs['@:{focused}']) {
            if (min) {
                node = Magix.node(id);
                if (node) {
                    vf = Magix.Vframe.byNode(node);
                    if (vf) {
                        vf.invoke('@:{hide.ui}');
                        info = GlobalDialogs[Prefix + id];
                        info['@:{show}'] = 0;
                    }
                }
            }
            return;
        }
        info = GlobalDialogs[Prefix + GlobalDialogs['@:{focused}']];
        if (info && info['@:{actived}']) {
            info['@:{actived}'] = 0;
            node = Magix.node(GlobalDialogs['@:{focused}']);
            if (node) {
                vf = Magix.Vframe.byNode(node);
                if (vf) {
                    vf.invoke('@:{deactive}');
                }
            }
        }
        info = this['@:{adjust}'](id);
        if (info) {
            id = info.appId;
            info = GlobalDialogs[Prefix + id];
            if (!info['@:{actived}']) {
                info['@:{actived}'] = 1;
                info['@:{show}'] = 1;
                node = Magix.node(id);
                if (node) {
                    vf = Magix.Vframe.byNode(node);
                    if (vf) {
                        vf.invoke('@:{active}');
                    }
                }
                GlobalDialogs['@:{focused}'] = id;
            }
            this['@:{update.z.index}']();
        } else {
            GlobalDialogs['@:{focused}'] = '';
        }
    },
    '@:{toggle.min.all}'() {
        let count = TempHiddens.length;
        if (count) {
            let ids = [];
            for (let d of TempHiddens) {
                ids.push(d);
            }
            for (let id of ids) {
                this['@:{active}'](id);
            }
        } else {
            let ids = [];
            for (let e of GlobalDialogs) {
                let i = GlobalDialogs[Prefix + e.appId];
                if (i['@:{show}']) {
                    let n = Magix.node(e.appId);
                    let vf = n && Magix.Vframe.byNode(n);
                    if (vf) {
                        vf.invoke('@:{hide.ui}');
                        ids.push(e.appId);
                    }
                }
            }
            TempHiddens.push(...ids);
        }
    }
};