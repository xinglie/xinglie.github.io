/*!1.0.5 kooboy_li@163.com*/
/*
    generate by magix-composer@1.0.5
    https://github.com/thx/magix-composer
    author: xinglie.lkf@alibaba-inc.com
    loader:module
 */

let Servers = [{
        '_l': 'https://api.codetabs.com/v1/proxy?quest=',
        '_m': 1
    }, {
        '_l': 'https://cors-anywhere.herokuapp.com/',
        '_m': 0
    }, {
        '_l': 'https://jsonp.afeld.me/?url=',
        '_m': 1
    }, {
        '_l': 'https://proxy.hackeryou.com/?reqUrl=',
        '_m': 1
    }];
let readBlobToText = (blob, encoding) => {
    return new Promise((resolve, reject) => {
        let reader = new FileReader();
        reader.onload = e => {
            resolve(e.target.result.toString());
        };
        reader.onerror = reject;
        reader.readAsText(blob, encoding || 'utf-8');
    });
};
export default {
    request(url, expire, proxy, encoding) {
        return new Promise((resolve, reject) => {
            let start = 0;
            let request = async () => {
                let key = [url, proxy, encoding].join('\x00');
                if (expire) {
                    let data = localStorage.getItem(key);
                    if (data) {
                        let o = JSON.parse(data);
                        if (o.expire > Date.now()) {
                            return resolve(o.data);
                        }
                    }
                }
                if (start < Servers.length) {
                    let dest = url;
                    if (proxy) {
                        let proxy = Servers[start];
                        dest = proxy["_l"];
                        if (proxy["_m"]) {
                            dest += encodeURIComponent(url);
                        }
                        else {
                            dest += url;
                        }
                    }
                    try {
                        let result = await fetch(dest);
                        if (result.ok) {
                            let blob = await result.blob();
                            let text = await readBlobToText(blob, encoding);
                            if (expire) {
                                try {
                                    localStorage.setItem(key, JSON.stringify({
                                        data: text,
                                        expire: expire + Date.now()
                                    }));
                                }
                                catch (_a) {
                                    localStorage.clear();
                                }
                            }
                            resolve(text);
                        }
                        else {
                            start++;
                            request();
                        }
                    }
                    catch (e) {
                        console.error(e);
                        start++;
                        request();
                    }
                }
                else {
                    reject('no server to request:' + url);
                }
            };
            request();
        });
    },
    clear(url, proxy, encoding) {
        let key = [url, proxy, encoding].join('\x00');
        localStorage.removeItem(key);
    }
};
