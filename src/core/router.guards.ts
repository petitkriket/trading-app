import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'

import { useTokenStore } from '@/features/auth'

export function authGuard(
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext,
) {
  // Pour référence https://pinia.vuejs.org/core-concepts/outside-component-usage.html#Single-Page-Applications
  const tokenStore = useTokenStore()

  if (to.meta.requiresAuth && !tokenStore.token) {
    next('/')
  } else if (to.path === '/' && tokenStore.token) {
    next('/dashboard/agent')
  } else {
    next()
  }
}
