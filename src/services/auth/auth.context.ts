import { createContext } from 'react'

import type { AuthRole } from './auth.schema'

export interface AuthContextValue {
  isAuthenticated: boolean
  role: AuthRole | null
  login: (role: AuthRole) => void
  logout: () => void
}

export const AuthContext = createContext<AuthContextValue | null>(null)
