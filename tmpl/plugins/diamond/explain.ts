/*
    author:https://github.com/xinglie
 */
'ref@:./index.css';
import Magix from '../../lib/magix';
Magix.applyStyle('@:explain.css');
export default Magix.View.extend({
    tmpl: '@:explain.html',
    render() {
        let me = this;
        me.digest();
    },
    'start<click>': function () {
        Magix.dispatch(this.root, 'start');
    }
});