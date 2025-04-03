import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { GenreSelect } from './genre-select.tsx'

describe('GenreSelect', () => {
  const options = ['Action', 'Comedy', 'Drama']
  const initialSelectedOptions = 'Comedy'
  test('renders options', () => {
    render(<GenreSelect options={options} selected={initialSelectedOptions} onSelect={vi.fn()} />)
    options.forEach((option) => {
      const renderedOption = screen.getByRole('option', { name: option })
      expect(renderedOption).toBeInTheDocument()
    })
  })

  test('selected genre is highlighted', async () => {
    const user = userEvent.setup()

    render(<GenreSelect options={options} selected={initialSelectedOptions} onSelect={vi.fn()} />)

    await user.click(screen.getByText('Select Genre'))

    expect(screen.getByTestId('select-option-Comedy')).toBeChecked()
  })

  test('"onChange" callback is called after item selected', async () => {
    const user = userEvent.setup()

    const onSelect = vi.fn()
    render(<GenreSelect options={options} selected={initialSelectedOptions} onSelect={onSelect} />)

    await user.click(screen.getByText('Select Genre'))

    await user.click(screen.getByTestId(`select-option-${options[2]}`))

    expect(onSelect).toHaveBeenCalledWith(options[2])
  })
})
