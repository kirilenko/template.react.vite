import type { JSX } from 'react'

export function Profile(): JSX.Element {
  return (
    <div className="max-w-sm mx-auto py-12">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Profile</h1>
      <div className="bg-white border border-gray-200 rounded-lg p-6 flex items-center gap-4">
        <div className="w-14 h-14 rounded-full bg-gray-200 flex items-center justify-center text-xl font-semibold text-gray-500">
          U
        </div>
        <div>
          <div className="font-semibold text-gray-900">Username</div>
          <div className="text-sm text-gray-500">user@example.com</div>
        </div>
      </div>
    </div>
  )
}
