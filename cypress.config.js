const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      on('file:preprocessor', cucumber());
    },
    specPattern: "cypress/e2e/features/*.feature",
    env: {
      baseUrl: process.env.BASE_URL,
      authorization: process.env.AUTH_TOKEN
    }
  },
});
