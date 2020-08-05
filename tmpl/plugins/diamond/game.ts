/*
    author:xinglie.lkf@taobao.com
 */
'ref@:./index.css';
import Magix, { Magix5 } from '../../lib/magix';
import Dragdrop from '../../gallery/mx-dragdrop/index';
Magix.applyStyle('@:game.css');
let GameLevels = [
    [[-1, -1, 0, 0, 0, -1, -1],
    [-1, -1, 0, 1, 0, -1, -1],
    [0, 0, 1, 1, 1, 0, 0],
    [0, 0, 0, 1, 0, 0, 0],
    [0, 0, 0, 1, 0, 0, 0],
    [-1, -1, 0, 0, 0, -1, -1],
    [-1, -1, 0, 0, 0, -1, -1]],

    [[-1, -1, 0, 0, 0, -1, -1],
    [-1, -1, 0, 1, 0, -1, -1],
    [0, 0, 0, 1, 0, 0, 0],
    [0, 1, 1, 1, 1, 1, 0],
    [0, 0, 0, 1, 0, 0, 0],
    [-1, -1, 0, 1, 0, -1, -1],
    [-1, -1, 0, 0, 0, -1, -1]],

    [[-1, -1, 0, 1, 0, -1, -1],
    [-1, -1, 0, 1, 0, -1, -1],
    [0, 1, 1, 1, 1, 1, 0],
    [0, 0, 0, 1, 0, 0, 0],
    [0, 0, 0, 1, 0, 0, 0],
    [-1, -1, 1, 1, 1, -1, -1],
    [-1, -1, 1, 1, 1, -1, -1]],

    [[-1, -1, 0, 1, 0, -1, -1],
    [-1, -1, 1, 1, 1, -1, -1],
    [0, 1, 1, 1, 1, 1, 0],
    [0, 0, 0, 1, 0, 0, 0],
    [0, 0, 0, 1, 0, 0, 0],
    [-1, -1, 1, 1, 1, -1, -1],
    [-1, -1, 1, 1, 1, -1, -1]],

    [[-1, -1, 0, 0, 0, -1, -1],
    [-1, -1, 0, 0, 0, -1, -1],
    [0, 0, 0, 1, 0, 0, 0],
    [0, 0, 1, 1, 1, 0, 0],
    [0, 1, 1, 1, 1, 1, 0],
    [-1, -1, 0, 0, 0, -1, -1],
    [-1, -1, 0, 0, 0, -1, -1]],

    [[-1, -1, 0, 0, 0, -1, -1],
    [-1, -1, 0, 1, 0, -1, -1],
    [0, 0, 1, 1, 1, 0, 0],
    [0, 1, 1, 1, 1, 1, 0],
    [1, 1, 1, 1, 1, 1, 1],
    [-1, -1, 0, 0, 0, -1, -1],
    [-1, -1, 0, 0, 0, -1, -1]],

    [[-1, -1, 0, 1, 0, -1, -1],
    [-1, -1, 1, 1, 1, -1, -1],
    [0, 1, 1, 1, 1, 1, 0],
    [1, 1, 1, 1, 1, 1, 1],
    [0, 1, 1, 1, 1, 1, 0],
    [-1, -1, 1, 1, 1, -1, -1],
    [-1, -1, 0, 0, 0, -1, -1]],

    [[-1, -1, 1, 1, 1, -1, -1],
    [-1, -1, 1, 1, 1, -1, -1],
    [1, 1, 0, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1],
    [-1, -1, 1, 1, 1, -1, -1],
    [-1, -1, 1, 1, 1, -1, -1]],

    [[-1, -1, 1, 1, 1, -1, -1],
    [-1, -1, 1, 1, 1, -1, -1],
    [1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 0, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1],
    [-1, -1, 1, 1, 1, -1, -1],
    [-1, -1, 1, 1, 1, -1, -1]]
];
let GameLevelsDesc = {
    '8': '传统型',
    '7': '戴维斯跳跃',
    '6': '五边形',
    '5': '大金字塔',
    '4': '金字塔',
    '3': '台灯',
    '2': '古字形',
    '1': '大十字',
    '0': '十字架'
};
let GameLevelsChar = '一二三四五六七八九'.split('');
let GameResultLevel = {
    5: '颇好',
    4: '很好',
    3: '聪明',
    2: '尖子',
    1: '大师'
};

