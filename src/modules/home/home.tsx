import type { JSX } from 'react'

export function Home(): JSX.Element {
  return (
    <div className="text-center py-20">
      <h1 className="text-4xl font-bold text-gray-900">React + Vite</h1>
      <p className="mt-3 text-gray-500">TypeScript · Tailwind CSS · React Router · Vitest</p>
    </div>
  )
}
