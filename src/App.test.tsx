import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import App from './App'

const renderAt = (path: string) =>
  render(
    <MemoryRouter initialEntries={[path]}>
      <App />
    </MemoryRouter>,
  )

describe('<App /> routing', () => {
  it('renders Home at /', () => {
    renderAt('/')
    expect(
      screen.getByRole('heading', { name: /your react app is ready/i }),
    ).toBeInTheDocument()
  })

  it('renders Todos at /todos', () => {
    renderAt('/todos')
    expect(screen.getByRole('heading', { name: 'Todos' })).toBeInTheDocument()
  })

  it('renders About at /about', () => {
    renderAt('/about')
    expect(screen.getByRole('heading', { name: 'About' })).toBeInTheDocument()
  })

  it('renders NotFound for unknown routes', () => {
    renderAt('/does-not-exist')
    expect(screen.getByText('404')).toBeInTheDocument()
  })
})
