import { createBrowserRouter } from 'react-router'
import type { RouteObject } from 'react-router'

import { RouteGuard } from './route-guard'
import type { AppRouteObject } from './types'

function applyGuards(routes: AppRouteObject[]): RouteObject[] {
  return routes.map(({ access = 'public', children, ...route }) => {
    const processedChildren = children ? applyGuards(children) : undefined
    const base = (
      processedChildren ? { ...route, children: processedChildren } : route
    ) as RouteObject

    if (access === 'public') return base

    return {
      children: [base],
      element: <RouteGuard access={access} />,
    }
  })
}

export function createAppRouter(routes: AppRouteObject[]) {
  return createBrowserRouter(applyGuards(routes))
}
