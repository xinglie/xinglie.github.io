/*
    author:xinglie.lkf@taobao.com
 */
let IsW3C = window.getComputedStyle;
let ClearSelection = (t?: () => Selection) => {
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
            me['@{dd&drag.end}']();
        });
    },
    '@{dd&drag.end}'(e) {
        let me = this;
        let info = me['@{dd&move.proxy}'];
        if (info) {
            let fn;
            for (fn of DragMoveEvent) {
                document.removeEventListener(fn, me['@{dd&move.proxy}']);
            }
            for (fn of DragEndEvent) {
                document.removeEventListener(fn, me['@{dd&stop.proxy}']);
            }
            for (fn of DragPreventEvent) {
                document.removeEventListener(fn, DragPrevent);
            }
            window.removeEventListener('blur', me['@{dd&stop.proxy}']);

            delete me['@{dd&move.proxy}'];
            let stop = me['@{dd&stop.callback}'];
            if (stop) {
                stop(e);
            }
        }
    },
    '@{drag.drop}'(e, moveCallback, endCallback) {
        let me = this;
        me['@{dd&drag.end}']();
        if (e) {
            ClearSelection();
            me['@{dd&stop.callback}'] = endCallback;
            me['@{dd&stop.proxy}'] = me['@{dd&drag.end}'].bind(me);
            me['@{dd&move.proxy}'] = e => {
                if (moveCallback) {
                    moveCallback(e);
                }
            };
            let fn;
            for (fn of DragMoveEvent) {
                document.addEventListener(fn, me['@{dd&move.proxy}']);
            }
            for (fn of DragEndEvent) {
                document.addEventListener(fn, me['@{dd&stop.proxy}']);
            }
            for (fn of DragPreventEvent) {
                document.addEventListener(fn, DragPrevent, {
                    passive: false
                });
            }
            window.addEventListener('blur', me['@{dd&stop.proxy}']);
        }
    },
    '@{from.point}'(x, y) {
        let node = null;
        if (document.elementFromPoint) {
            if (!DragPrevent['@{dd&fixed}'] && IsW3C) {
                DragPrevent['@{dd&fixed}'] = true;
                DragPrevent['@{dd&add.scroll}'] = document.elementFromPoint(-1, -1) !== null;
            }
            if (DragPrevent['@{dd&add.scroll}']) {
                x += window.pageXOffset;
                y += window.pageYOffset;
            }
            node = document.elementFromPoint(x, y);
            while (node && node.nodeType == 3) node = node.parentNode;
        }
        return node;
    },
    '@{clear.selection}': ClearSelection
};