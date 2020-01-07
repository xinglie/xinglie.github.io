/*!1.0.5 kooboy_li@163.com*/
/*
    generate by magix-composer@1.0.5
    https://github.com/thx/magix-composer
    author: xinglie.lkf@alibaba-inc.com
    loader:module
 */

import Magix  from "../lib/magix.js";
let Body = document.body;
let Exchange = Object.assign({}, Magix.Event);
let RAF = requestAnimationFrame;
let Next = cb => RAF(() => RAF(cb));
let StopAnim = id => {
    clearTimeout(StopAnim['_ab' + id]);
    let node = Magix.node('a_' + id);
    if (node) {
        node.parentNode.removeChild(node);
    }
};
Exchange.on('_Q', e => {
    StopAnim(e.id);
});
Exchange.on('_P', e => {
    let node = Magix.node('a_' + e.id);
    if (!node) {
        Body.insertAdjacentHTML('beforeend', `<div id="a_${e.id}" class="xl-B"></div>`);
        node = Magix.node('a_' + e.id);
    }
    let start = Magix.node(e.id + '_d_t');
    let dest = Magix.node(e.id + '_tb_i');
    if (start && dest) {
        let startBound = start.getBoundingClientRect();
        let destBound = dest.getBoundingClientRect();
        let style = node.style;
        style.left = startBound.left + 'px';
        style.top = startBound.top + 'px';
        style.width = startBound.width + 'px';
        style.height = startBound.height + 'px';
        Next(() => {
            style.left = destBound.left + 'px';
            style.top = destBound.top + 'px';
            style.width = destBound.width + 'px';
            style.height = destBound.height + 'px';
            StopAnim['_ab' + e.id] = setTimeout(() => {
                StopAnim(e.id);
            }, 300);
        });
    }
    else {
        StopAnim(e.id);
    }
});
export default Exchange;
