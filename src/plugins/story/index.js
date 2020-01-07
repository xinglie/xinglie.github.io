/*!1.0.5 kooboy_li@163.com*/
/*
    generate by magix-composer@1.0.5
    https://github.com/thx/magix-composer
    author: xinglie.lkf@alibaba-inc.com
    loader:module
 */
let $quick_G_0_static_attr={'class': 'xl-ca',};
/*
    author:xinglie.lkf@alibaba-inc.com
*/
import Magix  from "../../lib/magix.js";
import Agent  from "../../lib/agent.js";
import DialogCtrl  from "../../os/ctrl.js";
Magix.applyStyle("xl-p",".xl-ca{height:28px;line-height:28px;padding:0 26px;background:#ddd;color:#333;position:-webkit-sticky;position:sticky;top:0}.xl-cb{float:left;padding:0 5px;cursor:pointer}.xl-cc{background:#fff}.xl-cd{margin:8px;border-radius:4px;background:#fafafa;padding:3px 10px;cursor:pointer;float:left}.xl-cd:hover{background:#e6e6e6}.xl-ce{padding:10px;overflow:scroll;box-sizing:border-box;height:100%}.xl-cf{font-weight:700;font-size:16px;padding:3px 10px;background:#f5f5f5}.xl-cg{padding:3px 30px;height:30px;line-height:30px;cursor:pointer}.xl-cg:hover{background:#fafafa}.xl-ch{-webkit-filter:blur(10px);filter:blur(10px)}.xl-ci{position:absolute;left:0;right:0;bottom:0;top:100%;background:rgba(0,0,0,.73);color:#fff;padding:10px;word-break:break-all;-webkit-transition:all .25s;transition:all .25s}.xl-cj{top:0}.xl-ck{position:absolute;right:6px;top:6px;width:30px;height:30px;cursor:pointer}.xl-ck:hover{opacity:.6}.xl-cl{height:100%;overflow:scroll}.xl-cm{font-size:16px}");
let extractBooksRegexp = /<h1\s+class="tcleft title">([\s\S]+?)<\/h1>\s*<table class='booklist'>([\S\s]+?)<\/table>/g;
let extractTitleReg = /《([^》]+)》/;
let extractListReg = /<td class="time"><a href="([^"]+)" target="_blank">([\s\S]+?)<\/a><\/td>/g;
let base = 'https://www.92gushi.com/';
let GetCatetoriesAndList = async () => {
    let result = await Agent.request(base, 24 * 60 * 60 * 1000, true, 'gb2312');
    let books = [];
    result.replace(extractBooksRegexp, (_, titleContent, listContent) => {
        let title = '';
        let links = [];
        titleContent.replace(extractTitleReg, (_, t) => title = t);
        listContent.replace(extractListReg, (_, link, text) => {
            links.push({
                link: base + link,
                text
            });
            return _;
        });
        books.push({
            id: Magix.guid('b_'),
            title,
            links
        });
        return _;
    });
    return books;
};
let Options = {
    icon: '<svg viewBox="0 0 1024 1024"><path fill="#ed6d00" d="M1012 262.3v-58.9h-32.5v616.8c-150.7 24.5-288.3 46.7-424.6 68.9.2.5 15.7 32.8 26 33l384.5-.1c16.8-.9 44.6-46.5 46.5-73.4V262.3z"/><path fill="#ed6d00" d="M684 128.8c-98.2 17.8-152.4 65.5-147.8 182.2l.1 540.2c189.9-73.2 388.8-57.7 388.8-57.7l-.3-53.3s.3-413.5.3-638.1c-88 9.2-165.5 13.1-241.1 26.7zM60.2 921.9l382.6.1c10.4-.3 25.9-33 25.9-33.1-136.3-22.1-272-44.3-422.7-68.9V203.5H12v643.3c.8 26.6 31.1 74.3 48.2 75.1zM468.7 889z"/><path fill="#ed6d00" d="M490.7 851.1l.1-540.2c4.7-116.7-49.7-164.4-147.8-182.2-75.6-13.6-153-17.4-241.1-26.8 0 224.5.3 638 .3 638l-.4 53.3c.1.2 199-15.3 388.9 57.9zm64.2 37.9v-.1z"/></svg>',
    appId: 'story_detail',
    width: 500,
    height: 650,
    min: true,
    close: true,
    view: "~xl/plugins/story/detail"
};
export default Magix.View.extend({
    tmpl: ($$, $_create,$_viewId,$n,$eu,$_ref,$i,$eq)=> { 
let $_temp,$vnode_0=[],
{
	error,
	books,
	selected,}=$$,
$vnode_1,
$text,
$vnode_2,
$vnode_3,
$vnode_4,
$$_class

if(error){
$vnode_1=[$_create(0,0,$n(error))];$vnode_0.push(...$vnode_1);
}else{
$vnode_1=[];let links,title;;$vnode_2=[];
for(let $q_c_zgzudurg=books.length,$q_key_ayszmrm=0;$q_key_ayszmrm<$q_c_zgzudurg;$q_key_ayszmrm++){
let book=books[$q_key_ayszmrm];
$vnode_3=[];
if(book.id==selected){
$text='';links=book.links;$text+=' ';title=book.title;
}$vnode_4=[$_create(0,0,$n(book.title))];;$$_class='xl-cb';if(book.id==selected){;$$_class+=' xl-cc';};$vnode_3.push($_create('div',{'mx-click': ((book.id!=selected))&&($_viewId+'_cf({id:\''+($eq(book.id))+'\'})'),'class': $$_class,},$vnode_4));$vnode_2.push(...$vnode_3);
}$vnode_1.push($_create('div',$quick_G_0_static_attr,$vnode_2));
for(let $q_c_cntcmbvol=links.length,$q_key_tppeyge=0;$q_key_tppeyge<$q_c_cntcmbvol;$q_key_tppeyge++){
let link=links[$q_key_tppeyge];
$vnode_3=[$_create(0,0,$n(link.text))];
$vnode_2=[$_create('div',{'class': 'xl-cd','mx-click': $_viewId+'_({link:\''+($eq(link.link))+'\',title:\''+($eq(title))+'-'+($eq(link.text))+'\'})',},$vnode_3)];$vnode_1.push(...$vnode_2);
}$vnode_0.push(...$vnode_1);
} 

return $_create($_viewId,0,$vnode_0); } ,
    async render() {
        try {
            let mark = Magix.mark(this, '_aR');
            if (mark()) {
                let books = await GetCatetoriesAndList();
                this.digest({
                    selected: books[0].id,
                    books
                });
            }
        }
        catch (e) {
            this.digest({
                error: e
            });
        }
    },
    '_cf<click>'(e) {
        let { id } = e.params;
        this.digest({
            selected: id
        });
    },
    '_<click>'(e) {
        let { link, title } = e.params;
        let options = {
            ...Options,
            data: link,
            title
        };
        DialogCtrl["_C"](this, options);
    }
});
