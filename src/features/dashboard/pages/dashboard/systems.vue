<script setup vapor lang="ts">
import { SystemList } from '@/features/systems'

definePage({
  meta: {
    requiresAuth: true,
    layout: 'dashboard',
  },
})
</script>

<template>
  <SystemList />
</template>
