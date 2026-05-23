import type { JSX } from 'react'
import { useParams } from '@tanstack/react-router'

import { useNewsDetailReading } from '@/services/news'

export function NewsDetail(): JSX.Element {
  const { id } = useParams({ from: '/news/$id' })
  const { detail, isLoading } = useNewsDetailReading(Number(id))

  if (isLoading) return <p className="text-gray-400">Loading...</p>
  if (!detail) return <p className="text-gray-400">News not found.</p>

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-gray-900">{detail.title}</h2>
      <div className="text-sm text-gray-400">
        {detail.author} · {detail.date}
      </div>
      <p className="text-gray-700">{detail.content}</p>
    </div>
  )
}
