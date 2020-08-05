import Magix from '../../lib/magix';
import Bridge from './bridge';
export default Magix.View.extend({
    tmpl: '@:detail.html',
    init() {
        let watch = this.render.bind(this);
        this.on('destroy', () => {
            Bridge.off('@:{when.document.changed}', watch);
        });
        Bridge.on('@:{when.document.changed}', watch);
    },
    render() {
        let doc = Bridge["@:{get.document}"]();
        let comment = Bridge["@:{get.is.comment}"]();
        let url = doc.skipURL || doc.url;
        if (comment) {
            url = '//3g.163.com/touch/comment.html?docid=' + doc.docid;
        }
        url = url.replace(/^https?:/i, '')
        this.digest({
            url
        });
    }
})