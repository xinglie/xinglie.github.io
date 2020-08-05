import Magix from '../../lib/magix';
import XAgent from '../../lib/agent';
import Cron from '../../lib/cron';
Magix.applyStyle('@:index.css');
//let appId=`&appid=1001&appsecret=5578`;
let appIds = [`appid=06369426&appsecret=VVM7jMR0`,
    `appid=89336239&appsecret=hU8TwE52`,
    `appid=23238842&appsecret=QgdXYe3r`,
    `appid=86986721&appsecret=eXm5G85Y`,
    `appid=91677414&appsecret=9LujuRyV`,
    `appid=77118166&appsecret=wQ7NdnTF`,
    `appid=86775272&appsecret=lHspRtk5`,
    `appid=12627738&appsecret=Tf6yoxfB`,
    `appid=72545297&appsecret=aV9KC2lG`,
    `appid=69885792&appsecret=cFO1rkYQ`];
export default Magix.View.extend({
    tmpl: '@:index.html',
    init() {
        let update = this.render.bind(this);
        Cron["@:{add.task}"](update, 0.5 * 60 * 60 * 1000);
        this.on('destroy', () => {
            Cron["@:{remove.task}"](update);
        });
    },
    assign() {
        return false;
    },
    async render() {
        let mark = Magix.mark(this, '@:{render}');
        let getToday = () => {
            return new Promise((resolve, reject) => {
                let task = async index => {
                    let appId = appIds[index];
                    if (appId) {
                        let today = await XAgent.request(`//www.tianqiapi.com/api/?version=v6&${appId}`, 60 * 60 * 1000);
                        let todayObject = JSON.parse(today);
                        if (todayObject && !todayObject.errcode) {
                            resolve(todayObject);
                        } else {
                            task(++index);
                        }
                    } else {
                        reject('no apis');
                    }
                };
                task(0);
            });
        };
        let getList = () => {
            return new Promise<{
                data: [],
                update_time: string
            }>((resolve, reject) => {
                let task = async index => {
                    let appId = appIds[index];
                    if (appId) {
                        let list = await XAgent.request(`//www.tianqiapi.com/api/?version=v1&${appId}`, 60 * 60 * 1000);
                        let listObject = JSON.parse(list);
                        if (listObject && !listObject.errcode) {
                            resolve(listObject);
                        } else {
                            task(++index);
                        }
                    } else {
                        reject('no apis');
                    }
                };
                task(0);
            });
        };
        try {
            let [todayObject, listObject] = await Promise.all<{}, {
                data: [],
                update_time: string
            }>([getToday(), getList()]);
            this.digest({
                weather: todayObject,
                list: listObject.data.slice(1),
                update: listObject.update_time
            });
        } catch (ex) {
            console.log(ex);
        }
    }
})