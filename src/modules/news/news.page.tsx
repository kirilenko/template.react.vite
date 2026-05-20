import type { JSX } from 'react'
import { useState } from 'react'
import { Outlet } from 'react-router'

import { NewsFeed } from './news-feed'
import { type NewsFilter, NewsFilters } from './news-filters'
import { NewsSearch } from './news-search'

export function News(): JSX.Element {
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState<NewsFilter>('All')

  return (
    <div className="max-w-xl mx-auto py-12 space-y-4">
      <h1 className="text-2xl font-bold text-gray-900">News</h1>
      <NewsSearch value={search} onChange={setSearch} />
      <NewsFilters active={filter} onChange={setFilter} />
      <NewsFeed search={search} filter={filter} />
      <Outlet />
    </div>
  )
}
