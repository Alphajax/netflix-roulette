import { describe, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { SortControl } from './sort-control.tsx'

describe('Sort Control', () => {
  test('renders correctly', () => {
    render(<SortControl value="TITLE" onChange={vi.fn()} />)
    expect(screen.getByRole('combobox', { name: 'Sort By' })).toBeInTheDocument()
  })
})
