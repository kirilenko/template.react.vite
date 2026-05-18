import type { JSX } from 'react'
import { Navigate, Outlet } from 'react-router'

import { useRouterConfig } from './router-config.context'
import type { RouteAccess } from './types'

export function RouteGuard({ access }: { access: RouteAccess }): JSX.Element {
  const { useAuth, loginPath, redirectAfterLogin } = useRouterConfig()
  const auth = useAuth()

  if (typeof access === 'function') {
    const result = access(auth)
    if (result === true) return <Outlet />
    return <Navigate to={typeof result === 'string' ? result : loginPath} replace />
  }

  if (access === 'private' && !auth.isAuthenticated) {
    return <Navigate to={loginPath} replace />
  }

  if (access === 'public-only' && auth.isAuthenticated) {
    return <Navigate to={redirectAfterLogin} replace />
  }

  return <Outlet />
}
