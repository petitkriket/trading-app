import createClient from 'openapi-fetch'
import { type Middleware } from 'openapi-fetch'

import router from '../router'
import queryClient from '../query-client'
import { useTokenStore } from '@/features/auth'

import type { paths } from './v2'

type ZodIssue = {
  code: string
  maximum?: number
  minimum?: number
  type?: string
  inclusive?: boolean
  exact?: boolean
  message: string
  path: (string | number)[]
}

export type SpaceTradersError = {
  error: {
    code: number
    message: string
    data?: {
      zodIssues?: ZodIssue[]
      originalError?: {
        issues: ZodIssue[]
        name: string
      }
    }
    requestId?: string
  }
}

export type { paths as SpV2 }

const authMiddleware: Middleware = {
  async onRequest({ request }) {
    const token = useTokenStore().token
    if (token) request.headers.set('Authorization', `Bearer ${token}`)

    return request
  },
  async onResponse({ response }) {
    if (response.status === 401) {
      const tokenStore = useTokenStore()
      tokenStore.clearToken()
      queryClient.clear()
      router.push('/')
      throw new Error('Unauthorized')
    }
    return response
  },
}

const client = createClient<paths>({ baseUrl: 'https://api.spacetraders.io/v2/' })

client.use(authMiddleware)

export default client
