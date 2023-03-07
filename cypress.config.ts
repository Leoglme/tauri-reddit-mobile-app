import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    specPattern: 'cypress/e2e/**/*.cy.ts',
    baseUrl: 'http://localhost:1420',
    reporter: 'mochawesome',
    reporterOptions: {
      reportDir: 'cypress/e2e/test-reports',
      overwrite: true,
      html: true,
    },
  },
})
