import { defineConfig } from "cypress";
import { configurePlugin } from "cypress-mongodb";


export default defineConfig({
  reporter: "mochawesome",
  reporterOptions: {
    reportDir: "cypress/results",
    overwrite: false,
    html: false,
    json: true,
  },
  env: {
    email: "workkateryna12370@gmail.com",
    password: "1a2s3d4fA+",
    mongodb: {
      uri: "mongodb://testUser:qwerty12345@5.189.186.217:27017/?authMechanism=DEFAULT",
      database: "admin",
    },
  },
  viewportHeight: 1080,
  viewportWidth: 1920,
  e2e: {
    setupNodeEvents(on) {
      configurePlugin(on);
    },
    specPattern: "cypress/e2e/**/*.spec.{js,jsx,ts,tsx}",
  },
});
