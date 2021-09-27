/*
    author:https://github.com/xinglie
*/
import Magix, { Magix5 } from '../../lib/magix';
import List from './vip';
Magix.applyStyle('@:index.less');
let Tabs = [/*{
    name: '随机推荐',
    id: 'dyfm',
    view: '@:./dyfm'
},*/ {
        name: '搜视网',
        id: 'tvsou',
        view: '@:./tvsou'
    }, {
        name: '全视频',
        id: 'qsp',
        view: '@:./qsp'
    }, {
        name: '80s手机电影',
        id: '80s',
        view: '@:./80s'
    }];
export default Magix.View.extend({
    tmpl: '@:index.html',
    init(data) {
        this.assign(data);
        this.set({
            tabs: Tabs,
            active: '',
            si: 0,
            url: ''
        });
    },
    assign(data) {
        this.set(data);
        return true;
    },
    render() {
        this.digest({
            list: List
        });
    },
    '@:{update}<change>'(e: Magix5.MagixMouseEvent) {
        let target = e.eventTarget as HTMLSelectElement;
        let si = target.selectedIndex;
        this.set({
            si
        });
    },
    '@:{update.input}<change>'(e) {
        let target = e.eventTarget as HTMLInputElement;
        let url = target.value;
        this.set({
            url
        });
    },
    '@:{play}<click>'() {
        this.digest({
            played: true
        });
    },
    '@:{change.category}<click>'(e) {
        this.digest({
            active: e.params.id
        });
    }
});