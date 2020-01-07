/*!1.0.5 kooboy_li@163.com*/
/*
    generate by magix-composer@1.0.5
    https://github.com/thx/magix-composer
    author: xinglie.lkf@alibaba-inc.com
    loader:module
 */
let $quick_root_u_1_static_node;
import Magix  from "../../lib/magix.js";
export default Magix.View.extend({
    tmpl: ($$, $_create,$_viewId)=> { 
if(!$quick_root_u_1_static_node){
let $_temp,$vnode_0=[]
$vnode_0.push($_create('video',{'src': 'http://flv3.bn.netease.com/ee1b1d8997ce04a9085143b342eb09b1d38154cde5f32461559d16413e193abcb7f37ae3b0e1d505a8e20a0212ef26b7d2824a4bdd2b4aab60f529632a80bc6a5616ea84f1e737d3b2f668255b50bf396aab173fab951b9b107364f182416c484b76e130c49bbac358d4a2a6aafc67dd2104731485fa8464.mp4','controls': true,})); 
$quick_root_u_1_static_node=$_create($_viewId,0,$vnode_0);
}
return $quick_root_u_1_static_node } ,
    assign() {
        return false;
    },
    render() {
        this.digest();
    }
});
