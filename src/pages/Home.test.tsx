import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Home from './Home'

describe('<Home />', () => {
  it('renders the heading and feature cards', () => {
    render(<Home />)
    expect(
      screen.getByRole('heading', { name: /your react app is ready/i }),
    ).toBeInTheDocument()
    expect(screen.getByText('Routing')).toBeInTheDocument()
    expect(screen.getByText('Type-safe')).toBeInTheDocument()
  })

  it('increments the demo counter on click', async () => {
    const user = userEvent.setup()
    render(<Home />)
    const button = screen.getByRole('button', { name: /count is 0/i })
    await user.click(button)
    expect(screen.getByRole('button', { name: /count is 1/i })).toBeInTheDocument()
  })
})
