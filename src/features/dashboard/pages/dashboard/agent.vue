<script setup vapor lang="ts">
import { AgentProfile } from '@/features/agent'

definePage({
  meta: {
    requiresAuth: true,
    layout: 'dashboard',
  },
})
</script>

<template>
  <AgentProfile />
</template>
