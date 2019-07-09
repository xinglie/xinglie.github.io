import Magix from '../../lib/magix';
Magix.applyStyle('@index.css');
export default Magix.View.extend({
    tmpl: '@index.html',
    render() {
        this.digest();
    }
})