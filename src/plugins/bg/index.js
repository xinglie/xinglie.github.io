/*!1.0.5 kooboy_li@163.com*/
/*
    generate by magix-composer@1.0.5
    https://github.com/thx/magix-composer
    author: xinglie.lkf@alibaba-inc.com
    loader:module
 */
let $quick_i_0_static_attr={'class': 'xl-Q xl-T',};
/*
    author:xinglie.lkf@alibaba-inc.com
*/
import Magix  from "../../lib/magix.js";
import Wallpapger  from "../../os/wallpaper.js";
import XAgent  from "../../lib/agent.js";
import Cron  from "../../lib/cron.js";
Magix.applyStyle("xl-e",".xl-Q{width:310px;border-radius:2px;background:rgba(0,0,0,.53);height:62px;padding:2px 0;overflow:auto;box-shadow:0 -1px 0 6px rgba(0,0,0,.53)}.xl-R{width:100px;height:60px;background-size:cover;background-repeat:no-repeat;float:left;cursor:pointer;background-color:hsla(0,0%,100%,.2)}.xl-S{margin-right:5px}.xl-T{scrollbar-width:thin;-ms-overflow-style:none}.xl-T::-webkit-scrollbar{height:0;width:0}.xl-T:hover::-webkit-scrollbar{height:2px}.xl-T::-webkit-scrollbar-corner{height:0;width:0}.xl-T::-webkit-scrollbar-thumb{background:hsla(0,0%,100%,.47);border-radius:2px}.xl-T::-webkit-scrollbar-thumb:hover{background:#fff}");
let Host = 'http://wallpaper.apc.360.cn/index.php?c=WallPaper&a=getAppsByCategory&cid=9&count=40&from=360chrome&start=';
let StartTime = 30 * 60 * 1000;
let ListTime = 1 * 60 * 60 * 1000;
let GetLast = () => {
    let start = Math.floor(400 * Math.random());
    let cache = localStorage.getItem('ls#bg.random');
    let last = 0, exist = 0;
    if (cache) {
        let o = JSON.parse(cache);
        if (o['_an'] > Date.now()) {
            start = o['_ao'];
            exist = 1;
        }
        else {
            last = o['_ao'];
        }
    }
    return {
        exist,
        start,
        last
    };
};
export default Magix.View.extend({
    tmpl: ($$, $_create,$_viewId,$n,$eu,$_ref,$i,$eq)=> { 
let $_temp,$vnode_0=[],
{
	list,}=$$,
$vnode_1,
$vnode_2,
$vnode_3,
$vnode_4,
$text,
$$_class

if(list&&list.length){
$vnode_3=[];
for(let $q_c_wkkmoc=list.length,$q_lc_aktxuvupxt=$q_c_wkkmoc-1,index=0;index<$q_c_wkkmoc;index++){
let img=list[index];let last=index===$q_lc_aktxuvupxt;
let url=img.url.replace('bdr/__85','bdr/200_120_60');;;$$_class='xl-R';if(!last){;$$_class+=' xl-S';};
$vnode_4=[$_create('div',{'style': 'background-image:url('+$n(url)+')','mx-click': $_viewId+'_ar({thumb:\''+($eq(url))+'\',src:\''+($eq(img.url))+'\'})','class': $$_class,})];$vnode_3.push(...$vnode_4);
}
$vnode_2=[$_create('div',{'style': 'height:100%;width:'+$n(105*list.length-5)+'px',},$vnode_3)];
$vnode_1=[$_create('div',$quick_i_0_static_attr,$vnode_2)];$vnode_0.push(...$vnode_1);
} 

return $_create($_viewId,0,$vnode_0); } ,
    assign() {
        return false;
    },
    async render() {
        try {
            let { start, last, exist } = GetLast();
            XAgent.clear(Host + last, true);
            console.log(start, last, exist);
            if (!exist) {
                localStorage.setItem('ls#bg.random', JSON.stringify({
                    '_an': StartTime + Date.now(),
                    '_ao': start
                }));
            }
            let result = await XAgent.request(Host + start, ListTime, true);
            let data = JSON.parse(result);
            let list = [];
            if (data && data.data) {
                list = data.data;
            }
            this.digest({
                list
            });
            this['_ap'](list);
        }
        catch (_a) {
            this.digest();
        }
    },
    '_ap'(list) {
        if (!this['_aq']) {
            this['_aq'] = 1;
            let work = () => {
                let rdm = Math.floor(Math.random() * list.length);
                let one = list[rdm];
                let src = one.url;
                let thumb = src.replace('bdr/__85', 'bdr/200_120_60');
                Wallpapger["_am"](thumb, src);
            };
            //1小时自动换一次壁纸
            Cron["_s"](work, 4 * 60 * 60 * 1000, true);
            this.on('destroy', () => {
                Cron["_t"](work);
            });
        }
    },
    '_ar<click>'(e) {
        let { thumb, src } = e.params;
        Wallpapger["_am"](thumb, src);
    }
});
