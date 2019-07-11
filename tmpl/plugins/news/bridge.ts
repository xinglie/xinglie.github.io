import Magix, { Magix5 } from '../../lib/magix';
export default Object.assign({
    '@{save.document}'(doc) {
        this['@{doc}'] = doc;
        this.fire('@{when.document.changed}');
    },
    '@{get.document}'() {
        return this['@{doc}'];
    }
}, Magix.Event);