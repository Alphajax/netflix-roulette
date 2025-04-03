import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Search } from './search.tsx'

const user = userEvent.setup()

describe('Search', () => {
  test('renders with initial value', () => {
    const onSearch = vi.fn(() => null)
    render(<Search initialSearch="netflix" onSearch={onSearch} />)
    expect(screen.getByRole('textbox')).toHaveValue('netflix')
  })
  test('submit correct search by click', async () => {
    const onSearch = vi.fn(() => null)
    render(<Search initialSearch="netf" onSearch={onSearch} />)
    const input = screen.getByRole('textbox')
    await user.type(input, 'lix')
    expect(input).toHaveValue('netflix')
    await user.click(screen.getByRole('button', { name: 'Search' }))
    expect(onSearch).toHaveBeenCalledWith('netflix')
  })
  test('submit correct search by press "Enter"', async () => {
    const onSearch = vi.fn(() => null)
    render(<Search initialSearch="netf" onSearch={onSearch} />)
    const input = screen.getByRole('textbox')
    await user.type(input, 'lix')
    await user.keyboard('{enter}')
    expect(onSearch).toHaveBeenCalledWith('netflix')
  })
})
