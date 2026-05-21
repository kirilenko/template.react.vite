import type { JSX } from 'react'

import { env } from '@/config'

export function Home(): JSX.Element {
  return (
    <div className="max-w-5xl mx-auto px-4 text-center py-20">
      <h1 className="text-4xl font-bold text-gray-900">React + Vite</h1>
      <p className="mt-3 text-gray-500">TypeScript · Tailwind CSS · React Router · Vitest</p>
      <p className="mt-6 text-sm text-gray-400">
        VITE_SOMETHING_VAR:{' '}
        <span className="font-mono text-gray-700">{String(env.VITE_SOMETHING_VAR)}</span>
      </p>
    </div>
  )
}
