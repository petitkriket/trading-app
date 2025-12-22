import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import VueRouter from 'unplugin-vue-router/vite'

// https://vite.dev/config/
export default defineConfig({
  base: process.env.VITE_BASE_PATH || '/',
  plugins: [
    VueRouter({
      routesFolder: [{ src: 'src/features/auth/pages' }, { src: 'src/features/dashboard/pages' }],
      dts: 'src/typed-router.d.ts',
      extensions: ['.vue'],
    }),
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
