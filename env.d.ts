/// <reference types="vite/client" />
/// <reference types="unplugin-vue-router/client" />
import type { LayoutName } from '@/layouts'

declare module 'vue-router' {
  interface RouteMeta {
    requiresAuth?: boolean
    layout?: LayoutName
  }
}
