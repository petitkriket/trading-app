import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import VueRouter from 'unplugin-vue-router/vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  base: process.env.VITE_BASE_PATH || '/',
  plugins: [
    tailwindcss(),
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
