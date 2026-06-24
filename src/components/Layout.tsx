import { NavLink, Outlet } from 'react-router-dom'

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
    isActive
      ? 'bg-slate-900 text-white'
      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
  }`

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <header className="border-b border-slate-200 bg-white">
        <nav className="mx-auto flex max-w-3xl items-center justify-between px-6 py-4">
          <NavLink to="/" className="text-lg font-bold tracking-tight">
            ⚛️ react-starter
          </NavLink>
          <div className="flex gap-1">
            <NavLink to="/" end className={navLinkClass}>
              Home
            </NavLink>
            <NavLink to="/todos" className={navLinkClass}>
              Todos
            </NavLink>
            <NavLink to="/about" className={navLinkClass}>
              About
            </NavLink>
          </div>
        </nav>
      </header>

      <main className="mx-auto w-full max-w-3xl flex-1 px-6 py-12">
        <Outlet />
      </main>

      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-3xl px-6 py-4 text-center text-sm text-slate-500">
          Built with Vite + React + TypeScript + Tailwind
        </div>
      </footer>
    </div>
  )
}
