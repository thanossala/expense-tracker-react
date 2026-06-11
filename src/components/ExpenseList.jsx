import { useState } from 'react'
import { CATEGORIES, getCat } from '../constants'
import styles from './ExpenseList.module.css'

const ALL = 'Όλα'

// Λίστα συναλλαγών με φίλτρα ανά κατηγορία + export CSV
export default function ExpenseList({ expenses, onDelete }) {
  const [filter, setFilter] = useState(ALL)

  const tabs = [ALL, ...CATEGORIES.map(c => c.name)]

  const filtered = filter === ALL
    ? expenses
    : expenses.filter(e => e.cat === filter)

  // Export CSV — killer feature για το portfolio!
  const exportCSV = () => {
    const header = 'Περιγραφή,Κατηγορία,Ποσό,Ημερομηνία'
    const rows = expenses.map(e =>
      `"${e.desc}","${e.cat}",${e.amount.toFixed(2)},${e.date}`
    )
    const csv = [header, ...rows].join('\n')
    const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `expenses-${new Date().toISOString().split('T')[0]}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  const formatDate = (dateStr) =>
    new Date(dateStr + 'T12:00:00').toLocaleDateString('el-GR', {
      day: '2-digit', month: 'short', year: 'numeric'
    })

  return (
    <div className={styles.panel}>
      {/* Header */}
      <div className={styles.header}>
        <h2 className={styles.title}>Συναλλαγές</h2>
        <button className={styles.exportBtn} onClick={exportCSV} title="Εξαγωγή CSV">
          ↓ CSV
        </button>
      </div>

      {/* Filter tabs */}
      <div className={styles.tabs}>
        {tabs.map(t => (
          <button
            key={t}
            className={`${styles.tab} ${filter === t ? styles.active : ''}`}
            onClick={() => setFilter(t)}
          >
            {t}
          </button>
        ))}
      </div>

      {/* List */}
      {filtered.length === 0 ? (
        <p className={styles.empty}>Δεν βρέθηκαν συναλλαγές.</p>
      ) : (
        <ul className={styles.list}>
          {filtered.map(expense => {
            const cat = getCat(expense.cat)
            return (
              <li key={expense.id} className={styles.item}>
                <div className={styles.itemLeft}>
                  <span
                    className={styles.badge}
                    style={{ background: cat.bg, color: cat.color }}
                  >
                    {expense.cat}
                  </span>
                  <div>
                    <p className={styles.desc}>{expense.desc}</p>
                    <p className={styles.date}>{formatDate(expense.date)}</p>
                  </div>
                </div>
                <div className={styles.itemRight}>
                  <span className={styles.amount}>€{expense.amount.toFixed(2)}</span>
                  <button
                    className={styles.delBtn}
                    onClick={() => onDelete(expense.id)}
                    aria-label="Διαγραφή"
                  >
                    ✕
                  </button>
                </div>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
