import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { GenreSelect } from './genre-select.tsx'
import { expect } from 'vitest'

describe('GenreSelect', () => {
  const options = ['Action', 'Comedy', 'Drama']
  const initialSelectedOptions = ['Comedy']

  test('selected genre is highlighted', async () => {
    const user = userEvent.setup()

    render(<GenreSelect options={options} value={initialSelectedOptions} onChange={vi.fn()} />)

    await user.click(screen.getByTestId('select-option-genres'))
    expect(screen.getByTestId('select-option-Comedy')).toBeChecked()
  })

  test('"onChange" callback is called after item selected', async () => {
    const user = userEvent.setup()

    const onSelect = vi.fn()
    render(<GenreSelect options={options} value={initialSelectedOptions} onChange={onSelect} />)
    await user.click(screen.getByTestId(`select-option-genres`))
    await user.click(screen.getByTestId('select-option-Drama'))
    expect(onSelect).toHaveBeenCalledTimes(1)
  })
})
