/*!1.0.5 kooboy_li@163.com*/
/*
    generate by magix-composer@1.0.5
    https://github.com/thx/magix-composer
    author: xinglie.lkf@alibaba-inc.com
    loader:module
 */
let $quick_H_0_static_node;
let $quick_H_4_static_node;
let $quick_H_3_static_attr={'class': 'xl-cl',};
let $quick_H_5_static_attr={'class': 'xl-cm',};
/*
    author:xinglie.lkf@alibaba-inc.com
*/

import Magix  from "../../lib/magix.js";
import Agent  from "../../lib/agent.js";
let extractTitleRegexp = /<h1>([\s\S]+?)<\/h1>/;
let extractAuthroRegexp = /<span id="pub_date">([\s\S]+?)<\/span>/;
let extractSourceRegexp = /<span id="media_name">([\s\S]+?)<\/span>/;
let extractContentRegexp = /<div class="blkContainerSblkCon">([\S\s]+?)<\/div>/;
let stripContentRegexp = /<div class="contentAd">[\S\s]+?<\/div>/;
export default Magix.View.extend({
    tmpl: ($$, $_create,$_viewId,$n)=> { 
let $_temp,$vnode_0=[],
{
	error,
	loading,
	title,
	author,
	source,
	content,}=$$,
$vnode_1,
$vnode_2,
$text,
$vnode_3

if($quick_H_0_static_node){
$vnode_1=[$quick_H_0_static_node];
}else{

$vnode_2=[$_create('path',{'fill': '#515151','d': 'M512 0c283.2 0 512 228.8 512 512s-228.8 512-512 512S0 795.2 0 512 228.8 0 512 0z',},0,0,1),$_create('path',{'fill': '#fff','d': 'M563.782 512l165.7-165.7c14.5-14.5 14.5-37.284 0-51.782s-37.282-14.5-51.781 0L512 460.218l-165.7-165.7c-14.5-14.5-37.284-14.5-51.782 0s-14.5 37.282 0 51.781L460.218 512l-165.7 165.7c-14.5 14.5-14.5 37.284 0 51.782s37.282 14.5 51.781 0L512 563.782l165.7 165.7c14.5 14.5 37.284 14.5 51.782 0s14.5-37.282 0-51.781L563.782 512z',},0,0,1)];
$vnode_1=[$quick_H_0_static_node=$_create('svg',{'viewBox': '0 0 1024 1024',},$vnode_2)];
}
$vnode_0.push($_create('div',{'_': '_','class': 'xl-ck','mx-click': $_viewId+'_ck()',},$vnode_1));$vnode_1=[];
if(error){
$vnode_2=[$_create(0,0,$n(error))];$vnode_1.push(...$vnode_2);
}else if(loading){

if($quick_H_4_static_node){
$vnode_2=[$quick_H_4_static_node];
}else{
$vnode_3=[$_create(0,0,'loading...')];
$vnode_2=[$quick_H_4_static_node=$_create('div',{'_': 'a','class': 'xl-w',},$vnode_3)];
}
$vnode_1.push(...$vnode_2);
}else{
$vnode_3=[$_create(0,0,$n(title))];
$vnode_2=[$_create('h2',0,$vnode_3)];$vnode_3=[$_create(0,0,$n(author))];$vnode_2.push($_create('div',0,$vnode_3));$vnode_3=[$_create(0,0,$n(source))];$vnode_2.push($_create('div',0,$vnode_3));$vnode_3=[$_create(0,1,$n(content))];$vnode_2.push($_create('div',$quick_H_5_static_attr,$vnode_3));$vnode_1.push(...$vnode_2);
}$vnode_0.push($_create('div',$quick_H_3_static_attr,$vnode_1)); 

return $_create($_viewId,0,$vnode_0); } ,
    assign(data) {
        this.set(data).set({
            loading: true
        });
        return true;
    },
    async render() {
        this.digest();
        try {
            let mark = Magix.mark(this, '_aR');
            let url = this.get('url');
            if (url && mark()) {
                let result = await Agent.request(url, 0, true);
                let title, author, source, content;
                result = result.replace(extractTitleRegexp, (_, t) => {
                    title = t.trim();
                    return _;
                }).replace(extractAuthroRegexp, (_, a) => {
                    author = a.trim();
                    return _;
                }).replace(extractSourceRegexp, (_, s) => {
                    source = s.trim();
                    return _;
                }).replace(stripContentRegexp, '');
                result.replace(extractContentRegexp, (_, c) => {
                    content = c.trim();
                    return _;
                });
                this.digest({
                    loading: false,
                    title,
                    author,
                    source,
                    content
                });
            }
            else {
                this.digest({
                    loading: false
                });
            }
        }
        catch (ex) {
            this.digest({
                error: ex
            });
        }
    },
    '_ck<click>'() {
        Magix.dispatch(this.root, 'close');
    }
});
