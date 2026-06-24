import { describe, it, expect, afterEach } from 'vitest'
import { getInitialTheme, applyTheme, nextTheme, THEME_KEY } from './theme'

afterEach(() => {
  document.documentElement.classList.remove('dark')
})

describe('getInitialTheme', () => {
  it('uses a stored preference when present', () => {
    localStorage.setItem(THEME_KEY, 'dark')
    expect(getInitialTheme()).toBe('dark')
    localStorage.setItem(THEME_KEY, 'light')
    expect(getInitialTheme()).toBe('light')
  })

  it('falls back to light when nothing is stored (system stub = no match)', () => {
    expect(getInitialTheme()).toBe('light')
  })

  it('ignores an invalid stored value', () => {
    localStorage.setItem(THEME_KEY, 'banana')
    expect(getInitialTheme()).toBe('light')
  })
})

describe('applyTheme', () => {
  it('adds the dark class and persists for dark', () => {
    applyTheme('dark')
    expect(document.documentElement.classList.contains('dark')).toBe(true)
    expect(localStorage.getItem(THEME_KEY)).toBe('dark')
  })

  it('removes the dark class and persists for light', () => {
    document.documentElement.classList.add('dark')
    applyTheme('light')
    expect(document.documentElement.classList.contains('dark')).toBe(false)
    expect(localStorage.getItem(THEME_KEY)).toBe('light')
  })
})

describe('nextTheme', () => {
  it('toggles between light and dark', () => {
    expect(nextTheme('light')).toBe('dark')
    expect(nextTheme('dark')).toBe('light')
  })
})
