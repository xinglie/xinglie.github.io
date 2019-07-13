import Magix from '../../lib/magix';
//import Frontend from 'http://localhost/frontend/src/fe.js';
import Frontend from 'https://xinglie.github.io/frontend/build/fe.js';
let FE_ID = Magix.guid('_fe_');
Frontend.config(FE_ID, {
    logo: 0,
    hash: 0,
    scrollId: FE_ID
});
export default Magix.View.extend({
    init() {
        this.on('destroy', () => {
            debugger;
            Frontend.unboot();
        });
    },
    render() {
        this.root.id = FE_ID;
        Frontend.boot();
    }
})