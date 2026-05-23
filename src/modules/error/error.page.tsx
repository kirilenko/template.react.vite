import type { JSX } from 'react'

export function ErrorPage({ error }: { error: Error }): JSX.Element {
  return <p>{error instanceof Error ? error.message : 'Something went wrong.'}</p>
}
