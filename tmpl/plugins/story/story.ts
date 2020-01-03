/*
    author:xinglie.lkf@alibaba-inc.com
*/
'ref@./index.css';
import Magix from '../../lib/magix';
import Agent from '../../lib/agent';
let extractTitleRegexp = /<h1>([\s\S]+?)<\/h1>/;
let extractAuthroRegexp = /<span id="pub_date">([\s\S]+?)<\/span>/;
let extractSourceRegexp = /<span id="media_name">([\s\S]+?)<\/span>/;
let extractContentRegexp = /<div class="blkContainerSblkCon">([\S\s]+?)<\/div>/;
let stripContentRegexp = /<div class="contentAd">[\S\s]+?<\/div>/;
export default Magix.View.extend({
    tmpl: '@story.html',
    assign(data) {
        this.set(data).set({
            loading: true
        });
        return true;
    },
    async render() {
        this.digest();
        try {
            let mark = Magix.mark(this, '@{render}');
            let url = this.get('url');
            if (url && mark()) {
                let result = await Agent.request(url, 0, true);
                let title, author, source, content;
                result = result.replace(extractTitleRegexp, (_, t) => {
                    title = t.trim();
                    return _;
                }).replace(extractAuthroRegexp, (_, a) => {
                    author = a.trim();
                    return _;
                }).replace(extractSourceRegexp, (_, s) => {
                    source = s.trim();
                    return _;
                }).replace(stripContentRegexp, '');
                result.replace(extractContentRegexp, (_, c) => {
                    content = c.trim();
                    return _;
                });
                this.digest({
                    loading: false,
                    title,
                    author,
                    source,
                    content
                });
            } else {
                this.digest({
                    loading: false
                });
            }
        } catch (ex) {
            this.digest({
                error: ex
            });
        }
    },
    '@{story.close}<click>'() {
        Magix.dispatch(this.root, 'close');
    }
});