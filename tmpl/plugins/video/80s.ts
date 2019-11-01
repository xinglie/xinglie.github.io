/*
    author:xinglie.lkf@alibaba-inc.com
*/
'ref@./index.less';
import Magix from '../../lib/magix';
import XAgent from '../../lib/agent';
let ExtractReg = /<a\s+href="(\/movie[^"]+)"\s+target="_blank"\s+title="([^"]+)">\s+<img[^>]+_src="([^"]+)"/g;
let VideoInfoServer = 'http://www.8080s.net';
export default Magix.View.extend({
    tmpl: '@80s.html',
    async  render() {
        let mark = Magix.mark(this, '@{render}');
        let result = await XAgent.request(VideoInfoServer + '/hot', 0, true);
        if (mark()) {
            let videos = [];
            result.replace(ExtractReg, (m, link, title, img) => {
                videos.push({
                    link: VideoInfoServer + link,
                    title,
                    img
                });
                return '';
            });
            this.digest({
                videos
            });
        }
    }
});