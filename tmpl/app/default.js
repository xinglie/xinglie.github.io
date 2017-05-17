'#snippets';
/*
    author:xinglie.lkf@taobao.com
 */
var Magix = require('magix');
Magix.applyStyle('@default.css');
module.exports = Magix.View.extend({
    tmpl: '@default.html',
    render: function() {
        var me = this;
        me.updater.digest();
    },
    'toTop<click>': function(e) {
        e.preventDefault();
        window.scrollTo(0, 0);
    }
});