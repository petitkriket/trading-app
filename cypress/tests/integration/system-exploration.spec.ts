describe("Page d'exploration des systèmes", () => {
  describe('Quand un utilisateur connecté visite la page Systems', () => {
    beforeEach(() => {
      cy.loginAsAgent()
      cy.navigateTo('Systems')
    })

    it('devrait afficher le titre "Systems"', () => {
      cy.findByRole('heading', { name: /Systems/ }).should('exist')
    })

    it('devrait afficher le message indiquant que la fonctionnalité arrive bientôt', () => {
      cy.findByText(/Systems exploration coming soon/i).should('be.visible')
    })
  })

  // ─── ERREURS ET CAS LIMITES ──────────────────────────────────────────────────
  describe("Quand un utilisateur non connecté tente d'accéder à la page", () => {
    it('devrait être redirigé vers la page de connexion', () => {
      cy.checkUnauthenticatedAccess('/dashboard/systems')
    })
  })
})

