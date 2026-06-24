import { useCallback, useEffect, useState } from 'react'
import {
  applyTheme,
  DARK_QUERY,
  getInitialTheme,
  getStoredTheme,
  nextTheme,
  storeTheme,
  type Theme,
} from '../lib/theme'

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(getInitialTheme)

  // Reflect the current theme onto the document.
  useEffect(() => {
    applyTheme(theme)
  }, [theme])

  // Follow OS changes — but only while the user hasn't explicitly chosen.
  useEffect(() => {
    const mql = window.matchMedia(DARK_QUERY)
    const onChange = (e: MediaQueryListEvent) => {
      if (getStoredTheme() === null) setTheme(e.matches ? 'dark' : 'light')
    }
    mql.addEventListener('change', onChange)
    return () => mql.removeEventListener('change', onChange)
  }, [])

  // An explicit toggle is a deliberate choice, so it gets persisted.
  const toggle = useCallback(() => {
    setTheme((t) => {
      const next = nextTheme(t)
      storeTheme(next)
      return next
    })
  }, [])

  return { theme, toggle }
}
