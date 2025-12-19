import { createRouter, createWebHistory } from 'vue-router'
import { routes } from 'vue-router/auto-routes'

import { authGuard } from './router.guards'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

router.beforeEach(authGuard)

export default router
