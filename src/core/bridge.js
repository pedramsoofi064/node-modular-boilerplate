/**
 * Module Bridge Pattern
 * Central service locator for inter-module communication
 * This pattern decouples modules by providing a centralized registry
 */

class ModuleBridge {
  constructor() {
    this.services = new Map();
    this.events = new Map();
  }

  /**
   * Register a service in the bridge
   * @param {string} moduleName - Name of the module
   * @param {string} serviceName - Name of the service
   * @param {*} service - The service instance or factory function
   */
  register(moduleName, serviceName, service) {
    const key = `${moduleName}.${serviceName}`;
    this.services.set(key, service);
    return this;
  }

  /**
   * Register multiple services from a module
   * @param {string} moduleName - Name of the module
   * @param {object} services - Object containing service names and instances
   */
  registerModule(moduleName, services) {
    Object.keys(services).forEach((serviceName) => {
      this.register(moduleName, serviceName, services[serviceName]);
    });
    return this;
  }

  /**
   * Get a service from the bridge
   * @param {string} moduleName - Name of the module
   * @param {string} serviceName - Name of the service
   * @returns {*} The service instance
   * @throws {Error} If service is not found
   */
  get(moduleName, serviceName) {
    const key = `${moduleName}.${serviceName}`;
    const service = this.services.get(key);

    if (!service) {
      throw new Error(
        `Service '${serviceName}' not found in module '${moduleName}'. Available services: ${Array.from(
          this.services.keys()
        ).join(', ')}`
      );
    }

    // If service is a factory function, call it and cache the result
    if (typeof service === 'function' && !service.prototype) {
      const instance = service();
      this.services.set(key, instance);
      return instance;
    }

    return service;
  }

  /**
   * Check if a service exists
   * @param {string} moduleName - Name of the module
   * @param {string} serviceName - Name of the service
   * @returns {boolean} True if service exists
   */
  has(moduleName, serviceName) {
    const key = `${moduleName}.${serviceName}`;
    return this.services.has(key);
  }

  /**
   * Subscribe to an event
   * @param {string} eventName - Name of the event
   * @param {Function} handler - Event handler function
   */
  on(eventName, handler) {
    if (!this.events.has(eventName)) {
      this.events.set(eventName, []);
    }
    this.events.get(eventName).push(handler);
    return this;
  }

  /**
   * Emit an event
   * @param {string} eventName - Name of the event
   * @param {*} data - Event data
   */
  emit(eventName, data) {
    const handlers = this.events.get(eventName) || [];
    handlers.forEach((handler) => {
      try {
        handler(data);
      } catch (error) {
        console.error(`Error in event handler for '${eventName}':`, error);
      }
    });
    return this;
  }

  /**
   * Remove an event listener
   * @param {string} eventName - Name of the event
   * @param {Function} handler - Event handler function to remove
   */
  off(eventName, handler) {
    const handlers = this.events.get(eventName);
    if (handlers) {
      const index = handlers.indexOf(handler);
      if (index > -1) {
        handlers.splice(index, 1);
      }
    }
    return this;
  }

  /**
   * Get all registered services (for debugging)
   * @returns {Array} Array of service keys
   */
  listServices() {
    return Array.from(this.services.keys());
  }

  /**
   * Clear all services (useful for testing)
   */
  clear() {
    this.services.clear();
    this.events.clear();
    return this;
  }
}

// Create singleton instance
const bridge = new ModuleBridge();

module.exports = bridge;

