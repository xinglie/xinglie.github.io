/*
    author:xinglie.lkf@alibaba-inc.com
*/
'ref@./index.less';
import Magix from '../../lib/magix';
import XAgent from '../../lib/agent';
let ExtractReg = /<a\s+href="(\/show[^"]+)"\s+title="([^"]+)">\2<\/a>/g;
let VideoInfoServer = 'https://www.qsptv.com';
export default Magix.View.extend({
    tmpl: '@qsp.html',
    async  render() {
        let mark = Magix.mark(this, '@{render}');
        let result = await XAgent.request(VideoInfoServer + '/topmov.html', 0, true);
        if (mark()) {
            let videos = [];
            result.replace(ExtractReg, (m, link, title) => {
                videos.push({
                    link: VideoInfoServer + link,
                    title
                });
                return '';
            });
            this.digest({
                videos
            });
        }
    }
});