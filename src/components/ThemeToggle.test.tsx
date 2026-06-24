import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ThemeToggle from './ThemeToggle'

const root = () => document.documentElement
const radio = (name: RegExp) => screen.getByRole('radio', { name })

describe('<ThemeToggle />', () => {
  it('renders three options with System selected by default', () => {
    render(<ThemeToggle />)
    expect(screen.getAllByRole('radio')).toHaveLength(3)
    expect(radio(/system/i)).toHaveAttribute('aria-checked', 'true')
    expect(radio(/light/i)).toHaveAttribute('aria-checked', 'false')
    expect(radio(/dark/i)).toHaveAttribute('aria-checked', 'false')
  })

  it('selecting Dark applies dark mode and persists the choice', async () => {
    const user = userEvent.setup()
    render(<ThemeToggle />)

    await user.click(radio(/dark/i))
    expect(radio(/dark/i)).toHaveAttribute('aria-checked', 'true')
    expect(radio(/system/i)).toHaveAttribute('aria-checked', 'false')
    expect(root()).toHaveClass('dark')
    expect(localStorage.getItem('theme')).toBe('dark')
  })

  it('selecting Light removes dark mode', async () => {
    const user = userEvent.setup()
    render(<ThemeToggle />)

    await user.click(radio(/dark/i))
    await user.click(radio(/light/i))
    expect(radio(/light/i)).toHaveAttribute('aria-checked', 'true')
    expect(root()).not.toHaveClass('dark')
    expect(localStorage.getItem('theme')).toBe('light')
  })

  it('initializes from a stored mode', () => {
    localStorage.setItem('theme', 'dark')
    render(<ThemeToggle />)
    expect(radio(/dark/i)).toHaveAttribute('aria-checked', 'true')
    expect(root()).toHaveClass('dark')
  })
})
