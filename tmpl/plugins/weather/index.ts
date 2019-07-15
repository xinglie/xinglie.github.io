import Magix from '../../lib/magix';
import Fetch from '../../lib/fetch';
Magix.applyStyle('@index.css');
export default Magix.View.extend({
    tmpl: '@index.html',
    async render() {
        let mark = Magix.mark(this, '@{render}');
        let weather = await Fetch(`//www.tianqiapi.com/api/?version=v6`, 60 * 60 * 1000);
        if (mark()) {
            console.log(new Date().toLocaleTimeString() + '请求');
            this.digest({
                weather
            });
        }
        //0.5小时更新一次
        setTimeout(this.render.bind(this), 0.5 * 60 * 60 * 1000);
    }
})