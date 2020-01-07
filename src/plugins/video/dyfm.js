/*!1.0.5 kooboy_li@163.com*/
/*
    generate by magix-composer@1.0.5
    https://github.com/thx/magix-composer
    author: xinglie.lkf@alibaba-inc.com
    loader:module
 */
let $quick_L_0_static_attr={'class': 'xl-cL',};
let $quick_L_1_static_attr={'class': 'xl-cN',};
let $quick_L_2_static_attr={'class': 'xl-cO',};
let $quick_L_3_static_attr={'class': 'xl-cP',};
let $quick_L_4_static_attr={'class': 'xl-cV',};
/*
    author:xinglie.lkf@alibaba-inc.com
*/

import Magix  from "../../lib/magix.js";
import XAgent  from "../../lib/agent.js";
let ExtractReg = /\.fm-discovery\{[\s\S]+?url\(([^()]+)\)[\s\S]+?<a\s+href="\/([^"]+)"\s+class="q"\s+data-toggle="tooltip"\s+title="[^"]+"\s+data-placement="top">([\S\s]+?)<\/a>[\s\S]+<a[^>]+?rel="nofollow"\s+href="([^"]+)">\s*(豆瓣[\S\s]+?)<\/a>[\s\S]+<a[^>]+?rel="nofollow"\s+href="([^"]+)">\s*(IMDB[\S\s]+?)<\/a>[\s\S]+<p\s+class="x-kankan-desc">([\s\S]+?)<\/p>/;
let FullDescReg = /<div\s+class="x-kankan-full-desc"\s+style="display:\s*none;">([\s\S]+?)<\/div>/;
let VideoInfoServer = 'http://dianying.fm/';
export default Magix.View.extend({
    tmpl: ($$, $_create,$_viewId,$n,$eu)=> { 
let $_temp,$vnode_0=[],
{
	videoInfo,
	loading,}=$$,
$vnode_1,
$vnode_2,
$text,
$vnode_3,
$vnode_4,
$vnode_5

$vnode_1=[$_create('div',{'class': 'xl-cM','style': 'background-image:url('+$n(videoInfo.img)+');',})];$text='';if(loading){;$text+='切换中...';}else{;$text+='换一换';};$vnode_2=[$_create(0,0,$text)];$vnode_1.push($_create('button',{'type': 'button','class': 'xl-cW xl-cs','mx-click': $_viewId+'_cl()',},$vnode_2));$vnode_5=[$_create(0,0,$n(videoInfo.name))];
$vnode_4=[$_create('a',{'class': 'xl-cQ xl-cR','href': $n(videoInfo.detail),'rel': 'noopener noreferrer','target': '_blank',},$vnode_5)];
$vnode_3=[$_create('div',$quick_L_3_static_attr,$vnode_4)];$vnode_5=[$_create(0,0,'腾讯')];
$vnode_4=[$_create('a',{'href': 'https://v.qq.com/x/search/?q='+($eu(videoInfo.name)),'class': 'xl-cQ xl-cU xl-cS','rel': 'noopener noreferrer','title': '使用腾讯搜索'+$n(videoInfo.name),'target': '_blank',},$vnode_5)];$vnode_5=[$_create(0,0,'爱奇艺')];$vnode_4.push($_create('a',{'href': 'http://so.iqiyi.com/so/q_'+($eu(videoInfo.name)),'class': 'xl-cQ xl-cU xl-cS','rel': 'noopener noreferrer','title': '使用爱奇世搜索'+$n(videoInfo.name),'target': '_blank',},$vnode_5));$vnode_5=[$_create(0,0,$n(videoInfo.dbScore))];$vnode_4.push($_create('a',{'href': $n(videoInfo.dbLink),'rel': 'noopener noreferrer','target': '_blank','class': 'xl-cQ xl-cU xl-cT',},$vnode_5));$vnode_5=[$_create(0,0,$n(videoInfo.imdbScore))];$vnode_4.push($_create('a',{'href': $n(videoInfo.imdbLink),'rel': 'noopener noreferrer','target': '_blank','class': 'xl-cQ xl-cU xl-cT',},$vnode_5));$vnode_3.push($_create('div',$quick_L_4_static_attr,$vnode_4));
$vnode_2=[$_create('div',$quick_L_2_static_attr,$vnode_3)];$vnode_3=[$_create(0,1,$n(videoInfo.desc))];$vnode_2.push($_create('div',0,$vnode_3));$vnode_1.push($_create('div',$quick_L_1_static_attr,$vnode_2));$vnode_0.push($_create('div',$quick_L_0_static_attr,$vnode_1)); 

return $_create($_viewId,0,$vnode_0); } ,
    async render() {
        try {
            let mark = Magix.mark(this, '_aR');
            let result = await XAgent.request(VideoInfoServer, 0, true);
            if (mark()) {
                let videoInfo = {
                    img: '',
                    detail: '',
                    name: '',
                    dbLink: '',
                    dbScore: '',
                    imdbLink: '',
                    imdbScore: '',
                    desc: ''
                };
                result.replace(ExtractReg, (m, img, detail, name, dbLink, dbScore, imdbLink, imdbScore, desc) => {
                    videoInfo.img = img;
                    videoInfo.detail = VideoInfoServer + detail;
                    videoInfo.name = name.trim();
                    videoInfo.dbLink = dbLink;
                    videoInfo.dbScore = dbScore.trim();
                    videoInfo.imdbLink = imdbLink;
                    videoInfo.imdbScore = imdbScore.trim();
                    videoInfo.desc = desc.trim();
                    desc.replace(FullDescReg, (mm, longDesc) => {
                        videoInfo.desc = longDesc.trim();
                        return mm;
                    });
                    return m;
                });
                this.digest({
                    loading: false,
                    videoInfo
                });
            }
        }
        catch (ex) {
            alert(ex);
            this.set({
                loading: false
            });
        }
    },
    '_cl<click>'() {
        let loading = this.get('loading');
        if (loading)
            return;
        this.digest({
            loading: true
        });
        this.render();
    }
});
