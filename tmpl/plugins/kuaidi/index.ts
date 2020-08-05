import Magix from '../../lib/magix';
export default Magix.View.extend({
    tmpl: '@:index.html',
    assign(){
        return false;
    },
    render() {
        this.digest();
    }
})