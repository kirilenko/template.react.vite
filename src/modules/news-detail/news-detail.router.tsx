import { lazy } from 'react'

import type { AppRouteObject } from '@/libs/router'

import { NewsDetailSubHeader } from './news-detail-sub-header'
import { NewsPlaceholder } from './news-placeholder'

const NewsDetail = lazy(() => import('./news-detail.page').then((m) => ({ default: m.NewsDetail })))

export const newsDetailRouter: AppRouteObject = {
  element: <NewsDetail />,
  handle: { SubHeader: NewsDetailSubHeader },
  path: ':id',
  withSuspense: true,
}

export const newsPlaceholderRouter: AppRouteObject = {
  element: <NewsPlaceholder />,
  index: true,
}
