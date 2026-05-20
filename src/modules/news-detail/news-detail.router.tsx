import { lazy } from 'react'

import type { AppRouteObject } from '@/libs/router'

const NewsDetail = lazy(() => import('./news-detail.page').then((m) => ({ default: m.NewsDetail })))

export const newsDetailRouter: AppRouteObject = {
  element: <NewsDetail />,
  path: ':id',
  withSuspense: true,
}
