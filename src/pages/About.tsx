export default function About() {
  return (
    <section className="space-y-4">
      <h1 className="text-3xl font-bold tracking-tight">About</h1>
      <p className="text-slate-600">
        This is the second page, rendered through the same shared{' '}
        <code className="rounded bg-slate-200 px-1.5 py-0.5 text-sm">
          Layout
        </code>
        . Add more routes in{' '}
        <code className="rounded bg-slate-200 px-1.5 py-0.5 text-sm">
          src/App.tsx
        </code>{' '}
        and drop new page components in{' '}
        <code className="rounded bg-slate-200 px-1.5 py-0.5 text-sm">
          src/pages
        </code>
        .
      </p>
    </section>
  )
}
