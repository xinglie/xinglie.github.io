import Magix from '../../lib/magix';
import Fetch from '../../lib/fetch';
import Cron from '../../lib/cron';
Magix.applyStyle('@index.css');
export default Magix.View.extend({
    tmpl: '@index.html',
    init() {
        let update = this.render.bind(this);
        Cron["@{add.task}"](update, 0.5 * 60 * 60 * 1000);
        this.on('destroy', () => {
            Cron["@{remove.task}"](update);
        });
    },
    async render() {
        let mark = Magix.mark(this, '@{render}');
        let [today, list] = await Promise.all([Fetch(`//www.tianqiapi.com/api/?version=v6`, 60 * 60 * 1000), Fetch(`//www.tianqiapi.com/api/?version=v1`, 60 * 60 * 1000)]);
        if (mark()) {
            console.log(new Date().toLocaleTimeString() + '请求');
            this.digest({
                weather: today,
                list: list.data.slice(1),
                update: list.update_time
            });
        }
    }
})