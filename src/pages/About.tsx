export default function About() {
  return (
    <section className="space-y-4">
      <h1 className="text-3xl font-bold tracking-tight">About</h1>
      <p className="text-slate-600 dark:text-slate-400">
        This is the second page, rendered through the same shared{' '}
        <code className="rounded bg-slate-200 px-1.5 py-0.5 text-sm dark:bg-slate-800">
          Layout
        </code>
        . Add more routes in{' '}
        <code className="rounded bg-slate-200 px-1.5 py-0.5 text-sm dark:bg-slate-800">
          src/App.tsx
        </code>{' '}
        and drop new page components in{' '}
        <code className="rounded bg-slate-200 px-1.5 py-0.5 text-sm dark:bg-slate-800">
          src/pages
        </code>
        .
      </p>
    </section>
  )
}
