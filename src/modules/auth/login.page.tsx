import type { FormEvent, JSX } from 'react'
import { useNavigate } from 'react-router'

import { useAuthWriting } from '@/services/auth'

export function LoginPage(): JSX.Element {
  const { login } = useAuthWriting()
  const navigate = useNavigate()

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    login()
    void navigate('/')
  }

  return (
    <div className="max-w-sm mx-auto py-20">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Sign in</h1>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          placeholder="Username"
          className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-300"
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-300"
        />
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
