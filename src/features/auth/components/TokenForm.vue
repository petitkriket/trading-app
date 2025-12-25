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
  <div class="token-form">
    <h1>Welcome to Corridor 5</h1>
    <p>Enter your agent token to continue</p>

    <form @submit.prevent="onSubmit" aria-label="Login form">
      <div class="form-group">
        <label for="token">Agent Token:</label>
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
        />
      </div>

      <div v-if="error" id="token-error" class="error" role="alert">{{ error }}</div>

      <button type="submit">Continue</button>
    </form>
  </div>
</template>

<style scoped>
.token-form {
  max-width: 500px;
  margin: 50px auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
}

h1 {
  margin-bottom: 10px;
}

p {
  color: #666;
  margin-bottom: 30px;
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
}

#token {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  box-sizing: border-box;
  resize: none;
}

#token:focus {
  outline: none;
  border-color: #4caf50;
}

.error {
  color: red;
  margin-bottom: 0;
  font-size: 14px;
}

button[type='submit'] {
  width: 100%;
  padding: 12px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
}

button[type='submit']:hover {
  background-color: #45a049;
}
</style>
