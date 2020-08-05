import Magix from '../../lib/magix';
import Data from './db';
Magix.applyStyle('@:index.css');
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
    tmpl: '@:index.html',
    ctor() {
        this.set({
            uncode,
            active: 'py'
        });
    },
    assign(){
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
                } else {
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
    '@:{change.tab}<click>'(e) {
        this.set({
            active: e.params.tab
        });
        this.render();
    },
    '@:{search}<input>'(e) {
        this.set({
            search: e.eventTarget.value
        });
        clearTimeout(this['@:{search.timer}']);
        let mark = Magix.mark(this, '@:{search.key}');
        this['@:{search.timer}'] = setTimeout(() => {
            if (mark()) {
                this.render();
            }
        }, 500);
    }
});