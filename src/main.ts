import { createApp, vaporInteropPlugin } from 'vue'
import { createPinia } from 'pinia'
import { VueQueryPlugin } from '@tanstack/vue-query'

import App from './App.vue'
import router from './core/router'
import queryClient from './core/query-client'

const app = createApp(App)
const pinia = createPinia()

app.use(vaporInteropPlugin)
app.use(pinia)
app.use(VueQueryPlugin, { queryClient })
app.use(router)

app.mount('#app')
