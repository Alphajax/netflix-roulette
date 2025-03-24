import { describe, expect, test, vi } from 'vitest'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import { Search } from './search.tsx'

const user = userEvent.setup()

describe('Search', () => {
  test('Test that component renders an input with the value equal to initial value passed in props', () => {
    const onSearch = vi.fn(() => null)
    const { getByTestId } = render(<Search initialSearch="netflix" onSearch={onSearch} />)
    expect(getByTestId('search-input')).toHaveValue('netflix')
  })
  test('Test that after typing to the input and a "click" event on the Submit button, the "onChange" prop is called with proper value', async () => {
    const onSearch = vi.fn(() => null)
    const { getByTestId } = render(<Search initialSearch="netf" onSearch={onSearch} />)
    const input = getByTestId('search-input')
    await user.type(input, 'lix')
    expect(input).toHaveValue('netflix')
  })
  test('Test that after typing to the input and pressing Enter key, the "onChange" prop is called with proper value', async () => {
    const onSearch = vi.fn(() => null)
    const { getByTestId } = render(<Search initialSearch="netf" onSearch={onSearch} />)
    const input = getByTestId('search-input')
    await user.type(input, 'lix')
    await user.keyboard('{enter}')
    expect(onSearch).toHaveBeenCalledWith('netflix')
  })
})
