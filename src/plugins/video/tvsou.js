/*!1.0.5 kooboy_li@163.com*/
/*
    generate by magix-composer@1.0.5
    https://github.com/thx/magix-composer
    author: xinglie.lkf@alibaba-inc.com
    loader:module
 */
let $quick_O_0_static_attr={'class': 'xl-cz',};
let $quick_O_1_static_attr={'class': 'xl-cA',};
let $quick_O_2_static_attr={'class': 'xl-cC',};
let $quick_O_3_static_attr={'class': 'xl-cE',};
let $quick_O_4_static_attr={'class': 'xl-cF',};
/*
    author:xinglie.lkf@alibaba-inc.com
*/

import Magix  from "../../lib/magix.js";
import XAgent  from "../../lib/agent.js";
let ExtractReg = /<a href="(\/show\/[a-z0-9]+\/)"\s+class="relative as"\s+target="_blank">\s+<img\s+data-original="([^"]+)"[^>]+?alt="([^"]+)"[\s\S]+?title="([^><]+?)">\4<\/span>/g;
let VideoInfoServer = 'https://www.tvsou.com';
export default Magix.View.extend({
    tmpl: ($$, $_create,$_viewId,$n,$eu)=> { 
let $_temp,$vnode_0=[],
{
	videos,}=$$,
$vnode_1,
$vnode_2,
$vnode_3,
$vnode_4,
$text

for(let $q_c_phiuo=videos.length,$q_key_douvm=0;$q_key_douvm<$q_c_phiuo;$q_key_douvm++){
let video=videos[$q_key_douvm];

$vnode_4=[$_create('img',{'src': $n(video.img),'loading': 'lazy',},0,0,1)];
$vnode_3=[$_create('a',{'href': $n(video.link),'title': '查看'+$n(video.title)+'详情','rel': 'noopener noreferrer','target': '_blank',},$vnode_4)];
$vnode_2=[$_create('div',$quick_O_1_static_attr,$vnode_3)];$vnode_4=[$_create(0,0,$n(video.title))];
$vnode_3=[$_create('div',$quick_O_3_static_attr,$vnode_4)];$vnode_4=[$_create(0,0,$n(video.date))];$vnode_3.push($_create('div',$quick_O_4_static_attr,$vnode_4));$vnode_2.push($_create('div',$quick_O_2_static_attr,$vnode_3));$vnode_4=[$_create(0,0,'腾讯')];
$vnode_3=[$_create('a',{'href': 'https://v.qq.com/x/search/?q='+($eu(video.title)),'class': 'xl-cG','rel': 'noopener noreferrer','title': '使用腾讯搜索'+$n(video.title),'target': '_blank',},$vnode_4)];$vnode_4=[$_create(0,0,'爱奇艺')];$vnode_3.push($_create('a',{'href': 'http://so.iqiyi.com/so/q_'+($eu(video.title)),'class': 'xl-cG','rel': 'noopener noreferrer','title': '使用爱奇世搜索'+$n(video.title),'target': '_blank',},$vnode_4));$vnode_2.push($_create('div',$quick_O_2_static_attr,$vnode_3));
$vnode_1=[$_create('div',$quick_O_0_static_attr,$vnode_2)];$vnode_0.push(...$vnode_1);
} 

return $_create($_viewId,0,$vnode_0); } ,
    async render() {
        try {
            let mark = Magix.mark(this, '_aR');
            let result = await XAgent.request(VideoInfoServer + '/dianying/', 0, true);
            if (mark()) {
                let videos = [];
                result.replace(ExtractReg, (m, link, img, title, date) => {
                    videos.push({
                        link: VideoInfoServer + link,
                        img,
                        title,
                        date
                    });
                    return '';
                });
                this.digest({
                    videos
                });
            }
        }
        catch (ex) {
            alert(ex);
        }
    }
});
