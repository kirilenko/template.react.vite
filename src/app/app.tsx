import type { JSX } from 'react'
import { RouterProvider } from 'react-router'

import { appRouter } from './app.router'

export function App(): JSX.Element {
  return <RouterProvider router={appRouter} />
}
