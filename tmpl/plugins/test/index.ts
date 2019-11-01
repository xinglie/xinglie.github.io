/*
    author:xinglie.lkf@alibaba-inc.com
*/
import Magix from '../../lib/magix';
export default Magix.View.extend({
    tmpl: '@index.html',
    render() {
        this.digest();
    },
    'go<click>'() {
        this.digest({
            rnd:Math.random()
        });
        this.owner.unmountVframe();
    }
});