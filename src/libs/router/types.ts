import type { ComponentType } from 'react'
import type { RouteObject } from 'react-router'

export type RouteAccess =
  | 'public'
  | 'private'
  | 'public-only'
  | ((auth: unknown) => boolean | string)

export interface RouteHandle {
  SubHeader?: ComponentType
}

export interface AppRouteObject extends Omit<RouteObject, 'children' | 'handle'> {
  access?: RouteAccess
  children?: AppRouteObject[]
  handle?: RouteHandle
  withSuspense?: boolean
}

export interface RouterConfig {
  loginPath?: string
  logoutPath?: string
  redirectAfterLogin?: string
  redirectAfterLogout?: string
  useAuth?: () => { isAuthenticated: boolean }
}
