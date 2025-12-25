describe("Page d'exploration des systèmes", () => {
  // ─── VISITE DE LA PAGE ───────────────────────────────────────────────────────
  describe('Quand un utilisateur connecté visite la page Systems', () => {
    beforeEach(() => {
      cy.loginAsAgent()

      cy.intercept('GET', '**/v2/systems?*', { fixture: 'systems-page1' }).as('getSystems')
      cy.navigateTo('Systems')

      cy.wait('@getSystems')
    })

    it('devrait afficher le titre "Systems"', () => {
      cy.findByRole('heading', { name: /Systems/i }).should('exist')
    })

    it('devrait afficher la liste des systèmes', () => {
      cy.findByText(/X1-TEST1/i).should('be.visible')
      cy.findByText(/X1-TEST2/i).should('be.visible')
      cy.findByText(/X1-TEST3/i).should('be.visible')
    })

    it('devrait afficher les informations de chaque système', () => {
      cy.findByRole('region', { name: /X1-TEST1/i }).within(() => {
        cy.findByText(/Type:/i).should('exist')
        cy.findByText(/RED_STAR/i).should('be.visible')
        cy.findByText(/Sector:/i).should('exist')
        cy.findByText(/^X1$/i).should('be.visible')
        cy.findByText(/Coordinates:/i).should('exist')
        cy.findByText(/x: 10, y: 20/i).should('be.visible')
        cy.findByText(/Waypoints:/i).should('exist')
        cy.findByText(/^2$/i).should('be.visible')
        cy.findByText(/Factions:/i).should('exist')
        cy.findByText(/COSMIC, VOID/i).should('be.visible')
      })
    })

    it('devrait afficher le compteur de systèmes chargés', () => {
      cy.findByText(/Loaded 3 of 23 systems/i).should('be.visible')
    })

    it('devrait afficher le bouton "Load More Systems"', () => {
      cy.findByRole('button', { name: /Load More Systems/i }).should('be.visible')
    })
  })

  // ─── PAGINATION ──────────────────────────────────────────────────────────────
  describe("Quand l'utilisateur charge plus de systèmes", () => {
    beforeEach(() => {
      cy.loginAsAgent()
      cy.intercept('GET', '**/v2/systems?*', { fixture: 'systems-page1' }).as('getSystems')
      cy.navigateTo('Systems')

      cy.wait('@getSystems')

      cy.findByText(/X1-TEST1/i).should('be.visible')
      cy.findByText(/Loaded 3 of 23 systems/i).should('be.visible')
    })

    it('devrait charger la page suivante au clic sur "Load More Systems"', () => {
      cy.intercept('GET', '**/v2/systems?*', { fixture: 'systems-page2' }).as('getSystemsPage2')

      cy.findByRole('button', { name: /Load More Systems/i }).click()
      cy.wait('@getSystemsPage2')

      cy.findByText(/X1-TEST4/i).should('be.visible')
      cy.findByText(/Loaded 4 of 23 systems/i).should('be.visible')
    })

    it('devrait afficher un indicateur de chargement pendant la pagination', () => {
      cy.intercept('GET', '**/v2/systems?*', (req) => {
        req.reply({
          delay: 200,
          fixture: 'systems-page2',
        })
      }).as('getSystemsPage2')

      cy.findByRole('button', { name: /Load More Systems/i }).click()

      cy.findByRole('button', { name: /Loading/i }).should('be.disabled')

      cy.wait('@getSystemsPage2')

      cy.findByText(/X1-TEST4/i).should('be.visible')
    })
  })

  describe('Quand tous les systèmes sont chargés', () => {
    beforeEach(() => {
      cy.loginAsAgent()

      cy.fixture('systems-page1').then((systemsFixture) => {
        cy.intercept('GET', '**/v2/systems?*', {
          ...systemsFixture,
          meta: {
            total: 3,
            page: 1,
            limit: 10,
          },
        }).as('getSystems')
      })

      cy.navigateTo('Systems')
      cy.wait('@getSystems')
      cy.findByText(/X1-TEST1/i).should('exist')
    })

    it('devrait afficher le message "All systems loaded"', () => {
      cy.findByText(/All systems loaded/i).should('be.visible')
    })

    it('ne devrait pas afficher le bouton "Load More Systems"', () => {
      cy.findByRole('button', { name: /Load More Systems/i }).should('not.exist')
    })
  })

  // ─── CHARGEMENT DES DONNÉES ──────────────────────────────────────────────────
  describe('Quand les données des systèmes sont en cours de chargement', () => {
    it('devrait afficher un indicateur de chargement', () => {
      cy.loginAsAgent()

      cy.intercept('GET', '**/v2/systems?*', (req) => {
        req.reply({
          delay: 100,
          fixture: 'systems-page1',
        })
      }).as('getSystems')

      cy.navigateTo('Systems')
      cy.findByText(/Loading systems/i).should('be.visible')
      cy.wait('@getSystems')
    })
  })

  // ─── ERREURS ET CAS LIMITES ──────────────────────────────────────────────────
  describe('Quand une erreur survient lors du chargement', () => {
    it("devrait afficher un message d'erreur", () => {
      cy.loginAsAgent()

      cy.intercept('GET', '**/v2/systems?*', {
        statusCode: 500,
        body: {
          error: {
            message: 'Internal server error',
            code: 500,
          },
        },
      }).as('getSystemsError')

      cy.navigateTo('Systems')
      cy.wait('@getSystemsError')

      cy.findByText(/Error:/i).should('be.visible')
      cy.findByText(/Internal server error/i).should('be.visible')
    })
  })

  describe("Quand un utilisateur non connecté tente d'accéder à la page", () => {
    it('devrait être redirigé vers la page de connexion', () => {
      cy.checkUnauthenticatedAccess('/dashboard/systems')
    })
  })
})
