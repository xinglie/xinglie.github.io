/*!1.0.5 kooboy_li@163.com*/
/*
    generate by magix-composer@1.0.5
    https://github.com/thx/magix-composer
    author: xinglie.lkf@alibaba-inc.com
    loader:module
 */
let $quick_q_1_static_node;
let $quick_q_0_static_attr={'cellpadding': '0','cellspacing': '1','class': 'xl-aB',};
let $quick_q_2_static_attr={'colspan': '20','class': 'xl-aN',};
let $quick_q_3_static_attr={'class': 'xl-aI',};
/*
    author:xinglie.lkf@taobao.com
 */

import Magix  from "../../lib/magix.js";
import Dragdrop  from "../../gallery/mx-dragdrop/index.js";
Magix.applyStyle("xl-k","[mx-view^=\"~xl/plugins/diamond/game\"]{padding:5px}.xl-aB{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.xl-aC{text-align:center;width:60px;height:60px}.xl-aD{background:url(//img.alicdn.com/tfs/TB1B3EYXkH0gK0jSZPiXXavapXa-60-60.jpg) no-repeat}.xl-aE{display:inline-block;width:40px;height:40px}.xl-aF{background:url(//img.alicdn.com/tfs/TB1KawWXeL2gK0jSZFmXXc7iXXa-40-40.gif) no-repeat}.xl-aG{background:url(//img.alicdn.com/tfs/TB1mJoTXa67gK0jSZFHXXa9jVXa-40-40.gif) no-repeat;position:absolute;left:-100000px}.xl-aH{left:320px;top:395px;width:112px}.xl-aI,.xl-aH{position:absolute;height:22px}.xl-aI{left:350px;top:45px}.xl-aJ{left:320px}.xl-aK,.xl-aJ{position:absolute;top:340px;height:22px}.xl-aK{left:384px}.xl-aL:before{content:\"√\";color:green;font-weight:700}.xl-aM:before,.xl-aL:before{position:absolute;top:0;right:3px}.xl-aM:before{content:\"x\";color:red}.xl-aM,.xl-aL{position:relative}.xl-aN{font-size:12px;padding:5px 6px}");
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
    tmpl: ($$, $_create,$_viewId,$n)=> { 
let $_temp,$vnode_0=[],
{
	size,
	result,
	tip,
	desc,
	id,}=$$,
$vnode_1,
$vnode_2,
$vnode_3,
$vnode_4,
$vnode_5,
$vnode_6,
$vnode_7,
$vnode_8,
$text
$vnode_2=[];
for(let i=0,j=size.length;i<j;i++){
$vnode_4=[];
for(let a=0,b=size[i].length;a<b;a++){
$vnode_5=[];
if(size[i][a]!=-1){
$vnode_7=[];
if(size[i][a]===1){

$vnode_8=[$_create('span',{'class': 'xl-aE xl-aF','x': $n(a),'y': $n(i),'mx-mousedown': $_viewId+'_aG()',})];$vnode_7.push(...$vnode_8);
}
$vnode_6=[$_create('td',{'class': 'xl-aC xl-aD','id': 'main_'+$n(a)+'_'+$n(i),},$vnode_7)];$vnode_5.push(...$vnode_6);
}else{

if($quick_q_1_static_node){
$vnode_6=[$quick_q_1_static_node];
}else{

$vnode_6=[$quick_q_1_static_node=$_create('td',{'_': '_','class': 'xl-aC',})];
}
$vnode_5.push(...$vnode_6);
}$vnode_4.push(...$vnode_5);
}
$vnode_3=[$_create('tr',0,$vnode_4)];$vnode_2.push(...$vnode_3);
}$vnode_4=[$_create(0,1,$n(result))];
$vnode_3=[$_create('td',$quick_q_2_static_attr,$vnode_4)];$vnode_2.push($_create('tr',0,$vnode_3));
$vnode_1=[$_create('tbody',0,$vnode_2)];$vnode_0.push($_create('table',$quick_q_0_static_attr,$vnode_1));$vnode_2=[$_create(0,0,$n(tip))];
$vnode_1=[$_create('div',0,$vnode_2)];$vnode_2=[$_create(0,0,$n(desc))];$vnode_1.push($_create('div',0,$vnode_2));$vnode_0.push($_create('div',$quick_q_3_static_attr,$vnode_1),$_create('span',{'class': 'xl-aE xl-aG','id': $n(id)+'_active',}));$vnode_1=[$_create(0,0,'上一关')];$vnode_0.push($_create('button',{'_': 'a','class': 'xl-aw xl-aJ','mx-click': $_viewId+'_aI()',},$vnode_1));$vnode_1=[$_create(0,0,'下一关')];$vnode_0.push($_create('button',{'_': 'b','class': 'xl-aw xl-aK','mx-click': $_viewId+'_aH()',},$vnode_1));$vnode_1=[$_create(0,0,'重新开始')];$vnode_0.push($_create('button',{'_': 'c','class': 'xl-aH xl-aw','mx-click': $_viewId+'_aJ()',},$vnode_1)); 

return $_create($_viewId,0,$vnode_0); } ,
    mixins: [Dragdrop],
    init() {
        this['_ay'] = 0;
        this.set({
            result: StartResult
        });
    },
    render() {
        let me = this;
        let level = me['_ay'];
        let map = GameLevels[level];
        let cloned = [];
        for (let i = 0; i < map.length; i++) {
            cloned.push(map[i].slice());
        }
        me['_az'] = cloned;
        me.digest({
            size: cloned,
            desc: GameLevelsDesc[level],
            tip: '第' + GameLevelsChar[level] + '关'
        });
    },
    '{change.level}'(toNext) {
        let total = GameLevels.length - 1, me = this, set;
        if (toNext) {
            if (me['_ay'] < total) {
                me['_ay']++;
                set = 1;
            }
        }
        else {
            if (me['_ay'] > 0) {
                me['_ay']--;
                set = 1;
            }
        }
        if (set) {
            me.render();
        }
    },
    '_aD'() {
        let t = this, map = t['_az'], result = {}, chess = 0, isEnd = true;
        for (let i = 0, j = map.length, toy = j - 2; i < j; i++) {
            for (let a = 0, b = map[i].length, tox = b - 2; a < b; a++) {
                if (map[i][a] != -1) {
                    if (map[i][a])
                        chess++;
                    if (i < toy) {
                        if (a < tox) {
                            if (map[i][a] == 1) {
                                if (map[i][a + 1] == 1 && map[i][a + 2] === 0) {
                                    isEnd = false;
                                    break;
                                }
                                else if (map[i + 1][a] == 1 && map[i + 2][a] === 0) {
                                    isEnd = false;
                                    break;
                                }
                            }
                            else if (map[i][a] === 0) {
                                if (map[i][a + 1] == 1 && map[i][a + 2] == 1) {
                                    isEnd = false;
                                    break;
                                }
                                else if (map[i + 1][a] == 1 && map[i + 2][a] == 1) {
                                    isEnd = false;
                                    break;
                                }
                            }
                        }
                        else {
                            if (map[i][a] == 1) {
                                if (map[i + 1][a] == 1 && map[i + 2][a] === 0) {
                                    isEnd = false;
                                    break;
                                }
                            }
                            else if (map[i][a] === 0) {
                                if (map[i + 1][a] == 1 && map[i + 2][a] == 1) {
                                    isEnd = false;
                                    break;
                                }
                            }
                        }
                    }
                    else {
                        if (map[i][a] == 1) {
                            if (map[i][a + 1] == 1 && map[i][a + 2] === 0) {
                                isEnd = false;
                                break;
                            }
                        }
                        else if (map[i][a] === 0) {
                            if (map[i][a + 1] == 1 && map[i][a + 2] == 1) {
                                isEnd = false;
                                break;
                            }
                        }
                    }
                }
            }
            if (!isEnd)
                break;
        }
        result['_aA'] = isEnd;
        result['_aB'] = (isEnd && chess == 1 && map[3][3] == 1);
        result['_aC'] = chess;
        return result;
    },
    '_aE'(pos, igr) {
        let result = null;
        let me = this;
        let node = me.root;
        let offset = node.getBoundingClientRect();
        let tx = pos.x - offset.left;
        let ty = pos.y - offset.top;
        let cdx = (tx / 60) | 0;
        let cdy = (ty / 60) | 0;
        let map = me['_az'];
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
    '_aF'(startPos, endPos) {
        let me = this, result = {
            can: false,
            eatList: []
        }, flag = true, tempList = [], bad = false;
        let map = me['_az'];
        if (map[endPos.y][endPos.x])
            return result;
        startPos = {
            x: startPos.x,
            y: startPos.y
        };
        if (startPos.y == endPos.y) {
            while (startPos.x != endPos.x) {
                if (endPos.x > startPos.x)
                    startPos.x++;
                else
                    startPos.x--;
                if (flag) {
                    if (map[startPos.y][startPos.x] == 1) {
                        tempList.push({
                            x: startPos.x,
                            y: startPos.y
                        });
                        flag = false;
                    }
                    else {
                        bad = true;
                        break;
                    }
                }
                else if (startPos.x != endPos.x) {
                    if (map[startPos.y][startPos.x] === 0) {
                        flag = true;
                    }
                    else {
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
        else if (startPos.x == endPos.x) {
            while (startPos.y != endPos.y) {
                if (endPos.y > startPos.y)
                    startPos.y++;
                else
                    startPos.y--;
                if (flag) {
                    if (map[startPos.y][startPos.x] == 1) {
                        tempList.push({
                            x: startPos.x,
                            y: startPos.y
                        });
                        flag = false;
                    }
                    else {
                        bad = true;
                        break;
                    }
                }
                else if (startPos.y != endPos.y) {
                    if (map[startPos.y][startPos.x] === 0) {
                        flag = true;
                    }
                    else {
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
    '_aG<mousedown>'(e) {
        let me = this;
        let target = e.eventTarget;
        let offset = target.getBoundingClientRect();
        let active = Magix.node(this.id + '_active');
        let rootOffset = me.root.getBoundingClientRect();
        target.style.visibility = 'hidden';
        let initX = offset.left - rootOffset.left, initY = offset.top - rootOffset.top;
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
        this['_d'](e, (ev) => {
            ev.preventDefault();
            currentX = ev.pageX - e.pageX + initX;
            currentY = ev.pageY - e.pageY + initY;
            active.style.left = currentX + 'px';
            active.style.top = currentY + 'px';
            let p = me['_aE']({
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
                    lastNode.classList.remove('xl-aL');
                    lastNode.classList.remove('xl-aM');
                }
                if (p) {
                    lastNode = Magix.node('main_' + p.x + '_' + p.y);
                    if (lastNode) {
                        lastNode.style.opacity = 0.7;
                        let s = me['_aF'](dragPos, p);
                        if (s.can) {
                            lastNode.classList.add('xl-aL');
                        }
                        else {
                            lastNode.classList.add('xl-aM');
                        }
                    }
                }
            }
        }, (ev) => {
            let pos = me['_aE']({
                x: ev.pageX,
                y: ev.pageY
            }, dragPos), refresh = false;
            if (pos) {
                let s = me['_aF'](dragPos, pos);
                if (s.can) {
                    let map = me['_az'];
                    map[dragPos.y][dragPos.x] = 0;
                    map[pos.y][pos.x] = 1;
                    for (let i = 0, j = s.eatList.length, item; i < j; i++) {
                        item = s.eatList[i];
                        map[item.y][item.x] = 0;
                    }
                    s = me['_aD']();
                    if (s['_aA']) {
                        let score;
                        if (s['_aB']) {
                            score = '天才！';
                        }
                        else if (GameResultLevel[s['_aC']]) {
                            score = GameResultLevel[s['_aC']] + '，还有' + s['_aC'] + '个青蛙';
                        }
                        else {
                            score = '一般' + '，还有' + s['_aC'] + '个青蛙';
                        }
                        this.set({
                            result: PlayResult.replace('{score}', score)
                        });
                    }
                    refresh = true;
                }
                else {
                    target.style.visibility = 'visible';
                }
            }
            else {
                target.style.visibility = 'visible';
            }
            active.style.left = '-10000px';
            if (lastNode) {
                lastNode.style.opacity = 1;
                lastNode.classList.remove('xl-aL');
                lastNode.classList.remove('xl-aM');
            }
            if (refresh) {
                this.digest({
                    size: this['_az']
                });
            }
        });
    },
    '_aH<click>': function () {
        this['{change.level}'](true);
    },
    '_aI<click>': function () {
        this['{change.level}']();
    },
    '_aJ<click>': function () {
        this.render();
    }
});
