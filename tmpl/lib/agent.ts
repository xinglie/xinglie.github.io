let Servers = [{
    '@:{server.url}': 'https://api.codetabs.com/v1/proxy?quest=',
    '@:{url.encode}': 1
}, {
    '@:{server.url}': 'https://cors-anywhere.herokuapp.com/',
    '@:{url.encode}': 0
}, {
    '@:{server.url}': 'https://jsonp.afeld.me/?url=',
    '@:{url.encode}': 1
}, {
    '@:{server.url}': 'https://proxy.hackeryou.com/?reqUrl=',
    '@:{url.encode}': 1
}];

let readBlobToText = (blob, encoding): Promise<string> => {
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
    request(url, expire?: number, proxy?: boolean, encoding?: string) {
        return new Promise<string>((resolve, reject) => {
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
                        dest = proxy["@:{server.url}"];
                        if (proxy["@:{url.encode}"]) {
                            dest += encodeURIComponent(url);
                        } else {
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
                                } catch {
                                    localStorage.clear();
                                }
                            }
                            resolve(text);
                        } else {
                            start++;
                            request();
                        }
                    } catch (e) {
                        console.error(e);
                        start++;
                        request();
                    }
                } else {
                    reject('no server to request:' + url);
                }
            };
            request();
        });
    },
    clear(url, proxy, encoding?: string) {
        let key = [url, proxy, encoding].join('\x00');
        localStorage.removeItem(key);
    }
};