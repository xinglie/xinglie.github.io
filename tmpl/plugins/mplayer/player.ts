import Magix from '../../lib/magix';
let APIHost = 'https://jirenguapi.applinzi.com/fm';
let MAX_HISTORY = 50;
interface SongDesc {
    artist: string
    lrc: string
    picture: string
    sid: number
    title: string
    url: string
}
interface State {
    play: boolean
    buffer: boolean
}
let RedoList: SongDesc[] = [];
let UndoList: SongDesc[] = [];
let SongLyricCache = new Magix.Cache(200, 50);
export default Object.assign({
    '@{fetch.channels}'() {
        return fetch(`${APIHost}/getChannels.php`).then(r => r.json());
    },
    '@{fetch.random.song}'(channelId) {
        return fetch(`${APIHost}/getSong.php?channel=${channelId}`).then(r => r.json());
    },
    '@{fetch.song.lyric}'(songId) {
        let url = `${APIHost}/getLyric.php?sid=${songId}`;
        if (SongLyricCache.has(url)) {
            //console.log('get song lyric from cahce', songId);
            return Promise.resolve(SongLyricCache.get(url));
        }
        return fetch(url).then(r => r.json()).then(j => {
            //console.log(j);
            SongLyricCache.set(url, j);
            return Promise.resolve(j);
        });
    },
    async '@{get.channels.with.active}'() {
        let { channels } = await this['@{fetch.channels}']();
        let active = channels[0];
        return {
            active,
            channels
        };
    },
    '@{update.state}'(state: State) {
        if (this['@{core.audio}']) {
            clearTimeout(this['@{update.state.timer}']);
            let old = this['@{player.play.state}'];
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
            this['@{player.play.state}'] = state;
            this['@{update.state.timer}'] = setTimeout(() => {
                let f = false;
                old = this['@{player.fired.play.state}'];
                if (old) {
                    for (let c of checks) {
                        if (old[c] != state[c]) {
                            f = true;
                            break;
                        }
                    }
                } else {
                    f = true;
                }
                if (f) {
                    this.fire('@{when.status.change}', this['@{player.fired.play.state}'] = state);
                }
            }, 50);
        }
    },
    '@{update.time.and.buffer}'() {
        let audio = this['@{core.audio}'];
        if (audio) {
            let buffered = audio.buffered;
            let p = 0;
            if (buffered.length) {
                p = buffered.end(buffered.length - 1) / audio.duration;
            }
            this.fire('@{when.song.time.update}', {
                duration: audio.duration,
                current: audio.currentTime,
                buffered: p
            });
        }
    },
    '@{init.audio}'() {
        if (!this['@{core.audio}']) {
            let audio = new Audio();
            let timer;
            //audio.crossOrigin = 'anonymous';
            audio.onprogress = () => {
                console.log('from propgress');
                this['@{update.time.and.buffer}']();
            };
            audio.onerror = () => {
                //take a break;
                console.log('song error', audio.src);
                clearTimeout(timer);
                timer = setTimeout(() => {
                    this.fire('@{when.song.end}');
                }, 2e3);
            };
            audio.onended = () => {
                //take a break;
                console.clear();
                console.log('song end');
                clearTimeout(timer);
                timer = setTimeout(() => {
                    this.fire('@{when.song.end}');
                }, 1e3);
            };
            audio.onvolumechange = () => {
                this.fire('@{when.volume.change}', {
                    volume: audio.volume
                });
            };
            audio.oncanplay = () => {
                this['@{update.state}']({
                    buffer: false
                });
            };
            audio.onwaiting = () => {
                this['@{update.state}']({
                    buffer: true
                });
            };
            audio.ontimeupdate = () => {
                if (!this['@{is.eco}']) {
                    this['@{update.time.and.buffer}']();
                } else {
                    console.log('eco');
                }
            };
            audio.onplaying = () => {
                this['@{update.state}']({
                    play: true
                });
            };
            audio.ondurationchange = () => {
                if (!this['@{is.eco}']) {
                    this['@{update.time.and.buffer}']();
                } else {
                    console.log('eco');
                }
            };
            audio.onpause = () => {
                this['@{update.state}']({
                    play: audio.ended
                });
            };
            audio.onloadedmetadata = () => {
                let current = this['@{song.info}'] as SongDesc;
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
                this.fire('@{when.history.change}', {
                    song: current
                });
            };
            this['@{core.audio}'] = audio;
            // setTimeout(() => {
            //     let ctx = new AudioContext();
            //     let source = ctx.createMediaElementSource(audio);
            //     let analyser = ctx.createAnalyser();
            //     source.connect(analyser);
            //     analyser.connect(ctx.destination);
            //     analyser.fftSize = 1024;
            //     //var bufferLength = analyser.frequencyBinCount;
            //     //var dataArray = new Uint8Array(bufferLength);
            //     setInterval(() => {
            //         var array = new Uint8Array(analyser.frequencyBinCount);
            //         analyser.getByteFrequencyData(array);
            //         for (let e of array) {
            //             if (e != 128 && e != 0) {
            //                 console.log('ok');
            //             }
            //         }
            //         console.log(array);
            //     }, 1e3);
            // }, 5000);
        }
    },
    '@{play.song}'(song: SongDesc) {
        this['@{init.audio}']();
        this['@{core.audio}'].src = song.url;
        let p = this['@{core.audio}'].play();
        p.catch(e => {
            //console.log('click play button');
        });
        this['@{song.info}'] = song;
    },
    '@{seek.time}'(time) {
        if (this['@{core.audio}']) {
            let seekable = this['@{core.audio}'].seekable;
            let len = seekable.length;
            if (len) {
                let start = seekable.start(0);
                let end = seekable.end(len - 1);
                if (time >= start && time <= end) {
                    this['@{core.audio}'].currentTime = time;
                }
            } else {
                let buffered = this['@{core.audio}'].buffered;
                if (buffered.length) {
                    let max = buffered.end(buffered.length - 1);
                    this['@{core.audio}'].currentTime = max;
                }
            }
        }
    },
    '@{delay.next.song}'(channelId, forceRandom, delay) {
        clearTimeout(this['@{next.song.timer}']);
        this['@{next.song.timer}'] = setTimeout(() => {
            //console.log('auto play error,take a rest before next');
            this['@{next.song}'](channelId, forceRandom);
        }, delay);
    },
    async '@{next.song}'(channelId, forceRandom?: boolean) {
        this['@{set.pause}']();
        this['@{update.state}']({
            buffer: true
        });
        if (!forceRandom) {
            forceRandom = RedoList.length == 0;
        }
        if (forceRandom) {
            try {
                let isLast = Magix.mark(this, '@{next.song}');
                let { song } = await this["@{fetch.random.song}"](channelId);
                if (isLast()) {
                    console.log('isLast');
                    let single = song[0] as SongDesc;
                    if (single.url) {
                        this.fire('@{when.song.change}', {
                            song: single
                        });
                        this['@{play.song}'](single);
                    } else {
                        console.log('song has no url', song);
                        this['@{delay.next.song}'](channelId, forceRandom, 50);
                    }
                } else {
                    console.warn('ignore pre', song);
                }
            } catch (ex) {
                console.log('next song error', ex);
                this['@{delay.next.song}'](channelId, forceRandom, 2e3);
            }
        } else {
            let song = RedoList.pop();
            UndoList.push(song);
            this['@{play.song}'](song);
            this.fire('@{when.song.change}', {
                song
            });
        }
    },
    '@{pre.song}'() {
        if (UndoList.length > 1) {
            this['@{set.pause}']();
            this['@{update.state}']({
                buffer: true
            });
            let song = UndoList.pop();
            RedoList.push(song);
            song = UndoList[UndoList.length - 1];
            this['@{play.song}'](song);
            this.fire('@{when.song.change}', {
                song
            });
        }
    },
    '@{can.operate}'() {
        return this['@{core.audio}'];
    },
    '@{can.undo}'() {
        return UndoList.length > 1;
    },
    '@{set.volume}'(v) {
        if (this['@{core.audio}']) {
            this['@{core.audio}'].volume = v;
        }
    },
    '@{set.pause}'() {
        if (this['@{core.audio}']) {
            this['@{core.audio}'].pause();
        }
    },
    '@{set.play}'() {
        if (this['@{core.audio}']) {
            this['@{core.audio}'].play();
        }
    },
    '@{set.mute}'() {
        let ca = this['@{core.audio}'];
        if (ca) {
            ca.muted = !ca.muted;
            return ca.muted;
        }
        return false;
    },
    '@{replay}'() {
        if (this['@{core.audio}']) {
            this['@{core.audio}'].currentTime = 0;
            this['@{core.audio}'].play();
        }
    },
    '@{get.pre.tip}'() {
        if (UndoList.length > 1) {
            let song = UndoList[UndoList.length - 2];
            return '上一首：' + song.title + '-' + song.artist;
        }
        return '上一首：暂无历史歌曲';
    },
    '@{get.next.tip}'() {
        if (RedoList.length) {
            let song = RedoList[RedoList.length - 1];
            return '下一首：' + song.title + '-' + song.artist;
        }
        return '下一首：随机歌曲';
    },
    '@{set.eco}'(eco) {
        this['@{is.eco}'] = eco;
        if (!eco) {
            this['@{update.time.and.buffer}']();
        }
    }
}, Magix.Event);