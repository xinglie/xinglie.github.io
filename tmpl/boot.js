//#exclude=loader;
'@./libs/sea.js';
'@./libs/magix.js';
'@./assets/db.js';
'@./app/default.js';

(() => {
    let M = require('magix5');
    M.boot({ defaultView: 'app/default' });
})();