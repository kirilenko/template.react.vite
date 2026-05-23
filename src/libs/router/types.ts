import type { ComponentType } from 'react'

import type { AuthState } from '@/services/auth'

export interface RouterContext {
  auth: AuthState
}

export interface RouteStaticData {
  SubHeader?: ComponentType
}
