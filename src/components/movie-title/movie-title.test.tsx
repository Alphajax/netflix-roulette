import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { MovieTitle } from './movie-title.tsx'
import { describe, expect, it, vi } from 'vitest'
import userEvent from '@testing-library/user-event'

const mockProps = {
  imgURL: 'https://example.com/image.jpg',
  name: 'Inception',
  year: 2010,
  genres: ['Action', 'Sci-Fi'],
  onClick: vi.fn(),
}

const user = userEvent.setup()

describe('MovieTitle Component', () => {
  it('renders correctly with given props', () => {
    render(<MovieTitle {...mockProps} />)

    expect(screen.getByText('Inception')).toBeInTheDocument()
    expect(screen.getByText('2010')).toBeInTheDocument()
    expect(screen.getByText('Action, Sci-Fi')).toBeInTheDocument()
    expect(screen.getByRole('img', { name: /Inception/i })).toHaveAttribute('src', mockProps.imgURL)
  })

  it('calls onClick when container is clicked', async () => {
    render(<MovieTitle {...mockProps} />)
    await user.click(screen.getByText('Inception'))
    expect(mockProps.onClick).toHaveBeenCalled()
  })

  it('opens and closes the modal correctly', async () => {
    render(<MovieTitle {...mockProps} />)

    const openIcon = screen.getByTestId('open-icon')
    await user.click(openIcon)
    expect(screen.getByText('Edit')).toBeInTheDocument()
    expect(screen.getByText('Delete')).toBeInTheDocument()

    const closeIcon = screen.getByTestId('close-icon')
    await user.click(closeIcon)
    expect(screen.queryByText('Edit')).not.toBeInTheDocument()
    expect(screen.queryByText('Delete')).not.toBeInTheDocument()
  })
})
