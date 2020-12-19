import Magix from '../../lib/magix';
import XAgent from '../../lib/agent';
let APIHost = 'https://jirenguapi.applinzi.com/fm/v2';
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
interface Channel {
    name?: string
    channel_id?: string
    cover_small?: string
}
let RedoList: SongDesc[] = [];
let UndoList: SongDesc[] = [];
let NeteaseChannels = [{
    name: '热歌榜',
    channel_id: 'netease_1'
}, {
    name: '新歌榜',
    channel_id: 'netease_2'
}, {
    name: '抖音榜',
    channel_id: 'netease_4'
}, {
    name: '电音榜',
    channel_id: 'netease_5'
}] as Channel[];
let NeteaseChannelsMap = Magix.toMap(NeteaseChannels, 'channel_id');
export default Object.assign({
    '@:{get.netease.channels}'() {
        let img = '//s.geci.me/album-cover/336/3368702.jpg';
        let channels = [];
        for (let c of NeteaseChannels) {
            let copy = { ...c };
            copy.name = '网易-' + c.name;
            copy.cover_small = img;
            channels.push(copy);
        };
        return channels;
    },
    '@:{fetch.channels}'() {
        return XAgent.request(`${APIHost}/getChannels.php`, 1 * 24 * 60 * 60 * 1000);
    },
    '@:{fetch.random.song}'(channelId) {
        if ((channelId + '').startsWith('netease_')) {
            let i = NeteaseChannelsMap[channelId];
            return fetch('https://api.uomg.com/api/rand.music?sort=' + i.name + '&format=json').then(r => r.json()).then(r => {
                return {
                    song: [{
                        artist: r.data.artistsname,
                        url: r.data.url,
                        title: r.data.name,
                        picture: r.data.picurl,
                        sid: 'netease'
                    }]
                };
            });
        }
        return fetch(`${APIHost}/getSong.php?channel=${channelId}`).then(r => r.json());
    },
    '@:{fetch.song.lyric}'(song) {
        if (song.sid == 'netease') {
            let extractIdReg = /id=([^.]+)/;
            let sid;
            song.url.replace(extractIdReg, (_, id) => sid = id);
            return XAgent.request(`http://music.163.com/api/song/media?id=${sid}`, 0, true).then(r => {
                return JSON.parse(r);
            });
        }
        let url = `${APIHost}/getLyric.php?sid=${song.sid}`;
        return fetch(url).then(r => r.json());
    },
    async '@:{get.channels.with.active}'() {
        let reponse = await this['@:{fetch.channels}']();
        let data = JSON.parse(reponse);
        let { channels } = data;
        let neteaseChannels = this['@:{get.netease.channels}']();
        channels.push(...neteaseChannels);
        let active = channels[0];
        return {
            active,
            channels
        };
    },
    '@:{update.state}'(state: State) {
        if (this['@:{core.audio}']) {
            clearTimeout(this['@:{update.state.timer}']);
            let old = this['@:{player.play.state}'];
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
            this['@:{player.play.state}'] = state;
            this['@:{update.state.timer}'] = setTimeout(() => {
                let f = false;
                old = this['@:{player.fired.play.state}'];
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
                    this.fire('@:{when.status.change}', this['@:{player.fired.play.state}'] = state);
                }
            }, 50);
        }
    },
    '@:{update.time.and.buffer}'() {
        let audio = this['@:{core.audio}'];
        if (audio) {
            let buffered = audio.buffered;
            let p = 0;
            if (buffered.length) {
                p = buffered.end(buffered.length - 1) / audio.duration;
            }
            this.fire('@:{when.song.time.update}', {
                duration: audio.duration,
                current: audio.currentTime,
                buffered: p
            });
        }
    },
    '@:{init.audio}'() {
        if (!this['@:{core.audio}']) {
            let audio = new Audio();
            let timer;
            //audio.crossOrigin = 'anonymous';
            audio.onprogress = (e) => {
                console.log('from propgress', e);
                let b = audio.buffered;
                if (b.length) {
                    console.log(b.end(0));
                }
                this['@:{update.time.and.buffer}']();
            };
            audio.onerror = () => {
                //take a break;
                console.log('song error', audio.src);
                clearTimeout(timer);
                timer = setTimeout(() => {
                    this.fire('@:{when.song.end}');
                }, 2e3);
            };
            audio.onended = () => {
                //take a break;
                console.log('song end');
                clearTimeout(timer);
                timer = setTimeout(() => {
                    this.fire('@:{when.song.end}');
                }, 1e3);
            };
            audio.onvolumechange = () => {
                this.fire('@:{when.volume.change}', {
                    volume: audio.volume
                });
            };
            audio.oncanplay = () => {
                this['@:{update.state}']({
                    buffer: false
                });
            };
            audio.onwaiting = () => {
                this['@:{update.state}']({
                    buffer: true
                });
            };
            audio.ontimeupdate = () => {
                if (!this['@:{is.eco}']) {
                    this['@:{update.time.and.buffer}']();
                } else {
                    console.log('eco');
                }
            };
            audio.onplaying = () => {
                this['@:{update.state}']({
                    play: true
                });
            };
            audio.ondurationchange = () => {
                if (!this['@:{is.eco}']) {
                    this['@:{update.time.and.buffer}']();
                } else {
                    console.log('eco');
                }
            };
            audio.onpause = () => {
                this['@:{update.state}']({
                    play: audio.ended
                });
            };
            audio.onloadedmetadata = () => {
                let current = this['@:{song.info}'] as SongDesc;
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
                this.fire('@:{when.history.change}', {
                    song: current
                });
            };
            this['@:{core.audio}'] = audio;
        }
    },
    '@:{play.song}'(song: SongDesc) {
        this['@:{init.audio}']();
        this['@:{core.audio}'].src = song.url;
        let p = this['@:{core.audio}'].play();
        p.catch(e => {
            //console.log('click play button');
        });
        this['@:{song.info}'] = song;
    },
    '@:{seek.time}'(time) {
        if (this['@:{core.audio}']) {
            let seekable = this['@:{core.audio}'].seekable;
            let len = seekable.length;
            if (len) {
                let start = seekable.start(0);
                let end = seekable.end(len - 1);
                if (time >= start && time <= end) {
                    this['@:{core.audio}'].currentTime = time;
                }
            } else {
                let buffered = this['@:{core.audio}'].buffered;
                if (buffered.length) {
                    let max = buffered.end(buffered.length - 1);
                    this['@:{core.audio}'].currentTime = max;
                }
            }
        }
    },
    '@:{delay.next.song}'(channelId, forceRandom, delay) {
        clearTimeout(this['@:{next.song.timer}']);
        this['@:{next.song.timer}'] = setTimeout(() => {
            //console.log('auto play error,take a rest before next');
            this['@:{next.song}'](channelId, forceRandom);
        }, delay);
    },
    async '@:{next.song}'(channelId, forceRandom?: boolean) {
        clearTimeout(this['@:{next.song.timer}']);
        this['@:{set.pause}']();
        this['@:{update.state}']({
            buffer: true
        });
        if (!forceRandom) {
            forceRandom = RedoList.length == 0;
        }
        if (forceRandom) {
            try {
                let isLast = Magix.mark(this, '@:{next.song}');
                let { song } = await this["@:{fetch.random.song}"](channelId);
                if (isLast()) {
                    console.log('isLast', channelId);
                    let single = song[0] as SongDesc;
                    if (single &&
                        single.url) {
                        this.fire('@:{when.song.change}', {
                            song: single
                        });
                        this['@:{play.song}'](single);
                    } else {
                        console.log('song has no url', song);
                        this['@:{delay.next.song}'](channelId, forceRandom, 5e3);
                    }
                } else {
                    console.warn('ignore pre', song);
                }
            } catch (ex) {
                console.log('next song error', ex);
                this['@:{delay.next.song}'](channelId, forceRandom, 2e3);
            }
        } else {
            let song = RedoList.pop();
            UndoList.push(song);
            this['@:{play.song}'](song);
            this.fire('@:{when.song.change}', {
                song
            });
        }
    },
    '@:{pre.song}'() {
        if (UndoList.length > 1) {
            this['@:{set.pause}']();
            this['@:{update.state}']({
                buffer: true
            });
            let song = UndoList.pop();
            RedoList.push(song);
            song = UndoList[UndoList.length - 1];
            this['@:{play.song}'](song);
            this.fire('@:{when.song.change}', {
                song
            });
        }
    },
    '@:{can.operate}'() {
        return this['@:{core.audio}'];
    },
    '@:{can.undo}'() {
        return UndoList.length > 1;
    },
    '@:{set.volume}'(v) {
        if (this['@:{core.audio}']) {
            this['@:{core.audio}'].volume = v;
        }
    },
    '@:{set.pause}'() {
        if (this['@:{core.audio}']) {
            this['@:{core.audio}'].pause();
        }
    },
    '@:{set.play}'() {
        if (this['@:{core.audio}']) {
            this['@:{core.audio}'].play();
        }
    },
    '@:{set.mute}'() {
        let ca = this['@:{core.audio}'];
        if (ca) {
            ca.muted = !ca.muted;
            return ca.muted;
        }
        return false;
    },
    '@:{replay}'() {
        if (this['@:{core.audio}']) {
            this['@:{core.audio}'].currentTime = 0;
            this['@:{core.audio}'].play();
        }
    },
    '@:{get.pre.tip}'() {
        if (UndoList.length > 1) {
            let song = UndoList[UndoList.length - 2];
            return '上一首：' + song.title + '-' + song.artist;
        }
        return '上一首：暂无历史歌曲';
    },
    '@:{get.next.tip}'() {
        if (RedoList.length) {
            let song = RedoList[RedoList.length - 1];
            return '下一首：' + song.title + '-' + song.artist;
        }
        return '下一首：随机歌曲';
    },
    '@:{set.eco}'(eco) {
        this['@:{is.eco}'] = eco;
        if (!eco) {
            this['@:{update.time.and.buffer}']();
        }
    }
}, Magix.Event);