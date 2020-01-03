/*
    author:xinglie.lkf@alibaba-inc.com
*/
'ref@./index.css';
import Magix, { Magix5 } from '../../lib/magix';
import Agent from '../../lib/agent';
let extractPeriodRegexp = /<dt>\s*<span>([\s\S]+?)<\/span>\s*<\/dt>\s*([\s\S]+?)<\/dl>/g;
let extractDetailRegexp = /<dd>\s*<span\s*class="maglisttitle">\s*<a[^>]*?href="([^"]+)"[^>]*?>([\s\S]+?)<\/a>\s*<\/span>\s*<\/dd>/g;
export default Magix.View.extend({
    tmpl: '@detail.html',
    init() {
        this.set({
            showStory: false,
            storyUrl: ''
        });
    },
    assign(data) {
        this.set(data).set({
            loading: true,
            showStory: false
        });
        return true;
    },
    async render() {
        this.digest();
        try {
            let mark = Magix.mark(this, '@{render}');
            let url = this.get('data');
            let lastSlash = url.lastIndexOf('/');
            let base = url.substring(0, lastSlash + 1);
            let data = await Agent.request(url, 30 * 24 * 60 * 60 * 1000, true);
            if (mark()) {
                let list = [];
                data.replace(extractPeriodRegexp, (_, title, content) => {
                    let links = [];
                    content.replace(extractDetailRegexp, (_, url, text) => {
                        links.push({
                            url: base + url,
                            text: text.trim()
                        });
                        return _;
                    });
                    list.push({
                        title: title.trim(),
                        links
                    });
                    return _;
                });
                this.digest({
                    list,
                    loading: false
                });
            }
        } catch (e) {
            this.digest({
                loading: false,
                error: e
            });
        }
    },
    '@{open.detail}<click>'(e: Magix5.MagixMouseEvent) {
        this.digest({
            showStory: true,
            storyUrl: e.params.url
        });
    },
    '@{when.story.close}<close>'() {
        this.digest({
            showStory: false
        });
    }
});