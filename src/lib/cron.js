/*!1.0.5 kooboy_li@163.com*/
/*
    generate by magix-composer@1.0.5
    https://github.com/thx/magix-composer
    author: xinglie.lkf@alibaba-inc.com
    loader:module
 */

import Magix  from "./magix.js";
let rAF = window.requestAnimationFrame;
let Now = Date.now;
let Tasks = [];
let Workstart = 0;
let Run = () => {
    for (let i = 0; i < Tasks.length; i++) {
        let t = Tasks[i];
        if (t['_n']) {
            Tasks.splice(i, 1);
            i--;
        }
        else if (Now() - t['_o'] >= t['_p']) {
            t['_o'] = Now();
            //Magix.toTry(t['@{task}']);
            Magix.task(t['_q'], null, null, t['_r']);
        }
    }
    if (Tasks.length) {
        rAF(Run);
    }
    else {
        Workstart = 0;
    }
};
let Start = () => {
    if (!Workstart) {
        Workstart = 1;
        rAF(Run);
    }
};
export default {
    '_s'(task, interval, im, id) {
        Tasks.push({
            '_q': task,
            '_p': interval,
            '_o': Now(),
            '_r': id
        });
        if (im) {
            Magix.toTry(task);
        }
        Start();
    },
    '_t'(task) {
        for (let t of Tasks) {
            if (t['_q'] == task) {
                t['_n'] = 1;
            }
        }
    },
    '_u'(task) {
        for (let t of Tasks) {
            if (t['_q'] == task) {
                t['_o'] = Now();
            }
        }
    }
};
