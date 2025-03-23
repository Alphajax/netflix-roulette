import { describe, expect, test, vi } from 'vitest'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import { GenreSelect } from './genre-select.tsx'

const user = userEvent.setup()

describe('Search', () => {
  const options = ['Action', 'Comedy', 'Drama']
  const initialSelectedOptions = 'Comedy'
  test('Test that component renders all genres passed in props', () => {
    const onSelect = vi.fn(() => null)
    const { getByText } = render(
      <GenreSelect options={options} selected={initialSelectedOptions} onSelect={onSelect} />,
    )
    options.forEach((option) => {
      const renderedOption = getByText(option)
      expect(renderedOption).toBeInTheDocument()
    })
  })

  test('Test that component highlights a selected genre passed in props', async () => {
    const onSelect = vi.fn(() => null)
    const { getByText, getByTestId } = render(
      <GenreSelect options={options} selected={initialSelectedOptions} onSelect={onSelect} />,
    )

    const select = getByText('Select Genre')
    await user.click(select)

    const comedyCheckbox = getByTestId('select-option-Comedy')
    expect(comedyCheckbox).toBeChecked()
  })
  test('Test that after a click event on a genre button component calls "onChange" callback and passes correct genre in arguments', async () => {
    const onSelect = vi.fn(() => null)
    const { getByText, getByTestId } = render(
      <GenreSelect options={options} selected={initialSelectedOptions} onSelect={onSelect} />,
    )

    const select = getByText('Select Genre')
    await user.click(select)

    const dramaOption = getByTestId(`select-option-${options[2]}`)
    await user.click(dramaOption)

    expect(onSelect).toHaveBeenCalledWith(options[2])
  })
})
