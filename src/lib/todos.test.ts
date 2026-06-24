import { describe, it, expect } from 'vitest'
import {
  addTodo,
  toggleTodo,
  removeTodo,
  clearCompleted,
  filterTodos,
  remainingCount,
  type Todo,
} from './todos'

const make = (overrides: Partial<Todo> = {}): Todo => ({
  id: overrides.id ?? crypto.randomUUID(),
  text: overrides.text ?? 'task',
  done: overrides.done ?? false,
})

describe('addTodo', () => {
  it('prepends a new todo', () => {
    const result = addTodo([], 'Buy milk')
    expect(result).toHaveLength(1)
    expect(result[0]).toMatchObject({ text: 'Buy milk', done: false })
    expect(result[0].id).toBeTruthy()
  })

  it('trims whitespace from the text', () => {
    expect(addTodo([], '  spaced  ')[0].text).toBe('spaced')
  })

  it('ignores blank or whitespace-only input', () => {
    expect(addTodo([], '')).toHaveLength(0)
    expect(addTodo([], '   ')).toHaveLength(0)
  })

  it('does not mutate the original array', () => {
    const original: Todo[] = []
    addTodo(original, 'x')
    expect(original).toHaveLength(0)
  })
})

describe('toggleTodo', () => {
  it('flips done for the matching id only', () => {
    const a = make({ id: 'a', done: false })
    const b = make({ id: 'b', done: false })
    const result = toggleTodo([a, b], 'a')
    expect(result.find((t) => t.id === 'a')?.done).toBe(true)
    expect(result.find((t) => t.id === 'b')?.done).toBe(false)
  })
})

describe('removeTodo', () => {
  it('removes the matching todo', () => {
    const a = make({ id: 'a' })
    const b = make({ id: 'b' })
    expect(removeTodo([a, b], 'a')).toEqual([b])
  })
})

describe('clearCompleted', () => {
  it('keeps only active todos', () => {
    const todos = [make({ done: true }), make({ done: false }), make({ done: true })]
    expect(clearCompleted(todos)).toHaveLength(1)
    expect(clearCompleted(todos)[0].done).toBe(false)
  })
})

describe('filterTodos', () => {
  const todos = [make({ id: '1', done: false }), make({ id: '2', done: true })]

  it('returns everything for "all"', () => {
    expect(filterTodos(todos, 'all')).toHaveLength(2)
  })
  it('returns only incomplete for "active"', () => {
    expect(filterTodos(todos, 'active').map((t) => t.id)).toEqual(['1'])
  })
  it('returns only completed for "completed"', () => {
    expect(filterTodos(todos, 'completed').map((t) => t.id)).toEqual(['2'])
  })
})

describe('remainingCount', () => {
  it('counts incomplete todos', () => {
    expect(remainingCount([make({ done: true }), make({ done: false })])).toBe(1)
    expect(remainingCount([])).toBe(0)
  })
})
