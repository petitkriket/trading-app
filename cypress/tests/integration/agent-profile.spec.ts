describe("Page de profil de l'agent", () => {
  // ─── VISITE DE LA PAGE ───────────────────────────────────────────────────────
  describe('Quand un utilisateur connecté visite la page Agent Profile', () => {
    beforeEach(() => {
      cy.loginAsAgent()
    })

    it('devrait afficher le titre "Agent Profile"', () => {
      cy.findByRole('heading', { name: /Agent Profile/i }).should('exist')
    })

    it("devrait afficher l'identifiant de compte", () => {
      cy.findByText(/Account ID/i).should('be.visible')
      cy.findByText(/test-account-123/i).should('be.visible')
    })

    it('devrait afficher la faction de départ', () => {
      cy.findByText(/Starting Faction/i).should('be.visible')
      cy.findByText(/COSMIC/i).should('be.visible')
    })
  })

  // ─── CHARGEMENT DES DONNÉES ──────────────────────────────────────────────────
  describe("Quand les données de l'agent sont en cours de chargement", () => {
    it('devrait afficher un indicateur de chargement', () => {
      cy.fixture('agent').then((agentFixture) => {
        cy.intercept('GET', '**/v2/my/agent', {
          delay: 200,
          body: agentFixture,
        }).as('getAgentSlow')

        cy.visit('/')
        cy.findByLabelText(/Agent Token/i).type('sample-token')
        cy.findByRole('button', { name: /Continue/i }).click()

        cy.findByText(/Loading agent data/i).should('be.visible')
      })
    })
  })

  // ─── ERREURS ET CAS LIMITES ──────────────────────────────────────────────────
  describe('Quand une erreur survient lors du chargement', () => {
    beforeEach(() => {
      cy.intercept('GET', '**/v2/my/agent', {
        statusCode: 500,
        body: {
          error: {
            message: 'Internal Server Error',
            code: 500,
          },
        },
      }).as('getAgentError')

      cy.visit('/')
      cy.findByLabelText(/Agent Token/i).type('sample-token')
      cy.findByRole('button', { name: /Continue/i }).click()

      cy.wait('@getAgentError')
    })

    it("devrait afficher un message d'erreur", () => {
      cy.findByText(/Internal Server Error/i).should('be.visible')
    })
  })
})
