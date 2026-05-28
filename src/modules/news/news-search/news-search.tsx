import type { JSX } from 'react'
import { useRenderLog } from 'react-render-log'

interface NewsSearchProps {
  onChange: (value: string) => void
  value: string
}

export function NewsSearch({ value, onChange }: NewsSearchProps): JSX.Element {
  useRenderLog()('NewsSearch')()
  return (
    <input
      type="search"
      placeholder="Search news..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300"
    />
  )
}
