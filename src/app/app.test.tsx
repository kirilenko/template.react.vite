import { render, screen, waitFor } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { App } from './app'

describe('App', () => {
  it('renders', async () => {
    render(<App />)
    await waitFor(() => {
      expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument()
    })
  })
})
