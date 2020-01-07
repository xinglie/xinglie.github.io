/*!1.0.5 kooboy_li@163.com*/
/*
    generate by magix-composer@1.0.5
    https://github.com/thx/magix-composer
    author: xinglie.lkf@alibaba-inc.com
    loader:module
 */

import Magix  from "../../lib/magix.js";
export default Object.assign({
    '_c_'(doc, comment) {
        this['_bX'] = doc;
        this['_bY'] = comment;
        this.fire('_bZ');
    },
    '_ca'() {
        return this['_bX'];
    },
    '_cb'() {
        return this['_bY'];
    }
}, Magix.Event);
