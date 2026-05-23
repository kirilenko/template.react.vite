import type { ComponentType } from 'react'
import {
  createRootRouteWithContext,
  createRoute,
  createRouter,
  lazyRouteComponent,
  redirect,
} from '@tanstack/react-router'

import { SubHeader } from '@/app/layout/sub-header'
import { paths } from '@/config'
import type { RouterContext } from '@/libs/router'
import { LoginPage } from '@/modules/auth/login.page'
import { LogoutPage } from '@/modules/auth/logout.page'
import { ErrorPage } from '@/modules/error/error.page'
import { NotFoundPage } from '@/modules/error/not-found.page'
import { Home } from '@/modules/home/home.page'
import { News } from '@/modules/news/news.page'
import { NewsDetailSubHeader } from '@/modules/news-detail/news-detail-sub-header'

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
  component: Layout,
  getParentRoute: () => rootRoute,
  id: '_layout',
})

const privateRoute = createRoute({
  beforeLoad: ({ context, location }) => {
    if (!context.auth.isAuthenticated) {
      const isAuthFlow = location.pathname === paths.logout
      throw redirect({
        search: isAuthFlow ? { redirect: undefined } : { redirect: location.href },
        to: paths.login,
      })
    }
  },
  getParentRoute: () => layoutRoute,
  id: '_private',
})

const publicOnlyRoute = createRoute({
  beforeLoad: ({ context, location }) => {
    if (context.auth.isAuthenticated) {
      const to =
        typeof (location.search as Record<string, unknown>).redirect === 'string'
          ? (location.search as Record<string, string>).redirect
          : paths.home
      throw redirect({ to })
    }
  },
  getParentRoute: () => layoutRoute,
  id: '_public-only',
})

const homeRoute = createRoute({
  component: Home,
  getParentRoute: () => layoutRoute,
  path: '/',
})

const newsRoute = createRoute({
  component: News,
  getParentRoute: () => layoutRoute,
  path: 'news',
  staticData: { SubHeader },
})

const newsDetailRoute = createRoute({
  component: NewsDetail,
  getParentRoute: () => newsRoute,
  path: '$id',
  staticData: { SubHeader: NewsDetailSubHeader },
})

const loginRoute = createRoute({
  component: LoginPage,
  getParentRoute: () => publicOnlyRoute,
  path: 'login',
  validateSearch: (search: Record<string, unknown>) => ({
    redirect: typeof search.redirect === 'string' ? search.redirect : undefined,
  }),
})

const logoutRoute = createRoute({
  component: LogoutPage,
  getParentRoute: () => privateRoute,
  path: 'logout',
})

const profileRoute = createRoute({
  beforeLoad: ({ context }) => {
    if (context.auth.role !== 'user') throw redirect({ to: paths.home })
  },
  component: Profile,
  getParentRoute: () => privateRoute,
  path: 'profile',
})

const adminRoute = createRoute({
  beforeLoad: ({ context }) => {
    if (context.auth.role !== 'admin') throw redirect({ to: paths.home })
  },
  component: AdminPage,
  getParentRoute: () => privateRoute,
  path: 'admin',
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
  context: {
    auth: { isAuthenticated: false, role: null },
  },
  routeTree,
})
