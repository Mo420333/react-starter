import { useTheme } from '../hooks/useTheme'
import type { ThemeMode } from '../lib/theme'

const OPTIONS: { value: ThemeMode; label: string; icon: string }[] = [
  { value: 'light', label: 'Light', icon: '☀️' },
  { value: 'system', label: 'System', icon: '🖥️' },
  { value: 'dark', label: 'Dark', icon: '🌙' },
]

export default function ThemeToggle() {
  const { mode, setMode } = useTheme()

  return (
    <div
      role="radiogroup"
      aria-label="Color theme"
      className="ml-1 flex items-center gap-0.5 rounded-md border border-slate-200 p-0.5 dark:border-slate-700"
    >
      {OPTIONS.map((o) => {
        const active = mode === o.value
        return (
          <button
            key={o.value}
            type="button"
            role="radio"
            aria-checked={active}
            aria-label={o.label}
            title={`${o.label} theme`}
            onClick={() => setMode(o.value)}
            className={`rounded px-2 py-1 text-sm transition-colors ${
              active
                ? 'bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900'
                : 'text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800'
            }`}
          >
            <span aria-hidden="true">{o.icon}</span>
          </button>
        )
      })}
    </div>
  )
}
