import type { JSX } from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router'

import { useRouterConfig } from '@/libs/router'
import { useAuthWriting } from '@/services/auth'

export function LogoutPage(): JSX.Element {
  const { logout } = useAuthWriting()
  const navigate = useNavigate()
  const { redirectAfterLogout } = useRouterConfig()

  useEffect(() => {
    logout()
    void navigate(redirectAfterLogout, { replace: true })
  }, [logout, navigate, redirectAfterLogout])

  return <></>
}
