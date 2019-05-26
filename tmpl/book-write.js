//#exclude=loader;
'@./libs/sea.js';
'@./libs/magix.js';
'@./app/book-write.js';

(() => {
    let M = require('magix5');
    M.boot({ defaultView: 'app/book-write' });
})();