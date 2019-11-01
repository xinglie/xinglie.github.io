import Magix from '../../lib/magix';
Magix.applyStyle('@./index.css');
export default Magix.View.extend({
    tmpl: '@index.html',
    init() {
        this.set({
            state: 'desc'
        });
    },
    assign(){
        return false;
    },
    render() {
        this.digest();
    },
    '@{game}<start>'(e) {
        this.digest({
            state: 'start'
        });
    }
})