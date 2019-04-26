//#snippets;
/*
    author:xinglie.lkf@taobao.com
 */
let Magix = require('magix5');
Magix.applyStyle('@default.css');
let Data = require('assets/db');
module.exports = Magix.View.extend({
    tmpl: '@default.html',
    render() {
        this.digest({
            list: Data
        });
    },
    '@{to.top}<click>'(e) {
        e.preventDefault();
        window.scrollTo(0, 0);
    }
});