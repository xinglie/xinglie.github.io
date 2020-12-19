/*
version:5.0.2 Licensed MIT
author:kooboy_li@163.com
loader:module
enables:mxevent,richVframe,xml,async
optionals:router,routerHash,routerState,routerTip,routerTipLockUrl,richView,recast,require,customTags,checkAttr,webc,mxOwner,wait,service,state
*/
if (typeof DEBUG == 'undefined') window.DEBUG = true;
//VARS
let Counter = 0;
let Empty = '';
let Empty_Array = [];
let Comma = ',';
let Null = null;
let Doc_Window = window;

let Doc_Document = document;
let Timeout = Doc_Window.setTimeout;//setTimeout;
let Encode = encodeURIComponent;
let Value = 'value';
let Tag_Static_Key = '_';
let Tag_View_Params_Key = '$';
let Tag_Prop_Id = 'id';

let Hash_Key = '#';
function Noop() { }

let Header = Doc_Document.head;
let Doc_Body;
let Pfm = Doc_Window.performance;
let Date_Now = Pfm.now.bind(Pfm);
/*
    关于spliter
    出于安全考虑，使用不可见字符\u0000，然而，window手机上ie11有这样的一个问题：'\u0000'+"abc",结果却是一个空字符串，好奇特。
 */
let Spliter = '\x1e';
let Prototype = 'prototype';
let Params = 'params';
let Path = 'path';
let MX_PREFIX = 'mx5-';
let Tag_Porp_MX_Key = MX_PREFIX + 'key';
let MX_View = MX_PREFIX + 'view';
let MX_OWNER = MX_PREFIX + 'owner';
let ToString = Object[Prototype].toString;
let Type = o => ToString.call(o).slice(8, -1);
let IsObject = o => Type(o) == 'Object';
let IsArray = Array.isArray;
let GUID = (prefix?) => (prefix || Tag_Static_Key) + Counter++;
let GetById = id => Doc_Document.getElementById(id);
let SetInnerHTML = (n, html) => n.innerHTML = html;
let Mx_Cfg = {
    rootId: GUID(),
    
    
    error(e) {
        throw e;
    }
};
let IsPrimitive = args => !args || typeof args != 'object';

