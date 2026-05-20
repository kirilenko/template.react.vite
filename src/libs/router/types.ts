import type { RouteObject } from 'react-router'

export type RouteAccess =
  | 'public'
  | 'private'
  | 'public-only'
  | ((auth: unknown) => boolean | string)

export interface AppRouteObject extends Omit<RouteObject, 'children'> {
  access?: RouteAccess
  children?: AppRouteObject[]
  suspense?: boolean
}

export interface RouterConfig {
  loginPath?: string
  logoutPath?: string
  redirectAfterLogin?: string
  redirectAfterLogout?: string
  useAuth?: () => { isAuthenticated: boolean }
}
