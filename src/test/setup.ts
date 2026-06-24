import '@testing-library/jest-dom/vitest'
import { afterEach } from 'vitest'
import { cleanup } from '@testing-library/react'

// jsdom doesn't enable localStorage by default and Node's global is gated
// behind a flag, so provide a minimal in-memory implementation for tests.
class MemoryStorage implements Storage {
  #store = new Map<string, string>()
  get length() {
    return this.#store.size
  }
  clear() {
    this.#store.clear()
  }
  getItem(key: string) {
    return this.#store.has(key) ? this.#store.get(key)! : null
  }
  key(index: number) {
    return Array.from(this.#store.keys())[index] ?? null
  }
  removeItem(key: string) {
    this.#store.delete(key)
  }
  setItem(key: string, value: string) {
    this.#store.set(key, String(value))
  }
}

const storage = new MemoryStorage()
Object.defineProperty(globalThis, 'localStorage', {
  configurable: true,
  value: storage,
})

// jsdom doesn't implement matchMedia; provide a minimal stub (defaults to
// "no match", i.e. light system preference).
if (!window.matchMedia) {
  window.matchMedia = (query: string) =>
    ({
      matches: false,
      media: query,
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => false,
    }) as MediaQueryList
}

afterEach(() => {
  cleanup()
  localStorage.clear()
  document.documentElement.classList.remove('dark')
})
