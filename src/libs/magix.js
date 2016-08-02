/*3.0.7*//*
    author:xinglie.lkf@taobao.com
 */
define('magix', ['zepto'], function(require) {
    var $ = require('zepto');
    var G_Require = function(name, fn) {
        if (name) {
            var a = [];
            if (!G_IsArray(name)) name = [name];
            for (var i = 0; i < name.length; i++) {
                a.push(require(name[i]));
            }
            if (fn) fn.apply(G_NULL, a);
        }else{
            fn();
        }
        /*
            fn回调一定要确保是异步的，原因：所有js都放在页面上，回调是同步的，会导致mountZone中循环时，渲染一个vframe触发一次vframe上的created事件。
            2016.05.02 该问题已修复，详见mountZone中的hold fire event

            magix单独使用时，由外部在合适的时机boot，不添加虚拟根节点，不自动boot，这样可选择的空间更大
         */
        // if (name) {
        //     seajs.use(name, fn);
        // } else if (fn) {
        //     fn();
        // }
    };
    var T = function() {};
    var G_Extend = function(ctor, base, props, statics, cProto) {
        //bProto.constructor = base;
        T[G_PROTOTYPE] = base[G_PROTOTYPE];
        cProto = new T();
        G_Mix(cProto, props);
        G_Mix(ctor, statics);
        cProto.constructor = ctor;
        ctor[G_PROTOTYPE] = cProto;
        return ctor;
    };
    var G_IsObject = $.isPlainObject;
    var G_IsArray = $.isArray;
    var G_HTML = function(node, html) {
        $(node).html(html);
    };

    var View_ApplyStyle = function(key, css, node, sheet) {
        if (css && !View_ApplyStyle[key]) {
            View_ApplyStyle[key] = 1;
            node = $(G_HashKey + MxStyleGlobalId);
            if (node.length) {
                sheet = node.prop('styleSheet');
                if (sheet) {
                    sheet.cssText += css;
                } else {
                    node.append(css);
                }
            } else {
                $('head').append('<style id="' + MxStyleGlobalId + '">' + css + '</style>');
            }
        }
    };

    /*
    源码级模块定制，更利于取舍功能
    固定的模块有magix,event,body,vframe,view
    可选的模块有router,service,base,fullstyle,style,cnum,ceach,resource,edgerouter,tiprouter,simplerouter
 */
var G_COUNTER = 0;
var G_EMPTY = '';
var G_EMPTY_ARRAY = [];
var G_Slice = G_EMPTY_ARRAY.slice;
var G_NOOP = function() {};
var G_COMMA = ',';
var G_NULL = null;
var G_WINDOW = window;
var G_DOCUMENT = document;
var G_HashKey = '#';
var G_DOCBODY; //initilize at vframe_root
/*
    关于spliter
    出于安全考虑，使用不可见字符\u0000，然而，window手机上ie11有这样的一个问题：'\u0000'+"abc",结果却是一个空字符串，好奇特。
 */
var G_SPLITER = '\u001f';
var Magix_StrObject = 'object';
var G_PROTOTYPE = 'prototype';
// var Magix_PathRelativeReg = /\/\.(?:\/|$)|\/[^\/]+?\/\.{2}(?:\/|$)|\/\/+|\.{2}\//; // ./|/x/../|(b)///
// var Magix_PathTrimFileReg = /\/[^\/]*$/;
// var Magix_ProtocalReg = /^(?:https?:)?\/\//i;
var Magix_SLASH = '/';
var Magix_PathTrimParamsReg = /[#?].*$/;
var Magix_ParamsReg = /([^=&?\/#]+)=?([^&#?]*)/g;
var Magix_IsParam = /(?!^)=|&/;
var G_Id = function(prefix) {
    return (prefix || 'mx_') + G_COUNTER++;
};

var MxStyleGlobalId = G_Id();


var Magix_Cfg = {
    rootId: G_Id(),

    error: function(e) {
        throw e;
    }
};
var Magix_HasProp = Magix_Cfg.hasOwnProperty;

var G_GetById = function(id) {
    return typeof id == Magix_StrObject ? id : G_DOCUMENT.getElementById(id);
};
var G_NodeIn = function(a, b, r) {
    a = G_GetById(a);
    b = G_GetById(b);
    if (a && b) {
        r = a == b;
        if (!r) {
            try {
                r = b.contains ? b.contains(a) : b.compareDocumentPosition(a) & 16;
            } catch (e) {}
        }
    }
    return r;
};
var G_Mix = function(aim, src, p) {
    for (p in src) {
        aim[p] = src[p];
    }
    return aim;
};

var G_ToTry = function(fns, args, context, i, r, e) {
    if (!G_IsArray(fns)) fns = [fns];
    if (!G_IsArray(args)) args = [args];
    for (i = 0; e = fns[i]; i++) {
        try {
            r = e && e.apply(context, args);
        } catch (x) {
            Magix_Cfg.error(x);
        }
    }
    return r;
};

var G_Has = function(owner, prop) {
    return owner && Magix_HasProp.call(owner, prop); //false 0 G_NULL '' undefined
};
var Magix_CacheSort = function(a, b) {
    return  b.f - a.f || b.t - a.t;
};
/**
 * Magix.Cache 类
 * @name Cache
 * @constructor
 * @param {Integer} max 最大值
 * @param {Integer} buffer 缓冲区大小
 * @param {Function} remove 当缓存的元素被删除时调用
 * @example
 * var c = new Magix.cache(5,2);//创建一个可缓存5个，且缓存区为2个的缓存对象
 * c.set('key1',{});//缓存
 * c.get('key1');//获取
 * c.del('key1');//删除
 * c.has('key1');//判断
 * //注意：缓存通常配合其它方法使用，在Magix中，对路径的解析等使用了缓存。在使用缓存优化性能时，可以达到节省CPU和内存的双赢效果
 */
var G_Cache = function(max, buffer, remove, me) {
    me = this;
    me.c = [];
    me.b = buffer | 0 || 5; //buffer先取整，如果为0则再默认5
    me.x = me.b + (max || 20);
    me.r = remove;
};

G_Mix(G_Cache[G_PROTOTYPE], {
    /**
     * @lends Cache#
     */
    /**
     * 获取缓存的值
     * @param  {String} key
     * @return {Object} 初始设置的缓存对象
     */
    get: function(key) {
        var me = this;
        var c = me.c;
        var r = c[G_SPLITER + key];
        if (r) {
            r.f++;
            r.t = G_COUNTER++;
            //console.log(r.f);
            r = r.v;
            //console.log('hit cache:'+key);
        }
        return r;
    },


    /**
     * 设置缓存
     * @param {String} key 缓存的key
     * @param {Object} value 缓存的对象
     */
    set: function(okey, value) {
        var me = this;
        var c = me.c;

        var key = G_SPLITER + okey;
        var r = c[key];
        var t = me.b,
            f;
        if (!r) {
            if (c.length >= me.x) {
                c.sort(Magix_CacheSort);
                while (t--) {

                    r = c.pop();

                    //为什么要判断r.f>0,考虑这样的情况：用户设置a,b，主动删除了a,重新设置a,数组中的a原来指向的对象残留在列表里，当排序删除时，如果不判断则会把新设置的删除，因为key都是a
                    //
                    if (r.f > 0) me.del(r.o); //如果没有引用，则删除

                }

            }
            r = {

                o: okey
            };
            c.push(r);
            c[key] = r;
        }
        r.v = value;
        r.f = 1;
        r.t = G_COUNTER++;
    },
    /**
     * 删除缓存
     * @param  {String} key 缓存key
     */
    del: function(k) {
        k = G_SPLITER + k;
        var c = this.c;
        var r = c[k],
            m = this.r;
        if (r) {
            r.f = -1;
            r.v = G_EMPTY;
            delete c[k];
            if (m) {
                G_ToTry(m, r.o, r);
            }
        }
    },
    /**
     * 检测缓存中是否有给定的key
     * @param  {String} key 缓存key
     * @return {Boolean}
     */
    has: function(k) {
        return G_Has(this.c, G_SPLITER + k);
    }
});


var Magix_PathToObjCache = new G_Cache();
//var Magix_PathCache = new G_Cache();
var Magix_ParamsObjectTemp;
var Magix_ParamsFn = function(match, name, value) {
    try {
        value = decodeURIComponent(value);
    } catch (e) {

    }
    Magix_ParamsObjectTemp[name] = value;
};
/**
 * 路径
 * @param  {String} url  参考地址
 * @param  {String} part 相对参考地址的片断
 * @return {String}
 * @example
 * http://www.a.com/a/b.html?a=b#!/home?e=f   /   => http://www.a.com/
 * http://www.a.com/a/b.html?a=b#!/home?e=f   ./     =>http://www.a.com/a/
 * http://www.a.com/a/b.html?a=b#!/home?e=f   ../../    => http://www.a.com/
 * http://www.a.com/a/b.html?a=b#!/home?e=f   ./../  => http://www.a.com/
 * //g.cn/a.html
 */
/*var G_Path = function(url, part) {
    var key = url + G_SPLITER + part;
    var result = Magix_PathCache.get(key),
        domain = G_EMPTY,
        idx;
    if (!Magix_PathCache.has(key)) { //有可能结果为空，url='' path='';
        var m = url.match(Magix_ProtocalReg);
        if (m) {
            idx = url.indexOf(Magix_SLASH, m[0].length);
            if (idx < 0) idx = url.length;
            domain = url.slice(0, idx);
            url = url.slice(idx);
        }
        url = url.replace(Magix_PathTrimParamsReg, G_EMPTY).replace(Magix_PathTrimFileReg, Magix_SLASH);
        if (!part.indexOf(Magix_SLASH)) {
            url = G_EMPTY;
        }
        result = url + part;
        console.log('url', url, 'part', part, 'result', result);
        while (Magix_PathRelativeReg.test(result)) {
            result = result.replace(Magix_PathRelativeReg, Magix_SLASH);
        }
        Magix_PathCache.set(key, result = domain + result);
    }
    return result;
};*/

/**
 * 把路径字符串转换成对象
 * @param  {String} path 路径字符串
 * @return {Object} 解析后的对象
 * @example
 * var obj = Magix.parseUri('/xxx/?a=b&c=d');
 * // obj = {path:'/xxx/',params:{a:'b',c:'d'}}
 */
var G_ParseUri = function(path) {
    //把形如 /xxx/?a=b&c=d 转换成对象 {path:'/xxx/',params:{a:'b',c:'d'}}
    //1. /xxx/a.b.c.html?a=b&c=d  path /xxx/a.b.c.html
    //2. /xxx/?a=b&c=d  path /xxx/
    //3. /xxx/#?a=b => path /xxx/
    //4. /xxx/index.html# => path /xxx/index.html
    //5. /xxx/index.html  => path /xxx/index.html
    //6. /xxx/#           => path /xxx/
    //7. a=b&c=d          => path ''
    //8. /s?src=b#        => path /s params:{src:'b'}
    //9. a=YT3O0sPH1No=   => path '' params:{a:'YT3O0sPH1No='}
    //10.a=YT3O0sPH1No===&b=c => path '' params:{a:'YT3O0sPH1No===',b:'c'}
    //11. ab?a&b          => path ab  params:{a:'',b:''}
    //12. a=b&c           => path '' params:{a:'b',c:''}
    //13. =abc            => path '=abc'
    //14. ab=             => path '' params:{ab:''}
    //15. a&b             => path '' params:{a:'',b:''}
    var r = Magix_PathToObjCache.get(path),
        pathname;
    if (!r) {
        Magix_ParamsObjectTemp = {};
        pathname = path.replace(Magix_PathTrimParamsReg, G_EMPTY);
        if (path == pathname && Magix_IsParam.test(pathname)) pathname = G_EMPTY; //考虑 YT3O0sPH1No= base64后的pathname
        path.replace(pathname, G_EMPTY).replace(Magix_ParamsReg, Magix_ParamsFn);
        Magix_PathToObjCache.set(path, r = {
            a: pathname,
            b: Magix_ParamsObjectTemp
        });
    }
    return {
        path: r.a,
        params: G_Mix({}, r.b)
    };
};
/**
 * 转换成字符串路径
 * @param  {String} path 路径
 * @param {Object} params 参数对象
 * @param {Object} [keo] 保留空白值的对象
 * @return {String} 字符串路径
 * @example
 * var str = Magix.toUri('/xxx/',{a:'b',c:'d'});
 * // str == /xxx/?a=b&c=d
 *
 * var str = Magix.toUri('/xxx/',{a:'',c:2});
 *
 * // str == /xxx/?a=&c=2
 *
 * var str = Magix.toUri('/xxx/',{a:'',c:2},{c:1});
 *
 * // str == /xxx/?c=2
 * var str = Magix.toUri('/xxx/',{a:'',c:2},{a:1,c:1});
 *
 * // str == /xxx/?a=&c=2
 */
var G_ToUri = function(path, params, keo) {
    var arr = [];
    var v, p, f;
    for (p in params) {
        v = params[p] + G_EMPTY;
        if (!keo || v || G_Has(keo, p)) {
            v = encodeURIComponent(v);
            arr.push(f = p + '=' + v);
        }
    }
    if (f) {
        path += (path && (~path.indexOf('?') ? '&' : '?')) + arr.join('&');
    }
    return path;
};
var G_ToMap = function(list, key) {
    var i, e, map = {},
        l;
    if (list && (l = list.length)) {
        for (i = 0; i < l; i++) {
            e = list[i];
            map[(key && e) ? e[key] : e] = key ? e : (map[e] | 0) + 1; //对于简单数组，采用累加的方式，以方便知道有多少个相同的元素
        }
    }
    return map;
};

/**
 * Magix对象，提供常用方法
 * @name Magix
 * @namespace
 */
var Magix = {
    /**
     * @lends Magix
     */
    /**
     * 设置或获取配置信息
     * @param  {Object} cfg 初始化配置参数对象
     * @param {String} cfg.defaultView 默认加载的view
     * @param {String} cfg.defaultPath 当无法从地址栏取到path时的默认值。比如使用hash保存路由信息，而初始进入时并没有hash,此时defaultPath会起作用
     * @param {String} cfg.unfoundView 404时加载的view
     * @param {Object} cfg.routes path与view映射关系表
     * @param {String} cfg.rootId 根view的id
     * @param {Array} cfg.exts 需要加载的扩展
     * @param {Function} cfg.error 发布版以try catch执行一些用户重写的核心流程，当出错时，允许开发者通过该配置项进行捕获。注意：您不应该在该方法内再次抛出任何错误！
     * @example
     * Magix.config({
     *      rootId:'J_app_main',
     *      defaultView:'app/views/layouts/default',//默认加载的view
     *      defaultPath:'/home',
     *      routes:{
     *          "/home":"app/views/layouts/default"
     *      }
     * });
     *
     *
     * var config = Magix.config();
     *
     * console.log(config.rootId);
     *
     * // 可以多次调用该方法，除内置的配置项外，您也可以缓存一些数据，如
     * Magix.config({
     *     user:'彳刂'
     * });
     *
     * console.log(Magix.config('user'));
     */
    config: function(cfg, r) {
        r = Magix_Cfg;
        if (cfg) {
            if (G_IsObject(cfg)) {
                r = G_Mix(r, cfg);
            } else {
                r = r[cfg];
            }
        }
        return r;
    },

    /**
     * 应用初始化入口
     * @function
     * @param {Object} [cfg] 配置信息对象,更多信息请参考Magix.config方法
     * @return {Object} 配置信息对象
     * @example
     * Magix.boot({
     *      rootId:'J_app_main'
     * });
     *
     */

    boot: function(cfg) {
        G_Mix(Magix_Cfg, cfg);
        G_Require(Magix_Cfg.exts, function() {
            Vframe_Root().mountView(Magix_Cfg.defaultView);
        });
    },

    /**
     * 把列表转化成hash对象
     * @param  {Array} list 源数组
     * @param  {String} key  以数组中对象的哪个key的value做为hahs的key
     * @return {Object}
     * @example
     * var map = Magix.toMap([1,2,3,5,6]);
     * //=> {1:1,2:1,3:1,4:1,5:1,6:1}
     *
     * var map = Magix.toMap([{id:20},{id:30},{id:40}],'id');
     * //=>{20:{id:20},30:{id:30},40:{id:40}}
     */
    toMap: G_ToMap,
    /**
     * 以try cache方式执行方法，忽略掉任何异常
     * @function
     * @param  {Array} fns     函数数组
     * @param  {Array} args    参数数组
     * @param  {Object} context 在待执行的方法内部，this的指向
     * @return {Object} 返回执行的最后一个方法的返回值
     */
    toTry: G_ToTry,
    /**
     * 转换成字符串路径
     * @function
     * @param  {String} path 路径
     * @param {Object} params 参数对象
     * @param {Object} [keo] 保留空白值的对象
     * @return {String} 字符串路径
     * @example
     * var str = Magix.toUrl('/xxx/',{a:'b',c:'d'});
     * // str == /xxx/?a=b&c=d
     *
     * var str = Magix.toUrl('/xxx/',{a:'',c:2});
     *
     * // str==/xxx/?a=&c=2
     *
     * var str = Magix.toUrl('/xxx/',{a:'',c:2},{c:1});
     *
     * // str == /xxx/?c=2
     * var str = Magix.toUrl('/xxx/',{a:'',c:2},{a:1,c:1});
     *
     * // str == /xxx/?a=&c=2
     */
    toUrl: G_ToUri,
    /**
     * 把路径字符串转换成对象
     * @function
     * @param  {String} path 路径字符串
     * @return {Object} 解析后的对象
     * @example
     * var obj = Magix.parseUrl('/xxx/?a=b&c=d');
     * // obj = {path:'/xxx/',params:{a:'b',c:'d'}}
     */
    parseUrl: G_ParseUri,
    /*
     * 路径
     * @function
     * @param  {String} url  参考地址
     * @param  {String} part 相对参考地址的片断
     * @return {String}
     * @example
     * http://www.a.com/a/b.html?a=b#!/home?e=f   /   => http://www.a.com/
     * http://www.a.com/a/b.html?a=b#!/home?e=f   ./     =>http://www.a.com/a/
     * http://www.a.com/a/b.html?a=b#!/home?e=f   ../../    => http://www.a.com/
     * http://www.a.com/a/b.html?a=b#!/home?e=f   ./../  => http://www.a.com/
     */
    //path: G_Path,
    /**
     * 把src对象的值混入到aim对象上
     * @function
     * @param  {Object} aim    要mix的目标对象
     * @param  {Object} src    mix的来源对象
     * @example
     *   var o1={
     *       a:10
     *   };
     *   var o2={
     *       b:20,
     *       c:30
     *   };
     *
     *   Magix.mix(o1,o2);//{a:10,b:20,c:30}
     *
     *
     * @return {Object}
     */
    mix: G_Mix,
    /**
     * 检测某个对象是否拥有某个属性
     * @function
     * @param  {Object}  owner 检测对象
     * @param  {String}  prop  属性
     * @example
     *   var obj={
     *       key1:undefined,
     *       key2:0
     *   }
     *
     *   Magix.has(obj,'key1');//true
     *   Magix.has(obj,'key2');//true
     *   Magix.has(obj,'key3');//false
     *
     *
     * @return {Boolean} 是否拥有prop属性
     */
    has: G_Has,

    /**
     * 判断一个节点是否在另外一个节点内，如果比较的2个节点是同一个节点，也返回true
     * @function
     * @param {String|HTMLElement} node节点或节点id
     * @param {String|HTMLElement} container 容器
     * @return {Boolean}
     */
    inside: G_NodeIn,
    /**
     * document.getElementById的简写
     * @param {String} id
     * @return {HTMLElement|Null}
     */
    node: G_GetById,

    /**
     * 应用样式
     * @param {String} prefix 样式的名称前缀
     * @param {String} css 样式字符串
     * @example
     * // 该方法配合magix-combine工具使用
     * // 更多信息可参考magix-combine工具：https://github.com/thx/magix-combine
     * // 样式问题可查阅这里：https://github.com/thx/magix-combine/issues/6
     *
     */
    applyStyle: View_ApplyStyle,

    /**
     * 返回全局唯一ID
     * @function
     * @param {String} [prefix] 前缀
     * @return {String}
     * @example
     *
     * var id = Magix.guid('mx-');
     * // id maybe mx-7
     */
    guid: G_Id,
    Cache: G_Cache
};
    /**
 * 多播事件对象
 * @name Event
 * @namespace
 */
var Event_ON = 'on';
var Event = {
    /**
     * @lends Event
     */
    /**
     * 触发事件
     * @param {String} name 事件名称
     * @param {Object} data 事件对象
     * @param {Boolean} remove 事件触发完成后是否移除这个事件的所有监听
     * @param {Boolean} lastToFirst 是否从后向前触发事件的监听列表
     */
    fire: function(name, data, remove, lastToFirst) {
        var key = G_SPLITER + name,
            me = this,
            list = me[key],
            end, len, idx, t;
        if (!data) data = {};
        if (!data.type) data.type = name;
        if (list) {
            end = list.length;
            len = end - 1;
            while (end--) {
                idx = lastToFirst ? end : len - end;
                t = list[idx];
                if (t.d) {
                    list.splice(idx, 1);
                    len--;
                } else {
                    G_ToTry(t.f, data, me);
                }
            }
        }
        list = me[Event_ON + name];
        if (list) G_ToTry(list, data, me);
        if (remove) me.off(name);
    },
    /**
     * 绑定事件
     * @param {String} name 事件名称
     * @param {Function} fn 事件回调
     * @example
     *  var T = Magix.mix({},Event);
     *  T.on('done',function(e){
     *      alert(1);
     *  });
     *  T.on('done',function(e){
     *      alert(2);
     *      T.off('done',arguments.callee);
     *  });

     *  T.fire('done',{data:'test'});
     *  T.fire('done',{data:'test2'});
     */
    on: function(name, fn) {
        var me = this;
        var key = G_SPLITER + name;
        var list = me[key] || (me[key] = []);
        list.push({
            f: fn
        });
    },
    /**
     * 解除事件绑定
     * @param {String} name 事件名称
     * @param {Function} [fn] 事件回调
     */
    off: function(name, fn) {
        var key = G_SPLITER + name,
            me = this,
            list = me[key],
            i, t;
        if (fn) {
            if (list) {
                i = list.length;
                while (i--) {
                    t = list[i];
                    if (t.f == fn && !t.d) {
                        t.d = 1;
                        break;
                    }
                }
            }
        } else {
            delete me[key];
            delete me[Event_ON + name];
        }
    }
};
Magix.Event = Event;


    var Vframe_RootVframe;
var Vframe_GlobalAlter;

var Vframe_NotifyCreated = function(vframe, mId, p) {
    if (!vframe.$d && !vframe.$h && vframe.$cc == vframe.$rc) { //childrenCount === readyCount
        if (!vframe.$cr) { //childrenCreated
            vframe.$cr = 1; //childrenCreated
            vframe.$ca = 0; //childrenAlter
            vframe.fire('created'); //不在view上派发事件，如果view需要绑定，则绑定到owner上，view一般不用该事件，如果需要这样处理：this.owner.oncreated=function(){};this.ondestroy=function(){this.owner.off('created')}
        }
        mId = vframe.id;
        p = Vframe_Vframes[vframe.pId];
        if (p && !G_Has(p.$r, mId)) { //readyChildren
            p.$r[mId] = 1; //readyChildren
            p.$rc++; //readyCount
            Vframe_NotifyCreated(p);
        }
    }
};
var Vframe_NotifyAlter = function(vframe, e, mId, p) {
    if (!e) e = {};
    if (!vframe.$ca && vframe.$cr) { //childrenAlter childrenCreated 当前vframe触发过created才可以触发alter事件
        vframe.$cr = 0; //childrenCreated
        vframe.$ca = 1; //childreAleter
        vframe.fire('alter', e);
        mId = vframe.id;
        //var vom = vframe.owner;
        p = Vframe_Vframes[vframe.pId];
        if (p && G_Has(p.$r, mId)) { //readyMap
            p.$rc--; //readyCount
            delete p.$r[mId]; //readyMap
            Vframe_NotifyAlter(p, e);
        }
    }
};
/**
 * 获取根vframe;
 * @return {Vframe}
 * @private
 */
var Vframe_Root = function(rootId, e) {
    if (!Vframe_RootVframe) {
        /*
            尽可能的延迟配置，防止被依赖时，配置信息不正确
        */
        G_DOCBODY = G_DOCUMENT.body;

        rootId = Magix_Cfg.rootId;
        e = G_GetById(rootId);
        if (!e) {
            G_DOCBODY.id = rootId;
        }
        Vframe_RootVframe = new Vframe(rootId);
    }
    return Vframe_RootVframe;
};
var Vframe_Vframes = {};


var Vframe_AddVframe = function(id, vf) {
    if (!G_Has(Vframe_Vframes, id)) {
        Vframe_Vframes[id] = vf;
        Vframe.fire('add', {
            vframe: vf
        });
    }
};

var Vframe_RemoveVframe = function(id, fcc, vf) {
    vf = Vframe_Vframes[id];
    if (vf) {
        delete Vframe_Vframes[id];
        Vframe.fire('remove', {
            vframe: vf,
            fcc: fcc //fireChildrenCreated
        });
    }
};

/**
 * Vframe类
 * @name Vframe
 * @class
 * @constructor
 * @borrows Event.on as on
 * @borrows Event.fire as fire
 * @borrows Event.off as off
 * @borrows Event.on as #on
 * @borrows Event.fire as #fire
 * @borrows Event.off as #off
 * @param {String} id vframe id
 * @property {String} id vframe id
 * @property {String} path 当前view的路径名，包括参数
 * @property {String} pId 父vframe的id，如果是根节点则为undefined
 */
var Vframe = function(id, pId, me) {
    me = this;
    me.id = id;
    //me.vId=id+'_v';
    me.$c = {}; //childrenMap
    me.$cc = 0; //childrenCount
    me.$rc = 0; //readyCount
    me.$s = 1; //signature
    me.$r = {}; //readyMap

    me.pId = pId;
    Vframe_AddVframe(id, me);
};
G_Mix(Vframe, G_Mix({
    /**
     * @lends Vframe
     */
    /**
     * 获取vframe节点
     * @type {Vframe}
     * @return {Vframe} vframe对象
     */
    root: Vframe_Root,
    /**
     * 获取所有的vframe对象
     * @return {Object}
     */
    all: function() {
        return Vframe_Vframes;
    },
    /**
     * 根据vframe的id获取vframe对象
     * @param {String} id vframe的id
     * @return {Vframe|undefined} vframe对象
     */
    get: function(id) {
            return Vframe_Vframes[id];
        }
        /**
         * 注册vframe对象时触发
         * @name Vframe.add
         * @event
         * @param {Object} e
         * @param {Vframe} e.vframe
         */
        /**
         * 删除vframe对象时触发
         * @name Vframe.remove
         * @event
         * @param {Object} e
         * @param {Vframe} e.vframe
         * @param {Boolean} e.fcc 是否派发过created事件
         */
}, Event));

G_Mix(G_Mix(Vframe[G_PROTOTYPE], Event), {
    /**
     * @lends Vframe#
     */
    /**
     * 加载对应的view
     * @param {String} viewPath 形如:app/views/home?type=1&page=2 这样的view路径
     * @param {Object|Null} viewInitParams 调用view的init方法时传递的参数
     */
    mountView: function(viewPath, viewInitParams /*,keepPreHTML*/ ) {
        var me = this;
        var node = G_GetById(me.id),
            po, sign, view;
        if (!me.$a && node) { //alter
            me.$a = 1;
            me.$t = node.innerHTML; //.replace(ScriptsReg, ''); template
        }
        //var useTurnaround=me.$vr&&me.useAnimUpdate();
        me.unmountView( /*keepPreHTML*/ );
        me.$d = 0; //destroyed 详见unmountView
        if (node && viewPath) {
            me.path = viewPath;
            po = G_ParseUri(viewPath);
            sign = ++me.$s;
            G_Require(po.path, function(TView) {
                if (sign == me.$s) { //有可能在view载入后，vframe已经卸载了
                    View_Prepare(TView);
                    var params = G_Mix(po.params, viewInitParams);

                    view = new TView({
                        owner: me,
                        id: me.id
                    }, params);
                    me.$v = view;
                    // view.on('rendered', function(e) {
                    //     me.mountZone(e.id);
                    // });
                    // view.on('prerender', function(e) {
                    //     if (!me.unmountZone(e.id, 0, 1)) {
                    //         Vframe_NotifyAlter(me);
                    //     }
                    // });
                    View_DelegateEvents(view);

                    //Vframe_RunInvokes(me);
                    view.render();

                }
            });
        }
    },
    /**
     * 销毁对应的view
     */
    unmountView: function( /*keepPreHTML*/ ) {
        var me = this;
        var view = me.$v,
            node, reset;

        if (view) {
            if (!Vframe_GlobalAlter) {
                reset = 1;
                Vframe_GlobalAlter = {
                    id: me.id
                };
            }
            me.$d = 1; //用于标记当前vframe处于view销毁状态，在当前vframe上再调用unmountZone时不派发created事件
            me.unmountZone(0, 1);
            Vframe_NotifyAlter(me, Vframe_GlobalAlter);

            me.$v = 0; //unmountView时，尽可能早的删除vframe上的view对象，防止view销毁时，再调用该 vfrmae的类似unmountZone方法引起的多次created
            View_Oust(view);
            node = G_GetById(me.id);
            if (node && me.$a /*&&!keepPreHTML*/ ) { //如果view本身是没有模板的，也需要把节点恢复到之前的状态上：只有保留模板且view有模板的情况下，这条if才不执行，否则均需要恢复节点的html，即view安装前什么样，销毁后把节点恢复到安装前的情况
                G_HTML(node, me.$t);
            }

            /*if (me.$vPrimed) { //viewMounted与viewUnmounted成对出现
                me.$vPrimed = 0;
                me.fire('viewUnmounted');
            }*/
            if (reset)
                Vframe_GlobalAlter = 0;
        }
        me.$s++; //增加signature，阻止相应的回调，见mountView
    },
    /**
     * 加载vframe
     * @param  {String} id             节点id
     * @param  {String} viewPath       view路径
     * @param  {Object} viewInitParams 传递给view init方法的参数
     * @return {Vframe} vframe对象
     * @example
     * // html
     * // &lt;div id="magix_vf_defer"&gt;&lt;/div&gt;
     *
     *
     * //js
     * view.owner.mountVframe('magix_vf_defer','app/views/list',{page:2})
     * //注意：动态向某个节点渲染view时，该节点无须是vframe标签
     */
    mountVframe: function(id, viewPath, viewInitParams /*, keepPreHTML*/ ) {
        var me = this,
            vf;
        Vframe_NotifyAlter(me); //如果在就绪的vframe上渲染新的vframe，则通知有变化
        //var vom = me.owner;
        vf = Vframe_Vframes[id];
        if (!vf) {
            if (!G_Has(me.$c, id)) { //childrenMap,当前子vframe不包含这个id

                me.$cc++; //childrenCount ，增加子节点
            }
            me.$c[id] = id; //map
            vf = new Vframe(id, me.id);
        }
        vf.mountView(viewPath, viewInitParams /*,keepPreHTML*/ );
        return vf;
    },
    /**
     * 加载当前view下面的子view，因为view的持有对象是vframe，所以是加载vframes
     * @param {HTMLElement|String} zoneId 节点对象或id
     * @param {Object} viewInitParams 传递给view init方法的参数
     */
    mountZone: function(zoneId, viewInitParams /*,keepPreHTML*/ ) {
        var me = this;

        var i, vf, id;
        zoneId = zoneId || me.id;

        var vframes = $(G_HashKey + zoneId + ' [mx-view]');
        /*
            body(#mx-root)
                div(mx-vframe=true,mx-view='xx')
                    div(mx-vframe=true,mx-view=yy)
            这种结构，自动构建父子关系，
            根结点渲染，获取到子列表[div(mx-view=xx)]
                子列表渲染，获取子子列表的子列表
                    加入到忽略标识里
            会导致过多的dom查询

            现在使用的这种，无法处理这样的情况，考虑到项目中几乎没出现过这种情况，先采用高效的写法
            上述情况一般出现在展现型页面，dom结构已经存在，只是附加上js行为
            不过就展现来讲，一般是不会出现嵌套的情况，出现的话，把里面有层级的vframe都挂到body上也未尝不可，比如brix2.0
         */

        me.$h = 1; //hold fire creted
        me.unmountZone(zoneId, 1);

        for (i = vframes.length - 1; i >= 0; i--) {
            vf = vframes[i];
            id = vf.id || (vf.id = G_Id());

                me.mountVframe(id, vf.getAttribute('mx-view'), viewInitParams);

        }
        me.$h = 0;
        Vframe_NotifyCreated(me);
    },
    /**
     * 销毁vframe
     * @param  {String} [id]      节点id
     */
    unmountVframe: function(id /*,keepPreHTML*/ , inner) { //inner 标识是否是由内部调用，外部不应该传递该参数
        var me = this,
            vf, fcc, pId;
        id = id ? me.$c[id] : me.id;
        //var vom = me.owner;
        vf = Vframe_Vframes[id];
        if (vf) {
            fcc = vf.$cr; //childrenCreated
            pId = vf.pId;
            vf.unmountView( /*keepPreHTML*/ );
            Vframe_RemoveVframe(id, fcc);
            vf.id = vf.pId = G_EMPTY; //清除引用,防止被移除的view内部通过setTimeout之类的异步操作有关的界面，影响真正渲染的view
            vf = Vframe_Vframes[pId];
            if (vf && G_Has(vf.$c, id)) { //childrenMap
                delete vf.$c[id]; //childrenMap

                vf.$cc--; //cildrenCount
                if (!inner) Vframe_NotifyCreated(vf); //移除后通知完成事件
            }
        }
    },
    /**
     * 销毁某个区域下面的所有子vframes
     * @param {HTMLElement|String} [zoneId]节点对象或id
     */
    unmountZone: function(zoneId /*,keepPreHTML*/ , inner) {
        var me = this;
        var p;
        var cm = me.$c;
        for (p in cm) {
            if (!zoneId || (p != zoneId && G_NodeIn(p, zoneId))) {
                me.unmountVframe(p /*,keepPreHTML,*/ , 1);
            }
        }
        if (!inner) Vframe_NotifyCreated(me);
    }
        /**
         * 子孙view修改时触发
         * @name Vframe#alter
         * @event
         * @param {Object} e
         */

    /**
     * 子孙view创建完成时触发
     * @name Vframe#created
     * @event
     * @param {Object} e
     */
});
Magix.Vframe = Vframe;


/**
 * Vframe 中的2条线
 * 一：
 *     渲染
 *     每个Vframe有$cc(childrenCount)属性和$c(childrenItems)属性
 *
 * 二：
 *     修改与创建完成
 *     每个Vframe有rC(readyCount)属性和$r(readyMap)属性
 *
 *      fca firstChildrenAlter  fcc firstChildrenCreated
 */
    // var Body_DOMGlobalProcessor = function(e, d) {
    //     d = e.data;
    //     G_ToTry(d.f, e, d.v);
    // };
    var Body_DOMEventLibBind = function(node, type, cb, remove) {
        /*if (remove) {
            $(node).off(type, selector, cb);
        } else {
            $(node).on(type, selector, scope, cb);
        }*/
        $(node)[remove ? 'off' : Event_ON](type, cb);
    };
    /*
    dom event处理思路

    性能和低资源占用高于一切，在不特别影响编程体验的情况下，向性能和资源妥协

    1.所有事件代理到body上
    2.优先使用原生冒泡事件，使用mouseover+view.inside代替mouseenter
        'over<mouseover>':function(e){
            if(!Magix.inside(e.relatedTarget,e.current)){
                //enter
            }
        }
    3.事件支持嵌套，向上冒泡
 */
var Body_ParentNode = 'parentNode';
var Body_EvtInfoCache = new G_Cache(30, 10);
var Body_EvtInfoReg = /([^\(]+)\(([\s\S]*)?\)/;
var Body_RootEvents = {};


var Body_DOMEventProcessor = function(e) {
    var current = e.target;
    var eventType = e.type;
    var type = 'mx-' + eventType;
    var info;
    var ignore;
    var arr = [];
    var vframe, view, vId, begin, tempId, match, name, fn;

    while (current != G_DOCBODY && current.nodeType == 1) { //找事件附近有mx-[a-z]+事件的DOM节点,考虑在向上遍历的过程中，节点被删除，所以需要判断nodeType,主要是IE
        if ((info = current.getAttribute(type))) {
            arr = [];
            //ts = info.split(G_SPLITER);
            //info = ts.pop();
            vId = current.$f; //ts[0];
            if (!vId) { //如果没有则找最近的vframe
                begin = current;
                /*
                    关于下方的while
                    考虑这样的结构：
                    div(mx-vframe,id=outer)
                        div(mx-vframe,mx-userevent="change()",id=inner)
                            content
                    当inner做为组件存在时，比如webcomponents，从根节点inner向外派发userevent事件
                    外vframe outer做为inner的userevent监听者，监听表达式自然是写到inner根节点

                    所以，当找到事件信息后，直接从事件信息的上一层节点开始查找最近的vframe，不应该从当前节点上查找

                    div(mx-click="test()")
                        click here
                 */
                while ((begin = begin[Body_ParentNode])) {

                    if (G_Has(Vframe_Vframes, tempId = begin.id)) {
                        current.$f = vId = tempId;
                        //current.setAttribute(type, (vId = tempId) + G_SPLITER + info);
                        break;
                    }

                }
            }
            if (vId) { //有处理的vframe,派发事件，让对应的vframe进行处理
                vframe = Vframe_Vframes[vId]  ;
                view = vframe && vframe.$v;
                if (view && view.$s > 0) {
                    match = Body_EvtInfoCache.get(info);
                    if (!match) {
                        match = info.match(Body_EvtInfoReg) || G_EMPTY_ARRAY;
                        match = {
                            n: match[1],
                            i: match[2]
                        };
                        /*jshint evil: true*/
                        match.p = match.i && G_ToTry(Function('return ' + match.i)) || {};
                        Body_EvtInfoCache.set(info, match);
                    }
                    name = match.n + G_SPLITER + eventType;
                    fn = view[name];
                    if (fn) {
                        e.current = current;
                        e.params = match.p;
                        G_ToTry(fn, e, view);
                        //e.previous = current; //下一个处理函数可检测是否已经处理过
                    }
                }
            } else {
                Magix_Cfg.error(Error('bad:' + info));
            }
        }
        if ((ignore = current.$) && ignore[eventType] || e.mxStop || e.isPropagationStopped()) { //避免使用停止事件冒泡，比如别处有一个下拉框，弹开，点击到阻止冒泡的元素上，弹出框不隐藏
            break;
        } else {
            arr.push(current);
        }
        current = current[Body_ParentNode] || G_DOCBODY;
    }
    while ((current = arr.pop())) {
        ignore = current.$ || (current.$ = {});
        ignore[eventType] = 1;
    }
};
var Body_DOMEventBind = function(type, remove) {
    var counter = Body_RootEvents[type] | 0;
    var step = counter > 0 ? 1 : 0;
    counter += remove ? -step : step;
    if (!counter) {
        Body_DOMEventLibBind(G_DOCBODY, type, Body_DOMEventProcessor, remove);
        if (!remove) {
            counter = 1;
        }
    }
    Body_RootEvents[type] = counter;
};


    var View_EvtMethodReg = /^([^<]+)<([^>]+)>$/;
//var View_EvtSelectorReg = /\$(.+)/;
//var View_MxEvt = /\smx-(?!view|vframe)[a-z]+\s*=\s*"/g;

var View_WrapRender = function(prop, fn, me) {
    fn = prop.render;
    prop.render = function() {
        me = this;
        if (me.$s > 0) { //signature
            me.$s++;
            me.fire('rendercall');

            G_ToTry(fn, G_Slice.call(arguments), me);
        }
    };
};
var View_DelegateEvents = function(me, destroy) {
    var events = me.$eo; //eventsObject
    var p /*, e*/ ;
    for (p in events) {
        Body_DOMEventBind(p, destroy);
    }
    // events = me.$el; //eventsList
    // p = events.length;
    // while (p--) {
    //     e = events[p];
    //     Body_DOMEventLibBind(e.h, e.t, e.s && G_HashKey + me.id + ' ' + e.s, Body_DOMGlobalProcessor, destroy, {
    //         v: me,
    //         f: e.f
    //     });
    // }
};

// var View_Style_Map;
// var View_Style_Key;
// var View_Style_Reg = /(\.)([\w\-]+)(?=[^\{\}]*?\{)/g;
// var View_Style_Processor = function(m, dot, name) {
//     return dot + (View_Style_Map[name] = View_Style_Key + name);
// };

//
//console.log((a=r.responseText).replace(/(\.)([\w\-]+)(?=[^\{\}]*?\{)/g,function(m,k,v){console.log(m);o[v]=v+'0';return k+v+'0'}));
// var View_StyleNameKeyReg = /[^,]+(?=,|$)/g;
// var View_StyleNamePickReg = /(^|\})\s*([^{}]+)(?=\{)/mg;
// var View_StyleCssKeyTemp; //
// var View_StyleCallback = function(m, left, key) {
//     return left + key.replace(View_StyleNameKeyReg, '.' + View_StyleCssKeyTemp + ' $&');
// };

// var View_Globals = {
//     win: G_WINDOW,
//     doc: G_DOCUMENT
// };
/**
 * 预处理view
 * @param  {View} oView view子类
 * @param  {Vom} vom vom
 */
var View_Prepare = function(oView) {
    if (!oView[G_SPLITER]) { //只处理一次
        oView[G_SPLITER] = 1;
        //oView.extend = me.extend;
        var prop = oView[G_PROTOTYPE],
            old, temp, name, evts, eventsObject = {},
            p;
        /*,eventsList = [],node, p, selector;*/
        for (p in prop) {
            old = prop[p];
            temp = p.match(View_EvtMethodReg);
            if (temp) {
                name = temp[1];
                evts = temp[2];
                evts = evts.split(G_COMMA);
                while ((temp = evts.pop())) {
                    // selector = name.match(View_EvtSelectorReg);
                    // if (selector) {
                    //     name = selector[1];
                    //     node = View_Globals[name];
                    //     eventsList.push({
                    //         f: old,
                    //         s: node ? G_NULL : name,
                    //         t: temp,
                    //         h: node || G_DOCBODY
                    //     });
                    // } else {
                    eventsObject[temp] = 1;
                    prop[name + G_SPLITER + temp] = old;
                    //}
                }
            }
        }
        View_WrapRender(prop);
        prop.$eo = eventsObject;
        //prop.$el = eventsList;

        //css = prop.css;
        /*
            view上添加的style样式字符串，经magix处理后，会变成一个name映射对象，在页面上使用时，使用style.name来获取处理后的class名称
         */
        // if (css) {
        //     prop.cssNames = View_Style_Map = {};
        //     View_Style_Key = oView.$k;
        //     oView.$c = css.replace(View_Style_Reg, View_Style_Processor);
        // }

    }
};

var View_Oust = function(view) {
    if (view.$s > 0) {
        view.$s = 0;
        view.fire('destroy', 0, 1, 1);

        View_DelegateEvents(view, 1);
    }
    view.$s--;
};
/**
 * View类
 * @name View
 * @class
 * @constructor
 * @borrows Event.on as #on
 * @borrows Event.fire as #fire
 * @borrows Event.off as #off
 * @param {Object} ops 创建view时，需要附加到view对象上的其它属性
 * @property {String} id 当前view与页面vframe节点对应的id
 * @property {Vframe} owner 拥有当前view的vframe对象
 * @example
 * // 关于事件:
 * // html写法：
 *
 * //  &lt;input type="button" mx-click="test({id:100,name:'xinglie'})" value="test" /&gt;
 * //  &lt;a href="http://etao.com" mx-click="test({com:'etao.com'})"&gt;http://etao.com&lt;/a&gt;
 *
 * // js写法：
 *
 *     'test&lt;click&gt;':function(e){
 *          e.preventDefault();
 *          //e.current 处理事件的dom节点(即带有mx-click属性的节点)
 *          //e.target 触发事件的dom节点(即鼠标点中的节点，在current里包含其它节点时，current与target有可能不一样)
 *          //e.params  传递的参数
 *          //e.params.com,e.params.id,e.params.name
 *      },
 *      'test&lt;mousedown&gt;':function(e){
 *
 *       }
 *
 *  //上述示例对test方法标注了click与mousedown事件，也可以合写成：
 *  'test&lt;click,mousedown&gt;':function(e){
 *      alert(e.type);//可通过type识别是哪种事件类型
 *  }
 */


var View = function(ops, me) {
    me = this;
    G_Mix(me, ops);


    me.$s = 1; //标识view是否刷新过，对于托管的函数资源，在回调这个函数时，不但要确保view没有销毁，而且要确保view没有刷新过，如果刷新过则不回调

};
var ViewProto = View[G_PROTOTYPE];
G_Mix(View, {
    /**
     * @lends View
     */
    /**
     * 扩展View
     * @param  {Object} props 扩展到原型上的方法
     * @example
     * define('app/tview',function(require){
     *     var Magix = require('magix');
     *     Magix.View.merge({
     *         ctor:function(){
     *             this.$attr='test';
     *         },
     *         test:function(){
     *             alert(this.$attr);
     *         }
     *     });
     * });
     * //加入Magix.config的exts中
     *
     *  Magix.config({
     *      //...
     *      exts:['app/tview']
     *
     *  });
     *
     * //这样完成后，所有的view对象都会有一个$attr属性和test方法
     * //当前上述功能也可以用继承实现，但继承层次太多时，可以考虑使用扩展来消除多层次的继承
     *
     */

    /**
     * 继承
     * @param  {Object} [props] 原型链上的方法或属性对象
     * @param  {Object} [statics] 静态对象或方法
     */
    extend: function(props, statics) {
        var me = this;
        props = props || {};
        var ctor = props.ctor;
        var NView = function(a, b) {
            me.call(this, a, b);
            if (ctor) ctor.call(this, b);
        };
        NView.extend = me.extend;
        return G_Extend(NView, me, props, statics);
    }
});
G_Mix(G_Mix(ViewProto, Event), {
    /**
     * @lends View#
     */
    /**
     * 渲染view，供最终view开发者覆盖
     * @function
     */
    render: G_NOOP,


    // *
    //  * 包装mx-event事件，比如把mx-click="test<prevent>({key:'field'})" 包装成 mx-click="magix_vf_root^test<prevent>({key:'field})"，以方便识别交由哪个view处理
    //  * @function
    //  * @param {String} html 处理的代码片断
    //  * @param {Boolean} [onlyAddPrefix] 是否只添加前缀
    //  * @return {String} 处理后的字符串
    //  * @example
    //  * View.extend({
    //  *     'del&lt;click&gt;':function(e){
    //  *         S.one(G_HashKey+e.currentId).remove();
    //  *     },
    //  *     'addNode&lt;click&gt;':function(e){
    //  *         var tmpl='&lt;div mx-click="del"&gt;delete&lt;/div&gt;';
    //  *         //因为tmpl中有mx-click，因此需要下面这行代码进行处理一次
    //  *         tmpl=this.wrapEvent(tmpl);
    //  *         S.one(G_HashKey+e.currentId).append(tmpl);
    //  *     }
    //  * });
    //  * //注意，只有动态添加的节点才需要处理

    // wrapEvent: function(html) {
    //     return (html + G_EMPTY).replace(View_MxEvt, '$&' + this.id + G_SPLITER);
    // },
    /**
     * 通知当前view即将开始进行html的更新
     * @param {String} [id] 哪块区域需要更新，默认整个view
     */
    beginUpdate: function(id, me) {
        me = this;
        if (me.$s > 0 && me.$p) {
            me.owner.unmountZone(id, 1);
            // me.fire('prerender', {
            //     id: id
            // });
        }
    },
    /**
     * 通知当前view结束html的更新
     * @param {String} [id] 哪块区域结束更新，默认整个view
     */
    endUpdate: function(id, me  ) {
        me = this;
        if (me.$s > 0) {
            // me.fire('rendered', {
            //     id: id
            // });

            me.$p = 1;

            me.owner.mountZone(id);

        }
    },
    /**
     * 包装异步回调
     * @param  {Function} fn 异步回调的function
     * @return {Function}
     * @example
     * render:function(){
     *     setTimeout(this.wrapAsync(function(){
     *         //codes
     *     }),50000);
     * }
     * //为什么要包装一次？
     * //Magix是单页应用，有可能异步回调执行时，当前view已经被销毁。比如上例中的setTimeout，50s后执行回调，如果你的回调中去操作了DOM，则会出错，为了避免这种情况的出现，可以调用view的wrapAsync包装一次。(该示例中最好的做法是在view销毁时清除setTimeout，但有时候你很难控制回调的执行，所以最好包装一次)
     * //
     * //
     */
    wrapAsync: function(fn, context) {
        var me = this;
        var sign = me.$s;
        return function() {
            if (sign > 0 && sign == me.$s) {
                if (fn) fn.apply(context || me, arguments);
            }
        };
    },




    /**
     * 设置view的html内容
     * @param {String} id 更新节点的id
     * @param {Strig} html html字符串
     * @example
     * render:function(){
     *     this.setHTML(this.id,this.tmpl);//渲染界面，当界面复杂时，请考虑用其它方案进行更新
     * }
     */
    setHTML: function(id, html) {
        var me = this,
            n;
        me.beginUpdate(id);
        if (me.$s > 0) {
            n = G_GetById(id);
            if (n) G_HTML(n, html);
        }
        me.endUpdate(id);
    }


    /**
     * 当view调用setHTML刷新前触发
     * @name View#prerender
     * @event
     * @param {Object} e
     * @param {String} e.id 指示哪块区域要进行更新
     */

    /**
     * 每次调用setHTML更新view内容完成后触发
     * @name View#rendered
     * @event
     * @param {Object} e view 完成渲染后触发
     * @param {String} e.id 指示哪块区域完成的渲染
     */

    /**
     * view销毁时触发
     * @name View#destroy
     * @event
     * @param {Object} e
     */

    /**
     * 异步更新ui的方法(render)被调用前触发
     * @name View#rendercall
     * @event
     * @param {Object} e
     */
});
Magix.View = View;




    return Magix;
});