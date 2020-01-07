/*!1.0.5 kooboy_li@163.com*/
/*
    generate by magix-composer@1.0.5
    https://github.com/thx/magix-composer
    author: xinglie.lkf@alibaba-inc.com
    loader:module
 */

import Magix  from "../../lib/magix.js";
import XAgent  from "../../lib/agent.js";
let APIHost = 'https://jirenguapi.applinzi.com/fm';
let MAX_HISTORY = 50;
let RedoList = [];
let UndoList = [];
export default Object.assign({
    '_bB'() {
        return XAgent.request(`${APIHost}/getChannels.php`, 30 * 24 * 60 * 60 * 1000);
    },
    '_bC'(channelId) {
        return fetch(`${APIHost}/getSong.php?channel=${channelId}`).then(r => r.json());
    },
    '_by'(songId) {
        let url = `${APIHost}/getLyric.php?sid=${songId}`;
        return fetch(url).then(r => r.json());
    },
    async '_aV'() {
        let reponse = await this['_bB']();
        let data = JSON.parse(reponse);
        let { channels } = data;
        let active = channels[0];
        return {
            active,
            channels
        };
    },
    '_bH'(state) {
        if (this['_bD']) {
            clearTimeout(this['_bE']);
            let old = this['_bF'];
            if (!old) {
                old = {
                    play: false,
                    buffer: false
                };
            }
            let checks = ['play', 'buffer'];
            for (let c of checks) {
                if (!Magix.has(state, c)) {
                    state[c] = old[c];
                }
            }
            this['_bF'] = state;
            this['_bE'] = setTimeout(() => {
                let f = false;
                old = this['_bG'];
                if (old) {
                    for (let c of checks) {
                        if (old[c] != state[c]) {
                            f = true;
                            break;
                        }
                    }
                }
                else {
                    f = true;
                }
                if (f) {
                    this.fire('_b_', this['_bG'] = state);
                }
            }, 50);
        }
    },
    '_bI'() {
        let audio = this['_bD'];
        if (audio) {
            let buffered = audio.buffered;
            let p = 0;
            if (buffered.length) {
                p = buffered.end(buffered.length - 1) / audio.duration;
            }
            this.fire('_bq', {
                duration: audio.duration,
                current: audio.currentTime,
                buffered: p
            });
        }
    },
    '_bM'() {
        if (!this['_bD']) {
            let audio = new Audio();
            let timer;
            //audio.crossOrigin = 'anonymous';
            audio.onprogress = (e) => {
                console.log('from propgress', e);
                let b = audio.buffered;
                if (b.length) {
                    console.log(b.end(0));
                }
                this['_bI']();
            };
            audio.onerror = () => {
                //take a break;
                console.log('song error', audio.src);
                clearTimeout(timer);
                timer = setTimeout(() => {
                    this.fire('_aX');
                }, 2e3);
            };
            audio.onended = () => {
                //take a break;
                console.log('song end');
                clearTimeout(timer);
                timer = setTimeout(() => {
                    this.fire('_aX');
                }, 1e3);
            };
            audio.onvolumechange = () => {
                this.fire('_bJ', {
                    volume: audio.volume
                });
            };
            audio.oncanplay = () => {
                this['_bH']({
                    buffer: false
                });
            };
            audio.onwaiting = () => {
                this['_bH']({
                    buffer: true
                });
            };
            audio.ontimeupdate = () => {
                if (!this['_bK']) {
                    this['_bI']();
                }
                else {
                    console.log('eco');
                }
            };
            audio.onplaying = () => {
                this['_bH']({
                    play: true
                });
            };
            audio.ondurationchange = () => {
                if (!this['_bK']) {
                    this['_bI']();
                }
                else {
                    console.log('eco');
                }
            };
            audio.onpause = () => {
                this['_bH']({
                    play: audio.ended
                });
            };
            audio.onloadedmetadata = () => {
                let current = this['_bL'];
                let find = false;
                for (let s of UndoList) {
                    if (s.sid == current.sid) {
                        find = true;
                        break;
                    }
                }
                if (!find) {
                    for (let s of RedoList) {
                        if (s.sid == current.sid) {
                            find = true;
                            break;
                        }
                    }
                }
                if (!find) {
                    UndoList.push(current);
                }
                if (UndoList.length > MAX_HISTORY) {
                    UndoList.shift();
                }
                this.fire('_ba', {
                    song: current
                });
            };
            this['_bD'] = audio;
        }
    },
    '_bN'(song) {
        this['_bM']();
        this['_bD'].src = song.url;
        let p = this['_bD'].play();
        p.catch(e => {
            //console.log('click play button');
        });
        this['_bL'] = song;
    },
    '_bO'(time) {
        if (this['_bD']) {
            let seekable = this['_bD'].seekable;
            let len = seekable.length;
            if (len) {
                let start = seekable.start(0);
                let end = seekable.end(len - 1);
                if (time >= start && time <= end) {
                    this['_bD'].currentTime = time;
                }
            }
            else {
                let buffered = this['_bD'].buffered;
                if (buffered.length) {
                    let max = buffered.end(buffered.length - 1);
                    this['_bD'].currentTime = max;
                }
            }
        }
    },
    '_bQ'(channelId, forceRandom, delay) {
        clearTimeout(this['_bP']);
        this['_bP'] = setTimeout(() => {
            //console.log('auto play error,take a rest before next');
            this['_aY'](channelId, forceRandom);
        }, delay);
    },
    async '_aY'(channelId, forceRandom) {
        this['_be']();
        this['_bH']({
            buffer: true
        });
        if (!forceRandom) {
            forceRandom = RedoList.length == 0;
        }
        if (forceRandom) {
            try {
                let isLast = Magix.mark(this, '_aY');
                let { song } = await this["_bC"](channelId);
                if (isLast()) {
                    console.log('isLast');
                    let single = song[0];
                    if (single.url) {
                        this.fire('_bb', {
                            song: single
                        });
                        this['_bN'](single);
                    }
                    else {
                        console.log('song has no url', song);
                        this['_bQ'](channelId, forceRandom, 50);
                    }
                }
                else {
                    console.warn('ignore pre', song);
                }
            }
            catch (ex) {
                console.log('next song error', ex);
                this['_bQ'](channelId, forceRandom, 2e3);
            }
        }
        else {
            let song = RedoList.pop();
            UndoList.push(song);
            this['_bN'](song);
            this.fire('_bb', {
                song
            });
        }
    },
    '_bf'() {
        if (UndoList.length > 1) {
            this['_be']();
            this['_bH']({
                buffer: true
            });
            let song = UndoList.pop();
            RedoList.push(song);
            song = UndoList[UndoList.length - 1];
            this['_bN'](song);
            this.fire('_bb', {
                song
            });
        }
    },
    '_bc'() {
        return this['_bD'];
    },
    '_bi'() {
        return UndoList.length > 1;
    },
    '_bR'(v) {
        if (this['_bD']) {
            this['_bD'].volume = v;
        }
    },
    '_be'() {
        if (this['_bD']) {
            this['_bD'].pause();
        }
    },
    '_bd'() {
        if (this['_bD']) {
            this['_bD'].play();
        }
    },
    '_bS'() {
        let ca = this['_bD'];
        if (ca) {
            ca.muted = !ca.muted;
            return ca.muted;
        }
        return false;
    },
    '_aZ'() {
        if (this['_bD']) {
            this['_bD'].currentTime = 0;
            this['_bD'].play();
        }
    },
    '_bg'() {
        if (UndoList.length > 1) {
            let song = UndoList[UndoList.length - 2];
            return '上一首：' + song.title + '-' + song.artist;
        }
        return '上一首：暂无历史歌曲';
    },
    '_bh'() {
        if (RedoList.length) {
            let song = RedoList[RedoList.length - 1];
            return '下一首：' + song.title + '-' + song.artist;
        }
        return '下一首：随机歌曲';
    },
    '_bo'(eco) {
        this['_bK'] = eco;
        if (!eco) {
            this['_bI']();
        }
    }
}, Magix.Event);
