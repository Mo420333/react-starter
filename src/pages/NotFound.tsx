import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <section className="space-y-4 text-center">
      <p className="text-6xl font-bold text-slate-300">404</p>
      <h1 className="text-2xl font-semibold">Page not found</h1>
      <Link
        to="/"
        className="inline-block rounded-lg bg-slate-900 px-5 py-2.5 font-medium text-white transition-colors hover:bg-slate-700"
      >
        Back home
      </Link>
    </section>
  )
}
