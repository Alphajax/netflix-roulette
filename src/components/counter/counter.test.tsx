import { render, screen } from '@testing-library/react'
import { Counter } from './counter'
import userEvent from '@testing-library/user-event'

describe('Counter Component', () => {
  test('renders initial value', () => {
    render(<Counter initialValue={7} />)
    expect(screen.getByText('7')).toBeInTheDocument()
  })
  test('decrements the displayed value on "Decrement" click', async () => {
    const user = userEvent.setup()
    render(<Counter initialValue={7} />)
    const decrementButton = screen.getByRole('button', { name: 'Decrement' })
    await user.click(decrementButton)
    const decrementedValue = screen.getByRole('heading')
    expect(decrementedValue).toBeInTheDocument()
  })
  test('increments the displayed value on "Increment" click', async () => {
    const user = userEvent.setup()
    render(<Counter initialValue={7} />)
    const incrementButton = screen.getByRole('button', { name: 'Increment' })
    await user.click(incrementButton)
    const incrementedValue = screen.getByRole('heading')
    expect(incrementedValue).toBeInTheDocument()
  })
})
