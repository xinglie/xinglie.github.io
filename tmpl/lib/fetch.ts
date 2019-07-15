let f = (url: string, expire?: number) => {
    if (expire) {
        let key = [url, expire].join('\x00');
        let data = localStorage.getItem(key);
        if (data) {
            let o = JSON.parse(data);
            if (o.expire > Date.now()) {
                console.log(url, 'from cache');
                return Promise.resolve(o.data);
            }
        }
        console.log('request', url);
        return fetch(url).then(r => r.json()).then(r => {
            try {
                localStorage.setItem(key, JSON.stringify({
                    data: r,
                    expire: expire + Date.now()
                }));
            } catch {
                localStorage.clear();
            }
            return r;
        });
    } else {
        console.log('no expire,request', url);
        return fetch(url).then(r => r.json());
    }
};
f.clear = (url, expire) => {
    let key = [url, expire].join('\x00');
    localStorage.removeItem(key);
};
export default f;