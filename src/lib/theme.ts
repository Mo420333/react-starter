export type Theme = 'light' | 'dark'

export const THEME_KEY = 'theme'
export const DARK_QUERY = '(prefers-color-scheme: dark)'

/** The user's explicitly-chosen theme, or null if they've never chosen one. */
export function getStoredTheme(): Theme | null {
  try {
    const stored = localStorage.getItem(THEME_KEY)
    if (stored === 'light' || stored === 'dark') return stored
  } catch {
    // ignore read errors
  }
  return null
}

/** The current OS-level color-scheme preference. */
export function getSystemTheme(): Theme {
  if (typeof window !== 'undefined' && window.matchMedia(DARK_QUERY).matches) {
    return 'dark'
  }
  return 'light'
}

/** Resolve the initial theme: explicit choice if any, else the system value. */
export function getInitialTheme(): Theme {
  return getStoredTheme() ?? getSystemTheme()
}

/** Reflect the theme onto <html>. */
export function applyTheme(theme: Theme): void {
  document.documentElement.classList.toggle('dark', theme === 'dark')
}

/** Persist an explicit theme choice. */
export function storeTheme(theme: Theme): void {
  try {
    localStorage.setItem(THEME_KEY, theme)
  } catch {
    // ignore write errors
  }
}

export function nextTheme(theme: Theme): Theme {
  return theme === 'dark' ? 'light' : 'dark'
}
