import { lazy } from 'react'

import type { AppRouteObject } from '@/libs/router'

import { NewsPlaceholder } from './news-placeholder'

const NewsDetail = lazy(() => import('./news-detail.page').then((m) => ({ default: m.NewsDetail })))

export const newsDetailRouter: AppRouteObject = {
  element: <NewsDetail />,
  path: ':id',
  withSuspense: true,
}

export const newsPlaceholderRouter: AppRouteObject = {
  element: <NewsPlaceholder />,
  index: true,
}
