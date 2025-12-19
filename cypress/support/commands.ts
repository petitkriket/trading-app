/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
// -- Testing library selectors --
// https://testing-library.com/docs/queries/about#priority
import '@testing-library/cypress/add-commands'

/**
 * Intercepte l'API et se connecte via l'interface utilisateur
 */
Cypress.Commands.add('loginAsAgent', () => {
  cy.fixture('agent').then((agentFixture) => {
    cy.intercept('GET', '**/v2/my/agent', agentFixture).as('getAgent')

    cy.visit('/')
    cy.findByLabelText(/Agent Token/i).type('sample-token')
    cy.findByRole('button', { name: /Continue/i }).click()

    cy.wait('@getAgent')
    cy.findByRole('button', { name: /Logout/i }).should('exist')
  })
})

/**
 * Helper pour naviguer vers une page du dashboard
 */
type PageName = 'Agent' | 'Systems'
Cypress.Commands.add('navigateTo', (pageName: PageName) => {
  cy.findByRole('link', { name: new RegExp(pageName, 'i') }).click()
})

/**
 * Visite une page et vérifie la redirection vers la page de connexion
 */
Cypress.Commands.add('checkUnauthenticatedAccess', (path: string) => {
  cy.visit(path)
  cy.findByRole('heading', { name: /Welcome to Corridor 5/i }).should('exist')
})

declare global {
  // Keep things simple instead of https://docs.cypress.io/app/tooling/typescript-support#Using-an-External-Typings-File
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    interface Chainable {
      /**
       * Authentifie un agent de test et redirige vers le dashboard
       */
      loginAsAgent(): Chainable<void>
      /**
       * Navigue vers une page du dashboard via les liens de navigation
       * Préserve l'état Pinia en utilisant la navigation SPA
       */
      navigateTo(pageName: PageName): Chainable<void>
      /**
       * Vérifie que l'accès non authentifié à une page redirige vers la page de connexion
       */
      checkUnauthenticatedAccess(path: string): Chainable<void>
    }
  }
}

export {}
