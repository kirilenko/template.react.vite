import type { JSX } from 'react'
import { useState } from 'react'
import { Outlet, useChildMatches } from '@tanstack/react-router'

import { NewsPlaceholder } from '@/modules/news-detail/news-placeholder'

import { NewsFeed } from './news-feed'
import { type NewsFilter, NewsFilters } from './news-filters'
import { NewsSearch } from './news-search'

export function News(): JSX.Element {
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState<NewsFilter>('All')
  const hasDetail = useChildMatches().length > 0

  return (
    <div className="flex gap-8 py-12 px-4 flex-1 w-full">
      <aside className="w-80 flex-none space-y-4">
        <h1 className="text-2xl font-bold text-gray-900">News</h1>
        <NewsSearch value={search} onChange={setSearch} />
        <NewsFilters active={filter} onChange={setFilter} />
        <NewsFeed search={search} filter={filter} />
      </aside>
      <main className="flex-1 bg-gray-100 rounded-lg p-6">
        {hasDetail ? <Outlet /> : <NewsPlaceholder />}
      </main>
    </div>
  )
}
