import type { JSX } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router'

import { Home } from '../modules/home'
import { News } from '../modules/news'
import { Profile } from '../modules/profile'
import { Layout } from './layout'

const router = createBrowserRouter([
  {
    children: [
      { element: <Home />, index: true },
      { element: <News />, path: 'news' },
      { element: <Profile />, path: 'profile' },
    ],
    element: <Layout />,
    path: '/',
  },
])

export function App(): JSX.Element {
  return <RouterProvider router={router} />
}
