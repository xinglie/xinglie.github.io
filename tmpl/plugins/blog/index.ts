import Magix from '../../lib/magix';
import List from './db';
Magix.applyStyle('@./index.css');
export default Magix.View.extend({
    tmpl: '@index.html',
    assign(){
        return false;
    },
    render() {
        this.digest({
            list: List
        });
    }
})