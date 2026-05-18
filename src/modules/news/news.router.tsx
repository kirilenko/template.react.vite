import type { RouteObject } from 'react-router'

import { News } from './news.page'

export const newsRouter: RouteObject = {
  element: <News />,
  path: 'news',
}
