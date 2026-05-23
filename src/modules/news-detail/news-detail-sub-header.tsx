import type { JSX } from 'react'
import { useRouterState } from '@tanstack/react-router'

import { useNewsDetailReading } from '@/services/news'

export function NewsDetailSubHeader(): JSX.Element {
  const id = useRouterState({
    select: (s) => s.matches.findLast((m) => 'id' in m.params)?.params.id as string | undefined,
  })
  const { detail } = useNewsDetailReading(Number(id))

  return (
    <div className="bg-white border-b border-gray-200">
      <div className="px-4 h-10 flex items-center">
        {detail && (
          <a className="text-sm text-gray-500 hover:text-gray-900" href="#">
            Все новости от {detail.author}
          </a>
        )}
      </div>
    </div>
  )
}
