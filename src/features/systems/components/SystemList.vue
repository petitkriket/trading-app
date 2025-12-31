<script setup lang="ts">
import { computed } from 'vue'
import { useInfiniteSystemsQuery } from '../services/system.service'

const { data, isLoading, error, fetchNextPage, hasNextPage, isFetchingNextPage } =
  useInfiniteSystemsQuery()

const systemsData = computed(() => data.value?.pages.flatMap((page) => page.data) ?? [])
const loadedSystemsCount = computed(() => systemsData.value.length)
const availableSystems = computed(() => data.value?.pages[0]?.meta.total ?? 0)
</script>

<template>
  <div>
    <h1>Systems</h1>

    <template v-if="systemsData.length > 0">
      <div :class="$style.stats">
        <strong>Loaded {{ loadedSystemsCount }} of {{ availableSystems }} systems</strong>
      </div>

      <div :class="$style.grid">
        <div
          v-for="system in systemsData"
          :key="system.symbol"
          :class="$style.card"
          role="region"
          :aria-label="`System ${system.symbol}`"
        >
          <div>
            <strong>Symbol:</strong>
            <span>{{ system.symbol }}</span>
          </div>
          <div>
            <strong>Type:</strong>
            <span>{{ system.type }}</span>
          </div>
          <div>
            <strong>Sector:</strong>
            <span>{{ system.sectorSymbol }}</span>
          </div>
          <div>
            <strong>Coordinates:</strong>
            <span>x: {{ system.x }}, y: {{ system.y }}</span>
          </div>
          <div>
            <strong>Waypoints:</strong>
            <span>{{ system.waypoints.length }}</span>
          </div>
          <div v-if="system.factions?.length">
            <strong>Factions:</strong>
            <span>{{ system.factions.map((f) => f.symbol).join(', ') }}</span>
          </div>
        </div>
      </div>

      <div v-if="hasNextPage || isFetchingNextPage" :class="$style.actions">
        <button
          :class="$style.button"
          :disabled="!hasNextPage || isFetchingNextPage"
          @click="() => fetchNextPage()"
        >
          {{ isFetchingNextPage ? 'Loading...' : 'Load More Systems' }}
        </button>
      </div>

      <div v-else :class="$style.message">All systems loaded</div>
    </template>

    <template v-if="isLoading">
      <div>Loading systems...</div>
    </template>

    <template v-if="error">
      <div><strong>Error:</strong> {{ error.error.message }}</div>
    </template>
  </div>
</template>

<style module>
.stats {
  margin-bottom: 1rem;
}

.grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}

.card {
  border: 1px solid #ccc;
  padding: 1rem;
}

.actions {
  margin-top: 1rem;
}

.button {
  padding: 12px 24px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
}

.button:hover {
  background-color: #45a049;
}

.button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.message {
  margin-top: 1rem;
  color: #666;
}
</style>
