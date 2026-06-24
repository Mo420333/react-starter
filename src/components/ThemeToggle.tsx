import { useTheme } from '../hooks/useTheme'

export default function ThemeToggle() {
  const { theme, toggle } = useTheme()
  const isDark = theme === 'dark'

  return (
    <button
      type="button"
      onClick={toggle}
      role="switch"
      aria-checked={isDark}
      aria-label="Toggle dark mode"
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className="rounded-md px-2.5 py-2 text-sm transition-colors hover:bg-slate-100 dark:hover:bg-slate-800"
    >
      {isDark ? '🌙' : '☀️'}
    </button>
  )
}
