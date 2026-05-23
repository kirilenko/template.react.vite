import type { JSX } from 'react'
import { useEffect } from 'react'

import { useAuthWriting } from '@/services/auth'

export function LogoutPage(): JSX.Element {
  const { logout } = useAuthWriting()

  useEffect(() => {
    logout()
  }, [logout])

  return <></>
}
