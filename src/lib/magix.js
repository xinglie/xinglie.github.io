/*!1.0.5 kooboy_li@163.com*/
/*
    generate by magix-composer@1.0.5
    https://github.com/thx/magix-composer
    author: xinglie.lkf@alibaba-inc.com
    loader:module
 */

/*
version:5.0.2 Licensed MIT
author:kooboy_li@163.com
loader:module
enables:rich,mixins,mxevent,richVframe,xml,router,routerHash,richView
optionals:routerState,routerTip,routerTipLockUrl,recast,require,customTags,checkAttr,webc,service,state,seajs
*/
if (typeof DEBUG == 'undefined')
    window.DEBUG = true;
//VARS
let Counter = 0;
let Empty = '';
let Empty_Array = [];
let Comma = ',';
let Null = null;
let Doc_Window = window;
let Undefined = void Counter;
let Doc_Document = document;
let Timeout = Doc_Window.setTimeout; //setTimeout;
let Encode = encodeURIComponent;
let Value = 'value';
let Tag_Static_Key = '_';
let Tag_View_Params_Key = '$';
let Tag_Prop_Id = 'id';
let Hash_Key = '#';
function Noop() { }
let JSON_Stringify = JSON.stringify;
let Header = Doc_Document.head;
let Doc_Body;
let Pfm = Doc_Window.performance;
let Date_Now = Pfm.now.bind(Pfm);
let ToObject = expr => ToTry(Function(`return ${expr}`));
/*
    关于spliter
    出于安全考虑，使用不可见字符\u0000，然而，window手机上ie11有这样的一个问题：'\u0000'+"abc",结果却是一个空字符串，好奇特。
 */
