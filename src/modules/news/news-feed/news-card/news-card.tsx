import type { JSX } from 'react'
import type { PropsWithRenderLog } from 'react-render-log'
import { withRenderLog } from 'react-render-log'
import { Link } from '@tanstack/react-router'

import { paths } from '@/config'

type NewsCardProps = PropsWithRenderLog<{
  date: string
  id: number
  title: string
}>

function NewsCardBase({ date, id, title }: NewsCardProps): JSX.Element {
  return (
    <li>
      <Link
        to={paths.newsDetail}
        params={{ id: String(id) }}
        activeProps={{ className: 'bg-gray-200' }}
        inactiveProps={{ className: 'bg-white hover:bg-gray-50' }}
        className="border border-gray-200 rounded-lg px-4 py-3 flex justify-between items-center"
      >
        <span className="text-gray-900">{title}</span>
        <span className="text-sm text-gray-400">{date}</span>
      </Link>
    </li>
  )
}

export const NewsCard = withRenderLog(NewsCardBase)
