import { describe, it, expect } from 'vitest'
import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Todos from './Todos'

const add = async (user: ReturnType<typeof userEvent.setup>, text: string) => {
  await user.type(screen.getByPlaceholderText('What needs doing?'), text)
  await user.click(screen.getByRole('button', { name: 'Add' }))
}

const rows = () => screen.queryAllByRole('listitem')

describe('<Todos />', () => {
  it('adds todos and updates the remaining counter', async () => {
    const user = userEvent.setup()
    render(<Todos />)

    await add(user, 'Buy milk')
    await add(user, 'Ship feature')

    expect(screen.getByText('Buy milk')).toBeInTheDocument()
    expect(screen.getByText('Ship feature')).toBeInTheDocument()
    expect(screen.getByText('2 left')).toBeInTheDocument()
  })

  it('toggles completion and filters by status', async () => {
    const user = userEvent.setup()
    render(<Todos />)
    await add(user, 'Buy milk')
    await add(user, 'Ship feature')

    // complete "Ship feature" (top row, since adds prepend)
    const shipRow = screen.getByText('Ship feature').closest('li')!
    await user.click(within(shipRow).getByRole('checkbox'))
    expect(screen.getByText('1 left')).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Active' }))
    expect(rows()).toHaveLength(1)
    expect(screen.getByText('Buy milk')).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Completed' }))
    expect(rows()).toHaveLength(1)
    expect(screen.getByText('Ship feature')).toBeInTheDocument()
  })

  it('deletes a todo', async () => {
    const user = userEvent.setup()
    render(<Todos />)
    await add(user, 'Buy milk')

    await user.click(screen.getByRole('button', { name: 'Delete todo' }))
    expect(screen.queryByText('Buy milk')).not.toBeInTheDocument()
    expect(screen.getByText(/No todos yet/)).toBeInTheDocument()
  })

  it('persists todos to localStorage across remounts', async () => {
    const user = userEvent.setup()
    const { unmount } = render(<Todos />)
    await add(user, 'Persisted task')
    unmount()

    render(<Todos />)
    expect(screen.getByText('Persisted task')).toBeInTheDocument()
  })

  it('clears completed todos', async () => {
    const user = userEvent.setup()
    render(<Todos />)
    await add(user, 'Keep me')
    await add(user, 'Remove me')

    const removeRow = screen.getByText('Remove me').closest('li')!
    await user.click(within(removeRow).getByRole('checkbox'))
    await user.click(screen.getByRole('button', { name: 'Clear completed' }))

    expect(screen.getByText('Keep me')).toBeInTheDocument()
    expect(screen.queryByText('Remove me')).not.toBeInTheDocument()
  })
})
