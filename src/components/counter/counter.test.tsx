import { describe, expect, test } from 'vitest'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import { Counter } from './counter'
import userEvent from '@testing-library/user-event'

const user = userEvent.setup()

describe('Counter Component', () => {
  test('Test that component renders initial value provided in props', () => {
    const { getByText } = render(<Counter initialValue={7} />)
    const renderedValue = getByText('7')
    expect(renderedValue).toBeInTheDocument()
  })
  test('Test that a click event on "decrement" button decrements the displayed value', async () => {
    const { getByText } = render(<Counter initialValue={7} />)
    const decrementButton = getByText('Decrement')
    await user.click(decrementButton)
    const decrementedValue = getByText("6");
    expect(decrementedValue).toBeInTheDocument();
  })
  test('Test that a click event on "increment" button increments the displayed value', async  () => {
    const { getByText } = render(<Counter initialValue={7} />)
    const incrementButton = getByText('Increment')
    await user.click(incrementButton)
    const incrementedValue = getByText("8");
    expect(incrementedValue).toBeInTheDocument();
  })
})