let NodeIn = (a, b, r?) => {
    if (a && b) {
        r = a == b;
        if (!r) {
            try {
                r = (b.compareDocumentPosition(a) & 16) == 16;
            } catch (_magix) { }
        }
    }
    return r;
};
let Mark = (me, key, host?, m?, k?) => {
    k = Spliter + 'a';
    if (me[k] !== Null) {
        host = me[k] || (me[k] = {});
        if (!Has(host, key)) {
            host[key] = 0;
        }
        m = ++host[key];
    }
    return t => (t = me[k], t && m === t[key]);
};
let Unmark = me => {
    me[Spliter + 'a'] = Null;
};
let {
    assign: Assign,
    
    keys: Keys,
    
    hasOwnProperty: HasProp
} = Object;
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
            
        } else {
            node = Doc_Document.createElement('style');
            SetInnerHTML(node, css);
            Header.appendChild(node);
            
        }
    }
};
let ToTry = (fn, args?, context?, r?) => {
    try {
        if (IsArray(args)) {
            r = fn.apply(context, args);
        } else {
            r = fn.call(context, args);
        }
    } catch (x) {
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
    } else {
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
function MxCache(max?: number, buffer?: number/*, remove?: (item: any) => void*/, me?: any) {
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
                    if (r['a'] > 0) me.del(r.o); //如果没有引用，则删除
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
        let r = c[k]/*,
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
let AddEventListener = (element, type, fn, eventOptions?, viewId?, view?) => {
    let h = {
        'a': viewId,
        'b': fn,
        'c': type,
        'd': element,
        'e'(e) {
            if (viewId) {
                ToTry(fn, e, view);
            } else {
                fn(e);
            }
        }
    };
    AttachEventHandlers.push(h);
    element.addEventListener(type, h['e'], eventOptions);
};
let RemoveEventListener = (element, type, cb, eventOptions?, viewId?) => {
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
let ToObjectCache = new MxCache();
let ToObject = (expr, cache = 1, result?) => {
    if (cache &&
        ToObjectCache.has(expr)) {
        result = ToObjectCache.get(expr);
    } else {
        result = ToTry(Function(`return ${expr}`));
        if (cache) {
            if (DEBUG) {
                result = Safeguard(result);
            }
            ToObjectCache.set(expr, result);
        }
    }
    return result;
};
let Decode = decodeURIComponent;
let PathToObject = new MxCache();
let ParseUri = path => {
    //把形如 /xxx/?a=b&c=d 转换成对象 {path:'/xxx/',params:{a:'b',c:'d'}}
    //1. /xxx/a.b.c.html?a=b&c=d  path /xxx/a.b.c.html
    //2. /xxx/?a=b&c=d  path /xxx/
    //5. /xxx/index.html  => path /xxx/index.html
    //11. ab?a&b          => path ab  params:{a:'',b:''}
    let r = PathToObject.get(path),
        pathname, key, value, po, q,
        rest;
    if (!r) {
        po = {};
        q = path.indexOf('?');
        if (q == -1) {
            pathname = path;
            rest = Empty;
        } else {
            pathname = path.substring(0, q);
            rest = path.substring(q + 1);
        }
        if (rest) {
            for (q of rest.split('&')) {
                [key, value] = q.split('=');
                po[Decode(key)] = Decode(value || Empty);
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
        if (v || Has(keo, p)) {
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
let ParseExpr = (expr, data, result?) => {
    if (ParseExprCache.has(expr)) {
        result = ParseExprCache.get(expr);
    } else {
        result = ToObject(expr, 0);
        if (expr.includes(Spliter)) {
            TranslateData(data, result);
            if (DEBUG) {
                result = Safeguard(result, true);
            }
        } else {
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
let CallBreakTime = 8;
let StartCall = () => {
    let last = Date_Now(),
        next, args, context;
    try {
        while (CallBreakTime) {
            next = CallList[CallIndex];
            context = CallList[CallIndex - 1];
            args = CallList[CallIndex + 1];
            CallList[CallIndex] = Null;
            CallList[CallIndex - 1] = Null;
            CallList[CallIndex + 1] = Null;
            CallList[CallIndex + 2] = Null;
            CallIndex += 4;
            if (next) {
                if (next != Noop) {
                    if (IsArray(args)) {
                        next.apply(context, args);
                    } else {
                        next.call(context, args);
                    }
                }
                if (Date_Now() - last > CallBreakTime &&
                    CallList.length > CallIndex) {
                    
                    Timeout(StartCall);
                    console.log(`[CF] take a break of ${CallList.length} at ${CallIndex}`);
                    break;
                }
            } else {
                
                CallList.length = CallIndex = 0;
                break;
            }
        }
    } catch (ex) {
        Mx_Cfg.error(ex);
        Timeout(StartCall);
    }
};
let CallFunction = (fn, args?, context?, id?) => {
    if (!CallIndex) {
        CallIndex = 1;
        Timeout(StartCall);
    }
    if (id) {
        for (let i = CallList.length - 1; i >= CallIndex; i -= 4) {
            if (CallList[i] == id) {
                CallList[i - 3] = Null;
                CallList[i - 2] = Noop;
                CallList[i - 1] = Null;
                CallList[i] = Null;
                console.log('ignore id', id);
            }
        }
    }
    CallList.push(context, fn, args, id);
};
let M_Ext = '.js';
let ImportPromises = {};
let Async_Require = async (name, fn) => {
    if (name) {
        if (!IsArray(name)) name = [name];
        let a = [], b = [], f, s, p;
        let paths = Mx_Cfg.paths;
        
        for (f of name) {
            s = f.indexOf('/');
            if (s > -1 && !f.startsWith('.')) {
                p = f.slice(0, s);
                f = f.slice(s + 1);
                if (DEBUG) {
                    f = (paths[p] || `unset/${p}/path/`) + f;
                } else {
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
        try {
            name = await Promise.all(a);
            for (f of name) {
                b.push(f.default);
            }
        } catch {

        }
        CallFunction(fn, b);
    } else {
        CallFunction(fn);
    }
};
let Extend = (ctor, base, props?, cProto?: any) => {
    //bProto.constructor = base;
    Noop[Prototype] = base[Prototype];
    cProto = new Noop();
    Assign(cProto, props);
    //Assign(ctor, statics);
    cProto.constructor = ctor;
    ctor[Prototype] = cProto;
    return ctor;
};
let Safeguard = data => data;
if (DEBUG && window.Proxy) {
    let ProxiesPool = new Map();
    Safeguard = (data, allowDeep?, setter?, prefix?= '') => {
        if (IsPrimitive(data)) {
            return data;
        }
        let key = prefix + '\x01' + setter;
        let p = data['\x01_sf_\x01']
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
        let key = Spliter + name,
            me = this,
            list = me[key],
            idx = 0, len, t;
        if (!data) data = {};
        data.type = name;
        if (list) {
            for (len = list.length; idx < len; idx++) {
                t = list[idx];
                if (t['a']) {
                    t['b'] = 1;
                    ToTry(t['a'], data, me);
                    t['b'] = Empty;
                } else if (!t['b']) {
                    list.splice(idx--, 1);
                    len--;
                }
            }
        }
        list = me[`on${name}`];
        if (list) ToTry(list, data, me);
        // return me;
    },
    on(name, fn) {
        let me = this;
        let key = Spliter + name;
        let list = me[key] || (me[key] = []);
        list.push({
            'a': fn
        });
        // return me;
    },
    off(name, fn) {
        let key = Spliter + name,
            me = this,
            list = me[key],
            t;
        if (fn) {
            if (list) {
                for (t of list) {
                    if (t['a'] == fn) {
                        t['a'] = Empty;
                        break;
                    }
                }
            }
        } else {
            me[key] = Null;
            me[`on${name}`] = Null;
        }
        // return me;
    }
};







let Vframe_RootVframe;
let Vframe_Vframes = {};
let Vframe_RootId;
let Vframe_TranslateQuery = (pId, src, params, pVf?) => {
    if (src.includes(Spliter) &&
        (pVf = Vframe_Vframes[pId])) {
        TranslateData(pVf['a'], params);
    }
};
let Vframe_Root = (rootId?, e?) => {
    if (!Vframe_RootVframe) {
        Doc_Body = Doc_Document.body;
        rootId = Vframe_RootId = Mx_Cfg.rootId;
        e = GetById(rootId);
        if (!e) {
            if (DEBUG) {
                console.warn('can not find element:"' + rootId + '",use document.body as default');
            }
            e = Doc_Body;
        }
        Vframe_RootVframe = new Vframe(e);
    }
    return Vframe_RootVframe;
};
let Vframe_Unroot = () => {
    if (Vframe_RootVframe) {
        Vframe_RootVframe.unmount();
        Vframe_RootVframe = Null;
    }
}


let Vframe_AddVframe = (id, vframe) => {
    if (!Has(Vframe_Vframes, id)) {
        Vframe_Vframes[id] = vframe;
        
        // Vframe.fire('add', {
        //     vframe
        // });
        
    }
};
let Vframe_RemoveVframe = (id, vframe?, root?) => {
    vframe = Vframe_Vframes[id];
    if (vframe) {
        delete Vframe_Vframes[id];
        root = vframe.root;
        root['a'] = 0;
        root['b'] = 0;
        
        // Vframe.fire('remove', {
        //     vframe
        // });
        
        vframe.id = vframe.root = vframe.pId = vframe['b'] = Null; //清除引用,防止被移除的view内部通过setTimeout之类的异步操作有关的界面，影响真正渲染的view
        if (DEBUG) {
            let nodes = Doc_Document.querySelectorAll('#' + id);
            if (nodes.length > 1) {
                Mx_Cfg.error(Error(`remove vframe error. dom id:"${id}" duplicate`));
            }
        }
    }
};

let Vframe_RunInvokes = (vf, list, name, resolve, view, fn, args) => {
    list = vf['c']; //invokeList
    view = vf['d'];
    while (list.length) {
        [name, args, resolve] = list.shift();
        CallFunction(resolve, (fn = view[name]) && ToTry(fn, args, view));
    }
};




let Vframe_UnmountZone = (owner, root?) => {
    let p, vf, unmount;
    for (p in owner['b']) {
        if (root) {
            vf = Vframe_Vframes[p];
            unmount = vf && NodeIn(vf.root, root);
        } else {
            unmount = 1;
        }
        if (unmount) {
            owner.unmount(p, 1);
        }
    }
};

let Vframe_MountZone = (owner, zone?, it?, vframes?) => {
    zone = zone || owner.root;
    vframes = zone.querySelectorAll(`[${MX_View}][${MX_OWNER}="${owner.id}"]`);
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

    //me['e'] = 1; //hold fire creted
    //me.unmountZone(zoneId, 1); 不去清理，详情见：https://github.com/thx/magix/issues/27

    for (it of vframes) {
        if (!it['a']) { //防止嵌套的情况下深层的view被反复实例化
            it['a'] = 1;
            owner.mount(it, GetAttribute(it, MX_View));
        }
    }
    //me['e'] = 0;
};
/**
  * 销毁对应的view
  */
let Vframe_unmountView = owner => {
    let { 'd': v, root } = owner;
    owner['c'] = [];
    if (v) {
        owner['d'] = 0; //unmountView时，尽可能早的删除vframe上的$v对象，防止$v销毁时，再调用该 vfrmae的类似unmountZone方法引起的多次created
        if (v['a']) {
            v['a'] = 0;
            Unmark(v);
            Vframe_UnmountZone(owner);
            
            v.fire('destroy');
            
            View_DelegateEvents(v, 1);
            //v.owner = v.root = Null;
            if (root && owner['f'] /*&&!keepPreHTML*/) { //如果$v本身是没有模板的，也需要把节点恢复到之前的状态上：只有保留模板且$v有模板的情况下，这条if才不执行，否则均需要恢复节点的html，即$v安装前什么样，销毁后把节点恢复到安装前的情况
                SetInnerHTML(root, owner['g']);
            }
        }
    }
    owner['h']++; //增加signature，阻止相应的回调，见mountView
};
let Vframe_mountView = (owner, viewPath, viewInitParams? /*,keepPreHTML*/) => {
    let { id, root, pId } = owner;
    let po, sign, view, params;
    if (!owner['f'] && root) { //alter
        owner['f'] = 1;
        owner['g'] = root.innerHTML;
    }
    Vframe_unmountView(owner);
    if (root && viewPath) {
        po = ParseUri(viewPath);
        view = po[Path];
        owner[Path] = viewPath;
        params = po[Params];
        
        Vframe_TranslateQuery(pId, viewPath, params);
        owner['i'] = view;
        pId = params[Spliter];
        if (pId &&
            IsObject(pId)) {
            params = pId;
        } else {
            Assign(params, viewInitParams);
        }
        sign = owner['h'];
        Async_Require(view, TView => {
            if (sign == owner['h']) { //有可能在view载入后，vframe已经卸载了
                if (TView) {
                    View_Prepare(TView);
                    view = new TView(id, root, owner, params);

                    if (DEBUG) {
                        let viewProto = TView.prototype;
                        let importantProps = {
                            id: 1,
                            owner: 1,
                            root: 1,
                            'b': 1,
                            'c': 1,
                            'a': 1,
                            'd': 1,
                            'e': 1
                        };
                        for (let p in view) {
                            if (Has(view, p) && viewProto[p]) {
                                throw new Error(`avoid write ${p} at file ${viewPath}!`);
                            }
                        }
                        view = Safeguard(view, true, (key, value) => {
                            if (Has(viewProto, key) ||
                                (Has(importantProps, key) &&
                                    (key != 'a' || !isFinite(value)) &&
                                    ((key != 'owner' && key != 'root') || value !== Null))) {
                                throw new Error(`avoid write ${key} at file ${viewPath}!`);
                            }
                        });
                    }
                    owner['d'] = view;
                    
                    View_DelegateEvents(view);
                    ToTry(view.init, params, view);
                    CallFunction(view['f'], params, view);
                    CallFunction(() => {
                        view['g']();
                        if (!view.tmpl) { //无模板
                            //me['f'] = 0; //不会修改节点，因此销毁时不还原
                            //me['g'] = Empty;
                            if (!view['h']) {
                                View_EndUpdate(view);
                            }
                        }
                    });
                    // view['g']();
                } else {
                    //if (DEBUG) {
                    Mx_Cfg.error(Error(`${id} cannot load:${view}`));
                    //}
                }
            }
        });
    }
};

let Vframe_GetVfId = node => node['b'] || (node['b'] = GUID(Vframe_RootId));
function Vframe(root, pId?) {
    let me = this;
    let vfId = Vframe_GetVfId(root);
    me.id = vfId;
    me.root = root;
    me['h'] = 1; //signature
    me['b'] = {}; //childrenMap
    me.pId = pId; 
    me['c'] = []; //invokeList
    
    me['a'] = {};
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
});

//    , MxEvent


Assign(Vframe[Prototype], {
    mount(node, viewPath, viewInitParams) {
        let me = this,
            vf, id = me.id, c = me['b'];
        let vfId = Vframe_GetVfId(node);
        vf = Vframe_Vframes[vfId];
        if (!vf) {
            if (!Has(c, vfId)) { //childrenMap,当前子vframe不包含这个id
                me['j'] = 0; //childrenList 清空缓存的子列表
            }
            c[vfId] = vfId; //map
            vf = new Vframe(node, id);
        }
        Vframe_mountView(vf, viewPath, viewInitParams);
        return vf;
    },
    unmount(node, isVframeId) { //inner 标识是否是由内部调用，外部不应该传递该参数
        let me = this,
            vf, pId;
        node = node ? me['b'][isVframeId ? node : node['b']] : me.id;
        vf = Vframe_Vframes[node];
        if (vf) {
            Vframe_unmountView(vf);
            pId = vf.pId;
            Vframe_RemoveVframe(node);
            vf = Vframe_Vframes[pId];
            if (vf && Has(vf['b'], node)) { //childrenMap
                delete vf['b'][node]; //childrenMap
                vf['j'] = 0;
            }
        }
    },
    
    children(me) {
        me = this;
        return me['j'] || (me['j'] = Keys(me['b']));
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
        let vf = this,
            view, fn, list = vf['c'];
        return new Promise(resolve => {
            if ((view = vf['d']) &&
                view['h']) { //view rendered
                resolve((fn = view[name]) && ToTry(fn, args, view));
            } else {
                list.push([name, args, resolve]);
            }
        });
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
let Body_EvtInfoReg = /([\w\-]+)\x1e(\x1e)?([^(]+)\(([\s\S]*?)\)/;
let Body_RootEvents = {};
let Body_RootEvents_Modifier = {};
let Body_RootEvents_Passive = {};
let Body_RootEvents_Capture = {};
let Body_SearchSelectorEvents = {};
let Body_Empty_Object = {};
let Body_Passive_Flag = 4;
let Body_Capture_Flag = 8;
let Body_Capture_Modifier = { capture: true };
let Body_Passive_Modifier = { passive: false };
let Body_Passive_Capture_Modifier = { passive: false, capture: true };
if (DEBUG) {
    Body_Empty_Object = Safeguard(Body_Empty_Object);
}
let Body_FindVframeInfo = (current, eventType) => {
    let vf, tempId, selectorObject, eventSelector, eventInfos = [],
        begin = current,
        info = GetAttribute(current, MX_PREFIX + eventType),
        match, view, vfs,
        selectorVfId,
        backtrace = 0;
    if (info) {
        match = Body_EvtInfoCache.get(info);
        if (!match) {
            match = info.match(Body_EvtInfoReg) || Empty_Array;
            match = {
                v: match[1],
                t: match[2],
                n: match[3],
                i: match[4]
            };
            if (DEBUG) {
                match = Safeguard(match);
            }
            Body_EvtInfoCache.set(info, match);
        }
        match = Assign({}, match);
        if (DEBUG) {
            match = Assign(match, { r: info });
        }
    }
    //如果有匹配但没有处理的vframe或者事件在要搜索的选择器事件里
    if ((match && !match.v) || Body_SearchSelectorEvents[eventType]) {
        selectorVfId = begin['c'];
        if (selectorVfId !== Empty) { //先找最近的vframe
            vfs = [begin];
            while (begin != Doc_Body && (begin = begin.parentNode)) {
                if (Vframe_Vframes[tempId = begin['b']] ||
                    (tempId = begin['c'])) {
                    selectorVfId = tempId;
                    break;
                }
                vfs.push(begin);
            }
            for (info of vfs) {
                info['c'] = selectorVfId || Empty;
            }
        }
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
        // if (!selectorVfId) {
        //     selectorVfId = Mx_Cfg.rootId;
        // }

        if (selectorVfId) { //从最近的vframe向上查找带有选择器事件的view
            do {
                vf = Vframe_Vframes[selectorVfId];
                if (vf && (view = vf['d'])) {
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
                            } else if (backtrace) {
                                eventInfos.push(selectorObject);
                            }
                        }
                    }
                    //防止跨view选中，到带模板的view时就中止或未指定
                    if (view.tmpl && !backtrace) {
                        break; //带界面的中止
                    }
                    backtrace = 0;
                }
            }
            while (vf && (selectorVfId = vf.pId));
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
    //let lastVfId;
    let params, arr = [];
    while (target &&
        target.nodeType == 1 &&
        target != Doc_Body) {
        //事件被取消或忽略
        if (domEvent.cancelBubble ||
            (ignore = target['d']) && ignore[type]) {
            break;
        }
        ignore = 1;
        arr.push(target);
        eventInfos = Body_FindVframeInfo(target, type);
        if (eventInfos.length) {
            arr.length = 0;
            for (fn of eventInfos) {
                let { v, n, i, t } = fn;
                if (!v && DEBUG) {
                    return Mx_Cfg.error(Error(`bad ${type}:${fn.r}`));
                }
                // if (lastVfId != v) {
                //     if (lastVfId && domEvent.cancelBubble) {
                //         break;
                //     }
                //     lastVfId = v;
                // }
                vframe = Vframe_Vframes[v];
                view = vframe && vframe['d'];
                if (view) {
                    if (view['h'] &&
                        view['a']) {
                        eventName = n + Spliter + type;
                        fn = view[eventName];
                        if (fn) {
                            domEvent.eventTarget = target;
                            params = i ? ParseExpr(i, vframe['a']) : Body_Empty_Object;
                            domEvent[Params] = params;
                            ToTry(fn, domEvent, view);
                        }
                        if (DEBUG) {
                            if (!fn) { //检测为什么找不到处理函数
                                console.error('can not find event processor:' + n + '<' + type + '> from view:' + vframe.path);
                            }
                        }
                        if (!t &&
                            target != view.root &&
                            !Body_SearchSelectorEvents[type]) {
                            target = view.root;
                            ignore = 0;
                        }
                    }
                } else {//如果处于删除中的事件触发，则停止事件的传播
                    if (DEBUG) {
                        if (view !== 0) { //销毁
                            console.error('can not find vframe:' + v);
                        }
                    }
                    break;
                }
            }
        }
        if (ignore) {
            vframe = target['b'];
            if (vframe) {
                vframe = Vframe_Vframes[vframe];
                view = vframe && vframe['d'];
                if (view &&
                    view['j'][type]) {
                    arr.length = 0;
                }
            }
            target = target.parentNode;
        }
    }
    for (target of arr) {
        ignore = target['d'] || (target['d'] = {});
        ignore[type] = 1;
    }
};
let Body_DOMEventBind = (type, searchSelector, remove, flags) => {
    let counter = Body_RootEvents[type] | 0;
    let passiveCount = Body_RootEvents_Passive[type] | 0;
    let captureCount = Body_RootEvents_Capture[type] | 0;

    let offset = (remove ? -1 : 1),
        fn = remove ? RemoveEventListener : AddEventListener;
    if (flags & Body_Passive_Flag) {
        passiveCount += offset;
        Body_RootEvents_Passive[type] = passiveCount
    }
    if (flags & Body_Capture_Flag) {
        captureCount += offset;
        Body_RootEvents_Capture[type] = captureCount;
    }
    let mod,
        lastMod = Body_RootEvents_Modifier[type];
    if (passiveCount && captureCount) {
        mod = Body_Passive_Capture_Modifier;
    } else if (passiveCount) {
        mod = Body_Passive_Modifier;
    } else if (captureCount) {
        mod = Body_Capture_Modifier;
    }
    if (!counter || remove === counter) { // remove=1  counter=1
        fn(Doc_Body, type, Body_DOMEventProcessor, remove ? lastMod : mod);
    } else if (mod != lastMod) {
        RemoveEventListener(Doc_Body, type, Body_DOMEventProcessor, lastMod);
        AddEventListener(Doc_Body, type, Body_DOMEventProcessor, mod);
    }
    Body_RootEvents_Modifier[type] = mod;
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
// let Updater_Ready_List = [];
// let Updater_Ready_Checker = ready => {
//     let findUnready = 0,
//         findCurrent = 0;
//     for (let r of Updater_Ready_List) {
//         if (r['a'] == ready) {
//             r['b'] = 1;
//             findCurrent = 1;
//         }
//         if (r['b']) {
//             if (!findUnready &&
//                 !r['c']) {
//                 r['c'] = 1;
//                 r['a']();
//                 r['a'] = Empty;
//             }
//         } else {
//             findUnready = 1;
//         }
//         if (findUnready &&
//             findCurrent) {
//             break;
//         }
//     }
//     findCurrent = Updater_Ready_List[Updater_Ready_List.length - 1];
//     if (findCurrent['a'] === Empty) {
//         Updater_Ready_List.length = 0;
//     }
// };
let Updater_Digest = (view , fire?, tmpl?) => {
    if (view['a'] &&
        (tmpl = view.tmpl)) {
        let keys = view['k'],
            viewId = view.id,
            vf = Vframe_Vframes[viewId],
            ref = {
                'a': []
         , 'b': 0
            },
            vdom, data = view['d'],
            refData = vf['a'];
        view['l'] = 0;
        view['k'] = {};
        
        
        //if (fire) {
        
        //view.fire('dompatch');
        
        //}
        
        
        vdom = tmpl(data, Q_Create, viewId, Updater_Safeguard, Updater_EncodeURI, refData, Updater_Ref, Updater_EncodeQ, IsArray);
        if (DEBUG) {
            Updater_CheckInput(view, vdom['a']);
        }
        
        
        let refresh = () => {
            if (view['a']) {
                tmpl = ref['c'] || !view['h'];
                if (tmpl) {
                    View_EndUpdate(view);
                }
                for (vdom of ref['a']) {
                    CallFunction(vdom['g'], Empty_Array, vdom, Spliter + vdom.id);
                    //CallFunction(View_CheckAssign, [vdom]);
                }
            }
        };
        let ready = () => {
            
            view['m'] = vdom;
            
            if (view['n'] > 1) {
                view['n'] = 1;
                refresh();
                Updater_Digest(view);
            } else {
                view['n'] = 0;
                
                /*
                    在dom diff patch时，如果已渲染的vframe有变化，则会在vom tree上先派发created事件，同时传递inner标志，vom tree处理alter事件派发状态，未进入created事件派发状态
        
                    patch完成后，需要设置vframe hold fire created事件，因为带有assign方法的view在调用render后，vom tree处于就绪状态，此时会导致提前派发created事件，应该hold，统一在endUpdate中派发
        
                    有可能不需要endUpdate，所以hold fire要视情况而定
                */
                refresh();
                
                //view.fire('domready');
                
                
                keys = view['o'];
                for (vdom of keys) {
                    vdom();
                }
                keys.length = 0;
            }
        };
        // Updater_Ready_List.push({
        //     'a': ready
        // });
        CallFunction(V_SetChildNodes, [view.root, view['m'], vdom, ref, vf, keys, view, ready]);
        //V_SetChildNodes(view.root, view['m'], vdom, ref, vf, keys, view, ready);
        
    }
};
let Q_TEXTAREA = 'textarea';
let Q_Empty_Object = {};
let Q_Create = (tag, props, children, specials) => {
    //html=tag+to_array(attrs)+children.html
    let token;
    if (tag) {
        props = props || Q_Empty_Object;
        let compareKey = Empty,
            unary = children == 1,
            hasMxv /*= specials*/,
            prop, value, c,
            reused = {},
            reusedTotal = 0,
            outerHTML = '<' + tag,
            attrs = '',
            innerHTML = Empty,
            newChildren = [],
            prevNode,
            mxView = 0;
        if (children &&
            children != 1) {
            for (c of children) {
                value = c['a'];
                if (c['b'] == V_TEXT_NODE) {
                    if (value) {
                        value = Updater_Encode(value);
                    } else {
                        continue
                    }
                    //value = value ? Updater_Encode(value) : '\u200b';//无值的文本节点我们用一个空格占位，这样在innerHTML的时候才会有文本节点 该空白文本节点是&#8203
                }
                innerHTML += value;
                //merge text node
                if (prevNode &&
                    c['b'] == V_TEXT_NODE &&
                    prevNode['b'] == V_TEXT_NODE) {
                    //prevNode['c'] += c['c'];
                    prevNode['a'] += c['a'];
                } else {
                    //reused node if new node key equal old node key
                    if (c['d']) {
                        reused[c['d']] = (reused[c['d']] || 0) + 1;
                        reusedTotal++;
                    }
                    //force diff children
                    hasMxv = hasMxv || c['e'];
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
            } else if (value === true) {
                props[prop] = value = specials[prop] ? value : Empty;
            }
            if (prop == Tag_Prop_Id ||
                prop == Tag_Porp_MX_Key) {//如果有id优先使用
                compareKey = value;
            } else if ((prop == Tag_Static_Key) && !compareKey) {
                compareKey = value;
            } else if (prop == MX_View &&
                value) {
                mxView = 1;
                if (!compareKey) {
                    //否则如果是组件,则使用组件的路径做为key
                    compareKey = tag + Spliter + ParseUri(value)[Path];
                }
            }
            if (prop == Value &&
                tag == Q_TEXTAREA) {
                innerHTML = value;
                attrs += value;
            } else if (!Has(V_SKIP_PROPS, prop)) {
                outerHTML += ` ${prop}="${value && Updater_Encode(value)}"`;
            }
        }
        
        attrs += outerHTML;
        outerHTML += unary ? '/>' : `>${innerHTML}</${tag}>`;
        token = {
            'a': outerHTML,
            'c': innerHTML,
            'd': compareKey,
            'b': tag,
            'f': mxView,
            'e': hasMxv || props[Tag_View_Params_Key],
            'g': specials,
            'h': attrs,
            'i': props,
            'j': newChildren,
            'k': reused,
            'l': reusedTotal,
            'm': unary
        };
    } else {
        token = {
            'b': children ? Spliter : V_TEXT_NODE,
            'a': props + Empty
        };
    }
    return token;
};
let V_SKIP_PROPS = {
    [Tag_Static_Key]: 1,
    [Tag_View_Params_Key]: 1,
    [Tag_Porp_MX_Key]: 1
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
    let key, value,
        changed = 0,
        nsMap = newVDOM['g'],
        osMap = lastVDOM['g'],
        nMap = newVDOM['i'],
        oMap = lastVDOM['i'],
        sValue;
    if (lastVDOM) {
        for (key in oMap) {
            if (!Has(nMap, key)) {//如果旧有新木有
                changed = 1;
                if ((sValue = osMap[key])) {
                    oldNode[sValue] = Empty;
                } else {
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
            } else if (!lastVDOM || oMap[key] != value) {
                changed = 1;
                oldNode.setAttribute(key, value);
            }
        }
    }
    return changed;
};

let V_CreateNode = (vnode, owner) => {
    let tag = vnode['b'], c;
    if (tag == V_TEXT_NODE) {
        c = Doc_Document.createTextNode(vnode['a']);
    } else {
        c = Doc_Document.createElementNS(V_NSMap[tag] || owner.namespaceURI, tag);
        V_SetAttributes(c, 0, vnode);
        SetInnerHTML(c, vnode['c']);
    }
    return c;
};
let V_GetKeyNodes = (list, nodes, start, end, realEnd) => {
    let keyedNodes = {},
        i, oc, cKey;//, iKey;
    for (i = end; i >= start; i--, realEnd--) {
        oc = list[i];
        cKey = oc['d'];
        if (cKey) {
            //iKey = Spliter + cKey;
            //keyedNodes[iKey] = (keyedNodes[iKey] || 0) + 1;
            oc = keyedNodes[cKey] || (keyedNodes[cKey] = []);
            oc.push(nodes[realEnd]);
        }
    }
    return keyedNodes;
};
let V_IsSameVNode = (aVNode, bVNode) => {
    return (aVNode['d'] &&
        bVNode['d'] == aVNode['d']) ||
        (!aVNode['d'] &&
            !bVNode['d'] &&
            aVNode['b'] == bVNode['b']) ||
        bVNode['b'] == Spliter
        // (aVNode['b'] == V_TEXT_NODE &&
        //     bVNode['b'] == V_TEXT_NODE) ||
        // (aVNode['b'] == Spliter ||
        //     bVNode['b'] == Spliter) ||
        /*(aVNode['d'] &&
            bVNode['d'] == aVNode['d'])/* ||
        (aVNode['a'] ==
            bVNode['a'])*/;
};
let V_Remove_Vframe_By_Node = (node, parentVf, elementNode, vf?) => {
    if (elementNode) {
        vf = Vframe_Vframes['b'];
        if (vf) {
            vf.unmount();
        } else {
            Vframe_UnmountZone(parentVf, node);
        }
    }
};
let V_Remove_Node_Task = (node, parent, parentVf, ref, ready) => {
    V_Remove_Vframe_By_Node(node, parentVf, node.nodeType == 1);
    if (DEBUG) {
        if (!node.parentNode) {
            console.error('Avoid remove node on view.destroy in digesting');
        }
    }
    parent.removeChild(node);
    if (!(--ref['b'])) {
        CallFunction(ready);
    }
};
// let V_DecreaseUsed = (reused, resuedTotal, vnode, keyedNodes, list?) => {
//     if (reused[vnode['d']]) {
//         reused[vnode['d']]--;
//         resuedTotal--;
//         if (keyedNodes &&
//             (list = keyedNodes[vnode['d']]) &&
//             list.length > 1) {
//             keyedNodes = Null;
//         }
//     }
//     return [resuedTotal, keyedNodes];
// };
let V_SetChildNodes = (realNode, lastVDOM, newVDOM, ref, vframe, keys, view?, ready?) => {
    
    if (view['a']) {
        
        if (lastVDOM) {//view首次初始化，通过innerHTML快速更新
            if (lastVDOM['e'] ||
                lastVDOM['c'] != newVDOM['c']) {
                let i, oi, oc,
                    oldChildren = lastVDOM['j'],
                    newChildren = newVDOM['j'],
                    reused = newVDOM['k'],
                    resuedTotal = newVDOM['l'],
                    oldReusedTotal = lastVDOM['l'],
                    nodes = realNode.childNodes, compareKey,
                    keyedNodes,
                    oldRangeStart = 0,
                    oldRangeEnd = oldChildren.length - 1,
                    newRangeStart = 0,
                    newRangeEnd = newChildren.length - 1;

                if (DEBUG &&
                    lastVDOM['b'] != Q_TEXTAREA) {
                    CheckNodes(nodes, oldChildren);
                }
                // let newCount = newChildren.length - 1;
                // let oldCount = oldChildren.length - 1,
                //     nc,
                //     realNodeStep;
                // keyedNodes = {};
                // while (oldCount &&
                //     newCount) {
                //     oc = oldChildren[oldRangeStart];
                //     nc = newChildren[newRangeStart];
                //     if (oc['a'] ==
                //         nc['a']) {
                //         if (oc['e']) {
                //             V_SetNode(nodes[oldRangeStart], realNode, oc, nc, ref, vframe, keys);
                //         }
                //         if (reused[oc['d']]) {
                //             reused[oc['d']]--;
                //             resuedTotal--;
                //         }
                //         ++oldRangeStart;
                //         ++newRangeStart;
                //         --oldCount;
                //         --newCount;
                //     } else {
                //         break;
                //     }
                // }
                // while (oldCount > 1 &&
                //     newCount > 1) {
                //     oc = oldChildren[oldRangeEnd];
                //     nc = newChildren[newRangeEnd];
                //     if (oc && nc &&
                //         oc['a'] ==
                //         nc['a']) {
                //         if (oc['e']) {
                //             V_SetNode(nodes[oldRangeEnd], realNode, oc, nc, ref, vframe, keys);
                //         }
                //         if (reused[oc['d']]) {
                //             reused[oc['d']]--;
                //             resuedTotal--;
                //         }
                //         --oldRangeEnd;
                //         --newRangeEnd;
                //         --oldCount;
                //         --newCount;
                //     } else {
                //         break;
                //     }
                // }
                // if (resuedTotal > 0 &&
                //     oldReusedTotal > 0) {
                //     for (i = oldRangeEnd; i >= oldRangeStart; i--) {
                //         oc = oldChildren[i];
                //         compareKey = oc['d'];
                //         if (compareKey) {
                //             compareKey = keyedNodes[compareKey] || (keyedNodes[compareKey] = []);
                //             compareKey.push(nodes[i]);
                //         }
                //     }
                // }

                // for (i = newRangeStart; i <= newRangeEnd; i++) {
                //     nc = newChildren[i];
                //     oc = oldRangeStart <= oldRangeEnd && oldChildren[oldRangeStart++];
                //     compareKey = keyedNodes[nc['d']];
                //     if (compareKey && (compareKey = compareKey.pop())) {
                //         if (compareKey != nodes[i]) {
                //             for (oi = oldRangeStart, realNodeStep = 1;
                //                 oi <= oldRangeEnd;
                //                 oi++, realNodeStep++) {
                //                 oc = oldChildren[oi];
                //                 if (oc && nodes[i + realNodeStep] == compareKey) {
                //                     oldChildren.splice(oi, 1);
                //                     oldRangeStart--;
                //                     break;
                //                 }
                //             }
                //             realNode.insertBefore(compareKey, nodes[i]);
                //         }
                //         if (reused[oc['d']]) {
                //             reused[oc['d']]--;
                //         }
                //         
                //         ref['b']++;
                //         CallFunction(V_SetNode, [compareKey, realNode, oc, nc, ref, vframe, keys, view, ready]);
                //         
                //     } else if (oc) {//有旧节点，则更新
                //         if (keyedNodes[oc['d']] &&
                //             reused[oc['d']]) {
                //             oldCount++;
                //             ref['c'] = 1;
                //             realNode.insertBefore(V_CreateNode(nc, realNode), nodes[i]);
                //             oldRangeStart--;
                //         } else {
                //             ref['b']++;
                //             CallFunction(V_SetNode, [nodes[i], realNode, oc, nc, ref, vframe, keys, view, ready]);
                //             
                //         }
                //     } else {//添加新的节点
                //         if (nc['b'] == Spliter) {
                //             SetInnerHTML(realNode, nc['a']);
                //         } else {
                //             realNode.insertBefore(V_CreateNode(nc, realNode), nodes[i]);
                //         }
                //         ref['c'] = 1;
                //     }
                // }
                // for (i = newCount; i < oldCount; i++) {
                //     oi = nodes[newRangeEnd + 1];//删除多余的旧节点
                //     if (oi.nodeType == 1) {
                //         vframe.unmountZone(oi);
                //     }
                //     if (DEBUG) {
                //         if (!oi.parentNode) {
                //             console.error('Avoid remove node on view.destroy in digesting');
                //         }
                //     }
                //     realNode.removeChild(oi);
                // }
                //-------new alg-------
                let oldStartNode = oldChildren[oldRangeStart],
                    oldEndNode = oldChildren[oldRangeEnd],
                    newStartNode = newChildren[newRangeStart],
                    newEndNode = newChildren[newRangeEnd],
                    realNodeRangeStart = oldRangeStart,
                    realNodeRangeEnd = oldRangeEnd,
                    currentNode;
                while (oldRangeStart <= oldRangeEnd &&
                    newRangeStart <= newRangeEnd) {
                    if (newStartNode['b'] == Spliter ||
                        newEndNode['b'] == Spliter) {
                        realNodeRangeEnd = -1;
                    }
                    if (!oldStartNode) {
                        oldStartNode = oldChildren[++oldRangeStart];
                    } else if (!oldEndNode) {
                        oldEndNode = oldChildren[--oldRangeEnd];
                    } else if (V_IsSameVNode(oldStartNode, newStartNode)) {
                        
                        ref['b']++;
                        CallFunction(V_SetNode, [nodes[realNodeRangeStart], realNode, oldStartNode, newStartNode, ref, vframe, keys, view, ready]);
                        
                        //更新需要保留的节点，加速对节点索引
                        //如果当前节点已经在索引中，则要按顺序移除
                        //[resuedTotal, keyedNodes] = V_DecreaseUsed(reused, resuedTotal, oldStartNode, keyedNodes);
                        if (reused[oldStartNode['d']]) {
                            reused[oldStartNode['d']]--;
                            resuedTotal--;
                            compareKey = keyedNodes &&
                                keyedNodes[oldStartNode['d']];
                            if (compareKey) {
                                --keyedNodes[oldStartNode['d']];
                            }
                        }
                        realNodeRangeStart++;
                        oldStartNode = oldChildren[++oldRangeStart];
                        newStartNode = newChildren[++newRangeStart];
                    } else if (V_IsSameVNode(oldEndNode, newEndNode)) {
                        
                        ref['b']++;
                        CallFunction(V_SetNode, [nodes[realNodeRangeEnd], realNode, oldEndNode, newEndNode, ref, vframe, keys, view, ready]);
                        
                        //[resuedTotal, keyedNodes] = V_DecreaseUsed(reused, resuedTotal, oldEndNode, keyedNodes);
                        if (reused[oldEndNode['d']]) {
                            reused[oldEndNode['d']]--;
                            resuedTotal--;
                        }
                        realNodeRangeEnd--;
                        oldEndNode = oldChildren[--oldRangeEnd];
                        newEndNode = newChildren[--newRangeEnd];
                    } else if (V_IsSameVNode(oldStartNode, newEndNode)) {
                        oi = nodes[realNodeRangeStart];
                        realNode.insertBefore(oi, nodes[realNodeRangeEnd + 1]);
                        
                        ref['b']++;
                        CallFunction(V_SetNode, [oi, realNode, oldStartNode, newEndNode, ref, vframe, keys, view, ready]);
                        
                        //[resuedTotal, keyedNodes] = V_DecreaseUsed(reused, resuedTotal, oldStartNode, keyedNodes);
                        if (reused[oldStartNode['d']]) {
                            reused[oldStartNode['d']]--;
                            resuedTotal--;
                        }
                        realNodeRangeEnd--;
                        oldStartNode = oldChildren[++oldRangeStart];
                        newEndNode = newChildren[--newRangeEnd];
                    } else if (V_IsSameVNode(newStartNode, oldEndNode)) {
                        oi = nodes[realNodeRangeEnd];
                        realNode.insertBefore(oi, nodes[realNodeRangeStart++]);
                        
                        ref['b']++;
                        CallFunction(V_SetNode, [oi, realNode, oldEndNode, newStartNode, ref, vframe, keys, view, ready]);
                        
                        if (reused[oldEndNode['d']]) {
                            reused[oldEndNode['d']]--;
                            resuedTotal--;
                        }
                        //[resuedTotal, keyedNodes] = V_DecreaseUsed(reused, resuedTotal, oldEndNode, keyedNodes);
                        oldEndNode = oldChildren[--oldRangeEnd];
                        newStartNode = newChildren[++newRangeStart];
                    } else {
                        if (!keyedNodes &&
                            resuedTotal > 0 &&
                            oldReusedTotal > 0) {
                            keyedNodes = V_GetKeyNodes(oldChildren, nodes, oldRangeStart, oldRangeEnd, realNodeRangeEnd);
                        }
                        currentNode = nodes[realNodeRangeStart];
                        compareKey = keyedNodes &&
                            keyedNodes[newStartNode['d']];
                        /**
                         * <div>{{=f}}</div>   =>  <div>aa</div>
                         * <div>aa</div>
                         * <div>bb</div>
                         */
                        if (compareKey &&
                            (compareKey = compareKey.pop()/*[--keyedNodes[Spliter + newStartNode['d']]]*/)) {
                            oc = oldStartNode;
                            if (compareKey != currentNode) {
                                /**
                                 * <div>{{=x}}</div>    =>    <div>aa</div>
                                 * <div>aa</div>              <div>bb</div>
                                 * <div>bb</div>
                                 * <div>{{=y}}</div>
                                 */
                                for (oi = oldRangeStart + 1,
                                    i = realNodeRangeStart + 1;
                                    oi <= oldRangeEnd;
                                    oi++) {
                                    oc = oldChildren[oi];
                                    if (oc &&
                                        nodes[i++] == compareKey) {
                                        oldChildren[oi] = Null;
                                        break;
                                    }
                                }
                                oldRangeStart--;
                                realNode.insertBefore(compareKey, currentNode);
                            }
                            if (reused[oc['d']]) {
                                reused[oc['d']]--;
                            }
                            
                            ref['b']++;
                            CallFunction(V_SetNode, [compareKey, realNode, oc, newStartNode, ref, vframe, keys, view, ready]);
                            
                        } else {
                            /**
                             * <div>aa</div>    =>    <div>{{=f}}</div>
                             *                        <div>aa</div>
                             *                        <div>bb</div>
                             */
                            if ((keyedNodes &&
                                keyedNodes[oldStartNode['d']] &&
                                reused[oldStartNode['d']]) ||
                                (Vframe_Vframes[currentNode['b']] &&
                                    !newStartNode['f'])) {
                                ref['c'] = 1;
                                realNode.insertBefore(V_CreateNode(newStartNode, realNode), currentNode);
                                oldRangeStart--;
                                realNodeRangeEnd++;
                            } else {
                                
                                ref['b']++;
                                CallFunction(V_SetNode, [currentNode, realNode, oldStartNode, newStartNode, ref, vframe, keys, view, ready]);
                                
                            }
                        }
                        ++realNodeRangeStart;
                        oldStartNode = oldChildren[++oldRangeStart];
                        newStartNode = newChildren[++newRangeStart];
                    }
                }
                for (i = newRangeStart, oi = 1;
                    i <= newRangeEnd;
                    i++, oi++) {
                    oc = newChildren[i];
                    ref['c'] = 1;
                    if (oc['b'] == Spliter) {
                        ref['c'] = 1;
                        SetInnerHTML(realNode, oc['a']);
                        break;
                    } else {
                        realNode.insertBefore(V_CreateNode(oc, realNode), nodes[realNodeRangeEnd + oi]);
                    }
                }
                for (i = realNodeRangeStart; i <= realNodeRangeEnd; i++) {//删除多余的旧节点
                    ref['c'] = 1;
                    ref['b']++;
                    CallFunction(V_Remove_Node_Task, [nodes[i], realNode, vframe, ref, ready]);
                }
            }
        } else {
            ref['c'] = 1;
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
                                nv['d'] &&
                                nv['d'].tmpl &&
                                NodeIn(vframe.root, nv.root)) {
                                throw new Error(`unsupport nest "${vframe.path}" within "${nv.path}"`);
                            }
                        }
                    }
                }
            }
            
        }
        
    }
    
    
    if (!ref['b']) {
        CallFunction(ready);
    }
    
};
let V_SetNode = (realNode, oldParent, lastVDOM, newVDOM, ref, vframe, keys, rootView?, ready?) => {
    
    if (rootView['a']) {
        
        if (DEBUG) {
            if (lastVDOM['b'] != Spliter &&
                newVDOM['b'] != Spliter) {
                if (oldParent.nodeName == 'TEMPLATE') {
                    console.error('unsupport template tag');
                }
                if (
                    (realNode.nodeName == '#text' &&
                        lastVDOM['b'] != '#text') ||
                    (realNode.nodeName != '#text' &&
                        realNode.nodeName.toLowerCase() != lastVDOM['b'].toLowerCase())) {
                    console.error('Your code is not match the DOM tree generated by the browser. near:' + lastVDOM['c'] + '. Is that you lost some tags or modified the DOM tree?');
                }
            }
        }
        let lastAMap = lastVDOM['i'],
            newAMap = newVDOM['i'];
        if (lastVDOM['e'] ||
            lastVDOM['a'] != newVDOM['a']) {
            if (newVDOM['b'] == Spliter) {
                ref['c'] = 1;
                SetInnerHTML(oldParent, newVDOM['a']);
            } else if (lastVDOM['b'] == newVDOM['b']) {
                if (lastVDOM['b'] == V_TEXT_NODE) {
                    ref['c'] = 1;
                    realNode.nodeValue = newVDOM['a'];
                } else if (!lastAMap[Tag_Static_Key] ||
                    lastAMap[Tag_Static_Key] != newAMap[Tag_Static_Key]) {
                    let newMxView = newAMap[MX_View],
                        newHTML = newVDOM['c'],
                        updateAttribute = lastVDOM['h'] != newVDOM['h'],
                        updateChildren, unmountOld,
                        oldVf = Vframe_Vframes[realNode['b']],
                        assign,
                        view,
                        uri = newMxView && ParseUri(newMxView),
                        params,
                        htmlChanged,
                        paramsChanged;
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
                            ref['c'] = 1;
                        }
                    }
                    //旧节点有view,新节点有view,且是同类型的view
                    if (newMxView && oldVf &&
                        oldVf['i'] == uri[Path] &&
                        (view = oldVf['d'])  ) {
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
                            htmlChanged ) {
                            assign = view['f'];
                            //如果有assign方法,且有参数或html变化
                            //if (assign) {
                            params = uri[Params];
                            //处理引用赋值
                            Vframe_TranslateQuery( oldVf.pId, newMxView, params);
                            oldVf[Path] = newMxView;//update ref
                            oldVf['g'] = newHTML;
                            //如果需要更新，则进行更新的操作
                            // uri = {
                            //     //node: newVDOM,//['j'],
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
                                let result = ToTry(assign, params,/*[params, uri],*/ view);
                                if (result !== false) {
                                    if (assign == View.prototype.assign) {
                                        console.error(`override ${uri[Path]} "assign" method and make sure returned true or false value`);
                                    }
                                    ref['a'].push(view);
                                }
                            } else if (ToTry(assign, params,/*[params, uri],*/ view) !== false) {
                                
                                ref['a'].push(view);
                            }
                            //默认当一个组件有assign方法时，由该方法及该view上的render方法完成当前区域内的节点更新
                            //而对于不渲染界面的控制类型的组件来讲，它本身更新后，有可能需要继续由magix更新内部的子节点，此时通过deep参数控制
                            updateChildren = !view.tmpl;//uri.deep;
                            // } else {
                            //     unmountOld = 1;
                            //     updateChildren = 1;
                            //     if (DEBUG) {
                            //         if (updateAttribute) {
                            //             console.warn(`There is no "assign" method in ${uri[Path]},so magix remount it when attrs changed`);
                            //         }
                            //     }
                            // }
                        }// else {
                        // updateAttribute = 1;
                        //}
                    } else {
                        updateChildren = 1;
                        unmountOld = oldVf;
                    }
                    if (unmountOld) {
                        ref['c'] = 1;
                        oldVf.unmount();
                    }
                    // Update all children (and subchildren).
                    //自闭合标签不再检测子节点
                    if (updateChildren &&
                        !newVDOM['m']) {
                        V_SetChildNodes(realNode, lastVDOM, newVDOM, ref, vframe, keys, rootView, ready);
                    }
                }
            } else {
                ref['c'] = 1;
                V_Remove_Vframe_By_Node(realNode, vframe, 1);
                oldParent.replaceChild(V_CreateNode(newVDOM, oldParent), realNode);
            }
        }
        
    }
    if (!(--ref['b'])) {
        CallFunction(ready);
    }
    
};

