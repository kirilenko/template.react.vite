import { createContext, useContext } from 'react'

import type { RouterConfig } from './types'

export type ResolvedRouterConfig = Required<RouterConfig>

export const RouterConfigContext = createContext<ResolvedRouterConfig>({
  loginPath: '/login',
  logoutPath: '/logout',
  redirectAfterLogin: '/',
  redirectAfterLogout: '/login',
  useAuth: () => ({ isAuthenticated: false }),
})

export function useRouterConfig(): ResolvedRouterConfig {
  return useContext(RouterConfigContext)
}
