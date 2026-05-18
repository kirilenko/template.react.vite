import { useContext } from 'react'

import { AuthContext } from './auth.context'
import type { AuthState } from './auth.schema'

export function useAuthReading(): AuthState {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuthReading must be used within AuthProvider')
  return { isAuthenticated: ctx.isAuthenticated, role: ctx.role }
}
