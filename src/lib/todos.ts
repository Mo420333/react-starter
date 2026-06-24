export type Todo = {
  id: string
  text: string
  done: boolean
}

export type Filter = 'all' | 'active' | 'completed'

export function createTodo(text: string): Todo {
  return { id: crypto.randomUUID(), text: text.trim(), done: false }
}

/** Prepend a new todo from raw input. Returns the list unchanged if text is blank. */
export function addTodo(todos: Todo[], text: string): Todo[] {
  if (!text.trim()) return todos
  return [createTodo(text), ...todos]
}

export function toggleTodo(todos: Todo[], id: string): Todo[] {
  return todos.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
}

export function removeTodo(todos: Todo[], id: string): Todo[] {
  return todos.filter((t) => t.id !== id)
}

export function clearCompleted(todos: Todo[]): Todo[] {
  return todos.filter((t) => !t.done)
}

export function filterTodos(todos: Todo[], filter: Filter): Todo[] {
  if (filter === 'active') return todos.filter((t) => !t.done)
  if (filter === 'completed') return todos.filter((t) => t.done)
  return todos
}

export function remainingCount(todos: Todo[]): number {
  return todos.filter((t) => !t.done).length
}
