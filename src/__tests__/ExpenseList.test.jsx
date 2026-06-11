import { render, screen, fireEvent } from '@testing-library/react'
import { vi } from 'vitest'
import ExpenseList from '../components/ExpenseList'

const mockExpenses = [
  { id: 1, desc: 'Σούπερ μάρκετ', cat: 'Φαγητό',   amount: 42.50, date: '2026-05-20' },
  { id: 2, desc: 'Μετρό μηνιαίο', cat: 'Μεταφορά', amount: 30.00, date: '2026-05-01' },
]

// ─── Empty state ──────────────────────────────────────────────────────────────

describe('ExpenseList — empty state', () => {
  test('shows empty message when there are no expenses', () => {
    render(<ExpenseList expenses={[]} onDelete={vi.fn()} />)
    expect(screen.getByText('Δεν βρέθηκαν συναλλαγές.')).toBeInTheDocument()
  })

  test('does NOT render a list when expenses is empty', () => {
    render(<ExpenseList expenses={[]} onDelete={vi.fn()} />)
    expect(screen.queryByRole('list')).not.toBeInTheDocument()
  })
})

// ─── With expenses ────────────────────────────────────────────────────────────

describe('ExpenseList — with expenses', () => {
  test('renders the correct number of expense items', () => {
    render(<ExpenseList expenses={mockExpenses} onDelete={vi.fn()} />)
    expect(screen.getAllByRole('listitem')).toHaveLength(2)
  })

  test('displays description and amount for each expense', () => {
    render(<ExpenseList expenses={mockExpenses} onDelete={vi.fn()} />)
    expect(screen.getByText('Σούπερ μάρκετ')).toBeInTheDocument()
    expect(screen.getByText('€42.50')).toBeInTheDocument()
    expect(screen.getByText('Μετρό μηνιαίο')).toBeInTheDocument()
    expect(screen.getByText('€30.00')).toBeInTheDocument()
  })

  test('displays category badge for each expense', () => {
  render(<ExpenseList expenses={mockExpenses} onDelete={vi.fn()} />)
  // getAllByText γιατί το όνομα εμφανίζεται και στο filter tab και στο badge
  expect(screen.getAllByText('Φαγητό').length).toBeGreaterThanOrEqual(2)
  expect(screen.getAllByText('Μεταφορά').length).toBeGreaterThanOrEqual(2)
})

  test('does NOT show empty message when expenses exist', () => {
    render(<ExpenseList expenses={mockExpenses} onDelete={vi.fn()} />)
    expect(screen.queryByText('Δεν βρέθηκαν συναλλαγές.')).not.toBeInTheDocument()
  })
})

// ─── Filter tabs ──────────────────────────────────────────────────────────────

describe('ExpenseList — category filter', () => {
  test('renders "Όλα" tab as active by default', () => {
    render(<ExpenseList expenses={mockExpenses} onDelete={vi.fn()} />)
    expect(screen.getByRole('button', { name: 'Όλα' })).toBeInTheDocument()
  })

  test('filtering by category shows only matching expenses', () => {
    render(<ExpenseList expenses={mockExpenses} onDelete={vi.fn()} />)
    fireEvent.click(screen.getByRole('button', { name: 'Φαγητό' }))
    expect(screen.getByText('Σούπερ μάρκετ')).toBeInTheDocument()
    expect(screen.queryByText('Μετρό μηνιαίο')).not.toBeInTheDocument()
  })

  test('filtering by category with no matches shows empty message', () => {
    render(<ExpenseList expenses={mockExpenses} onDelete={vi.fn()} />)
    fireEvent.click(screen.getByRole('button', { name: 'Υγεία' }))
    expect(screen.getByText('Δεν βρέθηκαν συναλλαγές.')).toBeInTheDocument()
  })

  test('clicking "Όλα" after filter shows all expenses again', () => {
    render(<ExpenseList expenses={mockExpenses} onDelete={vi.fn()} />)
    fireEvent.click(screen.getByRole('button', { name: 'Φαγητό' }))
    fireEvent.click(screen.getByRole('button', { name: 'Όλα' }))
    expect(screen.getAllByRole('listitem')).toHaveLength(2)
  })
})

// ─── Delete ───────────────────────────────────────────────────────────────────

describe('ExpenseList — delete', () => {
  test('calls onDelete when delete button is clicked', () => {
    const onDelete = vi.fn()
    render(<ExpenseList expenses={mockExpenses} onDelete={onDelete} />)
    const deleteButtons = screen.getAllByRole('button', { name: 'Διαγραφή' })
    fireEvent.click(deleteButtons[0])
    expect(onDelete).toHaveBeenCalledTimes(1)
  })

  test('calls onDelete with the correct expense id', () => {
    const onDelete = vi.fn()
    render(<ExpenseList expenses={mockExpenses} onDelete={onDelete} />)
    const deleteButtons = screen.getAllByRole('button', { name: 'Διαγραφή' })
    fireEvent.click(deleteButtons[0])
    expect(onDelete).toHaveBeenCalledWith(1)
  })

  test('calls onDelete only once per click', () => {
    const onDelete = vi.fn()
    render(<ExpenseList expenses={mockExpenses} onDelete={onDelete} />)
    const deleteButtons = screen.getAllByRole('button', { name: 'Διαγραφή' })
    fireEvent.click(deleteButtons[1])
    expect(onDelete).toHaveBeenCalledTimes(1)
  })
})
