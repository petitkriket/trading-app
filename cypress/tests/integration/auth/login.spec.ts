describe("Page de connexion avec token d'agent", () => {
  describe('Quand un utilisateur visite la page de connexion', () => {
    it('devrait afficher le titre et le formulaire', () => {
      cy.visit('/')
      cy.findByRole('heading', { name: /Welcome to Corridor 5/i }).should('exist')
    })
  })

  describe('Quand un utilisateur soumet un token valide', () => {
    beforeEach(() => {
      cy.loginAsAgent()
    })

    it('devrait afficher la page Agent Profile', () => {
      cy.findByRole('heading', { name: /Agent Profile/i }).should('exist')
    })
  })

  describe('Quand un utilisateur soumet un token invalide', () => {
    describe('et le token est vide', () => {
      it("devrait afficher un message d'erreur", () => {
        cy.visit('/')
        cy.findByRole('button', { name: /Continue/i }).click()

        cy.findByText(/Please enter a token/i).should('be.visible')
      })
    })

    describe('et le token contient uniquement des espaces', () => {
      it("devrait afficher un message d'erreur", () => {
        cy.visit('/')
        cy.findByLabelText(/Agent Token/i).type(' ')
        cy.findByRole('button', { name: /Continue/i }).click()

        cy.findByText(/Please enter a token/i).should('be.visible')
      })
    })
  })
})
