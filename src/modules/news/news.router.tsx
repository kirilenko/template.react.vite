import { paths } from '@/config'
import type { AppRouteObject } from '@/libs/router'
import { newsDetailRouter } from '@/modules/news-detail'

import { News } from './news.page'

export const newsRouter: AppRouteObject = {
  children: [newsDetailRouter],
  element: <News />,
  path: paths.news.slice(1),
}
