'#exclude(loader)';
'@./libs/sea.js';
'@./libs/zepto.js';
'@./libs/magix.js';
'@./assets/db.js';
'@./app/default.js';
'@./app/list.js';

(function(){
    var M=require('magix');
    M.boot({defaultView:'app/default'});
})();