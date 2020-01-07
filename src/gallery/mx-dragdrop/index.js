/*!1.0.5 kooboy_li@163.com*/
/*
    generate by magix-composer@1.0.5
    https://github.com/thx/magix-composer
    author: xinglie.lkf@alibaba-inc.com
    loader:module
 */

/*
    author:xinglie.lkf@taobao.com
 */
let IsW3C = window.getComputedStyle;
let ClearSelection = (t) => {
    if ((t = window.getSelection)) {
        t().removeAllRanges();
    }
};
let DragPrevent = (e) => {
    e.preventDefault();
};
let DragMoveEvent = ['mousemove', 'touchmove'];
let DragEndEvent = ['mouseup', 'pointercancel', 'touchcancel'];
let DragPreventEvent = ['keydown', 'mousewheel', 'DOMMouseScroll', 'fullscreenchange'];
export default {
    ctor() {
        let me = this;
        me.on('destroy', () => {
            me['__']();
        });
    },
    '__'(e) {
        let me = this;
        let info = me['_a'];
        if (info) {
            let fn;
            for (fn of DragMoveEvent) {
                document.removeEventListener(fn, me['_a']);
            }
            for (fn of DragEndEvent) {
                document.removeEventListener(fn, me['_b']);
            }
            for (fn of DragPreventEvent) {
                document.removeEventListener(fn, DragPrevent);
            }
            window.removeEventListener('blur', me['_b']);
            delete me['_a'];
            let stop = me['_c'];
            if (stop) {
                stop(e);
            }
        }
    },
    '_d'(e, moveCallback, endCallback) {
        let me = this;
        me['__']();
        if (e) {
            ClearSelection();
            me['_c'] = endCallback;
            me['_b'] = me['__'].bind(me);
            me['_a'] = e => {
                if (moveCallback) {
                    moveCallback(e);
                }
            };
            let fn;
            for (fn of DragMoveEvent) {
                document.addEventListener(fn, me['_a']);
            }
            for (fn of DragEndEvent) {
                document.addEventListener(fn, me['_b']);
            }
            for (fn of DragPreventEvent) {
                document.addEventListener(fn, DragPrevent, {
                    passive: false
                });
            }
            window.addEventListener('blur', me['_b']);
        }
    },
    '_g'(x, y) {
        let node = null;
        if (document.elementFromPoint) {
            if (!DragPrevent['_e'] && IsW3C) {
                DragPrevent['_e'] = true;
                DragPrevent['_f'] = document.elementFromPoint(-1, -1) !== null;
            }
            if (DragPrevent['_f']) {
                x += window.pageXOffset;
                y += window.pageYOffset;
            }
            node = document.elementFromPoint(x, y);
            while (node && node.nodeType == 3)
                node = node.parentNode;
        }
        return node;
    },
    '_h': ClearSelection
};
