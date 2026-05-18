import type { JSX } from 'react'
import { RouterProvider } from 'react-router'

import { AuthProvider } from '@/services/auth'

import { appRouter } from './app.router'

export function App(): JSX.Element {
  return (
    <AuthProvider>
      <RouterProvider router={appRouter} />
    </AuthProvider>
  )
}
