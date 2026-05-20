import type { JSX } from 'react'
import { useRouteError } from 'react-router'

export function ErrorPage(): JSX.Element {
  const error = useRouteError()

  return <p>{error instanceof Error ? error.message : 'Something went wrong.'}</p>
}
