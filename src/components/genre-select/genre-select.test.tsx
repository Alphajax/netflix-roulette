import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { GenreSelect } from './genre-select.tsx'
import { expect } from 'vitest'

describe('GenreSelect', () => {
  const options = ['Action', 'Comedy', 'Drama']
  const initialSelectedOptions = ['Comedy']
  test('renders options', () => {
    render(
      <GenreSelect
        name="genres"
        options={options}
        selected={initialSelectedOptions}
        onSelect={vi.fn()}
      />,
    )
    options.forEach((option) => {
      const renderedOption = screen.getByRole('option', { name: option })
      expect(renderedOption).toBeInTheDocument()
    })
  })

  test('selected genre is highlighted', async () => {
    const user = userEvent.setup()

    render(
      <GenreSelect
        name="genres"
        options={options}
        selected={initialSelectedOptions}
        onSelect={vi.fn()}
      />,
    )

    await user.click(screen.getByTestId('select-option-genres'))
    await waitFor(() => {
      expect(screen.getByTestId('select-option-Comedy')).toBeChecked()
    })
  })

  test('"onChange" callback is called after item selected', async () => {
    const user = userEvent.setup()

    const onSelect = vi.fn()
    render(
      <GenreSelect
        name="genres"
        options={options}
        selected={initialSelectedOptions}
        onSelect={onSelect}
      />,
    )
    await user.click(screen.getByTestId(`select-option-genres`))
    await user.click(screen.getByTestId('select-option-Drama'))
    expect(onSelect).toHaveBeenCalledTimes(1)
  })
})
