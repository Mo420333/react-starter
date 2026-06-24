import { useCallback, useEffect, useState } from 'react'
import { applyTheme, getInitialTheme, nextTheme, type Theme } from '../lib/theme'

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(getInitialTheme)

  useEffect(() => {
    applyTheme(theme)
  }, [theme])

  const toggle = useCallback(() => setTheme((t) => nextTheme(t)), [])

  return { theme, setTheme, toggle }
}
