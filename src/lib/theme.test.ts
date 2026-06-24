import { describe, it, expect, afterEach } from 'vitest'
import {
  getStoredMode,
  getInitialMode,
  getSystemTheme,
  resolveTheme,
  applyTheme,
  storeMode,
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

describe('getStoredMode', () => {
  it('returns each valid stored mode', () => {
    for (const mode of ['light', 'dark', 'system'] as const) {
      localStorage.setItem(THEME_KEY, mode)
      expect(getStoredMode()).toBe(mode)
    }
  })
  it('returns null when nothing is stored', () => {
    expect(getStoredMode()).toBeNull()
  })
  it('returns null for an invalid stored value', () => {
    localStorage.setItem(THEME_KEY, 'banana')
    expect(getStoredMode()).toBeNull()
  })
})

describe('getInitialMode', () => {
  it('defaults to "system" with no stored choice', () => {
    expect(getInitialMode()).toBe('system')
  })
  it('uses the stored mode when present', () => {
    localStorage.setItem(THEME_KEY, 'dark')
    expect(getInitialMode()).toBe('dark')
  })
})

describe('getSystemTheme', () => {
  it('reflects the OS preference', () => {
    setSystemDark(true)
    expect(getSystemTheme()).toBe('dark')
    setSystemDark(false)
    expect(getSystemTheme()).toBe('light')
  })
})

describe('resolveTheme', () => {
  it('returns the explicit mode directly', () => {
    expect(resolveTheme('light', 'dark')).toBe('light')
    expect(resolveTheme('dark', 'light')).toBe('dark')
  })
  it('falls back to the system theme for "system"', () => {
    expect(resolveTheme('system', 'dark')).toBe('dark')
    expect(resolveTheme('system', 'light')).toBe('light')
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

describe('storeMode', () => {
  it('persists the chosen mode', () => {
    storeMode('system')
    expect(localStorage.getItem(THEME_KEY)).toBe('system')
  })
})
