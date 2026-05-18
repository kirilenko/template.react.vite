import type { JSX } from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router'

import { useAuthWriting } from '@/services/auth'

export function LogoutPage(): JSX.Element {
  const { logout } = useAuthWriting()
  const navigate = useNavigate()

  useEffect(() => {
    logout()
    void navigate('/login', { replace: true })
  }, [logout, navigate])

  return <></>
}
