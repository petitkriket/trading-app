import { QueryClient } from '@tanstack/vue-query'

const FIVE_MINUTES_MS = 60000 * 5
const TEN_MINUTES_MS = 60000 * 10

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: FIVE_MINUTES_MS,
      gcTime: TEN_MINUTES_MS,
    },
  },
})

export default queryClient
