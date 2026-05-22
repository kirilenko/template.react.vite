import { useEffect, useState } from 'react'

import { rest } from '@/libs/rest'

import type { NewsDetail } from './news.schema'

export function useNewsDetailReading(id: number): {
  detail: NewsDetail | null
  isLoading: boolean
} {
  const [detail, setDetail] = useState<NewsDetail | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    rest
      .get<NewsDetail>(`/news/${id}`)
      .then(setDetail)
      .catch(() => setDetail(null))
      .finally(() => setIsLoading(false))
  }, [id])

  return { detail, isLoading }
}
