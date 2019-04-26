//#snippet;
//#exclude=define;
(global => {
  let cachedMods = {};
  let isArray = Array.isArray;
  let getModule = id => cachedMods[id] || (cachedMods[id] = {});
  let require = id => {
      let mod = getModule(id)
      if (!mod['@{module#execed}']) {
          mod['@{module#execed}'] = 1;
          let factory = mod['@{module#factory}']
          let epts = factory(require, mod.exports = {}, mod);
          if (epts !== void 0) {
              mod.exports = epts;
          }
          delete mod['@{module#factory}']
      }
      return mod.exports;
  }
  global.define = (id, deps, factory) => {
      if (!isArray(deps)) {
          factory = deps;
          deps = [];
      }
      let mod = getModule(id);
      mod['@{module#factory}'] = factory
  };
  global.require = require;
})(this);