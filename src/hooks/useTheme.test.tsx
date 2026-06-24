import { describe, it, expect, afterEach } from 'vitest'
import { act, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useTheme } from './useTheme'

const originalMatchMedia = window.matchMedia

afterEach(() => {
  document.documentElement.classList.remove('dark')
  window.matchMedia = originalMatchMedia
})

/**
 * Install a controllable matchMedia and return an `emit` to simulate the OS
 * flipping its color scheme (notifying registered change listeners).
 */
function installMatchMedia(initialDark: boolean) {
  let matches = initialDark
  const listeners = new Set<(e: MediaQueryListEvent) => void>()
  window.matchMedia = ((query: string) =>
    ({
      get matches() {
        return matches
      },
      media: query,
      addEventListener: (_: string, cb: (e: MediaQueryListEvent) => void) =>
        listeners.add(cb),
      removeEventListener: (_: string, cb: (e: MediaQueryListEvent) => void) =>
        listeners.delete(cb),
    }) as unknown as MediaQueryList) as typeof window.matchMedia
  return (dark: boolean) => {
    matches = dark
    act(() => {
      listeners.forEach((cb) => cb({ matches: dark } as MediaQueryListEvent))
    })
  }
}

function Probe() {
  const { theme, toggle } = useTheme()
  return (
    <button onClick={toggle} data-testid="t">
      {theme}
    </button>
  )
}

const label = () => screen.getByTestId('t').textContent

describe('useTheme — OS reactivity', () => {
  it('follows OS theme changes when the user has not chosen', () => {
    const emit = installMatchMedia(false)
    render(<Probe />)
    expect(label()).toBe('light')

    emit(true)
    expect(label()).toBe('dark')
    expect(document.documentElement).toHaveClass('dark')

    emit(false)
    expect(label()).toBe('light')
    expect(document.documentElement).not.toHaveClass('dark')
  })

  it('stops following the OS once the user explicitly toggles', async () => {
    const user = userEvent.setup()
    const emit = installMatchMedia(false)
    render(<Probe />)

    await user.click(screen.getByTestId('t')) // explicit choice -> dark
    expect(label()).toBe('dark')
    expect(localStorage.getItem('theme')).toBe('dark')

    emit(false) // OS says light, but the explicit choice wins
    expect(label()).toBe('dark')
    expect(document.documentElement).toHaveClass('dark')
  })
})
