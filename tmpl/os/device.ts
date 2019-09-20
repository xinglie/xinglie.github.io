import Magix from '../lib/magix';
'ref@./theme/index.css';
let FormatSeconds = s => {
    let r = '';
    if (isFinite(s)) {
        let h = (s / (60 * 60)) | 0;
        let m = (((s % (60 * 60))) / 60) | 0;
        s = s % 60;
        if (h) {
            r += h + '小时'
        }
        if (m) {
            r += m + '分钟'
        }
        if (s) {
            r += s + '秒';
        }
    } else {
        r = '估算中...';
    }
    return r;
};
let Scale100 = r => (r * 100).toFixed(0);
declare global {
    interface Navigator {
        getBattery?: () => Promise<any>
    }
}
export default Magix.View.extend({
    tmpl: '@./device.html',
    init() {
        this.set({
            s100: Scale100,
            fs: FormatSeconds,
            full: false
        });
        if (navigator.getBattery) {
            navigator.getBattery().then(b => {
                let update = (e?) => {
                    this.digest({
                        support: true,
                        ftime: b.chargingTime,
                        dtime: b.dischargingTime,
                        level: b.level,
                        charging: b.charging
                    });
                };
                update();
                b.onlevelchange = update;
                b.onchargingchange = update;
                b.onchargingtimechange = update;
                b.ondischargingtimechange = update;
            }).catch(() => {
                this.set({
                    support: false
                });
            });
        } else {
            this.set({
                support: false
            });
        }
    },
    render() {
        this.digest({
            online: navigator.onLine
        });
    },
    '$doc<webkitfullscreenchange,mozfullscreenchange,fullscreenchange>'(e) {
        let doc = document as Document & {
            fullscreenElement: HTMLElement
            webkitCurrentFullScreenElement: HTMLElement
            mozFullScreenElement: HTMLElement
        };
        let element = doc.fullscreenElement ||
            doc.webkitCurrentFullScreenElement ||
            doc.mozFullScreenElement || null;
        this.digest({
            full: !!element
        });
    },
    '@{toggle.fullscreen}<click>'() {
        if (document.fullscreenElement) {
            document.exitFullscreen();
        } else {
            document.body.requestFullscreen();
        }
    },
    '$win<online,offline>'(e) {
        this.render();
    }
});