import Magix from './magix';
let rAF = window.requestAnimationFrame;
let Now = Date.now;
let Tasks = [];
let Workstart = 0;
let Run = () => {
    for (let i = 0; i < Tasks.length; i++) {
        let t = Tasks[i];
        if (t['@{removed}']) {
            Tasks.splice(i, 1);
            i--;
        } else if (Now() - t['@{last.time}'] >= t['@{interval}']) {
            t['@{last.time}'] = Now();
            Magix.task(t['@{task}']);
        }
    }
    if (Tasks.length) {
        rAF(Run);
    } else {
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
    '@{add.task}'(task, interval, im?: boolean) {
        Tasks.push({
            '@{task}': task,
            '@{interval}': interval,
            '@{last.time}': Now()
        });
        if (im) {
            Magix.toTry(task);
        }
        Start();
    },
    '@{remove.task}'(task) {
        for (let t of Tasks) {
            if (t['@{task}'] == task) {
                t['@{removed}'] = 1;
            }
        }
    },
    '@{update.to.now}'(task) {
        for (let t of Tasks) {
            if (t['@{task}'] == task) {
                t['@{last.time}'] = Now();
            }
        }
    }
}