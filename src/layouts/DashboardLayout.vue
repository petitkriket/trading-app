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
  <div class="dashboard-layout">
    <header class="dashboard-header">
      <h1>Corridor 5</h1>
      <button class="logout-btn" @click="handleLogout">Logout</button>
    </header>

    <div class="dashboard-container">
      <nav class="dashboard-nav">
        <ul class="menu-list">
          <li v-for="item in menuItems" :key="item.to">
            <RouterLink :to="item.to" class="menu-link">
              {{ item.label }}
            </RouterLink>
          </li>
        </ul>
      </nav>

      <main class="dashboard-content">
        <slot />
      </main>
    </div>
  </div>
</template>

<style scoped>
.dashboard-layout {
  min-height: 100vh;
  background-color: #f5f5f5;
}

.dashboard-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 40px;
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.dashboard-header h1 {
  margin: 0;
  font-size: 24px;
}

.logout-btn {
  padding: 8px 16px;
  background-color: #f44336;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
}

.logout-btn:hover {
  background-color: #da190b;
}

.dashboard-container {
  display: flex;
  gap: 20px;
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
}

.dashboard-nav {
  flex-shrink: 0;
  width: 200px;
  background-color: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  height: fit-content;
}

.menu-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.menu-list li {
  margin-bottom: 8px;
}

.menu-link {
  display: block;
  padding: 10px 12px;
  text-decoration: none;
  color: #333;
  border-radius: 4px;
}

.menu-link:hover {
  background-color: #f5f5f5;
}

.menu-link.router-link-active {
  background-color: #4caf50;
  color: white;
}

.dashboard-content {
  flex: 1;
  padding: 20px;
}
</style>
