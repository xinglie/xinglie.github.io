/*!1.0.5 kooboy_li@163.com*/
/*
    generate by magix-composer@1.0.5
    https://github.com/thx/magix-composer
    author: xinglie.lkf@alibaba-inc.com
    loader:module
 */
let $quick_l_4_static_node;
let $quick_l_0_static_attr={'class': 'xl-ad',};
let $quick_l_1_static_attr={'class': 'xl-aa',};
let $quick_l_2_static_attr={'class': 'xl-ae',};
let $quick_l_3_static_attr={'class': 'xl-af',};
let $quick_l_5_static_attr={'class': 'xl-ai',};
let $special_2={'value':'value',};
import Magix  from "../../lib/magix.js";
import Data  from "./db.js";
Magix.applyStyle("xl-g",".xl-a_{-webkit-box-flex:0.3;flex:0.3;padding:3px 4px;height:30px;font-size:16px;box-sizing:border-box;box-shadow:none;border:1px solid #ccc;background-color:#fff;vertical-align:middle;width:100%;outline:none}.xl-aa{-webkit-box-flex:0.6;flex:0.6}.xl-ab{float:left;padding:0 8px;cursor:pointer}.xl-ac{background:#fafafa;color:#000}.xl-ad{background:#f96447;height:40px;line-height:40px;color:#fff;padding:0 10px;font-size:16px;display:-webkit-box;display:flex;-webkit-box-align:center;align-items:center}.xl-ae{background:#fafafa;color:#333;height:28px;line-height:28px;position:-webkit-sticky;position:sticky;top:0;font-weight:700}.xl-ae,.xl-af{padding:0 26px}.xl-ag{padding:5px 0}.xl-ah{border-bottom:1px solid #f3f3f3}.xl-ai{position:-webkit-sticky;position:sticky;bottom:0;height:30px;background:#fafafa;line-height:30px}.xl-aj,.xl-ai{padding:0 26px}.xl-aj{font-size:16px;height:50px;line-height:50px}.xl-ak{text-decoration:none;margin-right:10px}.xl-ak:hover{text-decoration:underline}");
let Sort = (a, b) => a.py.localeCompare(b.py);
let Tabs = [{
        name: '书名',
        key: 'py'
    }, {
        name: '作者',
        key: 'apy'
    }, {
        name: '出版',
        key: 'ppy'
    }];
