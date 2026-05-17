import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { existsSync, readFileSync } from 'node:fs'
import { defineConfig } from 'vite'

function loadPortsLocal(): Record<string, string> {
  if (!existsSync('.env.ports.local')) return {}
  return Object.fromEntries(
    readFileSync('.env.ports.local', 'utf-8')
      .split('\n')
      .filter((l) => l && !l.startsWith('#') && l.includes('='))
      .map((l) => l.split('=', 2) as [string, string])
  )
}

const portsEnv = loadPortsLocal()

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: parseInt(portsEnv.PORT ?? process.env.PORT ?? '5173'),
  },
})
