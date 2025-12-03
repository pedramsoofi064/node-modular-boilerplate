/**
 * Bridge Pattern Usage Examples
 * This file demonstrates how to use the Module Bridge for inter-module communication
 */

const { bridge } = require('./bridge');

// Example 1: Register a service
bridge.register('example', 'ExampleService', {
  doSomething: () => {
    console.log('Doing something...');
  },
});

// Example 2: Get a service
try {
  const ExampleService = bridge.get('example', 'ExampleService');
  ExampleService.doSomething();
} catch (error) {
  console.error('Service not found:', error.message);
}

// Example 3: Event subscription
bridge.on('user.created', (userData) => {
  console.log('User created event received:', userData);
});

// Example 4: Emit an event
bridge.emit('user.created', { id: 1, name: 'John Doe', email: 'john@example.com' });

// Example 5: Check if service exists
if (bridge.has('example', 'ExampleService')) {
  console.log('Service exists!');
}

// Example 6: List all registered services
console.log('Registered services:', bridge.listServices());

// Example 7: Remove event listener
const handler = (data) => {
  console.log('Handler:', data);
};
bridge.on('test.event', handler);
bridge.off('test.event', handler);

module.exports = bridge;

