<script setup lang="ts">
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
