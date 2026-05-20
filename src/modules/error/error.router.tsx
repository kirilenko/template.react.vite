import { lazy } from 'react'

import type { AppRouteObject } from '@/libs/router'

import { ErrorPage } from './error.page'

const NotFoundPage = lazy(() =>
  import('./not-found.page').then((m) => ({ default: m.NotFoundPage }))
)

export const notFoundRouter: AppRouteObject = {
  element: <NotFoundPage />,
  path: '*',
  withSuspense: true,
}

export const errorElement = <ErrorPage />
