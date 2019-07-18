import Magix from './lib/magix';
declare global {
    interface ImportMeta {
        url: string
    }
}
let Starter = {
    config(rootId) {
        let url = import.meta.url;
        let { params, path } = Magix.parseUrl(url);
        let src = path.replace(/[^/]+$/, '');
        let theme = params.theme || 'black';
        Magix.applyStyle('@scoped.style');
        Magix.config({
            paths: {
                '~xl': src
            }
        });
        Magix.config({
            theme,
            rootId: rootId,
            defaultView: '~xl/os/index',
            error(ex) {
                console.error(ex);
            }
        });
    },
    boot() {
        let mark = Magix.mark(this, '@{boot}');
        let theme = Magix.config('theme');
        Magix.use('~xl/os/theme/' + theme, () => {
            if (mark()) {
                Magix.boot();
            }
        });
    },
    unboot() {
        Magix.unmark(this);
        Magix.unboot();
    }
};
export default Starter;