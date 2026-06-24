import { useState } from 'react'

export default function Home() {
  const [count, setCount] = useState(0)

  return (
    <section className="space-y-8">
      <div className="space-y-3">
        <h1 className="text-4xl font-bold tracking-tight">
          Your React app is ready
        </h1>
        <p className="text-lg text-slate-600">
          A minimal starter with routing, Tailwind, and TypeScript wired up.
          Edit <code className="rounded bg-slate-200 px-1.5 py-0.5 text-sm">src/pages/Home.tsx</code> and save to see hot reload.
        </p>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <p className="mb-4 text-sm font-medium text-slate-500">
          A tiny interactive demo
        </p>
        <button
          type="button"
          onClick={() => setCount((c) => c + 1)}
          className="rounded-lg bg-slate-900 px-5 py-2.5 font-medium text-white transition-colors hover:bg-slate-700"
        >
          Count is {count}
        </button>
      </div>

      <ul className="grid gap-3 sm:grid-cols-2">
        {[
          { title: 'Routing', body: 'react-router-dom with a shared layout.' },
          { title: 'Styling', body: 'Tailwind CSS v4 via the Vite plugin.' },
          { title: 'Type-safe', body: 'TypeScript across the whole app.' },
          { title: 'Fast', body: 'Vite dev server with instant HMR.' },
        ].map((f) => (
          <li
            key={f.title}
            className="rounded-lg border border-slate-200 bg-white p-4"
          >
            <h3 className="font-semibold">{f.title}</h3>
            <p className="text-sm text-slate-600">{f.body}</p>
          </li>
        ))}
      </ul>
    </section>
  )
}
