/*!1.0.5 kooboy_li@163.com*/
/*
    generate by magix-composer@1.0.5
    https://github.com/thx/magix-composer
    author: xinglie.lkf@alibaba-inc.com
    loader:module
 */
import "./story.js";
let $quick_F_0_static_node;
/*
    author:xinglie.lkf@alibaba-inc.com
*/

import Magix  from "../../lib/magix.js";
import Agent  from "../../lib/agent.js";
let extractPeriodRegexp = /<dt>\s*<span>([\s\S]+?)<\/span>\s*<\/dt>\s*([\s\S]+?)<\/dl>/g;
let extractDetailRegexp = /<dd>\s*<span\s*class="maglisttitle">\s*<a[^>]*?href="([^"]+)"[^>]*?>([\s\S]+?)<\/a>\s*<\/span>\s*<\/dd>/g;
export default Magix.View.extend({
    tmpl: ($$, $_create,$_viewId,$n,$eu,$_ref,$i,$eq)=> { 
let $_temp,$vnode_0=[],
{
	loading,
	error,
	showStory,
	list,
	storyUrl,}=$$,
$vnode_1,
$vnode_2,
$text,
$$_class,
$vnode_3,
$vnode_4,
$vnode_5

if(loading){

if($quick_F_0_static_node){
$vnode_1=[$quick_F_0_static_node];
}else{
$vnode_2=[$_create(0,0,'loading...')];
$vnode_1=[$quick_F_0_static_node=$_create('div',{'_': '_','class': 'xl-w',},$vnode_2)];
}
$vnode_0.push(...$vnode_1);
}else if(error){
$vnode_1=[$_create(0,0,$n(error))];$vnode_0.push(...$vnode_1);
}else{
$vnode_2=[];
for(let $q_c_wzhikg=list.length,$q_key_qqdpnbyrj=0;$q_key_qqdpnbyrj<$q_c_wzhikg;$q_key_qqdpnbyrj++){
let item=list[$q_key_qqdpnbyrj];
$vnode_3=[];$vnode_4=[$_create(0,0,$n(item.title))];$vnode_3.push($_create('div',{'class': 'xl-cf','title': $n(item.title),},$vnode_4));
for(let $q_a_fdsalzjg=item.links,$q_c_pvuhlq=$q_a_fdsalzjg.length,$q_key_depawoxno=0;$q_key_depawoxno<$q_c_pvuhlq;$q_key_depawoxno++){
let link=$q_a_fdsalzjg[$q_key_depawoxno];
$vnode_5=[$_create(0,0,$n(link.text))];
$vnode_4=[$_create('div',{'class': 'xl-cg','title': $n(link.text),'mx-click': $_viewId+'_ci({url:\''+($eq(link.url))+'\'})',},$vnode_5)];$vnode_3.push(...$vnode_4);
}$vnode_2.push(...$vnode_3);
};$$_class='xl-ce';if(showStory){;$$_class+=' xl-ch';};
$vnode_1=[$_create('div',{'class': $$_class,},$vnode_2)];$vnode_0.push(...$vnode_1);
};$$_class='xl-ci';if(showStory){;$$_class+=' xl-cj';};$vnode_0.push($_create('div',{'mx-view': '~xl/plugins/story/story?url='+($eu(storyUrl)),'mx-close': $_viewId+'_cj()','class': $$_class,})); 

return $_create($_viewId,0,$vnode_0); } ,
    init() {
        this.set({
            showStory: false,
            storyUrl: ''
        });
    },
    assign(data) {
        this.set(data).set({
            loading: true,
            showStory: false
        });
        return true;
    },
    async render() {
        this.digest();
        try {
            let mark = Magix.mark(this, '_aR');
            let url = this.get('data');
            let lastSlash = url.lastIndexOf('/');
            let base = url.substring(0, lastSlash + 1);
            let data = await Agent.request(url, 30 * 24 * 60 * 60 * 1000, true);
            if (mark()) {
                let list = [];
                data.replace(extractPeriodRegexp, (_, title, content) => {
                    let links = [];
                    content.replace(extractDetailRegexp, (_, url, text) => {
                        links.push({
                            url: base + url,
                            text: text.trim()
                        });
                        return _;
                    });
                    list.push({
                        title: title.trim(),
                        links
                    });
                    return _;
                });
                this.digest({
                    list,
                    loading: false
                });
            }
        }
        catch (e) {
            this.digest({
                loading: false,
                error: e
            });
        }
    },
    '_ci<click>'(e) {
        this.digest({
            showStory: true,
            storyUrl: e.params.url
        });
    },
    '_cj<close>'() {
        this.digest({
            showStory: false
        });
    }
});
