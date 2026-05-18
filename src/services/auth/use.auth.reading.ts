import { useContext } from 'react'

import type { AuthState } from './auth.schema'
import { AuthContext } from './auth.context'

export function useAuthReading(): AuthState {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuthReading must be used within AuthProvider')
  return { isAuthenticated: ctx.isAuthenticated }
}
