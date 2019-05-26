//#snippets;
/*
    author:xinglie.lkf@taobao.com
 */
let Magix = require('magix5');
Magix.applyStyle('@book-write.css');
module.exports = Magix.View.extend({
    tmpl: '@book-write.html',
    render() {
        this.digest();
    },
    'submit<click>'(e) {
        let form = Magix.node('form' + this.id);
        if (form.checkValidity()) {
            e.preventDefault();
            let {
                title,
                category,
                author,
                publisher,
                translater } = this.get();
            fetch('http://192.168.10.102:3000/book', {
                body: JSON.stringify({
                    title,
                    category,
                    author,
                    publisher,
                    translater
                }),
                method: 'post'
            }).then(e => {
                if (e.status != 200) {
                    this.digest({
                        error: '保存失败！'
                    })
                } else {
                    this.digest({
                        error: '保存成功',
                        title: ''
                    });
                }
            }, e => {
                this.digest({
                    error: e
                });
            });
        }
    },
    '$[mxc]<input>'(e) {
        let targt = e.eventTarget;
        let v = targt.value;
        let expr = Function(`return ${targt.getAttribute('mxc')}`)();
        let o = this.get();
        for (let ex of expr) {
            if (ex.f && ex.f.number) {
                v = parseFloat(v);
            }
            o[ex.p] = v;
        }
    }
});