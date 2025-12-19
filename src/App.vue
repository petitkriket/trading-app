<script setup lang="ts">
import { computed } from 'vue'
import { RouterView, useRoute } from 'vue-router'
import { getLayout } from '@/layouts'

const route = useRoute()
const layout = computed(() => getLayout(route.meta.layout))
</script>

<template>
  <component :is="layout">
    <RouterView />
  </component>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family:
    -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
}
</style>
