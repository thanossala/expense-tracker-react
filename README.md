# 💸 Expense Tracker — React

Παρακολούθηση εξόδων φτιαγμένη με React + Vite.

## Features
- ✅ Προσθήκη / διαγραφή εξόδων
- ✅ Κατηγοριοποίηση (Φαγητό, Μεταφορά, κλπ)
- ✅ Donut chart + bar chart ανά κατηγορία
- ✅ Φίλτρα ανά κατηγορία
- ✅ Σύγκριση τρέχοντα vs προηγούμενου μήνα
- ✅ Export σε CSV
- ✅ localStorage persistence (τα δεδομένα δεν χάνονται)

## Tech Stack
- React 18 + Hooks (useState, useEffect, useRef)
- Vite
- Chart.js + react-chartjs-2
- CSS Modules

## Τοπική εκτέλεση

```bash
npm install
npm run dev
```

## Deploy στο GitHub Pages

```bash
npm run build
# Ανέβασε τον φάκελο dist στο GitHub Pages
```

## Δομή project

```
src/
├── components/
│   ├── StatsBar.jsx         # Τα 3 summary cards
│   ├── AddExpenseForm.jsx   # Φόρμα προσθήκης
│   ├── CategoryChart.jsx    # Donut + bars
│   └── ExpenseList.jsx      # Λίστα + φίλτρα + CSV export
├── hooks/
│   └── useExpenses.js       # Custom hook — όλο το state & localStorage
├── constants.js             # Κατηγορίες & αρχικά δεδομένα
├── App.jsx
└── index.css
```
