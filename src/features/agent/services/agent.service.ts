import { useQuery } from '@tanstack/vue-query'

import { apiClient, type SpaceTradersError, type SpV2 } from '@/core'

const URI = 'agent'

type AgentResponse = SpV2['/my/agent']['get']['responses']['200']['content']['application/json']
export function useAgentQuery() {
  return useQuery<AgentResponse['data'], SpaceTradersError>({
    queryKey: [URI],
    queryFn: async () => {
      const { data, error } = await apiClient.GET(`/my/${URI}`)
      if (error) throw error
      return data.data
    },
  })
}
