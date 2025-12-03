# Module Bridge Pattern

The Bridge pattern provides a centralized service locator for inter-module communication, enabling loose coupling between modules.

## Benefits

- **Decoupled Modules**: Modules don't need direct imports from each other
- **Dependency Injection**: Easy to swap implementations for testing
- **Event System**: Built-in pub/sub for module communication
- **Service Discovery**: Centralized registry of all module services

## Usage

### Registering Services

Modules automatically register their services when loaded:

```javascript
// In your module file (e.g., auth.module.js)
const { bridge } = require('../../core');

bridge.registerModule('auth', {
  AuthService,
  AuthController,
  JwtService,
});
```

### Getting Services

Access services from other modules through the bridge:

```javascript
// Instead of: const AuthService = require('../auth/auth.service');
const { bridge } = require('../../core');
const AuthService = bridge.get('auth', 'AuthService');

// Use the service
const result = await AuthService.doLogin({ phone, password });
```

### Event System

Modules can communicate via events:

```javascript
// Subscribe to events
bridge.on('user.created', (userData) => {
  console.log('User created:', userData);
});

// Emit events
bridge.emit('user.created', { id: 1, name: 'John' });
```

### Checking Service Availability

```javascript
if (bridge.has('auth', 'AuthService')) {
  const AuthService = bridge.get('auth', 'AuthService');
}
```

## Example

See `src/modules/user/user.service.js` for a complete example of using the bridge pattern for inter-module communication.

