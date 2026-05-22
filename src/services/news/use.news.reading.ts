import { useEffect, useState } from 'react'

import { rest } from '@/libs/rest'

import type { NewsItem } from './news.schema'

export function useNewsReading(): { isLoading: boolean; items: NewsItem[] } {
  const [items, setItems] = useState<NewsItem[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    rest
      .get<NewsItem[]>('/news')
      .then(setItems)
      .catch(() => setItems([]))
      .finally(() => setIsLoading(false))
  }, [])

  return { isLoading, items }
}