//like 'login<click>' or '$<click>' or '$win<scroll>' or '$win<scroll>&{capture:true}'
let View_EvtMethodReg = /^(\$?)([^<]*)<([^>]+)>(?:&(.+))?$/;

let processMixinsSameEvent = (exist, additional, temp?) => {
    if (exist['a']) {
        temp = exist;
    } else {
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

let View_EndUpdate = view => {
    let o, f;
    if (view['a']) {
        
        f = view['h'];
        
        view['h'] = 1;
        
        o = view.owner;
        Vframe_MountZone(o);
        if (!f) {
            CallFunction(Vframe_RunInvokes, o);
        }
        
    }
};
let View_DelegateEvents = (me, destroy) => {
    let e, { 'j': eventsObject,
        'i': selectorObject,
        'p': eventsList, id } = me; //eventsObject
    for (e in eventsObject) {
        Body_DOMEventBind(e, selectorObject[
            e], destroy, eventsObject[e]);
    }
    eventsObject = destroy ? RemoveEventListener : AddEventListener;
    for (e of eventsList) {
        eventsObject(e['a'], e['b'], e['c'], e['d'], id, me);
    }
};
let View_Globals = {
    win: Doc_Window,
    doc: Doc_Document,
    root: Empty
};
function staticExtend(...args) {
    return Assign(this, ...args), this;
}
let View_MergeMixins = (mixins, proto, ctors) => {
    let temp = {}, p, node, fn, exist;
    for (node of mixins) {
        for (p in node) {
            fn = node[p];
            exist = temp[p];
            if (p == 'ctor') {
                ctors.push(fn);
                continue;
            } else if (View_EvtMethodReg.test(p)) {
                if (exist) {
                    fn = processMixinsSameEvent(exist, fn);
                } else {
                    fn['b'] = 1;
                }
            } else if (DEBUG &&
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
        } else if (DEBUG) {
            console.error('already exist ' + p + ',avoid override it!');
        }
    }
};
function merge(...args) {
    let me = this, _ = me['a'] || (me['a'] = []);
    View_MergeMixins(args, me[Prototype], _);
    return me;
}
let safeRender = render => function (...args) { return ToTry(render, args, this) };
let execCtors = (list, params, me, cx?) => {
    if (list) {
        for (cx of list) {
            ToTry(cx, params, me);
        }
    }
}
function extend(props) {
    let me = this;
    props = props || {};
    let ctor = props.ctor;
    function NView(viewId, rootNode, ownerVf, initParams, z) {
        me.call(z = this, viewId, rootNode, ownerVf, initParams);
        if (ctor) ToTry(ctor, initParams, z);
        execCtors(NView['a'], initParams, z);
    }
    NView.merge = merge;
    NView.extend = extend;
    NView.static = staticExtend;
    return Extend(NView, me, props);
}
let View_Prepare = oView => {
    if (!oView[Spliter]) { //只处理一次
        oView[Spliter] = 1;
        let prop = oView[Prototype],
            currentFn, matches, selectorOrCallback, events, eventsObject = {},
            eventsList = [],
            selectorObject = {},
            node, isSelector, p, item, mask, mod, modifiers;
        for (p in prop) {
            currentFn = prop[p];
            matches = p.match(View_EvtMethodReg);
            if (matches) {
                [, isSelector, selectorOrCallback, events, modifiers] = matches;
                mod = modifiers ? ToObject(modifiers) : Body_Empty_Object;
                events = events.split(Comma);
                for (item of events) {
                    node = View_Globals[selectorOrCallback];
                    mask = 1;
                    if (mod.passive === false) {
                        mask |= Body_Passive_Flag;
                    }
                    if (mod.capture) {
                        mask |= Body_Capture_Flag;
                    }
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
                        if (node === Empty) {
                            selectorOrCallback = Empty;
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
                    eventsObject[item] |= mask;
                    item = selectorOrCallback + Spliter + item;
                    node = prop[item];
                    //for in 就近遍历，如果有则忽略
                    if (!node) { //未设置过
                        prop[item] = currentFn;
                    } else if (node['b']) { //现有的方法是mixins上的
                        if (currentFn['b']) { //2者都是mixins上的事件，则合并
                            prop[item] = processMixinsSameEvent(currentFn, node);
                        } else if (Has(prop, p)) { //currentFn方法不是mixin上的，也不是继承来的，在当前view上，优先级最高
                            prop[item] = currentFn;
                        }
                    }
                }
            }
        }
        prop['g'] = prop.render = safeRender(prop.render);
        prop['j'] = eventsObject;
        prop['p'] = eventsList;
        prop['i'] = selectorObject;
        prop['f'] = prop.assign;
    }
};


function View(id, root, owner, params, me) {
    me = this;
    me.root = root;
    me.owner = owner;
    me.id = id;
    //me[Spliter] = id;
    
    me['a'] = 1; //标识view是否刷新过，对于托管的函数资源，在回调这个函数时，不但要确保view没有销毁，而且要确保view没有刷新过，如果刷新过则不回调
    me['l'] = 1;
    me['d'] = {};
    me['k'] = {};
    //me['q'] = 0;
    
    me['n'] = 0;
    me['o'] = [];
    
    execCtors(View['a'], params, me);
}
Assign(View, {
    merge,
    extend
});
Assign(View[Prototype], MxEvent, {
    init: Noop,
    render: Noop,
    assign: Noop,
    
    
    get(key, result) {
        result = this['d'];
        if (key) {
            result = result[key];
        }
        return result;
    },
    set(newData, unchanged) {
        let me = this,
            oldData = me['d'],
            keys = me['k'];
        let changed = me['l'],
            now, old, p;
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
        me['l'] = changed;
        return me;
    },
    digest(data, unchanged) {
        data = this.set(data, unchanged);
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
        
        return new Promise(resolve => {
            
            if (data['l']) {
                
                data['n']++;
                data['o'].push(resolve);
                if (data['n'] == 1) {
                    Updater_Digest(data, 1);
                }
                
            }
            
            else if (data['n']) {
                data['o'].push(resolve);
            } else {
                resolve();
            }
        });
        
    },
    finale() {
        let me = this;
        return new Promise(resolve => {
            if (me['n']) {
                me['o'].push(resolve);
            } else {
                resolve();
            }
        });
    },
    
});

let Magix_Booted = 0;
let Magix = {
    config(cfg, r) {
        r = Mx_Cfg;
        if (cfg) {
            if (IsObject(cfg)) {
                r = Assign(r, cfg);
            } else {
                r = r[cfg];
            }
        }
        return r;
    },
    boot(cfg) {
        if (!Magix_Booted) {
            Magix_Booted = 1;
            Assign(Mx_Cfg, cfg); //先放到配置信息中，供ini文件中使用
            
            Vframe_mountView(Vframe_Root(), Mx_Cfg.defaultView);
            
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
    
    
    mark: Mark,
    unmark: Unmark,
    node: GetById,
    task: CallFunction,
    taskFinale() {
        return new Promise(resolve => {
            CallFunction(resolve);
        });
    },
    taskComplete(callback) {
        let taskCount = 0,
            calledCount = 0,
            taskCheck = (...args) => {
                calledCount++;
                if (calledCount == taskCount) {
                    callback(...args);
                }
            };
        return (...args) => {
            taskCount++;
            CallFunction(taskCheck, [...args]);
        };
    }
};
 export  declare namespace Magix5 {
    /**
     * 鼠标事件
     */
    interface MagixMouseEvent extends MouseEvent {
        params: {
            [key: string]: any
        },
        eventTarget: HTMLElement
    }
    /**
     * 键盘事件
     */
    interface MagixKeyboardEvent extends KeyboardEvent {
        params: {
            [key: string]: any
        },
        eventTarget: HTMLElement
    }
    /**
     * 混合鼠标及键盘的事件对象
     */
    interface MagixMixedEvent extends MouseEvent, KeyboardEvent {
        params: {
            [key: string]: any
        },
        eventTarget: HTMLElement
    }
    /**
     * 配置信息接口
     */
    interface Config {
        /**
         * 默认加载的view
         */
        defaultView?: string
        /**
         * 默认路径
         */
        defaultPath?: string
        /**
         * path与view关系映射对象或方法
         */
        routes?: {
            [key: string]: string | {
                /**
                 * 浏览器标题
                 */
                title: string
                /**
                 * 加载的view
                 */
                view: string
            }[]
        }
        /**
         * 在routes里找不到匹配时使用的view，比如显示404
         */
        unmatchView?: string
        /**
         * 默认的浏览器title
         */
        title?: string
        /**
         * 根view的id
         */
        rootId?: string
        /**
         * 以try catch执行一些用户重写的核心流程，当出错时，允许开发者通过该配置项进行捕获。注意：您不应该在该方法内再次抛出任何错误
         */
        error?: (this: void, exception: Error) => void
        
        
        /**
         * 其它配置项
         */
        [key: string]: any
    }
    /**
     * url解析部分对象接口
     */
    interface RouterParseParts {
        /**
         * 参数对象
         */
        readonly params: {
            readonly [key: string]: string
        }
        /**
         * 路径字符串
         */
        readonly path: string
    }
    /**
     * url解析接口
     */
    interface RouterParse {
        /**
         * 原始的href
         */
        readonly href: string

        /**
         * 原始的query
         */
        readonly srcQuery: string

        /**
         * 原始的hash
         */
        readonly srcHash: string

        /**
         * srcQuery解析出的对象
         */
        readonly query: RouterParseParts

        /**
         * srcHash解析出的对象
         */
        readonly hash: RouterParseParts
        /**
         * query中的params与hash中的params对象合并出来的新对象
         */
        readonly params: {
            readonly [key: string]: string
        }

        /**
         * 根据hash对象中的path和query对象中的path，再根据要求得出的path
         */
        readonly path: string

        /**
         * 当前url对应的要渲染的根view
         */
        readonly view: string
        /**
         * 从params中获取参数值，当参数不存在时返回空字符串
         * @param key key
         * @param defaultValue 当值不存在时候返回的默认值
         */
        get<TDefaultValueType = string>(key: string, defaultValue?: TDefaultValueType): TDefaultValueType

    }
    /**
     * 差异对象接口
     */
    interface RouterDiffItem {
        /**
         * 旧值
         */
        readonly from: string

        /**
         * 新值
         */
        readonly to: string
    }
    /**
     * url差异对象接口
     */
    interface RouterDiff {
        /**
         * 是否为应用首次初始化时强制触发的差异比较
         */
        readonly force: boolean
        /**
         * 当路径有变化时，才有path这个对象
         */
        readonly path?: RouterDiffItem

        /**
         * 当渲染的根view有变化时，才有view这个对象
         */
        readonly view?: RouterDiffItem

        /**
         * 都有哪些参数发生变化的对象
         */
        readonly params: {
            readonly [key: string]: RouterDiffItem
        }
    }
    /**
     * 数据载体接口
     */
    interface Bag {
        /**
         * bag id
         */
        id: string

        /**
         * 从bag中获取数据
         * @param key 数据key，如果未传递则返回整个数据对象
         * @param defaultValue 默认值，如果传递了该参数且从bag中获取到的数据类型如果与defaultValue不一致，则使用defaultValue
         */
        get<TReturnAndDefaultValueType = any>(key?: string, defaultValue?: TReturnAndDefaultValueType): TReturnAndDefaultValueType

        /**
         * 设置数据
         * @param data 包含数据的对象
         */
        set(data: object): void
    }
    
    /**
     * 事件对象接口
     */
    interface Event<T = any, E = any> {
        /**
         * 绑定事件
         * @param name 事件名称
         * @param fn 事件处理函数
         */
        on(name: string, fn: (this: T, e?: TriggerEventDescriptor & E) => void): this

        /**
         * 解除事件绑定
         * @param name 事件名称
         * @param fn 事件处理函数
         */
        off(name: string, fn?: (this: T, e?: TriggerEventDescriptor & E) => void): this

        /**
         * 派发事件
         * @param name 事件名称
         * @param data 事件参数
         * @param remove 是否移除所有的事件监听
         * @param lastToFirst 是否倒序派发列表中的监听
         */
        fire(name: string, data?: object, remove?: boolean, lastToFirst?: boolean): this
    }
    
    /**
     * 状态接口
     */
    interface State extends Event<Router> {
        /**
         * 从状态对象中获取数据
         * @param key 数据key，如果未传递则返回整个状态对象
         */
        get<TReturnType = any>(key?: string): TReturnType
        /**
         * 设置数据
         * @param data 数据对象
         */
        set(data: object): this
    }
    /**
     * api注册信息接口
     */
    interface ServiceInterfaceMeta {
        /**
         * 缓存时间，以毫秒为单位
         */
        cache?: number
        /**
         * 请求的url地址
         */
        url?: string
        /**
         * 添加的接口元信息名称，需要确保在一个Service中唯一
         */
        name: string
        /**
         * 逗号分割的字符串，用来清除其它接口的缓存，如该接口是一个添加新数据的接口，这个接口调用成功后，应该把所有获取相关数据的缓存接口给清理掉，否则将获取不到新数据
         */
        cleans?: string | string[]
        /**
         * 接口在请求发送前调用，可以在该方法内对数据进行加工处理
         */
        before?: (this: Bag, bag: Bag) => void

        /**
         * 接口在成功请求后，在送到view毅调用该方法，可在该方法对数据进行加工处理
         */
        after?: (this: Bag, bag: Bag) => void

        [key: string]: any
    }

    /**
     * 基础触发事件接口
     */
    interface TriggerEventDescriptor {
        /**
         * 事件类型
         */
        readonly type: string
    }
    /**
     * 路由变化事件接口
     */
    interface RouterChangeEvent extends TriggerEventDescriptor {
        /**
         * 拒绝url改变
         */
        reject: () => void

        /**
         * 接受url改变
         */
        resolve: () => void

        /**
         * 阻止url改变
         */
        prevent: () => void
    }
    /**
     * view监听location接口
     */
    interface ViewObserveLocation {
        /**
         * 监听path
         */
        path?: boolean
        /**
         * 监听参数
         */
        params?: string | string[]
    }
    /**
     * 路由对象接口
     */
    interface Router extends Event<Router> {
        /**
         * 解析href的query和hash，默认href为location.href
         * @param url 待解析的url，如果未指定则使用location.href
         */
        parse(url?: string): RouterParse
        /**
         * 当前地址栏中的地址与上一个地址栏中的地址差异对象
         */
        diff(): RouterDiff

        /**
         * 导航到新的地址
         * @param path 路径字符串
         * @param params 参数对象
         * @param replace 是否替换当前的历史记录
         * @param silent 是否是静默更新，不触发change事件
         */
        to(path: string, params?: object, replace?: boolean, silent?: boolean): void

        /**
         * 导航到新的地址
         * @param params 参数对象
         * @param replace 是否替换当前的历史记录
         * @param silent 是否是静默更新，不触发change事件
         */
        to(params: object, empty?: any, replace?: boolean, silent?: boolean): void
        /**
         * url即将改变时发生
         */
        onchange: (this: this, e?: RouterChangeEvent) => void
        /**
         * url改变后发生
         */
        onchanged: (this: this, e?: RouterDiff & TriggerEventDescriptor) => void
    }
    /**
     * 接口服务事件接口
     */
    interface ServiceEvent extends TriggerEventDescriptor {
        /**
         * 数据对象的载体
         */
        readonly bag: Bag
        /**
         * 错误对象，如果有错误发生的话
         */
        readonly error: object | string | null
    }
    /**
     * 继承对象接口
     */
    interface ExtendPropertyDescriptor<T> {
        [key: string]: string | number | undefined | boolean | RegExp | symbol | object | null | ((this: T, ...args: any[]) => any)
    }

    /**
     * 继承方法中的this指向
     */
    type TExtendPropertyDescriptor<T> = ExtendPropertyDescriptor<T> & ThisType<T>;
    /**
     * 继承静态属性
     */
    interface ExtendStaticPropertyDescriptor {
        [key: string]: any
    }
    /**
     * vframe静态事件接口
     */
    interface VframeStaticEvent extends TriggerEventDescriptor {
        /**
         * vframe对象
         */
        readonly vframe: Vframe
    }


    /**
     * 缓存类
     */
    interface Cache {
        /**
         * 设置缓存的资源
         * @param key 缓存资源时使用的key，唯一的key对应唯一的资源
         * @param resource 缓存的资源
         */
        set<TResourceAndReturnType = any>(key: string, resource: TResourceAndReturnType): TResourceAndReturnType

        /**
         * 获取缓存的资源，如果不存在则返回undefined
         * @param key 缓存资源时使用的key
         */
        get<TReturnType = any>(key: string): TReturnType
        /**
         * 从缓存对象中删除缓存的资源
         * @param key 缓存的资源key
         */
        del<TReturnType = any>(key: string): TReturnType
        /**
         * 判断缓存对象中是否包含给定key的缓存资源
         * @param key 缓存的资源key
         */
        has(key: string): boolean
        /**
         * 遍历缓存对象中的所有资源
         * @param callback 回调
         * @param options 回调时传递的额外对象
         */
        each<TResourceType = any, TOptionsType = any>(callback: (resource: TResourceType, options: TOptionsType, cache: this) => void, options?: TOptionsType): void
    }
    /**
     * 缓存类
     */
    interface CacheConstructor {
        /**
         * 缓存类
         * @param max 最大缓存个数
         * @param buffer 缓存区个数，默认5
         * @param removedCallback 当缓存的资源被删除时调用
         */
        new(max?: number, buffer?: number, removedCallback?: (this: void, resource: any) => void): Cache
        readonly prototype: Cache
    }



    /**
     * Vframe类原型
     */
    interface Vframe extends Event<Vframe> {
        /**
         * 当前vframe的唯一id
         */
        readonly id: string
        /**
         * vframe所在的节点
         */
        readonly root: HTMLElement
        /**
         * 渲染的view模块路径，如app/views/default
         */
        readonly path: string

        /**
         * 父vframe id，如果没有则为undefined
         */
        readonly pId: string
        /**
         * 渲染view
         * @param viewPath view模块路径，如app/views/default
         * @param viewInitParams 初始化view时传递的参数，可以在view的init方法中接收
         */
        //mountView(viewPath: string, viewInitParams?: object): void
        /**
         * 销毁view
         */
        //unmountView(): void

        /**
         * 在某个dom节点上渲染vframe
         * @param node 要渲染的节点
         * @param viewPath view路径
         * @param viewInitParams 初始化view时传递的参数，可以在view的init方法中接收
         */
        mount(node: HTMLElement, viewPath: string, viewInitParams?: object): this

        /**
         * 销毁dom节点上渲染的vframe
         * @param node 节点对象或vframe id，默认当前view
         * @param isVframeId 指示node是否为vframe id
         */
        unmount(node?: HTMLElement | string, isVframeId?: boolean): void

        // /**
        //  * 渲染某个节点下的所有子view
        //  * @param node 节点对象，默认当前view
        //  * @param viewInitParams 初始化view时传递的参数，可以在view的init方法中接收
        //  */
        // mountZone(node?: HTMLElement, viewInitParams?: object): void

        // /**
        //  * 销毁某个节点下的所有子view
        //  * @param node 节点对象，默认当前view
        //  */
        // unmountZone(node?: HTMLElement): void

        /**
         * 获取祖先vframe
         * @param level 向上查找层级，默认1级，即父vframe
         */
        parent(level?: number): this | null

        /**
         * 获取当前vframe的所有子vframe的id。返回数组中，id在数组中的位置并不固定
         */
        children(): string[]

        /**
         * 调用vframe的view中的方法
         * @param name 方法名
         * @param args 传递的参数
         */
        invoke<TReturnType>(name: string, args?: any[]): Promise<TReturnType>
    }
    /**
     * Vframe类，开发者绝对不需要继承、实例化该类！
     */
    interface VframeConstructor extends Event<Vframe, {
        /**
         * vframe对象
         */
        vframe: Vframe
    }> {
        /**
         * 获取根vframe
         */
        root(): Vframe | null
        /**
         * 获取当前页面上所有的vframe
         */
        all(): {
            [key: string]: Vframe
        }
        /**
         * 根据id获取vframe
         * @param id
         */
        byId(id: string): Vframe | null
        /**
         * 根据节点获取vframe
         * @param node 节点对象
         */
        byNode(node: HTMLElement): Vframe | null

        /**
         * 当vframe创建并添加到管理对象上时触发
         */
        onadd: (this: this, e?: VframeStaticEvent) => void

        /**
         * 当vframe销毁并从管理对象上删除时触发
         */
        onremove: (this: this, e?: VframeStaticEvent) => void
        /**
         * 原型
         */
        readonly prototype: Vframe
    }
    /**
     * view类原型
     */
    interface View extends Event<View> {
        /**
         * 当前view的唯一id
         */
        readonly id: string
        /**
         * 当前view所在的节点对象
         */
        readonly root: HTMLElement
        /**
         * 模板
         */
        readonly tmpl: Function
        /**
         * 持有当前view的vframe
         */
        readonly owner: Vframe
        /**
         * 更新界面对象
         */

        /**
         * 初始化View时调用
         * @param extra 初始化时传递的额外参数
         */
        init(extra?: object): void
        /**
         * 渲染界面，开发者在该方法内完成界面渲染的流程
         */
        render(...args: any[]): void
        /**
         * 更新当前view的数据
         * @param data 赋值数据
         */
        assign(data: object): boolean
        
        
        /**
         * 获取设置的数据，当key未传递时，返回整个数据对象
         * @param key 设置时的数据key
         */
        get<TReturnType = any>(key?: string): TReturnType
        /**
         * 设置数据
         * @param data 数据对象，如{a:20,b:30}
         * @param unchanged 指示哪些数据并没有变化的对象
         */
        set(data?: { [key: string]: any }, unchanged?: { [key: string]: any },): this
        /**
         * 获取设置数据后，是否发生了改变
         */
        changed(): boolean
        /**
         * 检测数据变化，更新界面，放入数据后需要显式调用该方法才可以把数据更新到界面
         * @param data 数据对象，如{a:20,b:30}
         * @param unchanged 指示哪些数据并没有变化的对象
         * @param resolve 完成更新后的回调
         */
        digest(data?: { [key: string]: any }, unchanged?: { [key: string]: any }): Promise<any>
        /**
         * 等待界面异步渲染结束
         */
        finale(): Promise<any>
        /**
         * 获取当前数据状态的快照，配合altered方法可获得数据是否有变化
         */
        snapshot(): this

        /**
         * 检测数据是否有变动
         */
        altered(): boolean
        /**
         * 得到模板中@符号对应的原始数据
         * @param data 数据对象
         */
        translate(data: object): object
        /**
         * 得到模板中@符号对应的原始数据
         * @param origin 源字符串
         */
        parse(origin: string): object
        /**
         * view销毁时触发
         */
        ondestroy: (this: this, e?: TriggerEventDescriptor) => void;
    }
    /**
     * View类
     */
    interface ViewConstructor {
        /**
         * 继承Magix.View
         * @param props 包含可选的init和render方法的对象
         * @param statics 静态方法或属性的对象
         */
        extend<TProps = object>(props?: TExtendPropertyDescriptor<TProps & View>): this
        /**
         * 扩展到Magix.View原型上的对象
         * @param props 包含可选的ctor方法的对象
         */
        merge(...args: TExtendPropertyDescriptor<View>[]): this
        /**
         * 静态方法
         * @param args 静态方法对象
         */
        static<TStatics = Object>(...args: object[]): this & TStatics
        /**
         * 原型
         */
        readonly prototype: View
    }
    /**
     * 接口管理类原型
     */
    interface Service {
        /**
         * 所有请求完成回调done
         * @param metas 接口名称或对象数组
         * @param done 全部接口成功时回调
         */
        all(metas: ServiceInterfaceMeta[] | string[] | string, done: (this: this, err: any, ...bags: Bag[]) => void): this

        /**
         * 所有请求完成回调done，与all不同的是：如果接口指定了缓存，all会走缓存，而save则不会
         * @param metas 接口名称或对象数组
         * @param done 全部接口成功时回调
         */
        save(metas: ServiceInterfaceMeta[] | string[] | string, done: (this: this, err: any, ...bags: Bag[]) => void): this

        /**
         * 任意一个成功均立即回调，回调会被调用多次
         * @param metas 接口名称或对象数组
         * @param done 全部接口成功时回调
         */
        one(metas: ServiceInterfaceMeta[] | string[] | string, done: (this: this, err: any, ...bags: Bag[]) => void): this
        /**
         * 排队，前一个all,one或save任务做完后的下一个任务，类似promise
         * @param callback 当前面的任务完成后调用该回调
         */
        enqueue(callback: (this: this, ...args: any[]) => void): this
        /**
         * 开始处理队列中的下一个任务
         */
        dequeue(...args: any[]): void
        /**
         * 销毁当前请求，不可以继续发起新请求，而且不再调用相应的回调
         */
        destroy(): void
    }
    /**
     * 接口管理类
     */
    interface ServiceConstructor extends Event<ServiceConstructor, ServiceEvent> {
        /**
         * 继承产生新的Service类
         * @param sync 同步数据的方法，通常在该方法内与服务端交换数据
         * @param cacheMax 最大缓存数
         * @param cacheBuffer 缓存区数量
         */
        extend(sync: (this: void, bag: Bag, callback: (error?: string | object) => void) => void, cacheMax?: number, cacheBuffer?: number): this
        /**
         * 添加接口元信息
         * @param metas 接口元信息数组
         */
        add(metas: ServiceInterfaceMeta[]): void

        /**
         * 根据接口元信息创建bag对象
         * @param meta 接口元信息对象或名称字符串
         */
        create(meta: ServiceInterfaceMeta | string): Bag

        /**
         * 获取元信息对象
         * @param meta 接口元信息对象或名称字符串
         */
        meta(meta: ServiceInterfaceMeta | string): ServiceInterfaceMeta

        /**
         * 从缓存中获取或创意bag对象
         * @param meta 接口元信息对象或名称字符串
         * @param create 是否是创建新的Bag对象，如果否，则尝试从缓存中获取
         */
        get(meta: ServiceInterfaceMeta | string, create: boolean): Bag

        /**
         * 从缓存中清除指定接口的数据
         * @param names 逗号分割的接口名称字符串或数组
         */
        clear(names: string | string[]): void

        /**
         * 从缓存中获取bag对象
         * @param meta 接口元信息对象或名称字符串
         */
        cached(meta: ServiceInterfaceMeta | string): Bag | null

        /**
         * 接口发送请求前触发
         */
        onbegin: (this: this, e?: ServiceEvent) => void;

        /**
         * 接口发送结束时触发，不管请求成功或失败
         */
        onend: (this: this, e?: ServiceEvent) => void;
        /**
         * 初始化
         */
        new(): Service
        /**
         * 原型
         */
        readonly prototype: Service
    }
    interface Magix {
        /**
            * 设置或获取配置信息
            * @param cfg 配置信息参数对象
            */
        config<T extends object>(cfg: Config & T): Config & T

        /**
         * 获取配置信息
         * @param key 配置key
         */
        config(key: string): any

        /**
         * 获取配置信息对象
         */
        config<T extends object>(): Config & T

        /**
         * 应用初始化入口
         * @param cfg 配置信息参数对象
         */
        boot(cfg?: Config): void
        /**
         * 取消安装
         */
        unboot(): void
        /**
         * 把列表转化成hash对象。Magix.toMap([1,2,3,5,6]) => {1:1,2:1,3:1,4:1,5:1,6:1}。Magix.toMap([{id:20},{id:30},{id:40}],'id') => {20:{id:20},30:{id:30},40:{id:40}}
         * @param list 源数组
         * @param key 以数组中对象的哪个key的value做为hash的key
         */
        toMap<T extends object>(list: any[], key?: string): T
        /**
         * 以try catch方式执行方法，忽略掉任何异常。返回成功执行的最后一个方法的返回值
         * @param fn 函数
         * @param args 参数数组
         * @param context 在待执行的方法内部，this的指向
         */
        toTry<TReturnType, TContextType>(fn: ((this: TContextType, ...args: any[]) => void), args?: any[], context?: TContextType): TReturnType

        /**
         * 以try catch方式执行方法，忽略掉任何异常。返回成功执行的最后一个方法的返回值
         * @param fn 函数数组
         * @param args 参数数组
         * @param context 在待执行的方法内部，this的指向
         */
        toTry<TReturnType>(fn: Function, args?: any[], context?: any): TReturnType

        /**
         * 转换成字符串路径。Magix.toUrl('/xxx/',{a:'b',c:'d'}) => /xxx/?a=b&c=d
         * @param path 路径
         * @param params 参数对象
         * @param keo 保留空白值的对象
         */
        toUrl(path: string, params?: object, keo?: object): string
        /**
         * 把路径字符串转换成对象。Magix.parseUrl('/xxx/?a=b&c=d') => {path:'/xxx/',params:{a:'b',c:'d'}}
         * @param url 路径字符串
         */
        parseUrl(url: string): RouterParseParts
        /**
         * 检测某个对象是否拥有某个属性。
         * @param owner 检测对象
         * @param prop 属性
         */
        has(owner: object, prop: string | number): boolean


        /**
         * 判断一个节点是否在另外一个节点内，如果比较的2个节点是同一个节点，也返回true
         * @param node 节点或节点id
         * @param container 容器节点或节点id
         */
        inside<TNode extends HTMLElement, TContainer extends HTMLElement>(node: TNode, container: TContainer): boolean

        /**
         * document.getElementById的简写
         * @param id 节点id
         */
        node<T extends HTMLElement>(id: string): T | null

        /**
         * 使用加载器的加载模块功能
         * @param deps 模块id
         * @param callback 回调
         */
        use<T extends object>(deps: string | string[], callback: (...args: T[]) => any): void

        /**
         * 保护对象不被修改
         * @param o 保护对象
         */
        guard<T extends object>(o: T): T

        /**
         * 触发事件
         * @param node dom节点
         * @param type 事件类型
         * @param data 数据
         */
        dispatch(node: HTMLElement, type: string, data?: any): void
        /**
         * 获取对象类型
         * @param aim 目标对象
         */
        type(aim: any): string
        /**
         * 向页面追加样式
         * @param key 样式对应的唯一key，该key主要防止向页面反复添加同样的样式
         * @param cssText 样式字符串
         */
        applyStyle(key: string, cssText: string): void
        /**
         * 向页面追加样式
         * @param atFile 以&#64;开头的文件路径
         */
        applyStyle(atFile: string): void
        /**
         * 生成唯一的guid
         * @param prefix guid的前缀，默认mx-
         */
        guid(prefix?: string): string
        /**
         * 获取异步标识
         * @param host 宿主对象
         * @param key 标识key
         */
        mark(host: object, key: string): () => boolean
        /**
         * 销毁所有异步标识
         * @param host 宿主对象
         */
        unmark(host: object): void
        /**
         * 安排、优化待执行的函数
         * @param fn 执行函数
         * @param args 参数
         * @param context this指向
         * @param id 任务id,当指定id且同样id有多个时,会取消前面的执行
         */
        task<TArgs, TContext>(fn: (this: TContext, ...args: TArgs[]) => void, args?: TArgs[], context?: TContext, id?: string): void

        /**
        * 等待任务完成
        */
        taskFinale<TContext>(): Promise<TContext>

        /**
         * 检测某个任务是否完成
         * @param fn 完成后执行的函数
         */
        taskComplete<TArgs>(fn: (...args: TArgs[]) => void): (...args: TArgs[]) => void

        

        /**
         * view类
         */
        View: ViewConstructor
        /**
         * 缓存类
         */
        Cache: CacheConstructor
        
        
        /**
         * 事件对象
         */
        Event: Event
        
        /**
         * 路由对象
         */
        Router: Router
        /**
         * Vframe类，开发者绝对不需要继承、实例化该类！
         */
        Vframe: VframeConstructor
    }
}
//强制转换
export default Magix as any as Magix5.Magix;