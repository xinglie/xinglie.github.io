import Magix from './lib/magix';
let boot = Magix.node('boot') as HTMLScriptElement;
let src = boot.src.replace(/[^/]+$/, '');
let theme = boot.getAttribute('theme') || 'black';
Magix.applyStyle('@scoped.style');
Magix.config({
    paths: {
        '~xl': src
    }
});
Magix.use('~xl/os/theme/' + theme, () => {
    Magix.boot({
        rootId: 'app',
        defaultView: '~xl/os/index'
    });
});