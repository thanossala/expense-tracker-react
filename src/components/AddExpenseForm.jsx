import { useState } from 'react'
import { CATEGORIES } from '../constants'
import styles from './AddExpenseForm.module.css'

// Φόρμα προσθήκης νέου εξόδου
export default function AddExpenseForm({ onAdd }) {
  const today = new Date().toISOString().split('T')[0]

  const [form, setForm] = useState({
    desc: '',
    amount: '',
    cat: 'Φαγητό',
    date: today,
  })

  const [error, setError] = useState('')

  // Γενικός handler για όλα τα fields
  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
    setError('')
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    // Validation
    if (!form.desc.trim()) {
      setError('Συμπλήρωσε την περιγραφή.')
      return
    }
    const amount = parseFloat(form.amount)
    if (isNaN(amount) || amount <= 0) {
      setError('Το ποσό πρέπει να είναι θετικός αριθμός.')
      return
    }
    if (!form.date) {
      setError('Επίλεξε ημερομηνία.')
      return
    }

    onAdd({ desc: form.desc.trim(), amount, cat: form.cat, date: form.date })

    // Reset φόρμα
    setForm({ desc: '', amount: '', cat: 'Φαγητό', date: today })
  }

  return (
    <div className={styles.panel}>
      <h2 className={styles.title}>Νέο έξοδο</h2>

      <form onSubmit={handleSubmit} noValidate>
        <div className={styles.field}>
          <label className={styles.label}>Περιγραφή</label>
          <input
            type="text"
            name="desc"
            value={form.desc}
            onChange={handleChange}
            placeholder="π.χ. Σούπερ μάρκετ"
            autoComplete="off"
          />
        </div>

        <div className={styles.row}>
          <div className={styles.field}>
            <label className={styles.label}>Ποσό (€)</label>
            <input
              type="number"
              name="amount"
              value={form.amount}
              onChange={handleChange}
              placeholder="0.00"
              min="0"
              step="0.01"
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Ημερομηνία</label>
            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className={styles.field}>
          <label className={styles.label}>Κατηγορία</label>
          <select name="cat" value={form.cat} onChange={handleChange}>
            {CATEGORIES.map(c => (
              <option key={c.key} value={c.name}>{c.name}</option>
            ))}
          </select>
        </div>

        {error && <p className={styles.error}>{error}</p>}

        <button type="submit" className={styles.btn}>
          + Προσθήκη εξόδου
        </button>
      </form>
    </div>
  )
}
