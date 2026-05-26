// Κατηγορίες εξόδων
export const CATEGORIES = [
  { name: 'Φαγητό',     color: '#E24B4A', bg: 'var(--cat-food-bg)',   key: 'food'   },
  { name: 'Μεταφορά',   color: '#EF9F27', bg: 'var(--cat-trans-bg)',  key: 'trans'  },
  { name: 'Διασκέδαση', color: '#7F77DD', bg: 'var(--cat-fun-bg)',    key: 'fun'    },
  { name: 'Εκπαίδευση', color: '#378ADD', bg: 'var(--cat-edu-bg)',    key: 'edu'    },
  { name: 'Υγεία',      color: '#1D9E75', bg: 'var(--cat-health-bg)', key: 'health' },
  { name: 'Άλλο',       color: '#888780', bg: 'var(--cat-other-bg)',  key: 'other'  },
]

export const getCat = (name) =>
  CATEGORIES.find(c => c.name === name) || CATEGORIES[5]

// Αρχικά δεδομένα (demo)
export const INITIAL_EXPENSES = [
  { id: 1, desc: 'Σούπερ μάρκετ',  cat: 'Φαγητό',     amount: 42.50, date: '2026-05-20' },
  { id: 2, desc: 'Μετρό μηνιαίο',  cat: 'Μεταφορά',   amount: 30.00, date: '2026-05-01' },
  { id: 3, desc: 'Netflix',         cat: 'Διασκέδαση', amount: 15.99, date: '2026-05-05' },
  { id: 4, desc: 'Βιβλία CS',       cat: 'Εκπαίδευση', amount: 28.00, date: '2026-05-15' },
  { id: 5, desc: 'Φαρμακείο',       cat: 'Υγεία',      amount: 12.40, date: '2026-05-18' },
  { id: 6, desc: 'Καφές',           cat: 'Φαγητό',     amount: 18.00, date: '2026-04-25' },
  { id: 7, desc: 'Udemy course',    cat: 'Εκπαίδευση', amount: 14.99, date: '2026-04-10' },
]
