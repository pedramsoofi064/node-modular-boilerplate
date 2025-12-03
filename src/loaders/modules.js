/**
 * Module Loader
 * Initializes all modules and registers them with the bridge
 */

const { bridge } = require('../core');

/**
 * Load and register all modules with the bridge
 * @param {Array} modules - Array of module objects to register
 */
const loadModules = (modules) => {
  modules.forEach((module) => {
    if (module.name && module.services) {
      bridge.registerModule(module.name, module.services);
    }
  });
};

module.exports = {
  loadModules,
};

