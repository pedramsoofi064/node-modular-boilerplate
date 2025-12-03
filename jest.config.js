module.exports = {
  setupFiles: ['./tests/unit/settings/env-setup.js'],
  testEnvironment: 'node',
  testMatch: ['**/tests/unit/**/*.test.js'],
  transform: {
    '^.+\\.js$': 'babel-jest',
  },
};
