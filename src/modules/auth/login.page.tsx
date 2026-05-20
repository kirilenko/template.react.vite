import type { FormEvent, JSX } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router'

import { useRouterConfig } from '@/libs/router'
import { useAuthWriting } from '@/services/auth'

export function LoginPage(): JSX.Element {
  const { login } = useAuthWriting()
  const navigate = useNavigate()
  const { redirectAfterLogin } = useRouterConfig()
  const [isAdmin, setIsAdmin] = useState(false)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    login(isAdmin ? 'admin' : 'user')
    void navigate(redirectAfterLogin)
  }

  return (
    <div className="max-w-sm mx-auto py-20">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Sign in</h1>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          placeholder="Username"
          autoComplete="username"
          className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-300"
        />
        <input
          type="password"
          placeholder="Password"
          autoComplete="current-password"
          className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-300"
        />
        <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={isAdmin}
            onChange={(e) => setIsAdmin(e.target.checked)}
            className="rounded border-gray-300"
          />
          Admin
        </label>
        <button
          type="submit"
          className="w-full px-4 py-2 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-700 transition-colors"
        >
          Sign in
        </button>
      </form>
    </div>
  )
}
