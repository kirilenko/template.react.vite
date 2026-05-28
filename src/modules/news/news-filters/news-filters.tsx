import type { JSX } from 'react'
import { useRenderLog } from 'react-render-log'

export const FILTERS = ['All', 'Tech', 'Design', 'Business'] as const

export type NewsFilter = (typeof FILTERS)[number]

interface NewsFiltersProps {
  active: NewsFilter
  onChange: (filter: NewsFilter) => void
}

export function NewsFilters({ active, onChange }: NewsFiltersProps): JSX.Element {
  useRenderLog()('NewsFilters')()
  return (
    <div className="flex gap-2">
      {FILTERS.map((filter) => (
        <button
          key={filter}
          onClick={() => onChange(filter)}
          className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
            active === filter
              ? 'bg-gray-900 text-white'
              : 'bg-white border border-gray-200 text-gray-600 hover:border-gray-400'
          }`}
        >
          {filter}
        </button>
      ))}
    </div>
  )
}
