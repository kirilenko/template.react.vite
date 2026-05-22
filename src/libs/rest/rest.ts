import { env } from '@/config'

async function get<T>(path: string): Promise<T> {
  const response = await fetch(`${String(env.VITE_REST_URL)}${path}`)
  if (!response.ok) throw new Error(`HTTP ${response.status}`)
  return response.json() as Promise<T>
}

export const rest = { get }
