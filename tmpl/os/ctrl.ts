import Magix, { Magix5 } from "../lib/magix";
let GlobalDialogs = [];
let Prefix = '\x1f';
let BaseZIndex = 5000;
let WinMinWidth = 150;
let WinMinHeight = 100;
export default {
    '@{add}'(id, zIndex) {
        GlobalDialogs.push(id);
        GlobalDialogs[Prefix + id] = {
            '@{zIndex}': BaseZIndex + zIndex,
            '@{show}': 1
        };
    },
    '@{remove}'(id) {
        delete GlobalDialogs[Prefix + id];
        for (let i = GlobalDialogs.length; i--;) {
            if (GlobalDialogs[i] == id) {
                GlobalDialogs.splice(i, 1);
                break;
            }
        }
        this['@{active}']();
    },
    '@{show}'(id) {
        let info = GlobalDialogs[Prefix + id];
        info['@{show}'] = 1;
    },
    '@{hide}'(id) {
        let info = GlobalDialogs[Prefix + id];
        info['@{show}'] = 0;
        this['@{active}']();
    },
    '@{create}'(view: Magix5.View, options) {
        let appId = options.appId;
        if (GlobalDialogs[Prefix + appId]) {
            this['@{active}'](appId);
        } else {
            let node = document.createElement('div'),
                zIndex = GlobalDialogs.length;
            node.id = appId;
            document.body.append(node);
            options.zIndex = BaseZIndex + zIndex;
            if (!options.minWidth) options.minWidth = WinMinWidth;
            if (!options.minHeight) options.minHeight = WinMinHeight;
            view.owner.mountVframe(node, '@./dialog', options);
            this['@{add}'](appId, zIndex);
            this['@{active}'](appId);
        }
    },
    '@{adjust}'(id) {
        let temp, move, info;
        for (let i = GlobalDialogs.length; i--;) {
            if (id) {
                if (GlobalDialogs[i] == id) {
                    GlobalDialogs.splice(i, 1);
                    move = true;
                    temp = id;
                    break;
                }
            } else {
                temp = GlobalDialogs[i];
                info = GlobalDialogs[Prefix + temp];
                if (info['@{show}']) {
                    GlobalDialogs.splice(i, 1);
                    move = true;
                    break;
                }
            }
        }
        if (move) {
            GlobalDialogs.push(temp);
        }
        console.log(move, '?');
        return move ? temp : null;
    },
    '@{update.z.index}'() {
        for (let i = GlobalDialogs.length; i--;) {
            let id = GlobalDialogs[i];
            let info = GlobalDialogs[Prefix + id];
            if (info['@{zIndex}'] != BaseZIndex + i) {
                info['@{zIndex}'] = BaseZIndex + i;
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
    '@{active}'(id?: string, min?: boolean) {
        let node, vf, info;
        if (id == GlobalDialogs['@{focused}']) {
            if (min) {
                node = Magix.node(id);
                if (node) {
                    vf = Magix.Vframe.byNode(node);
                    if (vf) {
                        vf.invoke('@{hide.ui}');
                        info = GlobalDialogs[Prefix + id];
                        info['@{show}'] = 0;
                    }
                }
            }
            return;
        }
        info = GlobalDialogs[Prefix + GlobalDialogs['@{focused}']];
        if (info && info['@{actived}']) {
            info['@{actived}'] = 0;
            node = Magix.node(GlobalDialogs['@{focused}']);
            if (node) {
                vf = Magix.Vframe.byNode(node);
                if (vf) {
                    vf.invoke('@{deactive}');
                }
            }
        }
        id = this['@{adjust}'](id);
        if (id) {
            info = GlobalDialogs[Prefix + id];
            if (!info['@{actived}']) {
                info['@{actived}'] = 1;
                info['@{show}'] = 1;
                node = Magix.node(id);
                if (node) {
                    vf = Magix.Vframe.byNode(node);
                    if (vf) {
                        vf.invoke('@{active}');
                    }
                }
                GlobalDialogs['@{focused}'] = id;
            }
            this['@{update.z.index}']();
        } else {
            GlobalDialogs['@{focused}'] = '';
        }
    }
};