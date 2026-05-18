import type { RouteObject } from 'react-router'

import { Profile } from './profile.page'

export const profileRouter: RouteObject = {
  element: <Profile />,
  path: 'profile',
}
