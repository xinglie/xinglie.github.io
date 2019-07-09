import Magix from '../lib/magix';
'ref@./theme/index.css';
import Tools from '../plugins/tool';
export default Magix.View.extend({
    tmpl: '@./tool.html',
    render() {
        this.digest({
            tools: Tools
        });
    }
});