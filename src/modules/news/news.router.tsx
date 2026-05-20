import { paths } from '@/config'
import type { AppRouteObject } from '@/libs/router'

import { News } from './news.page'

export const newsRouter: AppRouteObject = {
  element: <News />,
  path: paths.news.slice(1),
}
