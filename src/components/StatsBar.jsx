import styles from './StatsBar.module.css'

// Εμφανίζει τα 3 summary cards πάνω-πάνω
export default function StatsBar({ totalAll, totalThisMonth, totalLastMonth, count }) {
  // Υπολογισμός % διαφοράς με τον προηγούμενο μήνα
  const diff = totalLastMonth > 0
    ? ((totalThisMonth - totalLastMonth) / totalLastMonth * 100).toFixed(1)
    : null

  const diffPositive = diff !== null && parseFloat(diff) > 0

  return (
    <div className={styles.grid}>
      <div className={styles.card}>
        <span className={styles.label}>Σύνολο εξόδων</span>
        <span className={`${styles.value} ${styles.accent}`}>
          €{totalAll.toFixed(2)}
        </span>
      </div>

      <div className={styles.card}>
        <span className={styles.label}>Αυτόν τον μήνα</span>
        <span className={styles.value}>€{totalThisMonth.toFixed(2)}</span>
        {diff !== null && (
          <span className={`${styles.badge} ${diffPositive ? styles.up : styles.down}`}>
            {diffPositive ? '▲' : '▼'} {Math.abs(parseFloat(diff))}% vs προηγ.
          </span>
        )}
      </div>

      <div className={styles.card}>
        <span className={styles.label}>Συναλλαγές</span>
        <span className={styles.value}>{count}</span>
      </div>
    </div>
  )
}
