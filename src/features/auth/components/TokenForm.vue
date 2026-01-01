<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

import { useTokenStore } from '../composables/useTokenStore'

const router = useRouter()
const tokenStore = useTokenStore()

const tokenInput = ref('')
const error = ref('')

const onSubmit = () => {
  if (!tokenInput.value.trim()) {
    error.value = 'Please enter a token'
    return
  }

  tokenStore.setToken(tokenInput.value.trim())
  router.push('/dashboard/agent')
}
</script>

<template>
  <div class="card bg-base-100 w-full max-w-lg shadow-xl mx-auto my-12">
    <div class="card-body">
      <h1 class="card-title text-2xl mb-2">Welcome to Corridor 5</h1>
      <p class="text-base-content/70 mb-6">Enter your agent token to continue</p>

      <form aria-label="Login form" @submit.prevent="onSubmit">
        <div class="form-control mb-4">
          <label class="label" for="token">
            <span class="label-text font-bold mb-2">Agent Token:</span>
          </label>
          <textarea
            id="token"
            v-model="tokenInput"
            name="token"
            rows="12"
            autofocus
            placeholder="Paste your agent token here"
            aria-label="Agent Token"
            autocomplete="off"
            :aria-invalid="!!error"
            aria-describedby="token-error"
            class="textarea textarea-bordered w-full resize-none"
          />
        </div>

        <div v-if="error" id="token-error" role="alert" class="alert alert-error mb-4">
          <span>{{ error }}</span>
        </div>

        <button type="submit" class="btn btn-primary w-full">Continue</button>
      </form>
    </div>
  </div>
</template>
