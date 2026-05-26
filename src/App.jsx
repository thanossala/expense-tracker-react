import { useExpenses } from './hooks/useExpenses'
import StatsBar from './components/StatsBar'
import AddExpenseForm from './components/AddExpenseForm'
import CategoryChart from './components/CategoryChart'
import ExpenseList from './components/ExpenseList'
import styles from './App.module.css'

export default function App() {
  const {
    expenses,
    addExpense,
    deleteExpense,
    totalAll,
    totalThisMonth,
    totalLastMonth,
  } = useExpenses()

  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <h1 className={styles.logo}>💸 Expense Tracker</h1>
        <p className={styles.sub}>Παρακολούθησε τα έξοδά σου</p>
      </header>

      <main className={styles.main}>
        {/* Στατιστικά πάνω-πάνω */}
        <StatsBar
          totalAll={totalAll}
          totalThisMonth={totalThisMonth}
          totalLastMonth={totalLastMonth}
          count={expenses.length}
        />

        {/* Φόρμα + Chart δίπλα-δίπλα */}
        <div className={styles.panels}>
          <AddExpenseForm onAdd={addExpense} />
          <CategoryChart expenses={expenses} />
        </div>

        {/* Λίστα συναλλαγών */}
        <ExpenseList expenses={expenses} onDelete={deleteExpense} />
      </main>
    </div>
  )
}
