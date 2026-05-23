import type { ComponentType } from 'react'
import {
  createRootRouteWithContext,
  createRoute,
  createRouter,
  lazyRouteComponent,
  redirect,
} from '@tanstack/react-router'

import { paths } from '@/config'
import { SubHeader } from '@/app/layout/sub-header'
import { ErrorPage } from '@/modules/error/error.page'
import { NotFoundPage } from '@/modules/error/not-found.page'
import { Home } from '@/modules/home/home.page'
import { LoginPage } from '@/modules/auth/login.page'
import { LogoutPage } from '@/modules/auth/logout.page'
import { News } from '@/modules/news/news.page'
import { NewsDetailSubHeader } from '@/modules/news-detail/news-detail-sub-header'
import type { RouterContext } from '@/libs/router'

import { Layout } from './layout'

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
  interface StaticDataRouteOption {
    SubHeader?: ComponentType
  }
}

const NewsDetail = lazyRouteComponent(() =>
  import('@/modules/news-detail/news-detail.page').then((m) => ({ default: m.NewsDetail }))
)

const AdminPage = lazyRouteComponent(() =>
  import('@/modules/admin/admin.page').then((m) => ({ default: m.AdminPage }))
)

const Profile = lazyRouteComponent(() =>
  import('@/modules/profile/profile.page').then((m) => ({ default: m.Profile }))
)

const rootRoute = createRootRouteWithContext<RouterContext>()({
  errorComponent: ({ error }) => <ErrorPage error={error} />,
  notFoundComponent: NotFoundPage,
})

const layoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: '_layout',
  component: Layout,
})

const privateRoute = createRoute({
  getParentRoute: () => layoutRoute,
  id: '_private',
  beforeLoad: ({ context }) => {
    if (!context.auth.isAuthenticated) throw redirect({ to: paths.login })
  },
})

const publicOnlyRoute = createRoute({
  getParentRoute: () => layoutRoute,
  id: '_public-only',
  beforeLoad: ({ context }) => {
    if (context.auth.isAuthenticated) throw redirect({ to: paths.home })
  },
})

const homeRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: '/',
  component: Home,
})

const newsRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: 'news',
  component: News,
  staticData: { SubHeader },
})

const newsDetailRoute = createRoute({
  getParentRoute: () => newsRoute,
  path: '$id',
  component: NewsDetail,
  staticData: { SubHeader: NewsDetailSubHeader },
})

const loginRoute = createRoute({
  getParentRoute: () => publicOnlyRoute,
  path: 'login',
  component: LoginPage,
})

const logoutRoute = createRoute({
  getParentRoute: () => privateRoute,
  path: 'logout',
  component: LogoutPage,
})

const profileRoute = createRoute({
  getParentRoute: () => privateRoute,
  path: 'profile',
  component: Profile,
  beforeLoad: ({ context }) => {
    if (context.auth.role !== 'user') throw redirect({ to: paths.home })
  },
})

const adminRoute = createRoute({
  getParentRoute: () => privateRoute,
  path: 'admin',
  component: AdminPage,
  beforeLoad: ({ context }) => {
    if (context.auth.role !== 'admin') throw redirect({ to: paths.home })
  },
})

const routeTree = rootRoute.addChildren([
  layoutRoute.addChildren([
    homeRoute,
    newsRoute.addChildren([newsDetailRoute]),
    publicOnlyRoute.addChildren([loginRoute]),
    privateRoute.addChildren([logoutRoute, profileRoute, adminRoute]),
  ]),
])

export const router = createRouter({
  routeTree,
  context: {
    auth: { isAuthenticated: false, role: null },
  },
})
