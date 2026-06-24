import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import Layout from './Layout'

const renderLayout = () =>
  render(
    <MemoryRouter initialEntries={['/']}>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<p>child content</p>} />
        </Route>
      </Routes>
    </MemoryRouter>,
  )

describe('<Layout />', () => {
  it('renders nav links and the routed child via <Outlet />', () => {
    renderLayout()
    expect(screen.getByRole('link', { name: 'Home' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Todos' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'About' })).toBeInTheDocument()
    expect(screen.getByText('child content')).toBeInTheDocument()
  })

  it('renders the footer', () => {
    renderLayout()
    expect(screen.getByText(/Built with Vite/i)).toBeInTheDocument()
  })
})
