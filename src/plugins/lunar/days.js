/*!1.0.5 kooboy_li@163.com*/
/*
    generate by magix-composer@1.0.5
    https://github.com/thx/magix-composer
    author: xinglie.lkf@alibaba-inc.com
    loader:module
 */

import Agent  from "../../lib/agent.js";
let solarTermReg = /<strong>([\s\S]+?)<\/strong><span>(\d+)月(\d+)日<\/span>/g;
let querySolarTerms = async () => {
    let now = new Date();
    let year = now.getFullYear();
    let next = new Date(year + 1, 0, 1);
    let result = await Agent.request(`https://jieqi.51240.com/${year}__jieqi/`, next.getTime() - now.getTime(), true);
    let dates = {};
    result.replace(solarTermReg, (_, name, month, day) => {
        dates[`${year}-${parseInt(month, 10)}-${parseInt(day, 10)}`] = name;
        return _;
    });
    return dates;
};
let trimZero = /(^|-)0/g;
let queryWorkAndHolidays = async (now) => {
    let year = now.getFullYear();
    let next = new Date(year + 1, 0, 1);
    let result = await Agent.request(`https://timor.tech/api/holiday/year/${year}`, next.getTime() - now.getTime());
    let data = JSON.parse(result);
    let workdays = {}, holidays = {};
    if (data.code == 0) {
        for (let p in data.holiday) {
            let v = data.holiday[p];
            if (v.holiday) {
                holidays[`${year}-${p.replace(trimZero, '$1')}`] = 1;
            }
            else {
                workdays[`${year}-${p.replace(trimZero, '$1')}`] = 1;
            }
        }
    }
    return {
        workdays,
        holidays
    };
};
export default {
    queryWorkAndHolidays,
    querySolarTerms
};
