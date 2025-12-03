const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    specPattern: 'tests/cypress/e2e/**/*.spec.{js,jsx,ts,tsx}',

    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
