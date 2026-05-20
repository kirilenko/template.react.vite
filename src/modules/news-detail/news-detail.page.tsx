import type { JSX } from 'react'
import { useParams } from 'react-router'

export function NewsDetail(): JSX.Element {
  const { id } = useParams()

  return (
    <div className="mt-8 p-4 border rounded">
      <h2 className="text-xl font-bold">News #{id}</h2>
    </div>
  )
}
