import { describe, it, expect, afterEach } from 'vitest'
import { act, render, screen } from '@testing-library/react'
import { useTheme } from './useTheme'
import type { ThemeMode } from '../lib/theme'

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
  const { mode, theme, setMode } = useTheme()
  return (
    <div>
      <span data-testid="mode">{mode}</span>
      <span data-testid="theme">{theme}</span>
      {(['light', 'system', 'dark'] as ThemeMode[]).map((m) => (
        <button key={m} onClick={() => setMode(m)}>
          {m}
        </button>
      ))}
    </div>
  )
}

const mode = () => screen.getByTestId('mode').textContent
const theme = () => screen.getByTestId('theme').textContent
const choose = (m: ThemeMode) =>
  act(() => screen.getByRole('button', { name: m }).click())

describe('useTheme — three-way mode', () => {
  it('defaults to system mode and follows the OS', () => {
    const emit = installMatchMedia(false)
    render(<Probe />)
    expect(mode()).toBe('system')
    expect(theme()).toBe('light')

    emit(true)
    expect(theme()).toBe('dark')
    expect(document.documentElement).toHaveClass('dark')
  })

  it('pins to an explicit mode and ignores the OS', () => {
    const emit = installMatchMedia(false)
    render(<Probe />)

    choose('dark')
    expect(mode()).toBe('dark')
    expect(theme()).toBe('dark')
    expect(localStorage.getItem('theme')).toBe('dark')

    emit(false) // OS prefers light, but "dark" is pinned
    expect(theme()).toBe('dark')
  })

  it('returns to following the OS when switched back to system', () => {
    const emit = installMatchMedia(false)
    render(<Probe />)

    choose('light')
    emit(true) // ignored while pinned to light
    expect(theme()).toBe('light')

    choose('system')
    expect(mode()).toBe('system')
    expect(theme()).toBe('dark') // now follows the OS again
    expect(localStorage.getItem('theme')).toBe('system')

    emit(false)
    expect(theme()).toBe('light')
  })
})
