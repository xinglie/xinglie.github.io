import Magix from '../../lib/magix';
//import Frontend from 'http://localhost/frontend/src/fe.js';
import Frontend from '~frontend';
export default Magix.View.extend({
    tmpl: '@:./index.html',
    init() {
        this.on('destroy', () => {
            Frontend.unmount('fe_' + this.id);
        });
    },
    assign() {
        return false;
    },
    render() {
        this.digest();
        this.root.id = Magix.guid('_s_');
        Frontend.mount('fe_' + this.id, {
            logo: 0,
            hash: 0,
            scrollId: this.root.id
        });
    }
})