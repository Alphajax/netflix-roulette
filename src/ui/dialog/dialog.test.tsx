import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Dialog } from './dialog.tsx'
import { expect, vi } from 'vitest'

describe('Dialog', () => {
  test('renders with initial value', () => {
    render(<Dialog show children={<p>text</p>} title="Title" onClose={vi.fn} />)
    expect(screen.getByRole('dialog')).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Title' })).toBeInTheDocument()
    expect(screen.getByRole('paragraph')).toBeInTheDocument()
  })

  test('renders with "show" props set as "false" should not render ', () => {
    render(<Dialog children={<p>text</p>} show={false} title="Title" onClose={vi.fn} />)
    expect(screen.queryByRole('dialog')).toBeNull()
  })

  test('onClose callback is called when modal is closed', async () => {
    const user = userEvent.setup()
    const onClose = vi.fn()
    render(<Dialog show children={<p>text</p>} title="Title" onClose={onClose} />)
    expect(screen.getByRole('dialog')).toBeInTheDocument()
    await waitFor(async () => {
      const close = screen.queryByTestId('close')
      expect(close).not.toBeNull()
      await user.click(close as HTMLButtonElement)
      expect(onClose).toBeCalledTimes(1)
    })
  })
})
