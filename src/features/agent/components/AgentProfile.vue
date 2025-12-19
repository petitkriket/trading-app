<script setup lang="ts">
import { useAgentQuery } from '../services/agent.service'

const { data: agentData, isLoading: isAgentLoading, error: errorData } = useAgentQuery()
</script>

<template>
  <div>
    <h1>Agent Profile</h1>

    <template v-if="agentData">
      <div>
        <div>
          <strong>Account ID:</strong>
          <span>{{ agentData.accountId }}</span>
        </div>
        <div>
          <strong>Starting Faction:</strong>
          <span>{{ agentData.startingFaction }}</span>
        </div>
      </div>
    </template>

    <template v-if="isAgentLoading">
      <div>Loading agent data...</div>
    </template>

    <template v-if="errorData">
      <div><strong>Error:</strong> {{ errorData.message }}</div>
    </template>
  </div>
</template>
