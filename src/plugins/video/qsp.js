/*!1.0.5 kooboy_li@163.com*/
/*
    generate by magix-composer@1.0.5
    https://github.com/thx/magix-composer
    author: xinglie.lkf@alibaba-inc.com
    loader:module
 */
let $quick_N_0_static_attr={'class': 'xl-cJ',};
let $quick_N_1_static_attr={'class': 'xl-cK',};
/*
    author:xinglie.lkf@alibaba-inc.com
*/

import Magix  from "../../lib/magix.js";
import XAgent  from "../../lib/agent.js";
let ExtractReg = /<a\s+href="((?:\/show-|\/\?s=vod-read-id-)[^"]+)"\s+title="([^"]+)">\2<\/a>/g;
let VideoInfoServer = 'https://www.qsptv.net';
export default Magix.View.extend({
    tmpl: ($$, $_create,$_viewId,$n,$eu)=> { 
let $_temp,$vnode_0=[],
{
	videos,}=$$,
$vnode_1,
$vnode_2,
$vnode_3,
$text

for(let $q_c_ofdlga=videos.length,index=0;index<$q_c_ofdlga;index++){
let video=videos[index];
$vnode_3=[$_create(0,0,$n(index+1)+'.')];
$vnode_2=[$_create('span',$quick_N_1_static_attr,$vnode_3)];$vnode_3=[$_create(0,0,$n(video.title))];$vnode_2.push($_create('a',{'class': 'xl-cH','href': $n(video.link),'rel': 'noopener noreferrer','target': '_blank',},$vnode_3));$vnode_3=[$_create(0,0,'腾讯')];$vnode_2.push($_create('a',{'href': 'https://v.qq.com/x/search/?q='+($eu(video.title)),'class': 'xl-cG','rel': 'noopener noreferrer','title': '使用腾讯搜索'+$n(video.title),'target': '_blank',},$vnode_3));$vnode_3=[$_create(0,0,'爱奇艺')];$vnode_2.push($_create('a',{'href': 'http://so.iqiyi.com/so/q_'+($eu(video.title)),'class': 'xl-cG','rel': 'noopener noreferrer','title': '使用爱奇世搜索'+$n(video.title),'target': '_blank',},$vnode_3));
$vnode_1=[$_create('div',$quick_N_0_static_attr,$vnode_2)];$vnode_0.push(...$vnode_1);
} 

return $_create($_viewId,0,$vnode_0); } ,
    async render() {
        try {
            let mark = Magix.mark(this, '_aR');
            let result = await XAgent.request(VideoInfoServer + '/topmov.html', 0, true);
            if (mark()) {
                let videos = [];
                //console.log(result);
                result.replace(ExtractReg, (m, link, title) => {
                    //console.log(m, link, title);
                    videos.push({
                        link: VideoInfoServer + link,
                        title
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
