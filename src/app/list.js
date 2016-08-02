define('app/list',['magix','coms/tmpl/index','assets/db'],function(require,exports,module){
/*Magix ,Tmpl ,Data */
/*
    author:xinglie.lkf@taobao.com
 */
var Magix = require('magix');
Magix.applyStyle('dcb',".dcb-blogs{width:1000px;margin:0 auto 20px}.dcb-bloglist{width:100%}.dcb-bloglist>li{border-right:2px solid #111;padding:20px 0}.dcb-arrow_box{background:#222;box-shadow:0 1px 0 hsla(0,0%,100%,.1),inset 0 1px 1px rgba(0,0,0,.7);width:963px;color:#b9b9b9;border-radius:6px;position:relative}.dcb-ti{width:0;height:0;border-style:solid;border-width:0 0 20px 22px;border-color:transparent transparent transparent #111;right:-22px;top:20px}.dcb-ci,.dcb-ti{position:absolute}.dcb-ci{width:10px;height:10px;border-radius:50%;right:-43px;top:13px;background:#000;border:2px solid #333}.dcb-ci:hover{border:2px solid #b9b9b9}.dcb-arrow_box h2.dcb-title{padding:0 0 0 20px;font:16px/50px 微软雅黑,Microsoft YaHei,Arial,Helvetica,sans-serif}.dcb-arrow_box h2 a:hover{padding-left:20px}.dcb-textinfo{overflow:hidden}.dcb-arrow_box p{line-height:24px;padding:0 20px 20px}.dcb-arrow_box p:hover{text-shadow:1px 1px 1px #000}.dcb-details{background:rgba(1,1,1,.3);border-radius:0 0 6px 6px;padding:0 10px}.dcb-details li{line-height:26px;display:inline;font-size:11px;margin-right:10px}.dcb-details li a{color:#3f3e3c}.dcb-details li a:hover{color:#933}.dcb-comments,.dcb-icon-time,.dcb-likes{background:url(icons.png) no-repeat}.dcb-icon-time{background-position:0 -208px;padding:0 0 0 18px}.dcb-comments,.dcb-likes{float:right;padding:0 0 0 14px}.dcb-likes{background-position:0 -240px}.dcb-comments{background-position:0 -220px}");
var Tmpl = require('coms/tmpl/index');
var Data = require('assets/db');
module.exports = Magix.View.extend({
    tmpl: "<div class=\"dcb-blogs\"><ul class=\"dcb-bloglist\"> <%for(var i=0;i<list.length;i++){%> <%var a=list[i];%> <li><div class=\"dcb-arrow_box\"><div class=\"dcb-ti\"></div><div class=\"dcb-ci\"></div><h2 class=\"dcb-title\"><a href=\"<%=a.href%>\" target=\"_blank\"><%=a.title%></a></h2><ul class=\"dcb-textinfo\"><p> <%=a.desc%></p></ul><ul class=\"dcb-details\"><li class=\"dcb-icon-time\"><a href=\"#\" mx-click=\"prevent()\"><%=a.date%></a></li></ul></div></li> <%}%> </ul></div>",
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