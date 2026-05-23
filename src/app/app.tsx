import type { JSX } from 'react'
import { useEffect } from 'react'
import { RouterProvider } from '@tanstack/react-router'

import { ErrorBoundary } from '@/libs/error-boundary'
import { ErrorFallback } from '@/modules/error'
import { AuthProvider, useAuthReading } from '@/services/auth'

import { router } from './app.router'

function AppRouter(): JSX.Element {
  const auth = useAuthReading()

  useEffect(() => {
    router.invalidate()
  }, [auth.isAuthenticated])

  return <RouterProvider router={router} context={{ auth }} />
}

export function App(): JSX.Element {
  return (
    <ErrorBoundary fallback={<ErrorFallback />}>
      <AuthProvider>
        <AppRouter />
      </AuthProvider>
    </ErrorBoundary>
  )
}
