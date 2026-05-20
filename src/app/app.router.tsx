import { paths } from '@/config'
import { createAppRouter } from '@/libs/router'
import { adminRouter } from '@/modules/admin'
import { loginRouter, logoutRouter } from '@/modules/auth'
import { errorElement, notFoundRouter } from '@/modules/error'
import { homeRouter } from '@/modules/home'
import { newsRouter } from '@/modules/news'
import { profileRouter } from '@/modules/profile'
import { useAuthReading } from '@/services/auth'

import { Layout } from './layout'

export const appRouter = createAppRouter(
  [
    {
      children: [
        homeRouter,
        newsRouter,
        profileRouter,
        adminRouter,
        loginRouter,
        logoutRouter,
        notFoundRouter,
      ],
      element: <Layout />,
      errorElement,
      path: '/',
    },
  ],
  { loginPath: paths.login, logoutPath: paths.logout, useAuth: useAuthReading }
)
