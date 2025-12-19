import type { RouteNamedMap } from 'vue-router/auto-routes'

type MenuItem = {
  to: keyof RouteNamedMap
  label: string
}

export function useDashboardMenu() {
  const menuItems: MenuItem[] = [
    { to: '/dashboard/agent', label: 'Agent' },
    { to: '/dashboard/systems', label: 'Systems' },
  ]

  return { menuItems }
}
