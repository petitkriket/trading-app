import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'

export const useTokenStore = defineStore('token', () => {
  const TOKEN_KEY = 'SPT'
  const SETTING_KEY = 'toggle-token-persistence'
  const token = ref<string | undefined>(undefined)
  const isTokenPersisted = useStorage<boolean>(SETTING_KEY, false, sessionStorage)

  if (isTokenPersisted.value) {
    const stored = sessionStorage.getItem(TOKEN_KEY)
    if (stored) token.value = stored
  }

  const setToken = (newToken: string) => {
    token.value = newToken
    if (isTokenPersisted.value) {
      sessionStorage.setItem(TOKEN_KEY, newToken)
    }
  }

  const clearToken = () => {
    token.value = undefined
    sessionStorage.removeItem(TOKEN_KEY)
  }

  const setTokenPersistence = (value: boolean) => {
    isTokenPersisted.value = value

    if (value && token.value) {
      sessionStorage.setItem(TOKEN_KEY, token.value)
    } else {
      sessionStorage.removeItem(TOKEN_KEY)
    }
  }

  return {
    token,
    setToken,
    clearToken,
    setTokenPersistence,
    isTokenPersisted,
  }
})
