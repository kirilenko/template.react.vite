import type { AppRouteObject } from '@/libs/router'
import type { AuthState } from '@/services/auth'

import { AdminPage } from './admin.page'

export const adminRouter: AppRouteObject = {
  access: (auth) => {
    const { isAuthenticated, role } = auth as AuthState
    if (!isAuthenticated) return false
    return role === 'admin' || '/'
  },
  element: <AdminPage />,
  path: 'admin',
}
