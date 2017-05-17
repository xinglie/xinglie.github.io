'#exclude(loader)';
'@../libs/sea.js';
'@../libs/zepto.js';
'@../libs/magix.js';
'@../assets/db.js';
'@./default.js';
'@./list.js';

(function(){
    var M=require('magix');
    M.boot({defaultView:'app/default'});
})();