import { defineConfig } from "cypress";

export default defineConfig({
  env: {
    email: "workkateryna12370@gmail.com",
    password: "1a2s3d4fA+",
  },
  viewportHeight: 1080,
  viewportWidth: 1920,
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
