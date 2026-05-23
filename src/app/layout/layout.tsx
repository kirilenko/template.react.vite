import type { JSX } from 'react'
import { Link, Outlet, useMatches } from '@tanstack/react-router'

import { paths } from '@/config'
import type { RouteStaticData } from '@/libs/router'
import { useAuthReading } from '@/services/auth'

export function Layout(): JSX.Element {
  const { isAuthenticated, role } = useAuthReading()
  const matches = useMatches()
  const RouteSubHeader = [...matches]
    .reverse()
    .map((m) => (m.staticData as RouteStaticData).SubHeader)
    .find(Boolean)

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
          <span className="font-semibold text-gray-900">MyApp</span>
          <div className="flex items-center gap-4">
            <nav className="flex gap-1">
              {(
                [
                  { label: 'Home', to: paths.home },
                  { label: 'News', to: paths.news },
                  role === 'user' ? { label: 'Profile', to: paths.profile } : null,
                  role === 'admin' ? { label: 'Admin', to: paths.admin } : null,
                ] as const
              )
                .filter((x): x is { label: string; to: string } => x !== null)
                .map(({ label, to }) => (
                  <Link
                    key={to}
                    to={to}
                    activeOptions={{ exact: true }}
                    activeProps={{ className: 'bg-gray-100 text-gray-900' }}
                    inactiveProps={{ className: 'text-gray-500 hover:text-gray-900 hover:bg-gray-50' }}
                    className="px-3 py-1.5 rounded text-sm font-medium transition-colors"
                  >
                    {label}
                  </Link>
                ))}
            </nav>
            {isAuthenticated ? (
              <Link
                to={paths.logout}
                className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors"
              >
                Sign out
              </Link>
            ) : (
              <Link
                to={paths.login}
                className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors"
              >
                Sign in
              </Link>
            )}
          </div>
        </div>
      </header>
      {RouteSubHeader ? <RouteSubHeader /> : null}
      <main className="flex-1 flex flex-col">
        <Outlet />
      </main>
    </div>
  )
}
