import type { JSX } from 'react'

interface NewsCardProps {
  date: string
  title: string
}

export function NewsCard({ date, title }: NewsCardProps): JSX.Element {
  return (
    <li className="bg-white border border-gray-200 rounded-lg px-4 py-3 flex justify-between items-center">
      <span className="text-gray-900">{title}</span>
      <span className="text-sm text-gray-400">{date}</span>
    </li>
  )
}
