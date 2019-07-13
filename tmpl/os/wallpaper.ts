import Magix from '../lib/magix';
let Bridge = Object.assign({}, Magix.Event);
'ref@./theme/index.css';
export default Magix.View.extend({
    tmpl: '@./wallpaper.html',
    init() {
        let setWapper = e => {
            if (this.get('src') != e.src) {
                let mark = Magix.mark(this, '@{update.wallpapger}');
                this.digest({
                    src: ''
                });
                this.root.style.backgroundImage = `url(${e.thumb})`;
                setTimeout(() => {
                    if (mark()) {
                        this.digest({
                            src: e.src
                        });
                    }
                }, 20);
            }
        };
        Bridge.on('@{when.set.wallpapger}', setWapper);
        this.on('destroy', () => {
            Bridge.off('@{when.set.wallpapger}', setWapper);
        });
    },
    render() {
        this.digest();
    }
}, {
        '@{set.wallpaper}'(thumb, src) {
            Bridge.fire('@{when.set.wallpapger}', {
                thumb,
                src
            });
        }
    });