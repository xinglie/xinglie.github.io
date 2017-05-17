'#snippets';
/*
    author:xinglie.lkf@taobao.com
 */
var Magix = require('magix');
Magix.applyStyle('@list.css');
var Data = require('assets/db');
module.exports = Magix.View.extend({
    tmpl: '@list.html',
    render: function() {
        var me = this;
        me.updater.digest({
            list: Data
        });
    },
    'prevent<click>': function(e) {
        e.preventDefault();
    }
});