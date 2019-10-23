import Magix from '../../lib/magix';
import XAgent from '../../lib/agent';
import Cron from '../../lib/cron';
Magix.applyStyle('@index.css');
//let appId=`&appid=1001&appsecret=5578`;
let appIds = [`appid=06369426&appsecret=VVM7jMR0`,
    `appid=89336239&appsecret=hU8TwE52`,
    `appid=23238842&appsecret=QgdXYe3r`,
    `appid=86986721&appsecret=eXm5G85Y`];
export default Magix.View.extend({
    tmpl: '@index.html',
    init() {
        let update = this.render.bind(this);
        Cron["@{add.task}"](update, 0.5 * 60 * 60 * 1000);
        this.on('destroy', () => {
            Cron["@{remove.task}"](update);
        });
    },
    render() {
        let mark = Magix.mark(this, '@{render}');
        let task = async (index) => {
            let appId = appIds[index];
            console.log(appId);
            if (appId) {
                let [today, list] = await Promise.all([XAgent.request(`//www.tianqiapi.com/api/?version=v6&${appId}`, 60 * 60 * 1000), XAgent.request(`//www.tianqiapi.com/api/?version=v1&${appId}`, 60 * 60 * 1000)]);
                if (mark()) {
                    try {
                        let todayObject = JSON.parse(today);
                        let listObject = JSON.parse(list);
                        this.digest({
                            weather: todayObject,
                            list: listObject.data.slice(1),
                            update: listObject.update_time
                        });
                    } catch{
                        debugger;
                        //task(index++);
                    }
                }
            }
        }
        task(0);
    }
})