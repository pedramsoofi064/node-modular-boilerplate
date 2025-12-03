const { bridge } = require('../../core');
const UserService = require('./user.service');

// Register module services with the bridge
bridge.registerModule('user', {
  UserService,
});

module.exports = {
  UserService,
};

