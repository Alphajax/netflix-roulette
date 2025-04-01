import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { GenreSelect } from './genre-select.tsx'

describe('GenreSelect', () => {
  const options = ['Action', 'Comedy', 'Drama']
  const initialSelectedOptions = 'Comedy'
  test('Test that component renders all genres passed in props', () => {
    render(<GenreSelect options={options} selected={initialSelectedOptions} onSelect={vi.fn()} />)
    options.forEach((option) => {
      const renderedOption = screen.getByText(option)
      expect(renderedOption).toBeInTheDocument()
    })
  })

  test('Test that component highlights a selected genre passed in props', async () => {
    const user = userEvent.setup()
    render(<GenreSelect options={options} selected={initialSelectedOptions} onSelect={vi.fn()} />)

    const select = screen.getByText('Select Genre')
    await user.click(select)

    const comedyCheckbox = screen.getByTestId('select-option-Comedy')
    expect(comedyCheckbox).toBeChecked()
  })

  test('Test that after a click event on a genre button component calls "onChange" callback and passes correct genre in arguments', async () => {
    const user = userEvent.setup()

    const onSelect = vi.fn()
    render(<GenreSelect options={options} selected={initialSelectedOptions} onSelect={onSelect} />)

    const select = screen.getByText('Select Genre')
    await user.click(select)

    const dramaOption = screen.getByTestId(`select-option-${options[2]}`)
    await user.click(dramaOption)

    expect(onSelect).toHaveBeenCalledWith(options[2])
  })
})
