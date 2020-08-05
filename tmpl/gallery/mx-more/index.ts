/*
    author:xinglie.lkf@alibaba-inc.com
*/
import Magix from '../../lib/magix';
Magix.applyStyle('@:./index.less');
export default Magix.View.extend({
    tmpl: '@:./index.html',
    init() {
        let observer = new IntersectionObserver(entries => {
            let entry = entries[0];
            if (entry.isIntersecting) {
                Magix.dispatch(this.root, 'intersect');
            }
        });
        observer.observe(this.root);
        this.ondestroy = () => {
            observer.unobserve(this.root);
        };
    },
    assign(data) {
        this.set({
            placeholder: data.placeholder || '更多加载中...',
            offset: data.offset || 200
        });
        return true;
    },
    render() {
        this.digest();
    }
});