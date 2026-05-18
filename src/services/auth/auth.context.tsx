import type { JSX, ReactNode } from 'react'
import { createContext, useCallback, useState } from 'react'

import type { AuthRole } from './auth.schema'

interface AuthContextValue {
  isAuthenticated: boolean
  role: AuthRole | null
  login: (role: AuthRole) => void
  logout: () => void
}

export const AuthContext = createContext<AuthContextValue | null>(null)

const STORAGE_KEY = 'auth'

function readStorage(): { isAuthenticated: boolean; role: AuthRole | null } {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw
      ? (JSON.parse(raw) as { isAuthenticated: boolean; role: AuthRole | null })
      : { isAuthenticated: false, role: null }
  } catch {
    return { isAuthenticated: false, role: null }
  }
}

export function AuthProvider({ children }: { children: ReactNode }): JSX.Element {
  const [state, setState] = useState(readStorage)

  const login = useCallback((role: AuthRole) => {
    const next = { isAuthenticated: true, role }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
    setState(next)
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY)
    setState({ isAuthenticated: false, role: null })
  }, [])

  return <AuthContext.Provider value={{ ...state, login, logout }}>{children}</AuthContext.Provider>
}
