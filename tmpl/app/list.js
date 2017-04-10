/*
    author:xinglie.lkf@taobao.com
 */
var Magix = require('magix');
Magix.applyStyle('@list.css');
var Tmpl = require('coms/tmpl/index');
var Data = require('assets/db');
module.exports = Magix.View.extend({
    tmpl: 'raw@list.html',
    render: function() {
        var me = this;
        console.log(Data);
        var html = Tmpl(me.tmpl, {
            list: Data
        });
        me.setHTML(me.id, html);
    },
    'prevent<click>': function(e) {
        e.preventDefault();
    }
});