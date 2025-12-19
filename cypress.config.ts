import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    specPattern: 'cypress/tests/**/*.spec.ts',
    baseUrl: 'http://localhost:4173',
  },
  component: {
    specPattern: 'src/**/*.cy.ts',
    devServer: {
      framework: 'vue',
      bundler: 'vite',
    },
  },
})
