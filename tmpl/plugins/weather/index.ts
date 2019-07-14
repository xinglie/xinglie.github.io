import Magix from '../../lib/magix';
Magix.applyStyle('@index.css');
export default Magix.View.extend({
    tmpl: '@index.html',
    render() {
        let mark = Magix.mark(this, '@{render}');
        fetch('//www.tianqiapi.com/api/?version=v6')
            .then(r => r.json())
            .then(r => {
                if (mark()) {
                    console.log(r);
                    this.digest({
                        weather: r
                    });
                }
            });
    }
})