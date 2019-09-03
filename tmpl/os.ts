declare global {
    interface ImportMeta {
        url: string
    }
}
import Magix from './lib/magix';
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
    rootId: 'xl',
    defaultView: '~xl/os/index',
    error(ex) {
        console.error(ex);
    }
});
Magix.use('~xl/os/theme/' + theme, Magix.boot);