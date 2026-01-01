<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

import { useTokenStore } from '../composables/useTokenStore'

const router = useRouter()
const tokenStore = useTokenStore()
const rememberSession = computed({
  get: () => tokenStore.isTokenPersisted,
  set: (value) => tokenStore.setTokenPersistence(value),
})

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
  <div :class="$style.container">
    <h1 :class="$style.heading">Welcome to Corridor 5</h1>
    <p :class="$style.description">Enter your agent token to continue</p>

    <form aria-label="Login form" @submit.prevent="onSubmit">
      <div :class="$style.field">
        <label :class="$style.label" for="token">Agent Token:</label>
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
          :class="$style.input"
        />
      </div>

      <div v-if="error" id="token-error" :class="$style.error" role="alert">
        {{ error }}
      </div>

      <div :class="$style.rememberSessionGroup">
        <label :class="$style.checkboxLabel">
          <input
            id="remember-session"
            v-model="rememberSession"
            type="checkbox"
            name="remember-session"
            :class="$style.checkboxInput"
          />
          <span>Remember me in this browser tab</span>
        </label>
        <p v-if="rememberSession" role="alert">
          Your token will be stored in session storage. Only enable this on trusted devices.
        </p>
      </div>

      <button type="submit" :class="$style.button">Continue</button>
    </form>
  </div>
</template>

<style module>
.container {
  max-width: 500px;
  margin: 50px auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
}

.heading {
  margin-bottom: 10px;
}

.description {
  color: #666;
  margin-bottom: 30px;
}

.field {
  margin-bottom: 20px;
}

.label {
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
}

.input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  box-sizing: border-box;
  resize: none;
}

.input:focus {
  outline: none;
  border-color: #4caf50;
}

.error {
  color: red;
  margin-bottom: 0;
  font-size: 14px;
}

.button {
  width: 100%;
  padding: 12px;
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

.rememberSessionGroup {
  margin-bottom: 20px;
}

.checkboxLabel {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  font-weight: normal;
  margin-bottom: 8px;
}

.checkboxInput {
  width: 18px;
  height: 18px;
  cursor: pointer;
  margin: 0;
}

.checkboxLabel span {
  user-select: none;
}
</style>
