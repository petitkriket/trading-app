import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
// L'API ne supporte pas l'auth par cookie.
// Stocker un token sans expiration dans le localStorage = risque critique si XSS.
// Stockage en mémoire : sécurité beats une bonne UX (perdu au refresh).

export const useTokenStore = defineStore('token', () => {
  const token = ref<string | undefined>(undefined)
  const setToken = (newToken: string) => (token.value = newToken)
  const clearToken = () => (token.value = undefined)

  return {
    token: computed(() => token.value),
    setToken,
    clearToken,
  }
})
