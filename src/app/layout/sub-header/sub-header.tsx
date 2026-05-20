import type { JSX } from 'react'

export function SubHeader(): JSX.Element {
  return (
    <div className="bg-white border-b border-gray-200">
      <div className="max-w-5xl mx-auto px-4 h-10 flex items-center">
        <span className="text-sm text-gray-500">Subheader</span>
      </div>
    </div>
  )
}
