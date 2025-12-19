describe('Déconnexion', () => {
  describe('Quand un utilisateur clique sur le bouton Logout', () => {
    beforeEach(() => {
      cy.loginAsAgent()
      cy.findByRole('button', { name: /Logout/i }).click()
    })

    it('devrait afficher la page de connexion', () => {
      cy.findByRole('heading', { name: /Welcome to Corridor 5/i }).should('exist')
    })
  })
})
