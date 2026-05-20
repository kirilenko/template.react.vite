import type { JSX } from 'react'
import { NavLink } from 'react-router'

import { paths } from '@/config'

interface NewsCardProps {
  date: string
  id: number
  title: string
}

export function NewsCard({ date, id, title }: NewsCardProps): JSX.Element {
  return (
    <li>
      <NavLink
        className={({ isActive }) =>
          `border border-gray-200 rounded-lg px-4 py-3 flex justify-between items-center ${isActive ? 'bg-gray-200' : 'bg-white hover:bg-gray-50'}`
        }
        to={paths.newsDetail.replace(':id', String(id))}
      >
        <span className="text-gray-900">{title}</span>
        <span className="text-sm text-gray-400">{date}</span>
      </NavLink>
    </li>
  )
}
