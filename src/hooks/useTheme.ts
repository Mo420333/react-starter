import { useCallback, useEffect, useState } from 'react'
import {
  applyTheme,
  DARK_QUERY,
  getInitialMode,
  getSystemTheme,
  resolveTheme,
  storeMode,
  type Theme,
  type ThemeMode,
} from '../lib/theme'

export function useTheme() {
  const [mode, setModeState] = useState<ThemeMode>(getInitialMode)
  const [systemTheme, setSystemTheme] = useState<Theme>(getSystemTheme)

  const theme = resolveTheme(mode, systemTheme)

  // Reflect the resolved theme onto the document.
  useEffect(() => {
    applyTheme(theme)
  }, [theme])

  // Track the OS preference so "system" mode stays in sync live.
  useEffect(() => {
    const mql = window.matchMedia(DARK_QUERY)
    const onChange = (e: MediaQueryListEvent) =>
      setSystemTheme(e.matches ? 'dark' : 'light')
    mql.addEventListener('change', onChange)
    return () => mql.removeEventListener('change', onChange)
  }, [])

  const setMode = useCallback((next: ThemeMode) => {
    storeMode(next)
    setModeState(next)
  }, [])

  return { mode, theme, setMode }
}
