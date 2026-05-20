import { lazy } from 'react'

import type { AppRouteObject } from '@/libs/router'
import type { AuthState } from '@/services/auth'

const AdminPage = lazy(() => import('./admin.page').then((m) => ({ default: m.AdminPage })))

export const adminRouter: AppRouteObject = {
  access: (auth) => {
    const { isAuthenticated, role } = auth as AuthState
    if (!isAuthenticated) return false
    return role === 'admin' || '/'
  },
  element: <AdminPage />,
  lazy: true,
  path: 'admin',
}
