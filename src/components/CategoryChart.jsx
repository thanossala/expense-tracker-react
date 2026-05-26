import { useRef, useEffect } from 'react'
import { Chart, ArcElement, Tooltip, Legend, DoughnutController } from 'chart.js'
import { CATEGORIES } from '../constants'
import styles from './CategoryChart.module.css'

Chart.register(ArcElement, Tooltip, Legend, DoughnutController)

// Δείχνει donut chart + bars ανά κατηγορία
export default function CategoryChart({ expenses }) {
  const canvasRef = useRef(null)
  const chartRef  = useRef(null)

  // Υπολογισμός συνόλου ανά κατηγορία
  const data = CATEGORIES.map(cat => ({
    ...cat,
    total: expenses
      .filter(e => e.cat === cat.name)
      .reduce((sum, e) => sum + e.amount, 0),
  })).filter(c => c.total > 0)

  const maxTotal = Math.max(...data.map(c => c.total), 1)

  // Δημιουργία / ενημέρωση Chart.js
  useEffect(() => {
    if (!canvasRef.current) return

    if (chartRef.current) chartRef.current.destroy()

    if (data.length === 0) return

    chartRef.current = new Chart(canvasRef.current, {
      type: 'doughnut',
      data: {
        labels: data.map(c => c.name),
        datasets: [{
          data: data.map(c => c.total),
          backgroundColor: data.map(c => c.color),
          borderWidth: 0,
          hoverOffset: 6,
        }],
      },
      options: {
        cutout: '68%',
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: ctx => ` €${ctx.parsed.toFixed(2)}`,
            },
          },
        },
        animation: { animateRotate: true, duration: 700 },
      },
    })

    return () => {
      if (chartRef.current) chartRef.current.destroy()
    }
  }, [expenses]) // ξανατρέχει όταν αλλάζουν τα expenses

  return (
    <div className={styles.panel}>
      <h2 className={styles.title}>Ανά κατηγορία</h2>

      {data.length === 0 ? (
        <p className={styles.empty}>Δεν υπάρχουν δεδομένα ακόμα.</p>
      ) : (
        <>
          {/* Donut chart */}
          <div className={styles.chartWrap}>
            <canvas ref={canvasRef} />
          </div>

          {/* Legend */}
          <div className={styles.legend}>
            {data.map(c => (
              <div key={c.key} className={styles.legendItem}>
                <span className={styles.dot} style={{ background: c.color }} />
                {c.name}
              </div>
            ))}
          </div>

          {/* Bar chart */}
          <div className={styles.bars}>
            {data.map(c => (
              <div key={c.key} className={styles.barRow}>
                <span className={styles.barLabel}>{c.name}</span>
                <div className={styles.barTrack}>
                  <div
                    className={styles.barFill}
                    style={{
                      width: `${(c.total / maxTotal * 100).toFixed(1)}%`,
                      background: c.color,
                    }}
                  />
                </div>
                <span className={styles.barVal}>€{c.total.toFixed(2)}</span>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
