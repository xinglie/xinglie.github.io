/*!1.0.5 kooboy_li@163.com*/
/*
    generate by magix-composer@1.0.5
    https://github.com/thx/magix-composer
    author: xinglie.lkf@alibaba-inc.com
    loader:module
 */

import Magix  from "../lib/magix.js";
let GlobalDialogs = [];
let Prefix = '\x1f';
let BaseZIndex = 5000;
let WinMinWidth = 150;
let WinMinHeight = 100;
let Position = 0;
let TempHiddens = [];
export default {
    '_x'(app, zIndex) {
        GlobalDialogs.push(app);
        GlobalDialogs[Prefix + app.appId] = {
            '_v': BaseZIndex + zIndex,
            '_w': 1
        };
    },
    '_y'() {
        return GlobalDialogs;
    },
    '_A'(id) {
        delete GlobalDialogs[Prefix + id];
        for (let i = GlobalDialogs.length; i--;) {
            if (GlobalDialogs[i].appId == id) {
                GlobalDialogs.splice(i, 1);
                break;
            }
        }
        this['_z']();
    },
    '_w'(id) {
        let info = GlobalDialogs[Prefix + id];
        info['_w'] = 1;
    },
    '_B'(id) {
        let info = GlobalDialogs[Prefix + id];
        info['_w'] = 0;
        this['_z']();
    },
    '_C'(view, app) {
        let appId = app.appId;
        if (GlobalDialogs[Prefix + appId]) {
            this['_z'](appId);
            let node = Magix.node(appId);
            if (node) {
                let vf = Magix.Vframe.byNode(node);
                if (vf.invoke('assign', app)) {
                    vf.invoke('render');
                }
            }
        }
        else {
            TempHiddens.length = 0;
            let node = document.createElement('div'), zIndex = GlobalDialogs.length;
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
                if (Position > 5)
                    Position = 0;
            }
            options.left = left;
            options.top = top;
            options.zIndex = BaseZIndex + zIndex;
            if (!options.minWidth)
                options.minWidth = WinMinWidth;
            if (!options.minHeight)
                options.minHeight = WinMinHeight;
            view.owner.mountVframe(node, "~xl/os/dialog", options);
            this['_x'](options, zIndex);
            setTimeout(() => {
                this['_z'](appId);
            }, 50);
        }
    },
    '_D'(id) {
        let temp, move, info;
        for (let i = GlobalDialogs.length; i--;) {
            temp = GlobalDialogs[i];
            if (id) {
                if (temp.appId == id) {
                    GlobalDialogs.splice(i, 1);
                    move = true;
                    break;
                }
            }
            else {
                info = GlobalDialogs[Prefix + temp.appId];
                if (info['_w']) {
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
    '_E'() {
        for (let i = GlobalDialogs.length; i--;) {
            let id = GlobalDialogs[i].appId;
            let info = GlobalDialogs[Prefix + id];
            if (info['_v'] != BaseZIndex + i) {
                info['_v'] = BaseZIndex + i;
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
    '_z'(id, min) {
        TempHiddens.length = 0;
        let node, vf, info;
        if (id == GlobalDialogs['_F']) {
            if (min) {
                node = Magix.node(id);
                if (node) {
                    vf = Magix.Vframe.byNode(node);
                    if (vf) {
                        vf.invoke('_G');
                        info = GlobalDialogs[Prefix + id];
                        info['_w'] = 0;
                    }
                }
            }
            return;
        }
        info = GlobalDialogs[Prefix + GlobalDialogs['_F']];
        if (info && info['_H']) {
            info['_H'] = 0;
            node = Magix.node(GlobalDialogs['_F']);
            if (node) {
                vf = Magix.Vframe.byNode(node);
                if (vf) {
                    vf.invoke('_I');
                }
            }
        }
        info = this['_D'](id);
        if (info) {
            id = info.appId;
            info = GlobalDialogs[Prefix + id];
            if (!info['_H']) {
                info['_H'] = 1;
                info['_w'] = 1;
                node = Magix.node(id);
                if (node) {
                    vf = Magix.Vframe.byNode(node);
                    if (vf) {
                        vf.invoke('_z');
                    }
                }
                GlobalDialogs['_F'] = id;
            }
            this['_E']();
        }
        else {
            GlobalDialogs['_F'] = '';
        }
    },
    '_J'() {
        let count = TempHiddens.length;
        if (count) {
            let ids = [];
            for (let d of TempHiddens) {
                ids.push(d);
            }
            for (let id of ids) {
                this['_z'](id);
            }
        }
        else {
            let ids = [];
            for (let e of GlobalDialogs) {
                let i = GlobalDialogs[Prefix + e.appId];
                if (i['_w']) {
                    let n = Magix.node(e.appId);
                    let vf = n && Magix.Vframe.byNode(n);
                    if (vf) {
                        vf.invoke('_G');
                        ids.push(e.appId);
                    }
                }
            }
            TempHiddens.push(...ids);
        }
    }
};
