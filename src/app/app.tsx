import type { JSX } from 'react'
import { RouterProvider } from 'react-router'

import { ErrorBoundary } from '@/libs/error-boundary'
import { ErrorFallback } from '@/modules/error'
import { AuthProvider } from '@/services/auth'

import { appRouter } from './app.router'

export function App(): JSX.Element {
  return (
    <ErrorBoundary fallback={<ErrorFallback />}>
      <AuthProvider>
        <RouterProvider router={appRouter} />
      </AuthProvider>
    </ErrorBoundary>
  )
}
