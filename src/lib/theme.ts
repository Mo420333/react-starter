export type Theme = 'light' | 'dark'
export type ThemeMode = 'light' | 'dark' | 'system'

export const THEME_KEY = 'theme'
export const DARK_QUERY = '(prefers-color-scheme: dark)'

/** The user's explicitly-chosen mode, or null if they've never chosen one. */
export function getStoredMode(): ThemeMode | null {
  try {
    const stored = localStorage.getItem(THEME_KEY)
    if (stored === 'light' || stored === 'dark' || stored === 'system') {
      return stored
    }
  } catch {
    // ignore read errors
  }
  return null
}

/** The chosen mode, defaulting to "system" when nothing is stored. */
export function getInitialMode(): ThemeMode {
  return getStoredMode() ?? 'system'
}

/** The current OS-level color-scheme preference. */
export function getSystemTheme(): Theme {
  if (typeof window !== 'undefined' && window.matchMedia(DARK_QUERY).matches) {
    return 'dark'
  }
  return 'light'
}

/** Resolve a mode to a concrete theme, consulting the OS for "system". */
export function resolveTheme(mode: ThemeMode, systemTheme: Theme): Theme {
  return mode === 'system' ? systemTheme : mode
}

/** Reflect the theme onto <html>. */
export function applyTheme(theme: Theme): void {
  document.documentElement.classList.toggle('dark', theme === 'dark')
}

/** Persist the chosen mode. */
export function storeMode(mode: ThemeMode): void {
  try {
    localStorage.setItem(THEME_KEY, mode)
  } catch {
    // ignore write errors
  }
}
