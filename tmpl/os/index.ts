import Magix from '../lib/magix';
'ref@./theme/index.css';
export default Magix.View.extend({
    tmpl: '@./index.html',
    render() {
        this.digest();
    },
    '$doc<contextmenu>'(e: MouseEvent) {
        e.preventDefault();
    }
});