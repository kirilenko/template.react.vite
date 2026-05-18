import type { JSX } from 'react'
import { NavLink, Outlet } from 'react-router'

const links = [
  { label: 'Home', to: '/' },
  { label: 'News', to: '/news' },
  { label: 'Profile', to: '/profile' },
]

export function Layout(): JSX.Element {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
          <span className="font-semibold text-gray-900">MyApp</span>
          <nav className="flex gap-1">
            {links.map(({ label, to }) => (
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
        </div>
      </header>
      <main className="max-w-5xl mx-auto px-4">
        <Outlet />
      </main>
    </div>
  )
}
