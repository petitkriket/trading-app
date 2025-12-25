import { useInfiniteQuery, type InfiniteData } from '@tanstack/vue-query'
import type { QueryKey } from '@tanstack/vue-query'
import { apiClient, type SpaceTradersError, type SpV2 } from '@/core'

type SystemsResponse = SpV2['/systems']['get']['responses']['200']['content']['application/json']

const URI = 'systems'

export function useInfiniteSystemsQuery() {
  return useInfiniteQuery<
    SystemsResponse,
    SpaceTradersError,
    InfiniteData<SystemsResponse>,
    QueryKey,
    number
  >({
    queryKey: [URI, 'infinite'],
    queryFn: async ({ pageParam }) => {
      const { data, error } = await apiClient.GET(`/${URI}`, {
        params: {
          query: {
            page: pageParam,
            limit: 10,
          },
        },
      })
      if (error) throw error
      return data
    },
    getNextPageParam: (lastPage) => {
      const { page, limit: pageLimit, total } = lastPage.meta
      const hasMore = page * pageLimit < total
      return hasMore ? page + 1 : undefined
    },
    initialPageParam: 1,
  })
}
