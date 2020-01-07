/*!1.0.5 kooboy_li@163.com*/
/*
    generate by magix-composer@1.0.5
    https://github.com/thx/magix-composer
    author: xinglie.lkf@alibaba-inc.com
    loader:module
 */
import "../../gallery/mx-more/index.js";
let $quick_P_1_static_node;
let $quick_P_0_static_attr={'class': 'xl-cX',};
let $quick_P_2_static_attr={'class': 'xl-da',};
/*
    author:xinglie.lkf@alibaba-inc.com
*/
import Magix  from "../../lib/magix.js";
import Wallpapger  from "../../os/wallpaper.js";
import XAgent  from "../../lib/agent.js";
Magix.applyStyle("xl-r",".xl-cX{height:28px;line-height:28px;padding:0 26px;background:#ddd;color:#333;position:-webkit-sticky;position:sticky;top:0;z-index:2}.xl-cY{float:left;padding:0 5px;cursor:pointer}.xl-cZ{background:#fff}.xl-d_{width:350px;height:200px;float:left;margin:5px;background-repeat:no-repeat;background-size:contain;cursor:pointer;background-color:hsla(0,0%,53.3%,.07);-webkit-transition:all .2s;transition:all .2s}.xl-d_:hover{box-shadow:0 3px 6px 0 rgba(0,0,0,.08);-webkit-transform:scale(1.05);transform:scale(1.05)}.xl-da{display:table}");
let Categories = null;
let CategoriesPending = 0;
let CategoriesPendingList = [];
let GetCategories = () => {
    return new Promise(async (resolve, reject) => {
        if (Categories) {
            resolve(Categories);
        }
        else if (CategoriesPending) {
            CategoriesPendingList.push([resolve, reject]);
        }
        else {
            CategoriesPending = 1;
            CategoriesPendingList.push([resolve, reject]);
            try {
                let result = await XAgent.request('http://wallpaper.apc.360.cn/index.php?c=WallPaperAndroid&a=getAllCategories', 24 * 60 * 60 * 1000, true);
                let data = JSON.parse(result);
                CategoriesPending = 0;
                for (let [resolve] of CategoriesPendingList) {
                    resolve(Categories = data.data);
                }
            }
            catch (ex) {
                CategoriesPending = 0;
                for (let [, reject] of CategoriesPendingList) {
                    reject(ex);
                }
            }
            ;
        }
    });
};
let GetWallPaper = async (cId, start, count) => {
    let result = await XAgent.request(`http://wallpaper.apc.360.cn/index.php?c=WallPaper&a=getAppsByCategory&cid=${cId}&start=${start}&count=${count}`, 0, true);
    let data = JSON.parse(result);
    return data;
};
let maxWidth = 350, maxHeight = 200;
let Resize = size => {
    let parts = size.split('x');
    let w = parts[0] | 0;
    let h = parts[1] | 0;
    let wr = maxWidth / w;
    let hr = maxHeight / h;
    let r = wr > hr ? hr : wr;
    return {
        width: (w * r) | 0,
        height: (h * r) | 0
    };
};
export default Magix.View.extend({
    tmpl: ($$, $_create,$_viewId,$n,$eu,$_ref,$i,$eq)=> { 
let $_temp,$vnode_0=[],
{
	error,
	cats,
	cId,
	loading,
	list,
	resize,}=$$,
$vnode_1,
$text,
$vnode_2,
$vnode_3,
$$_class,
$vnode_4

if(error){
$vnode_1=[$_create(0,0,$n(error))];$vnode_0.push(...$vnode_1);
}else{
$vnode_1=[];$vnode_2=[];
for(let $q_c_jxiooclmv=cats.length,$q_key_hsrieemel=0;$q_key_hsrieemel<$q_c_jxiooclmv;$q_key_hsrieemel++){
let cat=cats[$q_key_hsrieemel];
$vnode_4=[$_create(0,0,$n(cat.name))];;$$_class='xl-cY';if(cat.id==cId){;$$_class+=' xl-cZ';};
$vnode_3=[$_create('div',{'mx-click': ((cat.id!=cId))&&($_viewId+'_cf({id:\''+($eq(cat.id))+'\'})'),'class': $$_class,},$vnode_4)];$vnode_2.push(...$vnode_3);
}$vnode_1.push($_create('div',$quick_P_0_static_attr,$vnode_2));
if(loading){

if($quick_P_1_static_node){
$vnode_2=[$quick_P_1_static_node];
}else{
$vnode_3=[$_create(0,0,'loading...')];
$vnode_2=[$quick_P_1_static_node=$_create('div',{'_': '_','class': 'xl-w',},$vnode_3)];
}
$vnode_1.push(...$vnode_2);
}else{
$vnode_3=[];
for(let $q_c_kiujmrqgr=list.length,$q_key_xtqhrckwpo=0;$q_key_xtqhrckwpo<$q_c_kiujmrqgr;$q_key_xtqhrckwpo++){
let img=list[$q_key_xtqhrckwpo];
$text='';let $peel_root_qtxzaziv=resize(img.resolution),width=$peel_root_qtxzaziv.width,height=$peel_root_qtxzaziv.height;;$text+=' ';let url=img.url.replace('bdr/__85',`bdr/${width}_${height}_80`);;
$vnode_4=[$_create('div',{'class': 'xl-d_','style': 'background-image:url('+$n(url)+')','title': $n(img.utag),'mx-click': $_viewId+'_ar({thumb:\''+($eq(url))+'\',src:\''+($eq(img.url))+'\'})',})];$vnode_3.push(...$vnode_4);
}
$vnode_2=[$_create('div',$quick_P_2_static_attr,$vnode_3),$_create('div',{'_': 'a','mx-intersect': $_viewId+'_aT()','mx-view': '~xl/gallery/mx-more/index',})];$vnode_1.push(...$vnode_2);
}$vnode_0.push(...$vnode_1);
} 

return $_create($_viewId,0,$vnode_0); } ,
    init() {
        this.set({
            size: 20,
            start: 0,
            list: [],
            resize: Resize
        });
    },
    assign() {
        return false;
    },
    async render() {
        try {
            let categories = await GetCategories();
            let cId = this.get('cId');
            let mark = Magix.mark(this, '_aR');
            if (!cId) {
                cId = categories[0].id;
            }
            let start = this.get('start');
            let list = this.get('list');
            let size = this.get('size');
            let wrap = await GetWallPaper(cId, start, size);
            if (mark()) {
                list.push(...wrap.data);
                this.digest({
                    cId,
                    loading: false,
                    cats: categories,
                    list
                });
            }
        }
        catch (ex) {
            this.digest({
                error: ex
            });
        }
        delete this['_aS'];
    },
    '_cf<click>'(e) {
        let { id } = e.params;
        this.digest({
            list: [],
            loading: true,
            start: 0,
            cId: id
        });
        this.root.scrollTop = 0;
        this.render();
    },
    '_ar<click>'(e) {
        let { thumb, src } = e.params;
        Wallpapger["_am"](thumb, src);
    },
    '_aT<intersect>'() {
        if (!this.get('loading') &&
            !this['_aS']) {
            this['_aS'] = 1;
            let next = this.get('start') + this.get('size');
            this.set({
                start: next
            });
            this.render();
        }
    }
});
