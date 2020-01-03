/*
    author:xinglie.lkf@alibaba-inc.com
*/
'ref@./index.less';
import Magix from '../../lib/magix';
import XAgent from '../../lib/agent';
let ExtractReg = /<a href="(\/show\/[a-z0-9]+\/)"\s+class="relative as"\s+target="_blank">\s+<img\s+data-original="([^"]+)"[^>]+?alt="([^"]+)"[\s\S]+?title="([^><]+?)">\4<\/span>/g;
let VideoInfoServer = 'https://www.tvsou.com';
export default Magix.View.extend({
    tmpl: '@tvsou.html',
    async  render() {
        try {
            let mark = Magix.mark(this, '@{render}');
            let result = await XAgent.request(VideoInfoServer + '/dianying/', 0, true);
            if (mark()) {
                let videos = [];
                result.replace(ExtractReg, (m, link, img, title, date) => {
                    videos.push({
                        link: VideoInfoServer + link,
                        img,
                        title,
                        date
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