import Magix, { Magix5 } from '../../lib/magix';
import Dragdrop from '../../gallery/mx-dragdrop/index';
import Cron from '../../lib/cron';
Magix.applyStyle('@./index.css');
let weeks = '日一二三四五六'.split('');
let GetNumOfDays = (year, month) => {
    return 32 - new Date(year, month - 1, 32).getDate();
};
// let GetTip = ({ year, month, day, holiday, lunar }) => {
//     let tip = year + '-' + month + '-' + day;
//     if (holiday) {
//         tip += ' ' + holiday;
//     }
//     tip += '　农历' + lunar.month + lunar.date;
//     if (lunar.solarTerm) {
//         tip += ' 节气：' + lunar.solarTerm;
//     }
//     if (lunar.festival) {
//         tip += ' 节日：' + lunar.festival;
//     }
//     return tip;
// };
export default Magix.View.extend({
    mixins: [Dragdrop],
    tmpl: '@index.html',
    init() {
        this.set({
            weekText: weeks,
            weekStart: 0
        });
        let update = this.render.bind(this);
        Cron["@{add.task}"](update, 10 * 60 * 1000);
        this.ondestroy = () => {
            Cron["@{remove.task}"](update);
        };
    },
    render() {
        let now = new Date();
        let year = now.getFullYear();
        let month = now.getMonth() + 1;
        let day = now.getDate();
        let start = new Date(now.getFullYear(), 0, 1, 0, 0, 0).getTime();
        let end = new Date(now.getFullYear() + 1, 0, 1, 0, 0, 0).getTime();
        let percent = (now.getTime() - start) / (end - start) * 100;
        let dayTime = 24 * 60 * 60 * 1000;
        let totalDays = (end - start) / dayTime;
        let esDays = (end - now.getTime()) / dayTime;
        let weekStart = this.get('weekStart');
        let startOffset = (7 - weekStart + new Date(year, month - 1, 1).getDay()) % 7;
        let trs = [],
            tds = [];
        let days = GetNumOfDays(year, month),
            i;
        //let preDays = GetNumOfDays(year, month - 1);
        //let day, date, y;
        for (i = 1; i <= startOffset; i++) {
            //day = preDays - (startOffset - i);
            //date = new Date(year, month - 2, day);
            //y = date.getFullYear();
            tds.push({
                //year: y,
                //month: month - 1,
                //day: day,
                //lunar: getLunarCalendar(y, month, day),
                otherMonth: true
            });
        }
        for (i = 1; i <= days; i++) {
            //date = new Date(year, month - 1, i);
            tds.push({
                year,
                day: i,
                month: month
            });
            if (((i + startOffset) % 7) === 0) {
                trs.push(tds);
                tds = [];
            }
        }
        let fillStart = tds.length; //补充
        if (fillStart) {
            let fillEnd = 7; //2周
            for (i = fillStart; i < fillEnd; i++) {
                //day = i - fillStart + 1;
                //date = new Date(year, month, day);
                tds.push({
                    //month: month + 1,
                    //day: day,
                    //year: date.getFullYear(),
                    otherMonth: true
                });
                if ((i + 1) % 7 === 0) {
                    trs.push(tds);
                    tds = [];
                    if (trs.length == 6) break;
                }
            }
        }
        console.log(trs);
        this.digest({
            year,
            month,
            day,
            days: totalDays,
            esDays,
            percent: percent.toFixed(2),
            weeks: trs
        });
    },
    '@{move.cal}<mousedown>'(e: Magix5.MagixMouseEvent) {
        let target = this.root;
        let left = parseInt(getComputedStyle(target).left);
        let top = parseInt(getComputedStyle(target).top);
        this['@{drag.drop}'](e, (ev: MouseEvent) => {
            let ox = ev.pageX - e.pageX;
            let oy = ev.pageY - e.pageY;
            let newX = left + ox;
            let newY = top + oy;
            target.style.left = newX + 'px';
            target.style.top = newY + 'px';
        });
    },
})