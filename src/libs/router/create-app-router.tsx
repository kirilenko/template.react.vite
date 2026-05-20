import { Suspense } from 'react'
import type { RouteObject } from 'react-router'
import { createBrowserRouter, Outlet } from 'react-router'

import { RouteGuard } from './route-guard'
import { RouterConfigContext } from './router-config.context'
import type { AppRouteObject, RouterConfig } from './types'

function applyGuards(routes: AppRouteObject[]): RouteObject[] {
  return routes.map(({ access = 'public', children, withSuspense, ...route }) => {
    const processedChildren = children ? applyGuards(children) : undefined

    const element =
      withSuspense && route.element ? (
        <Suspense fallback={null}>{route.element}</Suspense>
      ) : (
        route.element
      )

    const base = (
      processedChildren ? { ...route, children: processedChildren, element } : { ...route, element }
    ) as RouteObject

    if (access === 'public') return base

    return {
      children: [base],
      element: <RouteGuard access={access} />,
    }
  })
}

export function createAppRouter(routes: AppRouteObject[], config: RouterConfig = {}) {
  const resolved = {
    loginPath: config.loginPath ?? '/login',
    logoutPath: config.logoutPath ?? '/logout',
    redirectAfterLogin: config.redirectAfterLogin ?? '/',
    redirectAfterLogout: config.redirectAfterLogout ?? config.loginPath ?? '/login',
    useAuth: config.useAuth ?? (() => ({ isAuthenticated: false })),
  }

  return createBrowserRouter([
    {
      children: applyGuards(routes),
      element: (
        <RouterConfigContext.Provider value={resolved}>
          <Outlet />
        </RouterConfigContext.Provider>
      ),
    },
  ])
}
