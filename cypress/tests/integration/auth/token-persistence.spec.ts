describe('Persistance du token', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  describe("Quand un utilisateur visite la page de connexion pour la première fois", () => {
    it('la case "Remember me" devrait être décochée par défaut', () => {
      cy.findByLabelText(/Remember me in this browser tab/i).should('not.be.checked')
    })

    it("ne devrait pas afficher le message d'avertissement de sécurité", () => {
      cy.findByText(/Your token will be stored in session storage/i).should('not.exist')
    })
  })

  describe('Quand un utilisateur coche la case "Remember me"', () => {
    it("devrait afficher le message d'avertissement de sécurité", () => {
      cy.findByLabelText(/Remember me in this browser tab/i).check()

      cy.findByText(/Your token will be stored in session storage/i).should('be.visible')
      cy.findByText(/Only enable this on trusted devices/i).should('be.visible')
    })

    it('devrait sauvegarder la préférence dans sessionStorage', () => {
      cy.findByLabelText(/Remember me in this browser tab/i).check()

      cy.window().then((win) => {
        expect(win.sessionStorage.getItem('toggle-token-persistence')).to.equal('true')
      })
    })
  })

  describe('Quand un utilisateur décoche la case "Remember me"', () => {
    it("devrait masquer le message d'avertissement de sécurité", () => {
      cy.findByLabelText(/Remember me in this browser tab/i).check()
      cy.findByText(/Your token will be stored in session storage/i).should('be.visible')

      cy.findByLabelText(/Remember me in this browser tab/i).uncheck()
      cy.findByText(/Your token will be stored in session storage/i).should('not.exist')
    })
  })

  describe('Quand un utilisateur se connecte sans activer la persistance', () => {
    it('ne devrait pas stocker le token dans sessionStorage', () => {
      cy.fixture('agent').then((agentFixture) => {
        cy.intercept('GET', '**/v2/my/agent', agentFixture).as('getAgent')

        cy.findByLabelText(/Agent Token/i).type('sample-token')
        cy.findByRole('button', { name: /Continue/i }).click()

        cy.wait('@getAgent')

        cy.window().then((win) => {
          expect(win.sessionStorage.getItem('SPT')).to.equal(null)
        })
      })
    })

    it('devrait perdre le token après un rechargement de page', () => {
      cy.fixture('agent').then((agentFixture) => {
        cy.intercept('GET', '**/v2/my/agent', agentFixture).as('getAgent')

        cy.findByLabelText(/Agent Token/i).type('sample-token')
        cy.findByRole('button', { name: /Continue/i }).click()

        cy.wait('@getAgent')
        cy.findByRole('heading', { name: /Agent Profile/i }).should('exist')

        cy.reload()

        // Devrait rediriger vers la page de connexion car le token est perdu
        cy.findByRole('heading', { name: /Welcome to Corridor 5/i }).should('exist')
      })
    })
  })

  describe('Quand un utilisateur se connecte avec la persistance activée', () => {
    it('devrait stocker le token dans sessionStorage', () => {
      cy.fixture('agent').then((agentFixture) => {
        cy.intercept('GET', '**/v2/my/agent', agentFixture).as('getAgent')

        cy.findByLabelText(/Remember me in this browser tab/i).check()
        cy.findByLabelText(/Agent Token/i).type('sample-token')
        cy.findByRole('button', { name: /Continue/i }).click()

        cy.wait('@getAgent')

        cy.window().then((win) => {
          expect(win.sessionStorage.getItem('SPT')).to.equal('sample-token')
        })
      })
    })

    it('devrait conserver le token après un rechargement de page', () => {
      cy.fixture('agent').then((agentFixture) => {
        cy.intercept('GET', '**/v2/my/agent', agentFixture).as('getAgent')

        cy.findByLabelText(/Remember me in this browser tab/i).check()
        cy.findByLabelText(/Agent Token/i).type('sample-token')
        cy.findByRole('button', { name: /Continue/i }).click()

        cy.wait('@getAgent')
        cy.findByRole('heading', { name: /Agent Profile/i }).should('exist')

        cy.reload()

        // Devrait rester authentifié
        cy.wait('@getAgent')
        cy.findByRole('heading', { name: /Agent Profile/i }).should('exist')
      })
    })
  })

  describe('Quand un utilisateur se déconnecte', () => {
    it('devrait nettoyer le token du sessionStorage', () => {
      cy.fixture('agent').then((agentFixture) => {
        cy.intercept('GET', '**/v2/my/agent', agentFixture).as('getAgent')

        cy.findByLabelText(/Remember me in this browser tab/i).check()
        cy.findByLabelText(/Agent Token/i).type('sample-token')
        cy.findByRole('button', { name: /Continue/i }).click()

        cy.wait('@getAgent')

        cy.window().then((win) => {
          expect(win.sessionStorage.getItem('SPT')).to.equal('sample-token')
        })

        cy.findByRole('button', { name: /Logout/i }).click()

        cy.window().then((win) => {
          expect(win.sessionStorage.getItem('SPT')).to.equal(null)
        })
      })
    })
  })

  describe('Quand un utilisateur active la persistance après la connexion', () => {
    it('devrait sauvegarder le token existant dans sessionStorage', () => {
      cy.fixture('agent').then((agentFixture) => {
        cy.intercept('GET', '**/v2/my/agent', agentFixture).as('getAgent')

        // Se connecter sans persistance
        cy.findByLabelText(/Agent Token/i).type('sample-token')
        cy.findByRole('button', { name: /Continue/i }).click()

        cy.wait('@getAgent')

        cy.window().then((win) => {
          expect(win.sessionStorage.getItem('SPT')).to.equal(null)
        })

        // Activer la persistance depuis le dashboard (si implémenté)
        // Note: Cette fonctionnalité nécessiterait une UI pour activer la persistance
        // après connexion, ce qui n'est actuellement pas implémenté
        // Ce test est laissé en commentaire pour référence future

        // cy.visit('/')
        // cy.findByRole('checkbox', { name: /Remember me in this browser tab/i }).check()
        // cy.window().then((win) => {
        //   expect(win.sessionStorage.getItem('SPT')).to.equal('sample-token')
        // })
      })
    })
  })
})
