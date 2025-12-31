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
  <div :class="$style.layout">
    <header :class="$style.header">
      <h1 :class="$style.title">Corridor 5</h1>
      <button :class="$style.logout" @click="handleLogout">Logout</button>
    </header>

    <div :class="$style.container">
      <nav :class="$style.nav">
        <ul :class="$style.menu">
          <li v-for="item in menuItems" :key="item.to">
            <RouterLink :to="item.to" :class="$style.link" :active-class="$style.active">
              {{ item.label }}
            </RouterLink>
          </li>
        </ul>
      </nav>

      <main :class="$style.content">
        <slot />
      </main>
    </div>
  </div>
</template>

<style module>
.layout {
  min-height: 100vh;
  background-color: #f5f5f5;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 40px;
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.title {
  margin: 0;
  font-size: 24px;
}

.logout {
  padding: 8px 16px;
  background-color: #f44336;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
}

.logout:hover {
  background-color: #da190b;
}

.container {
  display: flex;
  gap: 20px;
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
}

.nav {
  flex-shrink: 0;
  width: 200px;
  background-color: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  height: fit-content;
}

.menu {
  list-style: none;
  padding: 0;
  margin: 0;
}

.menu li {
  margin-bottom: 8px;
}

.link {
  display: block;
  padding: 10px 12px;
  text-decoration: none;
  color: #333;
  border-radius: 4px;
}

.link:hover {
  background-color: #f5f5f5;
}

.active {
  background-color: #4caf50;
  color: white;
}

.content {
  flex: 1;
  padding: 20px;
}
</style>
