import Magix from '../lib/magix';
let Body = document.body;
let Exchange = Object.assign({}, Magix.Event);
let RAF = requestAnimationFrame;
let Next = cb => RAF(() => RAF(cb));

let StopAnim = id => {
    clearTimeout(StopAnim['@{timer}' + id]);
    let node = Magix.node('a_' + id);
    if (node) {
        node.parentNode.removeChild(node);
    }
};
Exchange.on('@{when.dialog.active}', e => {
    StopAnim(e.id);
});
Exchange.on('@{when.dialog.min}', e => {
    let node = Magix.node('a_' + e.id);
    if (!node) {
        Body.insertAdjacentHTML('beforeend', `<div id="a_${e.id}" class="@./theme/index.css:min-anim"></div>`);
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
            StopAnim['@{timer}' + e.id] = setTimeout(() => {
                StopAnim(e.id)
            }, 300);
        });
    } else {
        StopAnim(e.id);
    }
});
export default Exchange;