let Displays = {
    py: ['title', 'category', 'author', 'translater', 'publisher'],
    apy: ['author', 'category', 'title', 'translater', 'publisher'],
    cpy: ['category', 'title', 'author', 'translater', 'publisher'],
    ppy: ['publisher', 'category', 'title', 'author', 'translater']
};
let Searches = {
    py: ['py', 'title'],
    apy: ['apy', 'author'],
    cpy: ['cpy', 'category'],
    ppy: ['ppy', 'publisher']
};
let IdMap = {
    title: '书名',
    category: '大类',
    author: '作者',
    translater: '翻译',
    publisher: '出版'
};
let uncode = book => {
    return book.title.replace(/-/g, ' ') + ' ' + book.author;
};
// let encode = book => {
//     return encodeURIComponent(uncode(book));
// };
export default Magix.View.extend({
    tmpl: ($$, $_create,$_viewId,$n,$eu,$_ref,$i,$eq)=> { 
let $_temp,$vnode_0=[],
{
	tabs,
	active,
	search,
	list,
	displays,
	keyMap,
	uncode,
	total,}=$$,
$vnode_1,
$vnode_2,
$vnode_3,
$$_class,
$vnode_4,
$text,
$vnode_5,
$vnode_6,
$vnode_7,
$vnode_8,
$vnode_9
$vnode_2=[];
for(let $q_c_vxcgrwk=tabs.length,$q_key_magzuw=0;$q_key_magzuw<$q_c_vxcgrwk;$q_key_magzuw++){
let tab=tabs[$q_key_magzuw];
$vnode_4=[$_create(0,0,$n(tab.name))];;$$_class='xl-ab';if(tab.key==active){;$$_class+=' xl-ac';};
$vnode_3=[$_create('li',{'mx-click': ((tab.key!=active))&&($_viewId+'_as({tab:\''+($eq(tab.key))+'\'})'),'class': $$_class,},$vnode_4)];$vnode_2.push(...$vnode_3);
}
$vnode_1=[$_create('ul',$quick_l_1_static_attr,$vnode_2),$_create('input',{'class': 'xl-a_','placeholder': '搜索','mx-input': $_viewId+'_av()','value': $n(search),},0,$special_2,1)];$vnode_0.push($_create('div',$quick_l_0_static_attr,$vnode_1));let current=0;;;
if(list.length){
$vnode_1=[];
for(let $q_c_pwujecnd=list.length,$q_key_faqkvr=0;$q_key_faqkvr<$q_c_pwujecnd;$q_key_faqkvr++){
let g=list[$q_key_faqkvr];
$vnode_4=[$_create(0,0,$n(g.letter))];
$vnode_3=[$_create('div',$quick_l_2_static_attr,$vnode_4)];$vnode_4=[];
for(let $q_a_cspwpsqnz=g.books,$q_c_rlatvfx=$q_a_cspwpsqnz.length,$q_lc_pfpujfisz=$q_c_rlatvfx-1,i=0;i<$q_c_rlatvfx;i++){
let book=$q_a_cspwpsqnz[i];let last=i===$q_lc_pfpujfisz;
$vnode_6=[];current++;
for(let $q_c_wygxp=displays.length,$q_key_dqqxmer=0;$q_key_dqqxmer<$q_c_wygxp;$q_key_dqqxmer++){
let d=displays[$q_key_dqqxmer];
$vnode_7=[];
if(book[d]){
$vnode_9=[$_create(0,0,$n(keyMap[d])+'：'+$n(book[d]))];
$vnode_8=[$_create('div',0,$vnode_9)];$vnode_7.push(...$vnode_8);
}$vnode_6.push(...$vnode_7);
}$vnode_7=[$_create(0,0,'搜索：')];$vnode_8=[$_create(0,0,'百度')];$vnode_7.push($_create('a',{'class': 'xl-ak','href': '//www.baidu.com/s?wd='+($eu(uncode(book))),'target': '_blank','rel': 'noopener noreferrer',},$vnode_8));$vnode_8=[$_create(0,0,'淘宝')];$vnode_7.push($_create('a',{'class': 'xl-ak','href': '//s.taobao.com/search?q='+($eu(uncode(book))),'target': '_blank','rel': 'noopener noreferrer',},$vnode_8));$vnode_8=[$_create(0,0,'天猫')];$vnode_7.push($_create('a',{'class': 'xl-ak','href': '//list.tmall.com/search_product.htm?q='+($eu(uncode(book))),'target': '_blank','rel': 'noopener noreferrer',},$vnode_8));$vnode_8=[$_create(0,0,'京东')];$vnode_7.push($_create('a',{'class': 'xl-ak','href': '//search.jd.com/Search?keyword='+($eu(uncode(book)))+'&enc=utf-8&wq='+($eu(uncode(book))),'target': '_blank','rel': 'noopener noreferrer',},$vnode_8));$vnode_8=[$_create(0,0,'当当')];$vnode_7.push($_create('a',{'class': 'xl-ak','href': 'http://search.dangdang.com/?key='+($eu(uncode(book))),'target': '_blank','rel': 'noopener noreferrer',},$vnode_8));$vnode_8=[$_create(0,0,'豆瓣')];$vnode_7.push($_create('a',{'class': 'xl-ak','href': '//www.douban.com/search?cat=1001&q='+($eu(uncode(book))),'target': '_blank','rel': 'noopener noreferrer',},$vnode_8));$vnode_6.push($_create('div',0,$vnode_7));;$$_class='xl-ag';if(!last){;$$_class+=' xl-ah';};
$vnode_5=[$_create('li',{'class': $$_class,},$vnode_6)];$vnode_4.push(...$vnode_5);
}$vnode_3.push($_create('ul',$quick_l_3_static_attr,$vnode_4));
$vnode_2=[$_create('div',0,$vnode_3)];$vnode_1.push(...$vnode_2);
}$vnode_0.push(...$vnode_1);
}else{

if($quick_l_4_static_node){
$vnode_1=[$quick_l_4_static_node];
}else{
$vnode_2=[$_create(0,0,'暂无相关书籍')];
$vnode_1=[$quick_l_4_static_node=$_create('div',{'_': '_','class': 'xl-aj',},$vnode_2)];
}
$vnode_0.push(...$vnode_1);
}$vnode_1=[$_create(0,0,'共'+$n(total)+'本，当前列表有')];$vnode_2=[$_create(0,0,$n(current))];$vnode_1.push($_create('span',0,$vnode_2),$_create(0,0,'本'));$vnode_0.push($_create('div',$quick_l_5_static_attr,$vnode_1)); 

return $_create($_viewId,0,$vnode_0); } ,
    ctor() {
        this.set({
            uncode,
            active: 'py'
        });
    },
    assign() {
        return false;
    },
    render() {
        let list = [];
        let map = {};
        let key = this.get('active');
        let search = this.get('search');
        for (let book of Data) {
            if (book[key]) {
                let first = book[key][0].toLowerCase();
                if (search) {
                    let searched = false;
                    let searchList = Searches[key];
                    for (let s of searchList) {
                        if (book[s].indexOf(search) > -1) {
                            searched = true;
                            BarProp;
                        }
                    }
                    if (searched) {
                        if (!map[first]) {
                            map[first] = [];
                        }
                        map[first].push(book);
                    }
                }
                else {
                    if (!map[first]) {
                        map[first] = [];
                    }
                    map[first].push(book);
                }
            }
        }
        for (let i = 48, c, e; i < 123; i++) {
            c = String.fromCharCode(i);
            e = map[c];
            if (e) {
                e = e.sort(Sort);
                list.push({
                    letter: c.toUpperCase(),
                    books: e
                });
            }
        }
        console.log(list);
        this.digest({
            total: Data.length,
            tabs: Tabs,
            list,
            displays: Displays[key],
            keyMap: IdMap
        });
    },
    '_as<click>'(e) {
        this.set({
            active: e.params.tab
        });
        this.render();
    },
    '_av<input>'(e) {
        this.set({
            search: e.eventTarget.value
        });
        clearTimeout(this['_at']);
        let mark = Magix.mark(this, '_au');
        this['_at'] = setTimeout(() => {
            if (mark()) {
                this.render();
            }
        }, 500);
    }
});
