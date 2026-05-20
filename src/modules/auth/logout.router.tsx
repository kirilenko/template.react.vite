import { paths } from '@/app/paths'
import type { AppRouteObject } from '@/libs/router'

import { LogoutPage } from './logout.page'

export const logoutRouter: AppRouteObject = {
  access: 'private',
  element: <LogoutPage />,
  path: paths.logout.slice(1),
}
