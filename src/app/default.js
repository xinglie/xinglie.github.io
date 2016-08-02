define('app/default',['magix'],function(require,exports,module){
/*Magix */
/*
    author:xinglie.lkf@taobao.com
 */
var Magix = require('magix');
Magix.applyStyle('b71',"*{margin:0;padding:0}body{font-size:12px;color:#3f3e3c;line-height:1.5;background:#333;font-family:helvetica neue,arial,hiragino sans gb,stheiti,wenquanyi micro hei,\\5FAE\\8F6F\\96C5\\9ED1,\\5B8B\\4F53,sans-serif;-ms-text-autospace:ideograph-alpha ideograph-numeric ideograph-parenthesis;text-spacing:ideograph-alpha ideograph-numeric ideograph-parenthesis}img{border:0;vertical-align:middle}p{word-wrap:break-word}ol,ul{list-style:none}a{color:#a6a6a6;text-decoration:none;transition:All 1s ease;-webkit-transition:All 1s ease;-moz-transition:All 1s ease;-ms-transition:All 1s ease;-o-transition:All 1s ease}a:hover{color:#fff}header{width:100%;background:#222;height:70px;border-bottom:1px solid #464647}header nav{margin:0 auto;width:1000px;text-align:center;padding-top:15px}header nav ul li{line-height:40px;display:inline}header nav ul li a{color:#e7e7e7;display:block;padding:0 20px;margin-right:10px;float:left}#nav_current,header nav ul li a:hover{color:#fff;background:hsla(0,0%,8%,.8);box-shadow:0 1px 0 hsla(0,0%,100%,.1),inset 0 1px 1px rgba(0,0,0,.7);border-radius:6px}footer{background:#1d1d1d;box-shadow:0 -1px 0 rgba(0,0,0,.55),inset 0 1px 0 hsla(0,0%,100%,.09)}.b71-footer-mid{width:1000px;margin:auto;padding:20px 0;overflow:hidden}.b71-footer-mid li{line-height:26px}.b71-footer-bottom{background:rgba(0,0,0,.55);overflow:hidden}.b71-footer-bottom p{width:1000px;margin:0 auto;padding:10px 0}.b71-links li{float:left;margin-right:30px}html{background-image:url(about:blank);background-attachment:fixed}#tbox{width:54px;float:right;position:fixed;right:50px;bottom:15px;_position:absolute;_bottom:auto;_top:expression(eval(document.documentElement.scrollTop+document.documentElement.clientHeight-this.offsetHeight-(parseInt(this.currentStyle.marginTop,10)||0)-(parseInt(this.currentStyle.marginBottom,10)||0)));_margin-bottom:15px}#gotop,#togbook{width:54px;height:56px;display:block;background:url(icons.png) no-repeat #111;box-shadow:0 1px 0 hsla(0,0%,100%,.1),inset 0 1px 1px rgba(0,0,0,.7);border-radius:6px}#togbook{margin:5px 0;background-position:10px -407px}#gotop{background-position:12px -365px}#gotop:hover,#togbook:hover{opacity:.5}");
module.exports = Magix.View.extend({
    tmpl: "<header><nav id=\"nav\"><ul><li><a href=\"https://thx.github.io/\" target=\"_blank\">THX</a></li><li><a href=\"https://github.com/thx/magix\" target=\"_blank\">Magix</a></li></ul><script src=\"js/silder.js\"></script></nav></header><div mx-view=\"app/list\"></div><footer><div class=\"b71-footer-mid\"><div class=\"b71-links\"><h2>友情链接</h2><ul><li><a href=\"http://qiudeqing.com/\">邱德清</a></li></ul></div></div><div class=\"b71-footer-bottom\"><p>Copyright 2016 xinglie.lkf@taobao.com</p></div></footer><div id=\"tbox\"><a id=\"togbook\" href=\"https://github.com/xinglie/xinglie.github.io/issues/new\" target=\"_blank\"></a> <a id=\"gotop\" href=\"#\" mx-click=\"toTop()\"></a></div>",
    render: function() {
        var me = this;
        me.setHTML(me.id, me.tmpl);
    },
    'toTop<click>': function(e) {
        e.preventDefault();
        window.scrollTo(0, 0);
    }
});
});