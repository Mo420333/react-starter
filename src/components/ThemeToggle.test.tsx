import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ThemeToggle from './ThemeToggle'

const root = () => document.documentElement

describe('<ThemeToggle />', () => {
  it('starts in light mode and reflects aria-checked', () => {
    render(<ThemeToggle />)
    const toggle = screen.getByRole('switch', { name: /toggle dark mode/i })
    expect(toggle).toHaveAttribute('aria-checked', 'false')
    expect(root()).not.toHaveClass('dark')
  })

  it('toggles dark mode on click and updates the DOM + storage', async () => {
    const user = userEvent.setup()
    render(<ThemeToggle />)
    const toggle = screen.getByRole('switch', { name: /toggle dark mode/i })

    await user.click(toggle)
    expect(toggle).toHaveAttribute('aria-checked', 'true')
    expect(root()).toHaveClass('dark')
    expect(localStorage.getItem('theme')).toBe('dark')

    await user.click(toggle)
    expect(toggle).toHaveAttribute('aria-checked', 'false')
    expect(root()).not.toHaveClass('dark')
    expect(localStorage.getItem('theme')).toBe('light')
  })

  it('initializes from a stored dark preference', () => {
    localStorage.setItem('theme', 'dark')
    render(<ThemeToggle />)
    expect(
      screen.getByRole('switch', { name: /toggle dark mode/i }),
    ).toHaveAttribute('aria-checked', 'true')
    expect(root()).toHaveClass('dark')
  })
})
