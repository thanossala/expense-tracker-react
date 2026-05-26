import { useState, useEffect } from 'react'
import { INITIAL_EXPENSES } from '../constants'

const STORAGE_KEY = 'expense-tracker-expenses'

// Custom Hook — διαχειρίζεται όλο το state & localStorage
export function useExpenses() {
  // Φόρτωσε από localStorage ή χρησιμοποίησε τα αρχικά δεδομένα
  const [expenses, setExpenses] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      return saved ? JSON.parse(saved) : INITIAL_EXPENSES
    } catch {
      return INITIAL_EXPENSES
    }
  })

  // Αποθήκευε αυτόματα κάθε φορά που αλλάζουν τα expenses
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(expenses))
  }, [expenses])

  // Προσθήκη νέου εξόδου
  const addExpense = (expense) => {
    const newExpense = {
      ...expense,
      id: Date.now(), // unique id
    }
    setExpenses(prev => [newExpense, ...prev])
  }

  // Διαγραφή εξόδου
  const deleteExpense = (id) => {
    setExpenses(prev => prev.filter(e => e.id !== id))
  }

  // Υπολογισμοί
  const totalAll = expenses.reduce((sum, e) => sum + e.amount, 0)

  const totalThisMonth = expenses.filter(e => {
    const d = new Date(e.date + 'T12:00:00')
    const now = new Date()
    return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear()
  }).reduce((sum, e) => sum + e.amount, 0)

  const totalLastMonth = expenses.filter(e => {
    const d = new Date(e.date + 'T12:00:00')
    const now = new Date()
    const lastMonth = now.getMonth() === 0 ? 11 : now.getMonth() - 1
    const lastMonthYear = now.getMonth() === 0 ? now.getFullYear() - 1 : now.getFullYear()
    return d.getMonth() === lastMonth && d.getFullYear() === lastMonthYear
  }).reduce((sum, e) => sum + e.amount, 0)

  return {
    expenses,
    addExpense,
    deleteExpense,
    totalAll,
    totalThisMonth,
    totalLastMonth,
  }
}
