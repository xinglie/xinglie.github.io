define('app/list',["magix","coms/tmpl/index","assets/db"],function(require,exports,module){
/*Magix,Tmpl,Data*/
/*
    author:xinglie.lkf@taobao.com
 */
var Magix = require('magix');
Magix.applyStyle("xb",".xb-d{width:1000px;margin:0 auto 20px}.xb-8{width:100%}.xb-8>li{border-right:2px solid #111;padding:20px 0}.xb-3{background:#222;box-shadow:0 1px 0 hsla(0,0%,100%,.1),inset 0 1px 1px rgba(0,0,0,.7);width:963px;color:#b9b9b9;border-radius:6px;position:relative}.xb-f{width:0;height:0;border-style:solid;border-width:0 0 20px 22px;border-color:transparent transparent transparent #111;right:-22px;top:20px}.xb-4,.xb-f{position:absolute}.xb-4{width:10px;height:10px;border-radius:50%;right:-43px;top:13px;background:#000;border:2px solid #333}.xb-4:hover{border:2px solid #b9b9b9}.xb-3 h2.xb-c{padding:0 0 0 20px;font:16px/50px 微软雅黑,Microsoft YaHei,Arial,Helvetica,sans-serif}.xb-3 h2 a:hover{padding-left:20px}.xb-0{overflow:hidden}.xb-3 p{line-height:24px;padding:0 20px 20px}.xb-3 p:hover{text-shadow:1px 1px 1px #000}.xb-6{background:rgba(1,1,1,.3);border-radius:0 0 6px 6px;padding:0 10px}.xb-6 li{line-height:26px;display:inline;font-size:11px;margin-right:10px}.xb-6 li a{color:#3f3e3c}.xb-6 li a:hover{color:#933}.xb-a{background-position:0 -208px;padding:0 0 0 18px}");
var Tmpl = require('coms/tmpl/index');
var Data = require('assets/db');
module.exports = Magix.View.extend({
    tmpl: "<div class=\"xb-d\"><ul class=\"xb-8\"><%for(var i=0;i<list.length;i++){var a=list[i];%><li><div class=\"xb-3\"><div class=\"xb-f\"></div><div class=\"xb-4\"></div><h2 class=\"xb-c\"><a href=\"<%=a.href%>\" target=\"_blank\"><%=a.title%></a></h2><ul class=\"xb-0\"><p><%=a.desc%></p></ul><ul class=\"xb-6\"><li class=\"xb-a\"><a href=\"#\" mx-click=\"\u001f\u001eprevent()\"><%=a.date%></a></li></ul></div></li><%}%></ul></div>",
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
});