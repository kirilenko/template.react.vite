import { paths } from '@/config'
import type { AppRouteObject } from '@/libs/router'

import { LoginPage } from './login.page'

export const loginRouter: AppRouteObject = {
  access: 'public-only',
  element: <LoginPage />,
  path: paths.login.slice(1),
}