let StartResult = `鼠标拖动任意青蛙开始，拖动过程中会有相应的提示<br/>您需要拖动青蛙跳过其它青蛙，跳过的被吃掉，剩余青蛙越少越好<br/>当只剩一个青蛙，且在正中位置时，则是最终的胜利`;
let PlayResult = `游戏结束，没有可以移动的青蛙了～<br/>您的成绩是：{score}<br/>单击上下一关或重新开始新的游戏`;
export default Magix.View.extend({
    tmpl: '@:game.html',
    init() {
        this['@:{level}'] = 0;
        this.set({
            result: StartResult
        });
    },
    render() {
        let me = this;
        let level = me['@:{level}'];
        let map = GameLevels[level];
        let cloned = [];
        for (let i = 0; i < map.length; i++) {
            cloned.push(map[i].slice());
        }
        me['@:{map}'] = cloned;
        me.digest({
            size: cloned,
            desc: GameLevelsDesc[level],
            tip: '第' + GameLevelsChar[level] + '关'
        })
    },
    '{change.level}'(toNext) {
        let total = GameLevels.length - 1,
            me = this,
            set;
        if (toNext) {
            if (me['@:{level}'] < total) {
                me['@:{level}']++;
                set = 1;
            }
        } else {
            if (me['@:{level}'] > 0) {
                me['@:{level}']--;
                set = 1;
            }
        }
        if (set) {
            me.render();
        }
    },
    '@:{is.over.or.pass}'() {
        let t = this,
            map = t['@:{map}'],
            result = {},
            chess = 0,
            isEnd = true;
        for (let i = 0, j = map.length, toy = j - 2; i < j; i++) {
            for (let a = 0, b = map[i].length, tox = b - 2; a < b; a++) {
                if (map[i][a] != -1) {
                    if (map[i][a]) chess++;
                    if (i < toy) {
                        if (a < tox) {
                            if (map[i][a] == 1) {
                                if (map[i][a + 1] == 1 && map[i][a + 2] === 0) {
                                    isEnd = false;
                                    break;
                                } else if (map[i + 1][a] == 1 && map[i + 2][a] === 0) {
                                    isEnd = false;
                                    break;
                                }
                            } else if (map[i][a] === 0) {
                                if (map[i][a + 1] == 1 && map[i][a + 2] == 1) {
                                    isEnd = false;
                                    break;
                                } else if (map[i + 1][a] == 1 && map[i + 2][a] == 1) {
                                    isEnd = false;
                                    break;
                                }
                            }
                        } else {
                            if (map[i][a] == 1) {
                                if (map[i + 1][a] == 1 && map[i + 2][a] === 0) {
                                    isEnd = false;
                                    break;
                                }
                            } else if (map[i][a] === 0) {
                                if (map[i + 1][a] == 1 && map[i + 2][a] == 1) {
                                    isEnd = false;
                                    break;
                                }
                            }
                        }
                    } else {
                        if (map[i][a] == 1) {
                            if (map[i][a + 1] == 1 && map[i][a + 2] === 0) {
                                isEnd = false;
                                break;
                            }
                        } else if (map[i][a] === 0) {
                            if (map[i][a + 1] == 1 && map[i][a + 2] == 1) {
                                isEnd = false;
                                break;
                            }
                        }
                    }
                }
            }
            if (!isEnd) break;
        }
        result['@:{is.over}'] = isEnd;
        result['@:{is.pass}'] = (isEnd && chess == 1 && map[3][3] == 1);
        result['@:{chess.count}'] = chess;
        return result;
    },
    '@:{find.drag.drop}'(pos, igr) {
        let result = null;
        let me = this;
        let node = me.root;
        let offset = node.getBoundingClientRect();
        let tx = pos.x - offset.left;
        let ty = pos.y - offset.top;
        let cdx = (tx / 60) | 0;
        let cdy = (ty / 60) | 0;
        let map = me['@:{map}'];
        if ((cdx < map[0].length &&
            cdy < map.length) &&
            (!igr || igr.x != cdx || igr.y != cdy)) {
            result = {
                x: cdx,
                y: cdy
            };
        }
        return result;
    },
    '@:{find.eat.list}'(startPos, endPos) {
        let me = this,
            result = {
                can: false,
                eatList: []
            },
            flag = true,
            tempList = [],
            bad = false;
        let map = me['@:{map}'];
        if (map[endPos.y][endPos.x]) return result;
        startPos = {
            x: startPos.x,
            y: startPos.y
        };
        if (startPos.y == endPos.y) {
            while (startPos.x != endPos.x) {
                if (endPos.x > startPos.x) startPos.x++;
                else startPos.x--;
                if (flag) {
                    if (map[startPos.y][startPos.x] == 1) {
                        tempList.push({
                            x: startPos.x,
                            y: startPos.y
                        });
                        flag = false;
                    } else {
                        bad = true;
                        break;
                    }
                } else if (startPos.x != endPos.x) {
                    if (map[startPos.y][startPos.x] === 0) {
                        flag = true;
                    } else {
                        bad = true;
                        break;
                    }
                }
            }
            if (!bad) {
                result.can = true;
                result.eatList = tempList;
            }
        } else if (startPos.x == endPos.x) {
            while (startPos.y != endPos.y) {
                if (endPos.y > startPos.y) startPos.y++;
                else startPos.y--;
                if (flag) {
                    if (map[startPos.y][startPos.x] == 1) {
                        tempList.push({
                            x: startPos.x,
                            y: startPos.y
                        });
                        flag = false;
                    } else {
                        bad = true;
                        break;
                    }
                } else if (startPos.y != endPos.y) {
                    if (map[startPos.y][startPos.x] === 0) {
                        flag = true;
                    } else {
                        bad = true;
                        break;
                    }
                }
            }
            if (!bad) {
                result.can = true;
                result.eatList = tempList;
            }
        }
        return result;
    },
    '@:{drag.it}<mousedown>'(e: Magix5.MagixMouseEvent) {
        let me = this;
        let target = e.eventTarget;
        let offset = target.getBoundingClientRect();
        let active = Magix.node(this.id + '_active');
        let rootOffset = me.root.getBoundingClientRect();
        target.style.visibility = 'hidden';
        let initX = offset.left - rootOffset.left,
            initY = offset.top - rootOffset.top;
        active.style.left = initX + 'px';
        active.style.top = initY + 'px';
        let currentX, currentY;
        let dragCDX = target.getAttribute('x');
        let dragCDY = target.getAttribute('y');
        let dragPos = {
            x: dragCDX,
            y: dragCDY
        };
        let lastNode, lastPos;
        this['@:{drag.drop}'](e, (ev: MouseEvent) => {
            ev.preventDefault();
            currentX = ev.pageX - e.pageX + initX;
            currentY = ev.pageY - e.pageY + initY;
            active.style.left = currentX + 'px';
            active.style.top = currentY + 'px';

            let p = me['@:{find.drag.drop}']({
                x: ev.pageX,
                y: ev.pageY
            }, dragPos);
            let r = p != lastPos;
            if (p && lastPos) {
                r = p.x != lastPos.x || p.y != lastPos.y;
            }
            if (r) {
                lastPos = p;
                if (lastNode) {
                    lastNode.style.opacity = 1;
                    lastNode.classList.remove('@:./game.css:succ');
                    lastNode.classList.remove('@:./game.css:fail');
                }
                if (p) {
                    lastNode = Magix.node('main_' + p.x + '_' + p.y);
                    if (lastNode) {
                        lastNode.style.opacity = 0.7;
                        let s = me['@:{find.eat.list}'](dragPos, p);
                        if (s.can) {
                            lastNode.classList.add('@:./game.css:succ');
                        } else {
                            lastNode.classList.add('@:./game.css:fail');
                        }
                    }
                }
            }
        }, (ev: MouseEvent) => {
            let pos = me['@:{find.drag.drop}']({
                x: ev.pageX,
                y: ev.pageY
            }, dragPos), refresh = false;
            if (pos) {
                let s = me['@:{find.eat.list}'](dragPos, pos);
                if (s.can) {
                    let map = me['@:{map}'];
                    map[dragPos.y][dragPos.x] = 0;
                    map[pos.y][pos.x] = 1;
                    for (let i = 0, j = s.eatList.length, item; i < j; i++) {
                        item = s.eatList[i];
                        map[item.y][item.x] = 0;
                    }
                    s = me['@:{is.over.or.pass}']();
                    if (s['@:{is.over}']) {
                        let score;
                        if (s['@:{is.pass}']) {
                            score = '天才！';
                        } else if (GameResultLevel[s['@:{chess.count}']]) {
                            score = GameResultLevel[s['@:{chess.count}']] + '，还有' + s['@:{chess.count}'] + '个青蛙';
                        } else {
                            score = '一般' + '，还有' + s['@:{chess.count}'] + '个青蛙';
                        }
                        this.set({
                            result: PlayResult.replace('{score}', score)
                        });
                    }
                    refresh = true;
                } else {
                    target.style.visibility = 'visible';
                }
            } else {
                target.style.visibility = 'visible';
            }
            active.style.left = '-10000px';
            if (lastNode) {
                lastNode.style.opacity = 1;
                lastNode.classList.remove('@:./game.css:succ');
                lastNode.classList.remove('@:./game.css:fail');
            }
            if (refresh) {
                this.digest({
                    size: this['@:{map}']
                });
            }
        });
    },
    '@:{next}<click>': function () {
        this['{change.level}'](true);
    },
    '@:{prev}<click>': function () {
        this['{change.level}']();
    },
    '@:{restart}<click>': function () {
        this.render();
    }
}).merge(Dragdrop);