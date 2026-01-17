const { defineConfig } = require("cypress");
const localSecrets = require('./localSecrets.json').apiUrl;

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      on('file:preprocessor', cucumber());
    },
    specPattern: "cypress/e2e/features/*.feature",
    env: {
      baseUrl: "https://gorest.co.in/public/v2/users",  
      authorization: localSecrets.apiUrl.authToken
    }
  },
});
