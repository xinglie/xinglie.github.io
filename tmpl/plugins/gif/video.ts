import Magix from '../../lib/magix';
export default Magix.View.extend({
    tmpl: '@video.html',
    assign(){
        return false;
    },
    render() {
        this.digest();
    }
});