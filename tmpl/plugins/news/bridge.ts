import Magix, { Magix5 } from '../../lib/magix';
export default Object.assign({
    '@:{save.document}'(doc, comment?: boolean) {
        this['@:{doc}'] = doc;
        this['@:{doc.comment}'] = comment;
        this.fire('@:{when.document.changed}');
    },
    '@:{get.document}'() {
        return this['@:{doc}'];
    },
    '@:{get.is.comment}'() {
        return this['@:{doc.comment}'];
    }
}, Magix.Event);