import TokenForm from '@/features/auth/components/TokenForm.vue'

describe('Formulaire de connexion avec token', () => {
  // ─── SOUMISSION DU FORMULAIRE ────────────────────────────────────────────────
  describe("Quand l'utilisateur soumet le formulaire", () => {
    it('devrait afficher une erreur si le token est vide', () => {
      cy.mount(TokenForm)
      cy.findByRole('button', { name: /continue/i }).click()
      cy.findByRole('alert').should('contain', 'Please enter a token')
    })

    it('devrait permettre de soumettre un token valide', () => {
      cy.mount(TokenForm)
      cy.findByLabelText(/agent token/i).type('test-token-123')
      cy.findByRole('button', { name: /continue/i }).click()
      cy.findByRole('alert').should('not.exist')
    })
  })
})
