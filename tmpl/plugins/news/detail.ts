import Magix from '../../lib/magix';
import Bridge from './bridge';
export default Magix.View.extend({
    tmpl: '@detail.html',
    init() {
        let watch = this.render.bind(this);
        this.on('destroy', () => {
            Bridge.off('@{when.document.changed}', watch);
        });
        Bridge.on('@{when.document.changed}', watch);
    },
    render() {
        let doc = Bridge["@{get.document}"]();
        let url = doc.skipURL || doc.url;
        url = url.replace(/^https?:/i, '')
        this.digest({
            url
        });
    }
})