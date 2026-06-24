import { useState } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'
import {
  addTodo,
  toggleTodo,
  removeTodo,
  clearCompleted as clearCompletedTodos,
  filterTodos,
  remainingCount,
  type Todo,
  type Filter,
} from '../lib/todos'

const filterClass = (active: boolean) =>
  `px-3 py-1 rounded-md text-sm font-medium transition-colors ${
    active ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100'
  }`

export default function Todos() {
  const [todos, setTodos] = useLocalStorage<Todo[]>('todos', [])
  const [draft, setDraft] = useState('')
  const [filter, setFilter] = useState<Filter>('all')

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault()
    if (!draft.trim()) return
    setTodos((prev) => addTodo(prev, draft))
    setDraft('')
  }

  const toggle = (id: string) => setTodos((prev) => toggleTodo(prev, id))

  const remove = (id: string) => setTodos((prev) => removeTodo(prev, id))

  const clearCompleted = () => setTodos((prev) => clearCompletedTodos(prev))

  const visible = filterTodos(todos, filter)
  const remaining = remainingCount(todos)

  return (
    <section className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight">Todos</h1>
        <p className="text-slate-600">
          A small CRUD list — saved to your browser's localStorage.
        </p>
      </div>

      <form onSubmit={handleAdd} className="flex gap-2">
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="What needs doing?"
          className="flex-1 rounded-lg border border-slate-300 bg-white px-4 py-2.5 outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10"
        />
        <button
          type="submit"
          className="rounded-lg bg-slate-900 px-5 py-2.5 font-medium text-white transition-colors hover:bg-slate-700 disabled:opacity-40"
          disabled={!draft.trim()}
        >
          Add
        </button>
      </form>

      <div className="flex items-center justify-between">
        <div className="flex gap-1">
          {(['all', 'active', 'completed'] as const).map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              className={filterClass(filter === f)}
            >
              {f[0].toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
        <span className="text-sm text-slate-500">
          {remaining} left
        </span>
      </div>

      <ul className="space-y-2">
        {visible.length === 0 && (
          <li className="rounded-lg border border-dashed border-slate-300 p-8 text-center text-slate-400">
            {todos.length === 0 ? 'No todos yet — add one above.' : 'Nothing here.'}
          </li>
        )}
        {visible.map((t) => (
          <li
            key={t.id}
            className="flex items-center gap-3 rounded-lg border border-slate-200 bg-white px-4 py-3"
          >
            <input
              type="checkbox"
              checked={t.done}
              onChange={() => toggle(t.id)}
              className="h-5 w-5 shrink-0 accent-slate-900"
            />
            <span
              className={`flex-1 ${
                t.done ? 'text-slate-400 line-through' : 'text-slate-900'
              }`}
            >
              {t.text}
            </span>
            <button
              type="button"
              onClick={() => remove(t.id)}
              aria-label="Delete todo"
              className="shrink-0 rounded-md px-2 py-1 text-slate-400 transition-colors hover:bg-red-50 hover:text-red-600"
            >
              ✕
            </button>
          </li>
        ))}
      </ul>

      {todos.some((t) => t.done) && (
        <button
          type="button"
          onClick={clearCompleted}
          className="text-sm font-medium text-slate-500 hover:text-slate-900"
        >
          Clear completed
        </button>
      )}
    </section>
  )
}