let Spliter = '\x1e';
let Prototype = 'prototype';
let Params = 'params';
let Path = 'path';
let MX_View = 'mx-view';
let ToString = Object[Prototype].toString;
let Type = o => ToString.call(o).slice(8, -1);
let IsObject = o => Type(o) == 'Object';
let IsArray = Array.isArray;
let GUID = (prefix) => (prefix || Tag_Static_Key) + Counter++;
let GetById = id => Doc_Document.getElementById(id);
let SetInnerHTML = (n, html) => n.innerHTML = html;
let Mx_Cfg = {
    rootId: GUID(),
    error(e) {
        throw e;
    }
};
let IsPrimitive = args => !args || typeof args != 'object';
let NodeIn = (a, b, r) => {
    if (a && b) {
        r = a == b;
        if (!r) {
            try {
                r = (b.compareDocumentPosition(a) & 16) == 16;
            }
            catch (_magix) { }
        }
    }
    return r;
};
let Mark = (me, key, host, m, k) => {
    k = Spliter + 'a';
    if (!me[k]) {
        k = Spliter + 'b';
        host = me[k] || (me[k] = {});
        if (!Has(host, key)) {
            host[key] = 0;
        }
        m = ++host[key];
    }
    return t => (t = me[k], t && m === t[key]);
};
let Unmark = me => {
    me[Spliter + 'b'] = 0;
    me[Spliter + 'a'] = 1;
};
let { assign: Assign, keys: Keys, hasOwnProperty: HasProp } = Object;
let GA = Header.getAttribute;
let GetAttribute = (node, attr) => GA.call(node, attr);
let ApplyStyle = (key, css, node) => {
    if (DEBUG && IsArray(key)) {
        let result = [];
        for (let i = 0; i < key.length; i += 2) {
            result.push(ApplyStyle(key[i], key[i + 1]));
        }
        return result;
    }
    if (css && !ApplyStyle[key]) {
        ApplyStyle[key] = 1;
        if (DEBUG) {
            if (key.indexOf('$throw_') === 0) {
                throw new Error(css);
            }
            node = Doc_Document.createElement('style');
            node.id = key;
            SetInnerHTML(node, css);
            Header.appendChild(node);
        }
        else {
            node = Doc_Document.createElement('style');
            SetInnerHTML(node, css);
            Header.appendChild(node);
        }
    }
};
let ToTry = (fn, args, context, r) => {
    try {
        if (IsArray(args)) {
            r = fn.apply(context, args);
        }
        else {
            r = fn.call(context, args);
        }
    }
    catch (x) {
        Mx_Cfg.error(x);
    }
    return r;
};
let Has = (owner, prop) => owner && HasProp.call(owner, prop);
let TranslateData = (data, params) => {
    let p, val;
    if (IsPrimitive(params)) {
        p = params + Empty;
        if (p[0] == Spliter) {
            params = data[p];
        }
    }
    else {
        for (p in params) {
            val = params[p];
            val = TranslateData(data, val);
            params[p] = val;
        }
    }
    return params;
};
let CacheSort = (a, b) => b['a'] - a['a'];
//let CacheCounter = 0;
function MxCache(max, buffer /*, remove?: (item: any) => void*/, me) {
    me = this;
    me['a'] = [];
    me['b'] = buffer || 5; //buffer先取整，如果为0则再默认5
    me['c'] = me['b'] + (max || 20);
    //me['d'] = remove;
}
Assign(MxCache[Prototype], {
    get(key) {
        let me = this;
        let c = me['a'];
        let r = c[Spliter + key];
        if (r) {
            r['a']++;
            //r['b'] = CacheCounter++;
            r = r['c'];
        }
        return r;
    },
    set(okey, value) {
        let me = this;
        let c = me['a'];
        let key = Spliter + okey;
        let r = c[key];
        let t = me['b'];
        if (!r) {
            if (c.length >= me['c']) {
                c.sort(CacheSort);
                while (t--) {
                    r = c.pop();
                    //为什么要判断r['a']>0,考虑这样的情况：用户设置a,b，主动删除了a,重新设置a,数组中的a原来指向的对象残留在列表里，当排序删除时，如果不判断则会把新设置的删除，因为key都是a
                    //
                    if (r['a'] > 0)
                        me.del(r.o); //如果没有引用，则删除
                }
            }
            r = {
                'd': okey
            };
            c.push(r);
            c[key] = r;
        }
        r['c'] = value;
        r['a'] = 1;
        //r['b'] = CacheCounter++;
    },
    del(k) {
        k = Spliter + k;
        let c = this['a'];
        let r = c[k] /*,
            m = this['d']*/;
        if (r) {
            r['a'] = -1;
            r['c'] = Empty;
            c[k] = Null;
            //if (m) {
            //ToTry(m, r['d']);
            //}
        }
    },
    has(k) {
        return Has(this['a'], Spliter + k);
    }
});
let EventDefaultOptions = {
    bubbles: true,
    cancelable: true
};
//https://www.w3.org/TR/dom/#interface-event
let DispatchEvent = (element, type, data) => {
    let e = new Event(type, EventDefaultOptions);
    Assign(e, data);
    element.dispatchEvent(e);
};
let AttachEventHandlers = [];
let AddEventListener = (element, type, fn, viewId, eventOptions, view) => {
    let h = {
        'a': viewId,
        'b': fn,
        'c': type,
        'd': element,
        'e'(e) {
            if (viewId) {
                ToTry(fn, e, view);
            }
            else {
                fn(e);
            }
        }
    };
    AttachEventHandlers.push(h);
    element.addEventListener(type, h['e'], eventOptions);
};
let RemoveEventListener = (element, type, cb, viewId, eventOptions) => {
    for (let c, i = AttachEventHandlers.length; i--;) {
        c = AttachEventHandlers[i];
        if (c['c'] == type &&
            c['a'] == viewId &&
            c['d'] == element &&
            c['b'] === cb) {
            AttachEventHandlers.splice(i, 1);
            element.removeEventListener(type, c['e'], eventOptions);
            break;
        }
    }
};
let Decode = decodeURIComponent;
let PathToObject = new MxCache();
let ParseUri = path => {
    //把形如 /xxx/?a=b&c=d 转换成对象 {path:'/xxx/',params:{a:'b',c:'d'}}
    //1. /xxx/a.b.c.html?a=b&c=d  path /xxx/a.b.c.html
    //2. /xxx/?a=b&c=d  path /xxx/
    //5. /xxx/index.html  => path /xxx/index.html
    //11. ab?a&b          => path ab  params:{a:'',b:''}
    let r = PathToObject.get(path), pathname, key, value, po, q;
    if (!r) {
        po = {};
        q = path.indexOf('?');
        if (q == -1) {
            pathname = path;
        }
        else {
            pathname = path.substring(0, q);
            path = path.substring(q + 1);
            if (path) {
                for (q of path.split('&')) {
                    [key, value] = q.split('=');
                    po[Decode(key)] = Decode(value || Empty);
                }
            }
        }
        PathToObject.set(path, r = {
            a: pathname,
            b: po
        });
    }
    return {
        path: r.a,
        params: Assign({}, r.b)
    };
};
let ToUri = (path, params, keo) => {
    let arr = [], v, p, f;
    for (p in params) {
        v = params[p] + Empty;
        if (!keo || v || Has(keo, p)) {
            v = Encode(v);
            arr.push(f = p + '=' + v);
        }
    }
    if (f) {
        path += (path && (path.includes('?') ? '&' : '?')) + arr.join('&');
    }
    return path;
};
let ToMap = (list, key) => {
    let e, map = {};
    if (list) {
        for (e of list) {
            map[(key && e) ? e[key] : e] = key ? e : (map[e] | 0) + 1; //对于简单数组，采用累加的方式，以方便知道有多少个相同的元素
        }
    }
    return map;
};
let ParseExprCache = new MxCache();
let ParseExpr = (expr, data, result) => {
    if (ParseExprCache.has(expr)) {
        result = ParseExprCache.get(expr);
    }
    else {
        result = ToObject(expr);
        if (expr.includes(Spliter)) {
            TranslateData(data, result);
            if (DEBUG) {
                result = Safeguard(result, true);
            }
        }
        else {
            if (DEBUG) {
                result = Safeguard(result, true);
            }
            ParseExprCache.set(expr, result);
        }
    }
    return result;
};
let CallIndex = 0;
let CallList = [];
let CallBreakTime = 32;
let StartCall = () => {
    let last = Date_Now(), next, args, context;
    try {
        while (CallBreakTime) {
            next = CallList[CallIndex - 1];
            context = CallList[CallIndex];
            args = CallList[CallIndex + 1];
            CallIndex += 4;
            if (next) {
                if (next != Noop) {
                    if (IsArray(args)) {
                        next.apply(context, args);
                    }
                    else {
                        next.call(context, args);
                    }
                }
                if (Date_Now() - last > CallBreakTime &&
                    CallList.length > CallIndex) {
                    Timeout(StartCall);
                    console.log(`[CF] take a break of ${CallList.length} at ${CallIndex}`);
                    break;
                }
            }
            else {
                CallList.length = CallIndex = 0;
                break;
            }
        }
    }
    catch (ex) {
        Mx_Cfg.error(ex);
        Timeout(StartCall);
    }
};
let CallFunction = (fn, args, context, id) => {
    if (!CallIndex) {
        CallIndex = 1;
        Timeout(StartCall);
    }
    if (id) {
        for (let i = CallList.length - 1; i >= CallIndex; i -= 4) {
            if (CallList[i] == id) {
                CallList[i - 3] = Noop;
                console.log('ignore id', id);
            }
        }
    }
    CallList.push(fn, context, args, id);
};
let M_Ext = '.js';
let ImportPromises = {};
let Async_Require = (name, fn) => {
    if (name) {
        if (!IsArray(name))
            name = [name];
        let a = [], b = [], f, s, p;
        let paths = Mx_Cfg.paths;
        for (f of name) {
            s = f.indexOf('/');
            if (s > -1 && !f.startsWith('.')) {
                p = f.slice(0, s);
                f = f.slice(s + 1);
                if (DEBUG) {
                    f = (paths[p] || `unset/${p}/path/`) + f;
                }
                else {
                    f = paths[p] + f;
                }
            }
            if (!f.endsWith(M_Ext)) {
                f += M_Ext;
            }
            if (!ImportPromises[f]) {
                ImportPromises[f] = import(f);
            }
            a.push(ImportPromises[f]);
        }
        Promise.all(a).then(args => {
            for (f of args) {
                b.push(f.default);
            }
            CallFunction(fn, b);
        });
    }
    else {
        CallFunction(fn);
    }
};
function T() { }
let Extend = (ctor, base, props, statics, cProto) => {
    //bProto.constructor = base;
    T[Prototype] = base[Prototype];
    cProto = new T();
    Assign(cProto, props);
    Assign(ctor, statics);
    cProto.constructor = ctor;
    ctor[Prototype] = cProto;
    return ctor;
};
let Safeguard = data => data;
if (DEBUG && window.Proxy) {
    let ProxiesPool = new Map();
    Safeguard = (data, allowDeep, setter, prefix = '') => {
        if (IsPrimitive(data)) {
            return data;
        }
        let key = prefix + '\x01' + setter;
        let p = data['\x01_sf_\x01'];
        if (p && p.proxy) {
            data = p.entity;
        }
        let list = ProxiesPool.get(data);
        if (list) {
            for (let e of list) {
                if (e.key == key) {
                    return e.entity;
                }
            }
        }
        let entity = new Proxy(data, {
            set(target, property, value) {
                if (!setter && (!prefix || !allowDeep)) {
                    throw new Error('avoid writeback, key: "' + prefix + property + '" value: ' + value + ' more info: https://github.com/thx/magix/issues/38');
                }
                if (setter) {
                    setter(prefix + property, value);
                }
                target[property] = value;
                return true;
            },
            get(target, property) {
                if (property == '\x01_sf_\x01') {
                    return {
                        entity: data,
                        proxy: true
                    };
                }
                let out = target[property];
                if (!allowDeep &&
                    Has(target, property) &&
                    (IsArray(out) || IsObject(out))) {
                    return Safeguard(out, allowDeep, setter, prefix + property + '.');
                }
                return out;
            }
        });
        if (!prefix) {
            if (!list) {
                list = [];
            }
            list.push({
                key,
                entity
            });
            ProxiesPool.set(data, list);
        }
        return entity;
    };
}
let MxEvent = {
    fire(name, data) {
        let key = Spliter + name, me = this, list = me[key], idx = 0, len, t;
        if (!data)
            data = {};
        data.type = name;
        if (list) {
            for (len = list.length; idx < len; idx++) {
                t = list[idx];
                if (t.f) {
                    t.x = 1;
                    ToTry(t.f, data, me);
                    t.x = Empty;
                }
                else if (!t.x) {
                    list.splice(idx--, 1);
                    len--;
                }
            }
        }
        list = me[`on${name}`];
        if (list)
            ToTry(list, data, me);
        return me;
    },
    on(name, f) {
        let me = this;
        let key = Spliter + name;
        let list = me[key] || (me[key] = []);
        list.push({
            f
        });
        return me;
    },
    off(name, fn) {
        let key = Spliter + name, me = this, list = me[key], t;
        if (fn) {
            if (list) {
                for (t of list) {
                    if (t.f == fn) {
                        t.f = Empty;
                        break;
                    }
                }
            }
        }
        else {
            me[key] = Null;
            me[`on${name}`] = Null;
        }
        return me;
    }
};
let Router_UpdateHash = (path, replace) => {
    Router_WinLoc[replace ? 'replace' : 'assign'](Hash_Key + path);
};
let Router_Update = (path, params, loc, replace, silent, lQuery) => {
    path = Router_PNR_Rebuild(path, params, lQuery);
    if (path != loc.srcHash) {
        Router_Silent = silent;
        Router_UpdateHash(path, replace);
    }
};
let Router_Bind = () => {
    AddEventListener(Doc_Window, 'hashchange', Router_Diff);
    Router_Diff();
};
let Router_Unbind = () => {
    RemoveEventListener(Doc_Window, 'hashchange', Router_Diff);
    Router_LLoc = Router_Init_Loc;
};
let Changed = 'changed';
let Router_VIEW = 'view';
let Router_HrefCache = new MxCache();
let Router_ChgdCache = new MxCache();
let Router_WinLoc = location;
let Router_LastChanged;
let Router_Silent = 0;
let Router_Init_Loc = {
    query: {},
    [Params]: {},
    href: Empty
};
let Router_LLoc = Router_Init_Loc;
let Router_TrimHashReg = /(?:^.*\/\/[^\/]+|#.*$)/gi;
let Router_TrimQueryReg = /^[^#]*#?/;
function GetParam(key, defaultValue) {
    return this[Params][key] || defaultValue !== Undefined ? defaultValue + Empty : Empty;
}
let Router_PNR_Routers, Router_PNR_UnmatchView, Router_PNR_DefaultView, Router_PNR_DefaultPath;
let Router_PNR_Rewrite;
let Router_PNR_Rebuild = ToUri;
let Router_Init_PNR = () => {
    if (!Router_PNR_Routers) {
        Router_PNR_Routers = Mx_Cfg.routes || {};
        Router_PNR_UnmatchView = Mx_Cfg.unmatchView;
        Router_PNR_DefaultView = Mx_Cfg.defaultView;
        //支持默认配置带参数的情况
        Router_PNR_DefaultPath = ParseUri(Mx_Cfg.defaultPath || '/');
        Router_PNR_Rewrite = Mx_Cfg.rewrite;
        Router_PNR_Rebuild = Mx_Cfg.rebuild || Router_PNR_Rebuild;
    }
};
let Router_AttachViewAndPath = (loc, view) => {
    if (!loc[Router_VIEW]) {
        let path = loc.hash[Path];
        if (!path) {
            path = Router_PNR_DefaultPath[Path];
            Assign(loc[Params], Router_PNR_DefaultPath[Params]);
        }
        if (Router_PNR_Rewrite) {
            path = Router_PNR_Rewrite(path, loc[Params], Router_PNR_Routers);
        }
        view = Router_PNR_Routers[path] || Router_PNR_UnmatchView || Router_PNR_DefaultView;
        loc[Path] = path;
        loc[Router_VIEW] = view;
        if (IsObject(view)) {
            if (DEBUG) {
                if (!view[Router_VIEW]) {
                    console.error(path, ' config missing view!', view);
                }
                let guardProps = ['get', 'hash', 'href', 'params', 'path', 'query', 'srcHash', 'srcQuery'];
                for (let p of guardProps) {
                    if (Has(view, p)) {
                        throw new Error(`can not overwrite "${p}" from object ${JSON.stringify(view)}`);
                    }
                }
            }
            Assign(loc, view);
        }
    }
};
let Router_GetChged = (oldLocation, newLocation) => {
    let oKey = oldLocation.href;
    let nKey = newLocation.href;
    let tKey = oKey + Spliter + nKey;
    let result = Router_ChgdCache.get(tKey);
    if (!result) {
        let hasChanged, rps;
        result = {
            params: rps = {},
            force: !oKey //是否强制触发的changed，对于首次加载会强制触发一次
        };
        let oldParams = oldLocation[Params], newParams = newLocation[Params], tArr = Keys(oldParams).concat(Keys(newParams)), key;
        let setDiff = key => {
            let from = oldParams[key], to = newParams[key];
            if (from != to) {
                rps[key] = {
                    from,
                    to
                };
                hasChanged = 1;
            }
        };
        for (key of tArr) {
            setDiff(key);
        }
        oldParams = oldLocation;
        newParams = newLocation;
        rps = result;
        setDiff(Path);
        setDiff(Router_VIEW);
        Router_ChgdCache.set(tKey, result = {
            a: hasChanged,
            b: result
        });
    }
    return result;
};
let Router_Parse = (href) => {
    href = href || Router_WinLoc.href;
    let result = Router_HrefCache.get(href), srcQuery, srcHash, query, hash, params;
    if (!result) {
        srcQuery = href.replace(Router_TrimHashReg, Empty);
        srcHash = href.replace(Router_TrimQueryReg, Empty);
        query = ParseUri(srcQuery);
        hash = ParseUri(srcHash);
        params = Assign({}, query[Params], hash[Params]);
        result = {
            get: GetParam,
            href,
            srcQuery,
            srcHash,
            query,
            hash,
            params
        };
        if (Magix_Booted) {
            Router_AttachViewAndPath(result);
            Router_HrefCache.set(href, result);
        }
        if (DEBUG) {
            result = Safeguard(result);
        }
    }
    return result;
};
let Router_Diff = () => {
    let location = Router_Parse();
    let changed = Router_GetChged(Router_LLoc, Router_LLoc = location);
    if (!Router_Silent && changed.a) {
        Router_LastChanged = changed.b;
        if (Router_LastChanged[Path]) {
            location = location.title || Mx_Cfg.title;
            if (location) {
                Doc_Document.title = location;
            }
        }
        Router.fire(Changed, Router_LastChanged);
    }
    Router_Silent = 0;
    if (DEBUG) {
        Router_LastChanged = Safeguard(Router_LastChanged);
    }
    return Router_LastChanged;
};
let Router = Assign({
    parse: Router_Parse,
    diff: Router_Diff,
    to(pn, params, replace, silent) {
        if (!params && IsObject(pn)) {
            params = pn;
            pn = Empty;
        }
        let temp = ParseUri(pn);
        let tParams = temp[Params];
        let tPath = temp[Path];
        let lPath = Router_LLoc[Path]; //历史路径
        let lParams = Router_LLoc[Params];
        let lQuery = Router_LLoc.query[Params];
        Assign(tParams, params); //把路径中解析出来的参数与用户传递的参数进行合并
        if (tPath) { //设置路径带参数的形式，如:/abc?q=b&c=e或不带参数 /abc
            for (lPath in lQuery) { //未出现在query中的参数设置为空
                if (!Has(tParams, lPath))
                    tParams[lPath] = Empty;
            }
        }
        else if (lParams) { //只有参数，如:a=b&c=d
            tPath = lPath; //使用历史路径
            tParams = Assign({}, lParams, tParams);
        }
        Router_Update(tPath, tParams, Router_LLoc, replace, silent, lQuery);
    }
}, MxEvent);
let Dispatcher_UpdateTag = 0;
let View_IsObserveChanged = view => {
    let loc = view['a'];
    let res, i, params;
    if (loc['a']) {
        if (loc['b']) {
            res = Router_LastChanged[Path];
        }
        if (!res && loc['c']) {
            params = Router_LastChanged[Params];
            for (i of loc['c']) {
                res = Has(params, i);
                if (res)
                    break;
            }
        }
    }
    return res;
};
/**
 * 通知当前vframe，地址栏发生变化
 * @param {Vframe} vframe vframe对象
 * @private
 */
let Dispatcher_Update = async (vframe, view, cs, c) => {
    if (vframe && vframe['a'] != Dispatcher_UpdateTag &&
        (view = vframe['b']) &&
        view['b']) {
        if (View_IsObserveChanged(view)) { //检测view所关注的相应的参数是否发生了变化
            //CallFunction(view['c'], Empty_Array, view);
            await view['c']();
        }
        cs = vframe.children();
        for (c of cs) {
            CallFunction(Dispatcher_Update, Vframe_Vframes[c]);
            //Dispatcher_Update(Vframe_Vframes[c]);
        }
    }
};
let Dispatcher_NotifyChange = (e, vf, view) => {
    vf = Vframe_Root();
    if ((view = e[Router_VIEW])) {
        vf.mountView(view.to);
    }
    else {
        Dispatcher_UpdateTag = Counter++;
        Dispatcher_Update(vf);
    }
};
let Vframe_RootVframe;
let Vframe_Vframes = {};
let Vframe_RootId;
let Vframe_TranslateQuery = (pId, src, params, pVf) => {
    if (src.includes(Spliter) &&
        (pVf = Vframe_Vframes[pId])) {
        TranslateData(pVf['c'], params);
    }
};
let Vframe_Root = (rootId, e) => {
    if (!Vframe_RootVframe) {
        Doc_Body = Doc_Document.body;
        rootId = Vframe_RootId = Mx_Cfg.rootId;
        e = GetById(rootId);
        if (!e) {
            if (DEBUG) {
                console.error('can not find element:"' + rootId + '",use document.body as default');
            }
            e = Doc_Body;
        }
        Vframe_RootVframe = new Vframe(e);
    }
    return Vframe_RootVframe;
};
let Vframe_Unroot = () => {
    if (Vframe_RootVframe) {
        Vframe_RootVframe.unmountVframe();
        Vframe_RootVframe = Null;
    }
};
let Vframe_AddVframe = (id, vframe) => {
    if (!Has(Vframe_Vframes, id)) {
        Vframe_Vframes[id] = vframe;
        Vframe.fire('add', {
            vframe
        });
    }
};
let Vframe_RemoveVframe = (id, vframe) => {
    vframe = Vframe_Vframes[id];
    if (vframe) {
        delete Vframe_Vframes[id];
        vframe.root['a'] = 0;
        Vframe.fire('remove', {
            vframe
        });
        vframe.id = vframe.root = vframe.pId = vframe['d'] = Null; //清除引用,防止被移除的view内部通过setTimeout之类的异步操作有关的界面，影响真正渲染的view
        if (DEBUG) {
            let nodes = Doc_Document.querySelectorAll('#' + id);
            if (nodes.length > 1) {
                Mx_Cfg.error(Error(`remove vframe error. dom id:"${id}" duplicate`));
            }
        }
    }
};
let Vframe_RunInvokes = (vf, list, o) => {
    list = vf['e']; //invokeList
    while (list.length) {
        o = list.shift();
        if (!o.r) { //remove
            CallFunction(vf.invoke, [o.n, o.a], vf);
            //vf.invoke(o.n, o.a); //name,arguments
        }
        delete list[o.k]; //key
    }
};
let Vframe_GetVfId = node => node['b'] || (node['b'] = GUID(Vframe_RootId));
function Vframe(root, pId) {
    let me = this;
    let vfId = Vframe_GetVfId(root);
    me.id = vfId;
    me.root = root;
    me['f'] = 1; //signature
    me['d'] = {}; //childrenMap
    me.pId = pId;
    me['e'] = []; //invokeList
    me['c'] = {};
    Vframe_AddVframe(vfId, me);
}
Assign(Vframe, {
    root() {
        return Vframe_RootVframe;
    },
    all() {
        return Vframe_Vframes;
    },
    byId(id) {
        return Vframe_Vframes[id];
    },
    byNode(node) {
        return Vframe_Vframes[node['b']];
    }
}, MxEvent);
Assign(Vframe[Prototype], {
    mountView(viewPath, viewInitParams /*,keepPreHTML*/) {
        let me = this;
        let { id, root, pId } = me;
        let po, sign, view, params, ctors;
        if (!me['g'] && root) { //alter
            me['g'] = 1;
            me['h'] = root.innerHTML;
        }
        me.unmountView();
        if (root && viewPath) {
            po = ParseUri(viewPath);
            view = po[Path];
            me[Path] = viewPath;
            params = po[Params];
            Vframe_TranslateQuery(pId, viewPath, params);
            me['i'] = view;
            Assign(params, viewInitParams);
            sign = me['f'];
            Async_Require(view, TView => {
                if (sign == me['f']) { //有可能在view载入后，vframe已经卸载了
                    if (!TView) {
                        return Mx_Cfg.error(Error(`${id} cannot load:${view}`));
                    }
                    ctors = View_Prepare(TView);
                    view = new TView(id, root, me, params, ctors);
                    if (DEBUG) {
                        let viewProto = TView.prototype;
                        let importantProps = {
                            id: 1,
                            owner: 1,
                            root: 1,
                            'a': 1,
                            'd': 1,
                            'b': 1,
                            'e': 1,
                            'f': 1
                        };
                        for (let p in view) {
                            if (Has(view, p) && viewProto[p]) {
                                throw new Error(`avoid write ${p} at file ${viewPath}!`);
                            }
                        }
                        view = Safeguard(view, true, (key, value) => {
                            if (Has(viewProto, key) ||
                                (Has(importantProps, key) &&
                                    (key != 'b' || !isFinite(value)) &&
                                    ((key != 'owner' && key != 'root') || value !== Null))) {
                                throw new Error(`avoid write ${key} at file ${viewPath}!`);
                            }
                        });
                    }
                    me['b'] = view;
                    me['a'] = Dispatcher_UpdateTag;
                    View_DelegateEvents(view);
                    ToTry(view.init, params, view);
                    CallFunction(view['g'], params, view);
                    CallFunction(() => {
                        view['c']();
                        if (!view.tmpl) { //无模板
                            //me['g'] = 0; //不会修改节点，因此销毁时不还原
                            //me['h'] = Empty;
                            if (!view['h']) {
                                View_EndUpdate(view);
                            }
                        }
                    });
                    // view['c']();
                }
            });
        }
    },
    /**
     * 销毁对应的view
     */
    unmountView() {
        let me = this;
        let { 'b': v, root } = me;
        me['e'] = [];
        if (v) {
            me['b'] = 0; //unmountView时，尽可能早的删除vframe上的$v对象，防止$v销毁时，再调用该 vfrmae的类似unmountZone方法引起的多次created
            if (v['b']) {
                v['b'] = 0;
                Unmark(v);
                me.unmountZone();
                v.fire('destroy');
                View_DelegateEvents(v, 1);
                //v.owner = v.root = Null;
                if (root && me['g'] /*&&!keepPreHTML*/) { //如果$v本身是没有模板的，也需要把节点恢复到之前的状态上：只有保留模板且$v有模板的情况下，这条if才不执行，否则均需要恢复节点的html，即$v安装前什么样，销毁后把节点恢复到安装前的情况
                    SetInnerHTML(root, me['h']);
                }
            }
        }
        me['f']++; //增加signature，阻止相应的回调，见mountView
    },
    mountVframe(node, viewPath, viewInitParams) {
        let me = this, vf, id = me.id, c = me['d'];
        let vfId = Vframe_GetVfId(node);
        vf = Vframe_Vframes[vfId];
        if (!vf) {
            if (!Has(c, vfId)) { //childrenMap,当前子vframe不包含这个id
                me['j'] = 0; //childrenList 清空缓存的子列表
            }
            c[vfId] = vfId; //map
            vf = new Vframe(node, id);
        }
        vf.mountView(viewPath, viewInitParams);
        return vf;
    },
    mountZone(zone) {
        let me = this, it;
        zone = zone || me.root;
        let vframes = zone.querySelectorAll(`[${MX_View}]`);
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
        //me['k'] = 1; //hold fire creted
        //me.unmountZone(zoneId, 1); 不去清理，详情见：https://github.com/thx/magix/issues/27
        for (it of vframes) {
            if (!it['a']) { //防止嵌套的情况下深层的view被反复实例化
                it['a'] = 1;
                me.mountVframe(it, GetAttribute(it, MX_View));
            }
        }
        //me['k'] = 0;
    },
    unmountVframe(node, isVframeId) {
        let me = this, vf, pId;
        node = node ? me['d'][isVframeId ? node : node['b']] : me.id;
        vf = Vframe_Vframes[node];
        if (vf) {
            vf.unmountView();
            pId = vf.pId;
            Vframe_RemoveVframe(node);
            vf = Vframe_Vframes[pId];
            if (vf && Has(vf['d'], node)) { //childrenMap
                delete vf['d'][node]; //childrenMap
                vf['j'] = 0;
            }
        }
    },
    unmountZone(root) {
        let me = this;
        let p, vf, unmount;
        for (p in me['d']) {
            if (root) {
                vf = Vframe_Vframes[p];
                unmount = vf && NodeIn(vf.root, root);
            }
            else {
                unmount = 1;
            }
            if (unmount) {
                me.unmountVframe(p, 1);
            }
        }
    },
    children(me) {
        me = this;
        return me['j'] || (me['j'] = Keys(me['d']));
    },
    parent(level, vf) {
        vf = this;
        level = (level >>> 0) || 1;
        while (vf && level--) {
            vf = Vframe_Vframes[vf.pId];
        }
        return vf;
    },
    invoke(name, args) {
        let result;
        let vf = this, view, fn, o, list = vf['e'], key;
        if ((view = vf['b']) && view['h']) { //view rendered
            result = (fn = view[name]) && ToTry(fn, args, view);
        }
        else {
            o = list[key = Spliter + name];
            if (o) {
                o.r = args === o.a; //参数一样，则忽略上次的
            }
            o = {
                n: name,
                a: args,
                k: key
            };
            list.push(o);
            list[key] = o;
        }
        return result;
    }
});
/*
    dom event处理思路

    性能和低资源占用高于一切，在不特别影响编程体验的情况下，向性能和资源妥协

    1.所有事件代理到body上
    2.优先使用原生冒泡事件，使用mouseover+Magix.inside代替mouseenter
        'over<mouseover>':function(e){
            if(!Magix.inside(e.relatedTarget,e.eventTarget)){
                //enter
            }
        }
    3.事件支持嵌套，向上冒泡
    4.如果同一节点上同时绑定了mx-event和选择器事件，如
        <div data-menu="true" mx-click="clickMenu()"></div>

        'clickMenu<click>'(e){
            console.log('direct',e);
        },
        '$div[data-menu="true"]<click>'(e){
            console.log('selector',e);
        }

        那么先派发选择器绑定的事件再派发mx-event绑定的事件


    5.在当前view根节点上绑定事件，目前只能使用选择器绑定，如
        '$<click>'(e){
            console.log('view root click',e);
        }
    
    range:{
        app:{
            20:{
                mouseover:1,
                mousemove:1
            }
        }
    }
    view:{
        linkage:{
            40:1
        }
    }
 */
let Body_EvtInfoCache = new MxCache(30, 10);
let Body_EvtInfoReg = /(?:([\w\-]+)\x1e)?([^(]+)\(([\s\S]*)?\)/;
let Body_RootEvents = {};
let Body_SearchSelectorEvents = {};
let Body_Empty_Object = {};
if (DEBUG) {
    Body_Empty_Object = Safeguard(Body_Empty_Object);
}
let Body_FindVframeInfo = (current, eventType) => {
    let vf, tempId, selectorObject, eventSelector, eventInfos = [], begin = current, info = GetAttribute(current, `mx-${eventType}`), match, view, vfs, selectorVfId, backtrace = 0;
    if (info) {
        match = Body_EvtInfoCache.get(info);
        if (!match) {
            match = info.match(Body_EvtInfoReg) || Empty_Array;
            match = {
                v: match[1],
                n: match[2],
                i: match[3]
            };
            Body_EvtInfoCache.set(info, match);
        }
        match = Assign({}, match, { r: info });
    }
    //如果有匹配但没有处理的vframe或者事件在要搜索的选择器事件里
    if ((match && !match.v) || Body_SearchSelectorEvents[eventType]) {
        selectorVfId = begin['c'];
        if (!selectorVfId) { //先找最近的vframe
            vfs = [begin];
            while (begin != Doc_Body && (begin = begin.parentNode)) {
                if (Vframe_Vframes[tempId = begin['b']] ||
                    (tempId = begin['c'])) {
                    selectorVfId = tempId;
                    break;
                }
                vfs.push(begin);
            }
            if (selectorVfId) {
                for (info of vfs) {
                    info['c'] = selectorVfId;
                }
            }
        }
        if (selectorVfId) { //从最近的vframe向上查找带有选择器事件的view
            begin = current['b'];
            if (Vframe_Vframes[begin]) {
                /*
                    如果当前节点是vframe的根节点，则把当前的vf置为该vframe
                    该处主要处理这样的边界情况
                    <mx-vrame src="./test" mx-click="parent()"/>
                    //.test.js
                    export default Magix.View.extend({
                        '$<click>'(){
                            console.log('test clicked');
                        }
                    });
    
                    当click事件发生在mx-vframe节点上时，要先派发内部通过选择器绑定在根节点上的事件，然后再派发外部的事件
                */
                backtrace = selectorVfId = begin;
            }
            do {
                vf = Vframe_Vframes[selectorVfId];
                if (vf && (view = vf['b'])) {
                    selectorObject = view['i'];
                    eventSelector = selectorObject[eventType];
                    if (eventSelector) {
                        for (begin = eventSelector.length; begin--;) {
                            tempId = eventSelector[begin];
                            selectorObject = {
                                r: tempId,
                                v: selectorVfId,
                                n: tempId
                            };
                            if (tempId) {
                                /*
                                    事件发生时，做为临界的根节点只能触发`$`绑定的事件，其它事件不能触发
                                */
                                if (!backtrace &&
                                    current.matches(tempId)) {
                                    eventInfos.push(selectorObject);
                                }
                            }
                            else if (backtrace) {
                                eventInfos.unshift(selectorObject);
                            }
                        }
                    }
                    //防止跨view选中，到带模板的view时就中止或未指定
                    if (view.tmpl && !backtrace) {
                        break; //带界面的中止
                    }
                    backtrace = 0;
                }
            } while (vf && (selectorVfId = vf.pId));
        }
    }
    if (match) {
        eventInfos.push(match);
    }
    return eventInfos;
};
let Body_DOMEventProcessor = domEvent => {
    let { target, type } = domEvent;
    let eventInfos;
    let ignore;
    let vframe, view, eventName, fn;
    let lastVfId;
    let params, arr = [];
    while (target &&
        target.nodeType == 1) {
        if (domEvent.cancelBubble ||
            (ignore = target['d']) && ignore[type]) {
            break;
        }
        arr.push(target);
        eventInfos = Body_FindVframeInfo(target, type);
        if (eventInfos.length) {
            arr = [];
            for (let { v, r, n, i } of eventInfos) {
                if (!v && DEBUG) {
                    return Mx_Cfg.error(Error(`bad ${type}:${r}`));
                }
                if (lastVfId != v) {
                    if (lastVfId && domEvent.cancelBubble) {
                        break;
                    }
                    lastVfId = v;
                }
                vframe = Vframe_Vframes[v];
                view = vframe && vframe['b'];
                if (view) {
                    if (view['h']) {
                        eventName = n + Spliter + type;
                        fn = view[eventName];
                        if (fn) {
                            domEvent.eventTarget = target;
                            params = i ? ParseExpr(i, vframe['c']) : Body_Empty_Object;
                            domEvent[Params] = params;
                            ToTry(fn, domEvent, view);
                        }
                        if (DEBUG) {
                            if (!fn) { //检测为什么找不到处理函数
                                console.error('can not find event processor:' + n + '<' + type + '> from view:' + vframe.path);
                            }
                        }
                    }
                }
                else { //如果处于删除中的事件触发，则停止事件的传播
                    break;
                }
                if (DEBUG) {
                    if (!view && view !== 0) { //销毁
                        console.error('can not find vframe:' + v);
                    }
                }
            }
        }
        target = target.parentNode;
    }
    for (lastVfId of arr) {
        ignore = lastVfId['d'] || (lastVfId['d'] = {});
        ignore[type] = 1;
    }
};
let Body_DOMEventBind = (type, searchSelector, remove) => {
    let counter = Body_RootEvents[type] | 0;
    let offset = (remove ? -1 : 1), fn = remove ? RemoveEventListener : AddEventListener;
    if (!counter || remove === counter) { // remove=1  counter=1
        fn(Doc_Body, type, Body_DOMEventProcessor);
    }
    Body_RootEvents[type] = counter + offset;
    if (searchSelector) { //记录需要搜索选择器的事件
        Body_SearchSelectorEvents[type] = (Body_SearchSelectorEvents[type] | 0) + offset;
    }
};
if (DEBUG) {
    var Updater_CheckInput = (view, html) => {
        if (/<(?:input|textarea|select)/i.test(html)) {
            let url = ParseUri(view.owner.path);
            let found = false, hasParams = false;
            for (let p in url.params) {
                hasParams = true;
                if (url.params[p][0] == Spliter) {
                    found = true;
                }
            }
            if (hasParams && !found) {
                console.warn('[!use at to pass parameter] path:' + view.owner.path + ' at ' + (view.owner.parent().path));
            }
        }
    };
}
let Updater_EM = {
    '&': '&#38;',
    '<': '&#60;',
    '>': '&#62;',
    '"': '&#34;',
    '\'': '&#39;',
    '\`': '&#96;'
};
let Updater_ER = /[&<>"'\`]/g;
let Updater_Safeguard = v => v == Null ? Empty : Empty + v;
let Updater_EncodeReplacer = m => Updater_EM[m];
let Updater_Encode = v => Updater_Safeguard(v).replace(Updater_ER, Updater_EncodeReplacer);
let Updater_UM = {
    '!': '%21',
    '\'': '%27',
    '(': '%28',
    ')': '%29',
    '*': '%2A'
};
let Updater_URIReplacer = m => Updater_UM[m];
let Updater_URIReg = /[!')(*]/g;
let Updater_EncodeURI = v => Encode(Updater_Safeguard(v)).replace(Updater_URIReg, Updater_URIReplacer);
let Updater_QR = /[\\'"]/g;
let Updater_EncodeQ = v => Updater_Safeguard(v).replace(Updater_QR, '\\$&');
let Updater_Ref = ($$, v, k) => {
    if (DEBUG && k === undefined) {
        console.error('check ref data!');
    }
    $$[k] = v;
    return k;
};
let Updater_Digest = (view, tmpl) => {
    if (view['b'] &&
        (tmpl = view.tmpl)) {
        let keys = view['j'], viewId = view.id, vf = Vframe_Vframes[viewId], ref = {
            'a': []
        }, vdom, data = view['e'], refData = vf['c'];
        view['k'] = 0;
        view['j'] = {};
        view.fire('dompatch');
        vdom = tmpl(data, Q_Create, viewId, Updater_Safeguard, Updater_EncodeURI, refData, Updater_Ref, Updater_EncodeQ, IsArray);
        if (DEBUG) {
            Updater_CheckInput(view, vdom['a']);
        }
        V_SetChildNodes(view.root, view['l'], vdom, ref, vf, keys);
        view['l'] = vdom;
        /*
            在dom diff patch时，如果已渲染的vframe有变化，则会在vom tree上先派发created事件，同时传递inner标志，vom tree处理alter事件派发状态，未进入created事件派发状态

            patch完成后，需要设置vframe hold fire created事件，因为带有assign方法的view在调用render后，vom tree处于就绪状态，此时会导致提前派发created事件，应该hold，统一在endUpdate中派发

            有可能不需要endUpdate，所以hold fire要视情况而定
        */
        tmpl = ref['b'] || !view['h'];
        for (vdom of ref['a']) {
            CallFunction(vdom['c'], Empty_Array, vdom, Spliter + vdom.id);
            //CallFunction(View_CheckAssign, [vdom]);
        }
        if (tmpl) {
            View_EndUpdate(view);
        }
        view.fire('domready');
    }
};
let Q_TEXTAREA = 'textarea';
let Q_Empty_Object = {};
let Q_Create = (tag, props, children, specials, unary) => {
    //html=tag+to_array(attrs)+children.html
    let token;
    if (tag) {
        props = props || Q_Empty_Object;
        let compareKey = Empty, hasMxv = specials, prop, value, c, reused = {}, outerHTML = '<' + tag, attrs, innerHTML = Empty, newChildren = [], prevNode;
        if (children) {
            for (c of children) {
                value = c['a'];
                if (c['b'] == V_TEXT_NODE) {
                    value = value ? Updater_Encode(value) : '\u200b'; //无值的文本节点我们用一个空格占位，这样在innerHTML的时候才会有文本节点 该空白文本节点是&#8203
                }
                innerHTML += value;
                //merge text node
                if (prevNode &&
                    c['b'] == V_TEXT_NODE &&
                    prevNode['b'] == V_TEXT_NODE) {
                    //prevNode['c'] += c['c'];
                    prevNode['a'] += c['a'];
                }
                else {
                    //reused node if new node key equal old node key
                    if (c['d']) {
                        reused[c['d']] = (reused[c['d']] || 0) + 1;
                    }
                    //force diff children
                    if (c['e']) {
                        hasMxv = 1;
                    }
                    prevNode = c;
                    newChildren.push(c);
                }
            }
        }
        specials = specials || Q_Empty_Object;
        for (prop in props) {
            value = props[prop];
            //布尔值
            if (value === false ||
                value == Null) {
                if (!specials[prop]) {
                    delete props[prop];
                }
                continue;
            }
            else if (value === true) {
                props[prop] = value = specials[prop] ? value : Empty;
            }
            if (prop == Tag_Prop_Id) { //如果有id优先使用
                compareKey = value;
            }
            else if (prop == MX_View &&
                value &&
                !compareKey) {
                //否则如果是组件,则使用组件的路径做为key
                compareKey = ParseUri(value)[Path];
            }
            else if ((prop == Tag_Static_Key) && !compareKey) {
                compareKey = value;
            }
            else if (prop == Tag_View_Params_Key) {
                hasMxv = 1;
            }
            if (prop == Value &&
                tag == Q_TEXTAREA) {
                innerHTML = value;
            }
            else if (!Has(V_SKIP_PROPS, prop)) {
                outerHTML += ` ${prop}="${value && Updater_Encode(value)}"`;
            }
        }
        attrs = outerHTML;
        outerHTML += unary ? '/>' : `>${innerHTML}</${tag}>`;
        token = {
            'a': outerHTML,
            'c': innerHTML,
            'd': compareKey,
            'b': tag,
            'e': hasMxv,
            'f': specials,
            'g': attrs,
            'h': props,
            'i': newChildren,
            'j': reused,
            'k': unary
        };
    }
    else {
        token = {
            'b': props ? Spliter : V_TEXT_NODE,
            'a': children + Empty
        };
    }
    return token;
};
let V_SKIP_PROPS = {
    [Tag_Static_Key]: 1,
    [Tag_View_Params_Key]: 1
};
if (DEBUG) {
    var CheckNodes = (realNodes, vNodes) => {
        let index = 0;
        if (vNodes.length != 1 ||
            vNodes[0]['b'] != Spliter) {
            for (let e of realNodes) {
                if (e.nodeName.toLowerCase() != vNodes[index]['b'].toLowerCase()) {
                    console.error('real not match virtual!');
                }
                index++;
            }
        }
    };
}
let V_TEXT_NODE = Counter;
if (DEBUG) {
    V_TEXT_NODE = '#text';
}
let V_W3C = 'http://www.w3.org/';
let V_NSMap = {
    svg: `${V_W3C}2000/svg`,
    math: `${V_W3C}1998/Math/MathML`
};
let V_SetAttributes = (oldNode, lastVDOM, newVDOM) => {
    let key, value, changed = 0, nsMap = newVDOM['f'], osMap = lastVDOM['f'], nMap = newVDOM['h'], oMap = lastVDOM['h'], sValue;
    if (lastVDOM) {
        for (key in oMap) {
            if (!Has(nMap, key)) { //如果旧有新木有
                changed = 1;
                if ((sValue = osMap[key])) {
                    oldNode[sValue] = Empty;
                }
                else {
                    oldNode.removeAttribute(key);
                }
            }
        }
    }
    for (key in nMap) {
        if (!Has(V_SKIP_PROPS, key)) {
            value = nMap[key];
            if ((sValue = nsMap[key])) {
                if (!lastVDOM || oldNode[sValue] != value) {
                    changed = 1;
                    oldNode[sValue] = value;
                }
            }
            else if (!lastVDOM || oMap[key] != value) {
                changed = 1;
                oldNode.setAttribute(key, value);
            }
        }
    }
    if (changed) {
        delete oldNode['d'];
    }
    return changed;
};
let V_CreateNode = (vnode, owner) => {
    let tag = vnode['b'], c;
    if (tag == V_TEXT_NODE) {
        c = Doc_Document.createTextNode(vnode['a']);
    }
    else {
        c = Doc_Document.createElementNS(V_NSMap[tag] || owner.namespaceURI, tag);
        V_SetAttributes(c, 0, vnode);
        SetInnerHTML(c, vnode['c']);
    }
    return c;
};
let V_SetChildNodes = (realNode, lastVDOM, newVDOM, ref, vframe, keys) => {
    if (lastVDOM) { //view首次初始化，通过innerHTML快速更新
        if (lastVDOM['e'] ||
            lastVDOM['c'] != newVDOM['c']) {
            let i, oi, oldChildren = lastVDOM['i'], newChildren = newVDOM['i'], oc, nc, oldCount = oldChildren.length, newCount = newChildren.length, reused = newVDOM['j'], nodes = realNode.childNodes, compareKey, keyedNodes = {}, oldVIndex = 0, realNodeStep;
            for (i = oldCount; i--;) {
                oc = oldChildren[i];
                compareKey = oc['d'];
                if (compareKey) {
                    compareKey = keyedNodes[compareKey] || (keyedNodes[compareKey] = []);
                    compareKey.push(nodes[i]);
                }
            }
            if (DEBUG && lastVDOM['b'] != Q_TEXTAREA) {
                CheckNodes(nodes, oldChildren);
            }
            for (i = 0; i < newCount; i++) {
                nc = newChildren[i];
                oc = oldChildren[oldVIndex++];
                compareKey = keyedNodes[nc['d']];
                if (compareKey && (compareKey = compareKey.pop())) {
                    if (compareKey != nodes[i]) {
                        for (oi = oldVIndex, realNodeStep = 1; oi < oldCount; oi++, realNodeStep++) {
                            oc = oldChildren[oi];
                            if (oc && nodes[i + realNodeStep] == compareKey) {
                                oldChildren.splice(oi, 1);
                                oldVIndex--;
                                break;
                            }
                        }
                        realNode.insertBefore(compareKey, nodes[i]);
                    }
                    if (reused[oc['d']]) {
                        reused[oc['d']]--;
                    }
                    V_SetNode(compareKey, realNode, oc, nc, ref, vframe, keys);
                }
                else if (oc) { //有旧节点，则更新
                    if (keyedNodes[oc['d']] &&
                        reused[oc['d']]) {
                        oldCount++;
                        ref['b'] = 1;
                        realNode.insertBefore(V_CreateNode(nc, realNode), nodes[i]);
                        oldVIndex--;
                    }
                    else {
                        V_SetNode(nodes[i], realNode, oc, nc, ref, vframe, keys);
                    }
                }
                else { //添加新的节点
                    if (nc['b'] == Spliter) {
                        SetInnerHTML(realNode, nc['a']);
                    }
                    else {
                        realNode.appendChild(V_CreateNode(nc, realNode));
                    }
                    ref['b'] = 1;
                }
            }
            for (i = newCount; i < oldCount; i++) {
                oi = nodes[newCount]; //删除多余的旧节点
                if (oi.nodeType == 1) {
                    vframe.unmountZone(oi);
                }
                if (DEBUG) {
                    if (!oi.parentNode) {
                        console.error('Avoid remove node on view.destroy in digesting');
                    }
                }
                realNode.removeChild(oi);
            }
        }
    }
    else {
        ref['b'] = 1;
        SetInnerHTML(realNode, newVDOM['c']);
        if (DEBUG) {
            if (vframe.root.nodeType == 1 && !vframe.root.parentNode) {
                throw new Error(`unsupport mount "${vframe.path}". the root element is removed by other views`);
            }
            let pId = vframe.pId;
            let vf = Vframe_Vframes[pId];
            if (vf) {
                let cs = vf.children();
                for (let c of cs) {
                    if (c != vframe.id) {
                        let nv = Vframe_Vframes[c];
                        if (nv &&
                            nv['b'] &&
                            nv['b'].tmpl &&
                            NodeIn(vframe.root, nv.root)) {
                            throw new Error(`unsupport nest "${vframe.path}" within "${nv.path}"`);
                        }
                    }
                }
            }
        }
    }
};
let V_SetNode = (realNode, oldParent, lastVDOM, newVDOM, ref, vframe, keys) => {
    if (DEBUG) {
        if (lastVDOM['b'] != Spliter &&
            newVDOM['b'] != Spliter) {
            if (oldParent.nodeName == 'TEMPLATE') {
                console.error('unsupport template tag');
            }
            if ((realNode.nodeName == '#text' &&
                lastVDOM['b'] != '#text') ||
                (realNode.nodeName != '#text' &&
                    realNode.nodeName.toLowerCase() != lastVDOM['b'].toLowerCase())) {
                console.error('Your code is not match the DOM tree generated by the browser. near:' + lastVDOM['c'] + '. Is that you lost some tags or modified the DOM tree?');
            }
        }
    }
    let lastAMap = lastVDOM['h'], newAMap = newVDOM['h'], lastNodeTag = lastVDOM['b'];
    if (lastVDOM['e'] ||
        lastVDOM['a'] != newVDOM['a']) {
        if (lastNodeTag == Spliter) {
            ref['b'] = 1;
            SetInnerHTML(oldParent, newVDOM['a']);
        }
        else if (lastNodeTag == newVDOM['b']) {
            if (lastNodeTag == V_TEXT_NODE) {
                ref['b'] = 1;
                realNode.nodeValue = newVDOM['a'];
            }
            else if (!lastAMap[Tag_Static_Key] ||
                lastAMap[Tag_Static_Key] != newAMap[Tag_Static_Key]) {
                let newMxView = newAMap[MX_View], newHTML = newVDOM['c'], commonAttrs = lastVDOM['g'] != newVDOM['g'], updateAttribute = lastVDOM['f'] || commonAttrs, updateChildren, unmountOld, oldVf = Vframe_Vframes[realNode['b']], assign, view, uri = newMxView && ParseUri(newMxView), params, htmlChanged, paramsChanged;
                /*
                    如果存在新旧view，则考虑路径一致，避免渲染的问题
                 */
                /*
                    只检测是否有参数控制view而不检测数据是否变化的原因：
                    例：view内有一input接收传递的参数，且该input也能被用户输入
                    var d1='xl';
                    var d2='xl';
                    当传递第一份数据时，input显示值xl，这时候用户修改了input的值且使用第二份数据重新渲染这个view，问input该如何显示？
                */
                if (updateAttribute) {
                    updateAttribute = V_SetAttributes(realNode, lastVDOM, newVDOM);
                    if (updateAttribute) {
                        ref['b'] = 1;
                    }
                }
                //旧节点有view,新节点有view,且是同类型的view
                if (newMxView && oldVf &&
                    oldVf['i'] == uri[Path] &&
                    (view = oldVf['b'])) {
                    htmlChanged = newHTML != lastVDOM['c'];
                    paramsChanged = newMxView != oldVf[Path];
                    assign = lastAMap[Tag_View_Params_Key];
                    if (!htmlChanged && !paramsChanged && assign) {
                        params = assign.split(Comma);
                        for (assign of params) {
                            if (assign == Hash_Key || Has(keys, assign)) {
                                paramsChanged = 1;
                                break;
                            }
                        }
                    }
                    if (paramsChanged ||
                        htmlChanged) {
                        assign = view['g'];
                        //如果有assign方法,且有参数或html变化
                        //if (assign) {
                        params = uri[Params];
                        //处理引用赋值
                        Vframe_TranslateQuery(oldVf.pId, newMxView, params);
                        oldVf[Path] = newMxView; //update ref
                        oldVf['h'] = newHTML;
                        //如果需要更新，则进行更新的操作
                        // uri = {
                        //     //node: newVDOM,//['i'],
                        //     //html: newHTML,
                        //     //mxv: hasMXV,
                        //     node: realNode,
                        //     attr: updateAttribute,
                        //     deep: !view.tmpl,
                        //     inner: htmlChanged,
                        //     query: paramsChanged
                        // };
                        //updateAttribute = 1;
                        if (DEBUG) {
                            let result = ToTry(assign, params, /*[params, uri],*/ view);
                            if (result !== true && result !== false) {
                                if (assign == View.prototype.assign) {
                                    console.error(`override ${uri[Path]} "assign" method and make sure returned true or false value`);
                                }
                                else {
                                    console.error(`${uri[Path]} "assign" method only allow returned true or false value`);
                                }
                            }
                            if (result) {
                                //view['m']++;
                                ref['a'].push(view);
                            }
                        }
                        else if (ToTry(assign, params, /*[params, uri],*/ view)) {
                            //view['m']++;
                            ref['a'].push(view);
                        }
                        //默认当一个组件有assign方法时，由该方法及该view上的render方法完成当前区域内的节点更新
                        //而对于不渲染界面的控制类型的组件来讲，它本身更新后，有可能需要继续由magix更新内部的子节点，此时通过deep参数控制
                        updateChildren = !view.tmpl; //uri.deep;
                        // } else {
                        //     unmountOld = 1;
                        //     updateChildren = 1;
                        //     if (DEBUG) {
                        //         if (updateAttribute) {
                        //             console.warn(`There is no "assign" method in ${uri[Path]},so magix remount it when attrs changed`);
                        //         }
                        //     }
                        // }
                    } // else {
                    // updateAttribute = 1;
                    //}
                }
                else {
                    updateChildren = 1;
                    unmountOld = oldVf;
                }
                if (unmountOld) {
                    ref['b'] = 1;
                    oldVf.unmountVframe();
                }
                // Update all children (and subchildren).
                //自闭合标签不再检测子节点
                if (updateChildren &&
                    !newVDOM['k']) {
                    V_SetChildNodes(realNode, lastVDOM, newVDOM, ref, vframe, keys);
                }
            }
        }
        else {
            ref['b'] = 1;
            vframe.unmountZone(realNode);
            oldParent.replaceChild(V_CreateNode(newVDOM, oldParent), realNode);
        }
    }
};
//like 'login<click>' or '$<click>' or '$win<scroll>' or '$win<scroll>&{capture:true}'
let View_EvtMethodReg = /^(\$?)([^<]*)<([^>]+)>(?:&(.+))?$/;
let processMixinsSameEvent = (exist, additional, temp) => {
    if (exist['a']) {
        temp = exist;
    }
    else {
        temp = function (e, f) {
            for (f of temp['a']) {
                ToTry(f, e, this);
            }
        };
        temp['a'] = [exist];
        temp['b'] = 1;
    }
    temp['a'] = temp['a'].concat(additional['a'] || additional);
    return temp;
};
// let View_CheckAssign = view => {
//     if (view['m']) {
//         view['m']--;
//     }
//     if (view['b'] && !view['m']) { //signature
//         ToTry(view['c'], Empty_Array, view);
//     }
// };
let View_EndUpdate = view => {
    let o, f;
    if (view['b']) {
        f = view['h'];
        view['h'] = 1;
        o = view.owner;
        o.mountZone();
        if (!f) {
            CallFunction(Vframe_RunInvokes, o);
        }
    }
};
let View_DelegateEvents = (me, destroy) => {
    let e, { 'n': eventsObject, 'i': selectorObject, 'o': eventsList, id } = me; //eventsObject
    for (e in eventsObject) {
        Body_DOMEventBind(e, selectorObject[e], destroy);
    }
    eventsObject = destroy ? RemoveEventListener : AddEventListener;
    for (e of eventsList) {
        eventsObject(e['a'], e['b'], e['c'], id, e['d'], me);
    }
};
let View_Globals = {
    win: Doc_Window,
    doc: Doc_Document
};
let View_MergeMixins = (mixins, proto, ctors) => {
    let temp = {}, p, node, fn, exist;
    for (node of mixins) {
        for (p in node) {
            fn = node[p];
            exist = temp[p];
            if (p == 'ctor') {
                ctors.push(fn);
                continue;
            }
            else if (View_EvtMethodReg.test(p)) {
                if (exist) {
                    fn = processMixinsSameEvent(exist, fn);
                }
                else {
                    fn['b'] = 1;
                }
            }
            else if (DEBUG &&
                exist &&
                fn != exist) { //只在开发中提示
                Mx_Cfg.error(Error('plugins duplicate property:' + p));
            }
            temp[p] = fn;
        }
    }
    for (p in temp) {
        if (!Has(proto, p)) {
            proto[p] = temp[p];
        }
        else if (DEBUG) {
            console.error('already exist ' + p + ',avoid override it!');
        }
    }
};
function merge(...args) {
    let me = this, _ = me['a'] || (me['a'] = []);
    View_MergeMixins(args, me[Prototype], _);
    return me;
}
let safeRender = render => function (...args) { ToTry(render, args, this); };
function extend(props, statics) {
    let me = this;
    props = props || {};
    let ctor = props.ctor;
    let ctors = [];
    if (ctor)
        ctors.push(ctor);
    function NView(viewId, rootNode, ownerVf, initParams, mixinCtors, cs, concatCtors, z) {
        me.call(z = this, viewId, rootNode, ownerVf, initParams, mixinCtors);
        cs = NView['a'];
        if (cs) {
            for (ctor of cs) {
                ToTry(ctor, initParams, z);
            }
        }
        concatCtors = ctors.concat(mixinCtors);
        for (ctor of concatCtors) {
            ToTry(ctor, initParams, z);
        }
    }
    NView.merge = merge;
    NView.extend = extend;
    return Extend(NView, me, props, statics);
}
let View_Prepare = oView => {
    if (!oView[Spliter]) { //只处理一次
        oView[Spliter] = [];
        let prop = oView[Prototype], currentFn, matches, selectorOrCallback, events, eventsObject = {}, eventsList = [], selectorObject = {}, node, isSelector, p, item, mask, mod, modifiers;
        matches = prop.mixins;
        if (matches) {
            View_MergeMixins(matches, prop, oView[Spliter]);
        }
        for (p in prop) {
            currentFn = prop[p];
            matches = p.match(View_EvtMethodReg);
            if (matches) {
                [, isSelector, selectorOrCallback, events, modifiers] = matches;
                mod = modifiers ? ToObject(modifiers) : {};
                events = events.split(Comma);
                for (item of events) {
                    node = View_Globals[selectorOrCallback];
                    mask = 1;
                    if (isSelector) {
                        if (node) {
                            eventsList.push({
                                'c': currentFn,
                                'a': node,
                                'b': item,
                                'd': mod
                            });
                            continue;
                        }
                        mask = 2;
                        node = selectorObject[item];
                        if (!node) {
                            node = selectorObject[item] = [];
                        }
                        if (!node[selectorOrCallback]) {
                            node[selectorOrCallback] = 1;
                            node.push(selectorOrCallback);
                        }
                    }
                    eventsObject[item] = eventsObject[item] | mask;
                    item = selectorOrCallback + Spliter + item;
                    node = prop[item];
                    //for in 就近遍历，如果有则忽略
                    if (!node) { //未设置过
                        prop[item] = currentFn;
                    }
                    else if (node['b']) { //现有的方法是mixins上的
                        if (currentFn['b']) { //2者都是mixins上的事件，则合并
                            prop[item] = processMixinsSameEvent(currentFn, node);
                        }
                        else if (Has(prop, p)) { //currentFn方法不是mixin上的，也不是继承来的，在当前view上，优先级最高
                            prop[item] = currentFn;
                        }
                    }
                }
            }
        }
        prop['c'] = prop.render = safeRender(prop.render);
        prop['n'] = eventsObject;
        prop['o'] = eventsList;
        prop['i'] = selectorObject;
        prop['g'] = prop.assign;
    }
    return oView[Spliter];
};
function View(id, root, owner, ops, me) {
    me = this;
    me.root = root;
    me.owner = owner;
    me.id = id;
    me[Spliter] = id;
    me['a'] = {
        'c': []
    };
    me['b'] = 1; //标识view是否刷新过，对于托管的函数资源，在回调这个函数时，不但要确保view没有销毁，而且要确保view没有刷新过，如果刷新过则不回调
    me['k'] = 1;
    if (DEBUG) {
        me['e'] = Safeguard({
            id
        }, true, key => {
            if (key == 'id') {
                throw new Error(`avoid write ${key} to view data!`);
            }
        });
    }
    else {
        me['e'] = {
            id
        };
    }
    me['j'] = {};
    me['m'] = 0;
    id = View['a'];
    if (id) {
        for (owner of id) {
            ToTry(owner, ops, me);
        }
    }
}
Assign(View, {
    merge,
    extend
});
Assign(View[Prototype], MxEvent, {
    init: Noop,
    render: Noop,
    assign: Noop,
    observeLocation(params, isObservePath) {
        let me = this, loc;
        loc = me['a'];
        loc['a'] = 1;
        if (IsObject(params)) {
            isObservePath = params[Path];
            params = params[Params];
        }
        loc['b'] = isObservePath;
        if (params) {
            loc['c'] = (params + Empty).split(Comma);
        }
    },
    get(key, result) {
        result = this['e'];
        if (key) {
            result = result[key];
        }
        return result;
    },
    set(newData, unchanged) {
        let me = this, oldData = me['e'], keys = me['j'];
        let changed = me['k'], now, old, p;
        for (p in newData) {
            now = newData[p];
            old = oldData[p];
            if ((!IsPrimitive(now) || old != now) &&
                !Has(unchanged, p)) {
                keys[p] = 1;
                changed = 1;
            }
            oldData[p] = now;
        }
        me['k'] = changed;
        return me;
    },
    changed() {
        if (DEBUG) {
            return Boolean(this['k']);
        }
        return this['k'];
    },
    digest(data, unchanged) {
        let me = this.set(data, unchanged);
        /*
            view:
            <div>
                <mx-dropdown mx-focusout="rerender()"/>
            <div>

            view.digest=>dropdown.focusout=>view.redigest=>view.redigest.end=>view.digest.end

            view.digest中嵌套了view.redigest，view.redigest可能操作了view.digest中引用的dom,这样会导致view.redigest.end后续的view.digest中出错

            expect
            view.digest=>dropdown.focusout=>view.digest.end=>view.redigest=>view.redigest.end

            如果在digest的过程中，多次调用自身的digest，则后续的进行排队。前面的执行完成后，排队中的一次执行完毕
        */
        if (me['k'] && me['b']) {
            if (DEBUG) {
                if (!me['p']) {
                    me['p'] = 1;
                    Updater_Digest(me);
                    me['p'] = 0;
                }
                else if (DEBUG) {
                    console.error('Avoid redigest while updater is digesting');
                }
            }
            else {
                Updater_Digest(me);
            }
        }
    },
    snapshot() {
        let me = this;
        me['q'] = JSON_Stringify(me['e']);
        return me;
    },
    altered() {
        let me = this;
        if (me['q']) {
            return me['q'] != JSON_Stringify(me['e']);
        }
    },
    // translate(data) {
    //     return TranslateData(this['e'], data);
    // },
    parse(origin) {
        return ParseExpr(origin, this.owner['c']);
    }
});
let Magix_Booted = 0;
let Magix = {
    config(cfg, r) {
        r = Mx_Cfg;
        if (cfg) {
            if (IsObject(cfg)) {
                r = Assign(r, cfg);
            }
            else {
                r = r[cfg];
            }
        }
        return r;
    },
    boot(cfg) {
        if (!Magix_Booted) {
            Magix_Booted = 1;
            Assign(Mx_Cfg, cfg); //先放到配置信息中，供ini文件中使用
            Router_Init_PNR();
            Router.on(Changed, Dispatcher_NotifyChange);
            Router_Bind();
            if (DEBUG) {
                let whiteList = {
                    defaultView: 1,
                    error: 1,
                    defaultPath: 1,
                    recast: 1,
                    rewrite: 1,
                    require: 1,
                    paths: 1,
                    rootId: 1,
                    routes: 1,
                    unmatchView: 1,
                    title: 1
                };
                Mx_Cfg = Safeguard(Mx_Cfg, true, (key, value) => {
                    if (Has(whiteList, key)) {
                        throw new Error(`avoid write ${key} to magix config!`);
                    }
                });
            }
        }
    },
    unboot() {
        if (Magix_Booted) {
            Magix_Booted = 0;
            Router.off(Changed, Dispatcher_NotifyChange);
            Router_Unbind();
            Vframe_Unroot();
        }
    },
    toMap: ToMap,
    toTry: ToTry,
    toUrl: ToUri,
    parseUrl: ParseUri,
    guid: GUID,
    use: Async_Require,
    dispatch: DispatchEvent,
    guard: Safeguard,
    type: Type,
    has: Has,
    inside: NodeIn,
    applyStyle: ApplyStyle,
    Cache: MxCache,
    View,
    Vframe,
    Event: MxEvent,
    Router,
    mark: Mark,
    unmark: Unmark,
    node: GetById,
    task: CallFunction
};
//强制转换
export default Magix;
