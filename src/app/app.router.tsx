import { createBrowserRouter } from 'react-router'

import { homeRouter } from '@/modules/home'
import { newsRouter } from '@/modules/news'
import { profileRouter } from '@/modules/profile'

import { Layout } from './layout'

export const appRouter = createBrowserRouter([
  {
    children: [homeRouter, newsRouter, profileRouter],
    element: <Layout />,
    path: '/',
  },
])
