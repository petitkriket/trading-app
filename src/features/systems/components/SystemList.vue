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
    <h1 class="text-3xl font-bold mb-6">Systems</h1>

    <template v-if="systemsData.length > 0">
      <div class="mb-4">
        <div class="badge badge-primary badge-lg">
          Loaded {{ loadedSystemsCount }} of {{ availableSystems }} systems
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div
          v-for="system in systemsData"
          :key="system.symbol"
          class="card card-dash bg-base-100"
          role="region"
          :aria-label="`System ${system.symbol}`"
        >
          <div class="card-body p-4 space-y-2">
            <div class="flex justify-between items-center">
              <span class="font-semibold text-sm">Symbol:</span>
              <span class="badge badge-neutral">{{ system.symbol }}</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="font-semibold text-sm">Type:</span>
              <span>{{ system.type }}</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="font-semibold text-sm">Sector:</span>
              <span>{{ system.sectorSymbol }}</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="font-semibold text-sm">Coordinates:</span>
              <span>x: {{ system.x }}, y: {{ system.y }}</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="font-semibold text-sm">Waypoints:</span>
              <span class="badge badge-accent">{{ system.waypoints.length }}</span>
            </div>
            <div v-if="system.factions?.length" class="flex justify-between items-start">
              <span class="font-semibold text-sm">Factions:</span>
              <span class="text-right text-sm">{{
                system.factions.map((f) => f.symbol).join(', ')
              }}</span>
            </div>
          </div>
        </div>
      </div>

      <div v-if="hasNextPage || isFetchingNextPage" class="mt-6 flex justify-center">
        <button
          class="btn btn-primary"
          :disabled="!hasNextPage || isFetchingNextPage"
          @click="() => fetchNextPage()"
        >
          <span v-if="isFetchingNextPage" class="loading loading-spinner loading-sm" />
          {{ isFetchingNextPage ? 'Loading...' : 'Load More Systems' }}
        </button>
      </div>

      <div v-else class="mt-6 text-center text-base-content/60">All systems loaded</div>
    </template>

    <template v-if="isLoading">
      <div class="flex items-center gap-2">
        <span class="loading loading-spinner loading-md"></span>
        <span>Loading systems...</span>
      </div>
    </template>

    <template v-if="error">
      <span class="alert alert-error">Error: {{ error.error.message }}</span>
    </template>
  </div>
</template>
