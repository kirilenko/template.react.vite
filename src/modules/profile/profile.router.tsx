import { lazy, Suspense } from 'react'

import { paths } from '@/app/paths'
import type { AppRouteObject } from '@/libs/router'
import type { AuthState } from '@/services/auth'

const Profile = lazy(() => import('./profile.page').then((m) => ({ default: m.Profile })))

export const profileRouter: AppRouteObject = {
  access: (auth) => {
    const { isAuthenticated, role } = auth as AuthState
    if (!isAuthenticated) return false
    return role === 'user' || '/'
  },
  element: (
    <Suspense fallback={null}>
      <Profile />
    </Suspense>
  ),
  path: paths.profile.slice(1),
}
