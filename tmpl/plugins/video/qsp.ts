/*
    author:https://github.com/xinglie
*/
'ref@:./index.less';
import Magix from '../../lib/magix';
import XAgent from '../../lib/agent';
let ExtractReg = /<a\s+href="((?:\/show-|\/\?s=vod-read-id-)[^"]+)"\s+title="([^"]+)">\2<\/a>/g;
let VideoInfoServer = 'https://www.qsptv.net';
export default Magix.View.extend({
    tmpl: '@:qsp.html',
    async  render() {
        try {
            let mark = Magix.mark(this, '@:{render}');
            let result = await XAgent.request(VideoInfoServer + '/topmov.html', 0, true);
            if (mark()) {
                let videos = [];
                //console.log(result);
                result.replace(ExtractReg, (m, link, title) => {
                    //console.log(m, link, title);
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
        } catch (ex) {
            alert(ex);
        }
    }
});