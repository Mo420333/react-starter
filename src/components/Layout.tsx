import { NavLink, Outlet } from 'react-router-dom'
import ThemeToggle from './ThemeToggle'

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
    isActive
      ? 'bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900'
      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100'
  }`

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <header className="border-b border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
        <nav className="mx-auto flex max-w-3xl items-center justify-between px-6 py-4">
          <NavLink to="/" className="text-lg font-bold tracking-tight">
            ⚛️ react-starter
          </NavLink>
          <div className="flex items-center gap-1">
            <NavLink to="/" end className={navLinkClass}>
              Home
            </NavLink>
            <NavLink to="/todos" className={navLinkClass}>
              Todos
            </NavLink>
            <NavLink to="/about" className={navLinkClass}>
              About
            </NavLink>
            <ThemeToggle />
          </div>
        </nav>
      </header>

      <main className="mx-auto w-full max-w-3xl flex-1 px-6 py-12">
        <Outlet />
      </main>

      <footer className="border-t border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
        <div className="mx-auto max-w-3xl px-6 py-4 text-center text-sm text-slate-500 dark:text-slate-400">
          Built with Vite + React + TypeScript + Tailwind
        </div>
      </footer>
    </div>
  )
}
