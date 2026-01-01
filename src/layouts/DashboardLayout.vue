<script setup lang="ts">
import { useRouter } from 'vue-router'

import { queryClient } from '@/core'
import { useTokenStore } from '@/features/auth'
import { useDashboardMenu } from './composables/useDashboardMenu'

const router = useRouter()
const tokenStore = useTokenStore()
const { menuItems } = useDashboardMenu()

const handleLogout = () => {
  tokenStore.clearToken()
  queryClient.clear()
  router.push('/')
}
</script>

<template>
  <div class="min-h-screen bg-base-100">
    <div class="navbar bg-base-100 shadow-md px-8">
      <div class="flex-1">
        <h1 class="text-2xl font-bold">Corridor 5</h1>
      </div>
      <div class="flex-none">
        <button class="btn btn-error btn-sm" @click="handleLogout">Logout</button>
      </div>
    </div>

    <div class="flex gap-5 max-w-7xl mx-auto py-10 px-5">
      <nav class="card bg-base-100 shadow-md w-52 shrink-0 h-fit">
        <ul class="menu">
          <li v-for="item in menuItems" :key="item.to">
            <RouterLink :to="item.to" active-class="menu-active">
              {{ item.label }}
            </RouterLink>
          </li>
        </ul>
      </nav>

      <main class="flex-1 p-5">
        <slot />
      </main>
    </div>
  </div>
</template>
