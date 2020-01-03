/*
    author:xinglie.lkf@alibaba-inc.com
*/
'ref@./index.less';
import Magix from '../../lib/magix';
import XAgent from '../../lib/agent';
let ExtractReg = /\.fm-discovery\{[\s\S]+?url\(([^()]+)\)[\s\S]+?<a\s+href="\/([^"]+)"\s+class="q"\s+data-toggle="tooltip"\s+title="[^"]+"\s+data-placement="top">([\S\s]+?)<\/a>[\s\S]+<a[^>]+?rel="nofollow"\s+href="([^"]+)">\s*(豆瓣[\S\s]+?)<\/a>[\s\S]+<a[^>]+?rel="nofollow"\s+href="([^"]+)">\s*(IMDB[\S\s]+?)<\/a>[\s\S]+<p\s+class="x-kankan-desc">([\s\S]+?)<\/p>/;
let FullDescReg = /<div\s+class="x-kankan-full-desc"\s+style="display:\s*none;">([\s\S]+?)<\/div>/;
let VideoInfoServer = 'http://dianying.fm/';
export default Magix.View.extend({
    tmpl: '@dyfm.html',
    async  render() {
        try {
            let mark = Magix.mark(this, '@{render}');
            let result = await XAgent.request(VideoInfoServer, 0, true);
            if (mark()) {
                let videoInfo = {
                    img: '',
                    detail: '',
                    name: '',
                    dbLink: '',
                    dbScore: '',
                    imdbLink: '',
                    imdbScore: '',
                    desc: ''
                };
                result.replace(ExtractReg, (m, img, detail, name, dbLink, dbScore, imdbLink, imdbScore, desc) => {
                    videoInfo.img = img;
                    videoInfo.detail = VideoInfoServer + detail;
                    videoInfo.name = name.trim();
                    videoInfo.dbLink = dbLink;
                    videoInfo.dbScore = dbScore.trim();
                    videoInfo.imdbLink = imdbLink;
                    videoInfo.imdbScore = imdbScore.trim();
                    videoInfo.desc = desc.trim();
                    desc.replace(FullDescReg, (mm, longDesc) => {
                        videoInfo.desc = longDesc.trim();
                        return mm;
                    });
                    return m;
                });
                this.digest({
                    loading: false,
                    videoInfo
                });
            }
        } catch (ex) {
            alert(ex);
            this.set({
                loading: false
            });
        }
    },
    '@{change}<click>'() {
        let loading = this.get('loading');
        if (loading) return;
        this.digest({
            loading: true
        });
        this.render();
    }
});