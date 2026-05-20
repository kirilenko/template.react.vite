import type { JSX } from 'react'
import { Link, NavLink, Outlet, useMatches } from 'react-router'

import type { RouteHandle } from '@/libs/router'
import { useRouterConfig } from '@/libs/router'
import { useAuthReading } from '@/services/auth'

import { SubHeader } from './sub-header'

export function Layout(): JSX.Element {
  const { isAuthenticated, role } = useAuthReading()
  const { loginPath, logoutPath } = useRouterConfig()
  const matches = useMatches()
  const hasSubHeader = matches.some((m) => (m.handle as RouteHandle)?.hasSubHeader)

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
          <span className="font-semibold text-gray-900">MyApp</span>
          <div className="flex items-center gap-4">
            <nav className="flex gap-1">
              {(
                [
                  { label: 'Home', to: '/' },
                  { label: 'News', to: '/news' },
                  role === 'user' ? { label: 'Profile', to: '/profile' } : null,
                  role === 'admin' ? { label: 'Admin', to: '/admin' } : null,
                ] as const
              )
                .filter((x): x is { label: string; to: string } => x !== null)
                .map(({ label, to }) => (
                  <NavLink
                    key={to}
                    to={to}
                    end
                    className={({ isActive }) =>
                      `px-3 py-1.5 rounded text-sm font-medium transition-colors ${
                        isActive
                          ? 'bg-gray-100 text-gray-900'
                          : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
                      }`
                    }
                  >
                    {label}
                  </NavLink>
                ))}
            </nav>
            {isAuthenticated ? (
              <Link
                to={logoutPath}
                className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors"
              >
                Sign out
              </Link>
            ) : (
              <Link
                to={loginPath}
                className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors"
              >
                Sign in
              </Link>
            )}
          </div>
        </div>
      </header>
      {hasSubHeader && <SubHeader />}
      <main className="max-w-5xl mx-auto px-4">
        <Outlet />
      </main>
    </div>
  )
}
