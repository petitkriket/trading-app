import type { Component } from 'vue'

import DashboardLayout from './DashboardLayout.vue'
import FullPageLayout from './FullPageLayout.vue'

// Émuler le fonctionnement de vite-plugin-vue-layouts peu maintenu
// Et bénéficier d'un système de layout typé..
// https://github.com/JohnCampionJr/vite-plugin-vue-layouts/issues/158

export type LayoutName = 'dashboard' | 'full-page'

const LAYOUTS: Record<LayoutName, Component> = {
  dashboard: DashboardLayout,
  'full-page': FullPageLayout,
}

export function getLayout(name: LayoutName | undefined): Component | null {
  if (!name) return FullPageLayout
  return LAYOUTS[name] ?? FullPageLayout
}
