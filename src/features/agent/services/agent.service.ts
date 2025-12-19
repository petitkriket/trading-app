import { useQuery } from '@tanstack/vue-query'

import { apiClient } from '@/core'

const URI = 'agent'

export function useAgentQuery() {
  return useQuery({
    queryKey: [URI],
    queryFn: async () => {
      const { data, error } = await apiClient.GET(`/my/${URI}`)
      if (error) throw error
      return data.data
    },
  })
}
