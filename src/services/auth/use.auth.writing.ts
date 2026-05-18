import { useContext } from 'react'

import { AuthContext } from './auth.context'

export function useAuthWriting(): { login: () => void; logout: () => void } {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuthWriting must be used within AuthProvider')
  return { login: ctx.login, logout: ctx.logout }
}
