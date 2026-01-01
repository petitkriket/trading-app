<script setup lang="ts">
import { useAgentQuery } from '../services/agent.service'

const { data: agentData, isLoading: isAgentLoading, error: errorData } = useAgentQuery()
</script>

<template>
  <div>
    <h1 class="text-3xl font-bold mb-6">Agent Profile</h1>

    <template v-if="agentData">
      <div class="stats shadow-lg bg-base-100">
        <div class="stat">
          <div class="stat-title">Account ID</div>
          <div class="stat-value text-2xl">{{ agentData.accountId }}</div>
        </div>

        <div class="stat">
          <div class="stat-title">Starting Faction</div>
          <div class="stat-value text-2xl">{{ agentData.startingFaction }}</div>
        </div>
      </div>
    </template>

    <template v-if="isAgentLoading">
      <div class="flex items-center gap-2">
        <span class="loading loading-spinner loading-md" />
        <span>Loading agent data...</span>
      </div>
    </template>

    <template v-if="errorData">
      <div class="alert alert-error">Error: {{ errorData.error.message }}</div>
    </template>
  </div>
</template>
