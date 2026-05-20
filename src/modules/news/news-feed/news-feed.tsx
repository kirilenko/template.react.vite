import type { JSX } from 'react'

import { useNewsReading } from '@/services/news'

import { NewsCard } from './news-card'

interface NewsFeedProps {
  filter: string
  search: string
}

export function NewsFeed({ search, filter }: NewsFeedProps): JSX.Element {
  const { items } = useNewsReading()

  const filtered = items.filter(
    (item) =>
      (filter === 'All' || item.title.toLowerCase().includes(filter.toLowerCase())) &&
      item.title.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <ul className="space-y-3">
      {filtered.map((item) => (
        <NewsCard key={item.id} id={item.id} title={item.title} date={item.date} />
      ))}
    </ul>
  )
}
