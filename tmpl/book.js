//#exclude=loader;
'@./libs/sea.js';
'@./libs/magix.js';
'@./assets/book.js';
'@./app/book.js';

(() => {
    let M = require('magix5');
    M.boot({ defaultView: 'app/book' });
})();