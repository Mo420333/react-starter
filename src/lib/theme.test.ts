import { describe, it, expect, afterEach } from 'vitest'
import {
  getStoredTheme,
  getSystemTheme,
  getInitialTheme,
  applyTheme,
  storeTheme,
  nextTheme,
  THEME_KEY,
} from './theme'

const originalMatchMedia = window.matchMedia

afterEach(() => {
  document.documentElement.classList.remove('dark')
  window.matchMedia = originalMatchMedia
})

/** Force the system color-scheme preference for a test. */
function setSystemDark(matches: boolean) {
  window.matchMedia = ((query: string) =>
    ({
      matches,
      media: query,
      addEventListener: () => {},
      removeEventListener: () => {},
    }) as unknown as MediaQueryList) as typeof window.matchMedia
}

describe('getStoredTheme', () => {
  it('returns the stored value when valid', () => {
    localStorage.setItem(THEME_KEY, 'dark')
    expect(getStoredTheme()).toBe('dark')
  })
  it('returns null when nothing is stored', () => {
    expect(getStoredTheme()).toBeNull()
  })
  it('returns null for an invalid stored value', () => {
    localStorage.setItem(THEME_KEY, 'banana')
    expect(getStoredTheme()).toBeNull()
  })
})

describe('getSystemTheme', () => {
  it('returns dark when the OS prefers dark', () => {
    setSystemDark(true)
    expect(getSystemTheme()).toBe('dark')
  })
  it('returns light when the OS prefers light', () => {
    setSystemDark(false)
    expect(getSystemTheme()).toBe('light')
  })
})

describe('getInitialTheme', () => {
  it('prefers an explicit stored choice over the system value', () => {
    setSystemDark(true)
    localStorage.setItem(THEME_KEY, 'light')
    expect(getInitialTheme()).toBe('light')
  })
  it('falls back to the system value with no stored choice', () => {
    setSystemDark(true)
    expect(getInitialTheme()).toBe('dark')
  })
})

describe('applyTheme', () => {
  it('toggles the dark class without persisting', () => {
    applyTheme('dark')
    expect(document.documentElement.classList.contains('dark')).toBe(true)
    expect(localStorage.getItem(THEME_KEY)).toBeNull()

    applyTheme('light')
    expect(document.documentElement.classList.contains('dark')).toBe(false)
  })
})

describe('storeTheme', () => {
  it('persists the chosen theme', () => {
    storeTheme('dark')
    expect(localStorage.getItem(THEME_KEY)).toBe('dark')
  })
})

describe('nextTheme', () => {
  it('toggles between light and dark', () => {
    expect(nextTheme('light')).toBe('dark')
    expect(nextTheme('dark')).toBe('light')
  })
})
