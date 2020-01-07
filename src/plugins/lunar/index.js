/*!1.0.5 kooboy_li@163.com*/
/*
    generate by magix-composer@1.0.5
    https://github.com/thx/magix-composer
    author: xinglie.lkf@alibaba-inc.com
    loader:module
 */
let $quick_w_6_static_node;
let $quick_w_7_static_node;
let $quick_w_0_static_attr={'class': 'xl-aY',};
let $quick_w_1_static_attr={'class': 'xl-aW',};
let $quick_w_2_static_attr={'class': 'xl-aZ',};
let $quick_w_3_static_attr={'class': 'xl-b_',};
let $quick_w_4_static_attr={'class': 'xl-ba',};
let $quick_w_5_static_attr={'class': 'xl-bb',};
let $quick_w_8_static_attr={'class': 'xl-bh',};
let $quick_w_9_static_attr={'class': 'xl-bi',};
import Magix  from "../../lib/magix.js";
import Dragdrop  from "../../gallery/mx-dragdrop/index.js";
import Cron  from "../../lib/cron.js";
import Days  from "./days.js";
Magix.applyStyle("xl-m",".xl-aV{background:rgba(0,0,0,.13);border-radius:5px;overflow:hidden;opacity:.1;-webkit-transition:all .5s;transition:all .5s}.xl-aV:hover{opacity:.8}.xl-aW{height:4px;background:#bbb}.xl-aX{height:100%;background:#888}.xl-aY{border-radius:4px;background:rgba(0,0,0,.67);-webkit-transform:translate(100px,-40px);transform:translate(100px,-40px);position:absolute;left:0;top:0;padding:4px;font-size:12px}.xl-aY:after{content:\" \";width:0;height:0;position:absolute;border:6px solid transparent;border-top-color:rgba(0,0,0,.67);left:50%;top:100%}.xl-aZ{position:absolute;left:0;right:0;bottom:0;font-size:140px;color:hsla(0,0%,100%,.13);cursor:move}.xl-aZ,.xl-b_{text-align:center}.xl-b_{border-collapse:collapse;width:100%;border-spacing:0}.xl-ba{background:rgba(0,0,0,.33)}.xl-bb{font-size:18px}.xl-bc{cursor:pointer;padding:0;border-radius:4px;width:50px;height:30px;position:relative}.xl-bd,.xl-bd:hover{background:rgba(0,0,0,.27)}.xl-be{color:red}.xl-bf{color:green}.xl-bg{right:5px;top:-2px}.xl-bg,.xl-bh{position:absolute;font-size:12px;-webkit-transform:scale(.6);transform:scale(.6)}.xl-bh{right:-3px;bottom:-4px}.xl-bi{position:absolute;left:3px;top:-7px;font-size:12px;-webkit-transform:scale(.6);transform:scale(.6)}.xl-bj{color:#ffd73a}");
let weeks = '日一二三四五六'.split('');
let GetNumOfDays = (year, month) => {
    return 32 - new Date(year, month - 1, 32).getDate();
};
let DaughterBirthday = {
    year: 2012,
    month: 12,
    day: 22,
    name: '妞妞'
};
export default Magix.View.extend({
    mixins: [Dragdrop],
    tmpl: ($$, $_create,$_viewId,$n)=> { 
let $_temp,$vnode_0=[],
{
	days,
	esDays,
	percent,
	month,
	weekText,
	weeks,
	year,
	day,
	workdays,
	holidays,
	birthday,
	solarTerms,}=$$,
$vnode_1,
$vnode_2,
$text,
$vnode_3,
$vnode_4,
$vnode_5,
$vnode_6,
$$_class,
$$_title,
$vnode_7,
$vnode_8,
$vnode_9,
$vnode_10
$vnode_2=[$_create(0,0,'今年共'+$n(days)+'天，还有'+$n(Math.ceil(esDays))+'天')];
$vnode_1=[$_create('div',$quick_w_0_static_attr,$vnode_2)];
$vnode_2=[$_create('div',{'class': 'xl-aX','style': 'width:'+$n(percent)+'%',})];$vnode_1.push($_create('div',$quick_w_1_static_attr,$vnode_2));$vnode_2=[$_create(0,0,$n(month))];$vnode_1.push($_create('div',$quick_w_2_static_attr,$vnode_2));$vnode_3=[];$vnode_4=[];
for(let $q_c_zbhws=weekText.length,$q_key_xfauhku=0;$q_key_xfauhku<$q_c_zbhws;$q_key_xfauhku++){
let wt=weekText[$q_key_xfauhku];
$vnode_6=[$_create(0,0,$n(wt))];
$vnode_5=[$_create('td',$quick_w_4_static_attr,$vnode_6)];$vnode_4.push(...$vnode_5);
}$vnode_3.push($_create('tr',0,$vnode_4));
for(let $q_c_wafwgal=weeks.length,$q_key_pupkyspp=0;$q_key_pupkyspp<$q_c_wafwgal;$q_key_pupkyspp++){
let weekDays=weeks[$q_key_pupkyspp];
$vnode_5=[];
for(let $q_c_yuwf=weekDays.length,$q_key_obapugue=0;$q_key_obapugue<$q_c_yuwf;$q_key_obapugue++){
let wd=weekDays[$q_key_obapugue];
let date=`${wd.year}-${wd.month}-${wd.day}`;;$vnode_7=[];
if(!wd.otherMonth){
$vnode_8=[];$vnode_9=[$_create(0,0,$n(wd.day))];$vnode_8.push($_create('div',$quick_w_5_static_attr,$vnode_9));
if(workdays[date]===1){

if($quick_w_6_static_node){
$vnode_9=[$quick_w_6_static_node];
}else{
$vnode_10=[$_create(0,0,'班')];
$vnode_9=[$quick_w_6_static_node=$_create('div',{'_': '_','class': 'xl-bg',},$vnode_10)];
}
$vnode_8.push(...$vnode_9);
}else if(holidays[date]===1){

if($quick_w_7_static_node){
$vnode_9=[$quick_w_7_static_node];
}else{
$vnode_10=[$_create(0,0,'假')];
$vnode_9=[$quick_w_7_static_node=$_create('div',{'_': 'a','class': 'xl-bg',},$vnode_10)];
}
$vnode_8.push(...$vnode_9);
}
if(solarTerms[date]){
$vnode_10=[$_create(0,0,$n(solarTerms[date]))];
$vnode_9=[$_create('div',$quick_w_8_static_attr,$vnode_10)];$vnode_8.push(...$vnode_9);
}
if(wd.month==birthday.month&&wd.day==birthday.day){
$vnode_10=[$_create(0,0,$n(birthday.name))];
$vnode_9=[$_create('div',$quick_w_9_static_attr,$vnode_10)];$vnode_8.push(...$vnode_9);
}$vnode_7.push(...$vnode_8);
};$$_class='xl-bc';if(wd.year==year&&wd.month==month&&wd.day==day){;$$_class+=' xl-bd';};if(workdays[date]===1){;$$_class+=' xl-be';}else if(holidays[date]===1){;$$_class+=' xl-bf';};if(wd.month==birthday.month&&wd.day==birthday.day){;$$_class+=' xl-bj';}$$_title=$n(date);if(workdays[date]===1){;$$_title+=' 上班';}else if(holidays[date]===1){;$$_title+=' 放假';};$$_title+=' ';if(solarTerms[date]){;$$_title+=''+$n(solarTerms[date]);};$$_title+=' ';if(wd.month==birthday.month&&wd.day==birthday.day){;$$_title+=''+$n(birthday.name)+'生日，今年'+$n(wd.year-birthday.year)+'岁啦～';};
$vnode_6=[$_create('td',{'class': $$_class,'title': ((!wd.otherMonth))&&$$_title,},$vnode_7)];$vnode_5.push(...$vnode_6);
}
$vnode_4=[$_create('tr',0,$vnode_5)];$vnode_3.push(...$vnode_4);
}
$vnode_2=[$_create('tbody',0,$vnode_3)];$vnode_1.push($_create('table',$quick_w_3_static_attr,$vnode_2));$vnode_0.push($_create('div',{'class': 'xl-aV','mx-mousedown': $_viewId+'_aU()',},$vnode_1)); 

return $_create($_viewId,0,$vnode_0); } ,
    init() {
        this.set({
            birthday: DaughterBirthday,
            weekText: weeks,
            weekStart: 0
        });
        let update = this.render.bind(this);
        Cron["_s"](update, 10 * 60 * 1000);
        this.ondestroy = () => {
            Cron["_t"](update);
        };
    },
    assign() {
        return false;
    },
    async render() {
        let now = new Date();
        let year = now.getFullYear();
        let month = now.getMonth() + 1;
        let day = now.getDate();
        let start = new Date(year, 0, 1, 0, 0, 0).getTime();
        let end = new Date(year + 1, 0, 1, 0, 0, 0).getTime();
        now.setHours(0, 0, 0, 0);
        let dayTime = 24 * 60 * 60 * 1000;
        let percent = (now.getTime() - start + dayTime) / (end - start) * 100;
        let totalDays = (end - start) / dayTime;
        let esDays = (end - now.getTime() - dayTime) / dayTime;
        let weekStart = this.get('weekStart');
        let startOffset = (7 - weekStart + new Date(year, month - 1, 1).getDay()) % 7;
        let trs = [], tds = [];
        let days = GetNumOfDays(year, month), i;
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
                    if (trs.length == 6)
                        break;
                }
            }
        }
        let mark = Magix.mark(this, '_aR');
        let { queryWorkAndHolidays, querySolarTerms } = Days;
        let [solarTerms, { workdays, holidays }] = await Promise.all([querySolarTerms(), queryWorkAndHolidays(now)]);
        if (mark()) {
            this.digest({
                year,
                holidays,
                workdays,
                solarTerms,
                month,
                day,
                days: totalDays,
                esDays,
                percent: percent.toFixed(2),
                weeks: trs
            });
        }
    },
    '_aU<mousedown>'(e) {
        let target = this.root;
        let left = parseInt(getComputedStyle(target).left);
        let top = parseInt(getComputedStyle(target).top);
        this['_d'](e, (ev) => {
            let ox = ev.pageX - e.pageX;
            let oy = ev.pageY - e.pageY;
            let newX = left + ox;
            let newY = top + oy;
            target.style.left = newX + 'px';
            target.style.top = newY + 'px';
        });
    },
});
