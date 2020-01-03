import Magix, { Magix5 } from '../lib/magix';
import Apps from '../plugins/app';
'ref@./theme/index.css';
import DialogCtrl from './ctrl';
let AppsMap = Magix.toMap(Apps, 'appId');
export default Magix.View.extend({
    tmpl: '@./icon.html',
    init() {
        let root = getComputedStyle(document.body);
        let width = parseInt(root.getPropertyValue('@scoped.style:--__global__icon_width'), 10);
        let height = parseInt(root.getPropertyValue('@scoped.style:--__global__icon_height'), 10);
        let gap = parseInt(root.getPropertyValue('@scoped.style:--__global__icon_gap'), 10);
        let taskbarHeight = parseInt(root.getPropertyValue('@scoped.style:--__global__taskbar_height'));
        this['@{icon.width}'] = width;
        this['@{icon.height}'] = height;
        this['@{icon.gap}'] = gap;
        this['@{taskbar.height}'] = taskbarHeight;

        let { params } = Magix.parseUrl(location.href);
        if (params.open) {
            let opens = params.open.split(',');
            for (let o of opens) {
                let i = AppsMap[o];
                if (i) {
                    DialogCtrl["@{create}"](this, i);
                }
            }
        }
    },
    '@{set.size}'() {
        let width = this['@{icon.width}'];
        let height = this['@{icon.height}'];
        let gap = this['@{icon.gap}'];
        let taskbarHeight = this['@{taskbar.height}'];
        let viewportHeight = document.body.clientHeight - taskbarHeight;
        let startX = gap;
        let startY = gap;
        let items = [];
        for (let e of Apps) {
            items.push({
                app: e,
                left: startX,
                top: startY
            });
            let nextY = startY + height + gap;
            if (nextY + height >= viewportHeight) {
                nextY = gap;
                startX += width + gap;
            }
            startY = nextY;
        }
        this.set({
            items
        });
    },
    render() {
        this['@{set.size}']();
        this.digest();
    },
    '@{open.by.icon}<click>'(e: Magix5.MagixMouseEvent) {
        let { app } = e.params;
        if (app.url) {
            window.open(app.url);
        } else {
            DialogCtrl["@{create}"](this, app);
        }
    },
    '$win<resize>'() {
        this.render();
    }
});