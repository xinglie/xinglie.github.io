/*
    author:xinglie.lkf@taobao.com
 */
var Magix = require('magix');
Magix.applyStyle('@default.css');
module.exports = Magix.View.extend({
    tmpl: 'raw@default.html',
    render: function() {
        var me = this;
        me.setHTML(me.id, me.tmpl);
    },
    'toTop<click>': function(e) {
        e.preventDefault();
        window.scrollTo(0, 0);
    }
});