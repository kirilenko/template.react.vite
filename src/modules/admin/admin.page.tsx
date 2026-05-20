import type { JSX } from 'react'

export function AdminPage(): JSX.Element {
  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Admin</h1>
      <p className="text-xs text-indigo-500 font-medium mb-2">Lazy loaded · Suspense via router</p>
      <p className="text-gray-500 text-sm">Only admins can see this page.</p>
    </div>
  )
}
