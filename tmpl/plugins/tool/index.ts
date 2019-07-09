import Magix from '../../lib/magix';
export default Magix.View.extend({
    tmpl: '@index.html',
    render() {
        this.digest();
    }
})