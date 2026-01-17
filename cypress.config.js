require('dotenv').config();
const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    specPattern: "cypress/e2e/**/*.cy.js",
    env: {
      baseUrl: process.env.BASE_URL,
      authorization: process.env.AUTH_TOKEN
    }
  },
});
