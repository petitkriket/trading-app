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
