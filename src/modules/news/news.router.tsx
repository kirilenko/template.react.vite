import { paths } from '@/config'
import type { AppRouteObject } from '@/libs/router'
import { newsDetailRouter, newsPlaceholderRouter } from '@/modules/news-detail'

import { News } from './news.page'

export const newsRouter: AppRouteObject = {
  children: [newsPlaceholderRouter, newsDetailRouter],
  element: <News />,
  handle: { hasSubHeader: true },
  path: paths.news.slice(1),
}
