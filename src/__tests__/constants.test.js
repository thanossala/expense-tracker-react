import { CATEGORIES, getCat, INITIAL_EXPENSES } from '../constants'

// ─── CATEGORIES ───────────────────────────────────────────────────────────────

describe('CATEGORIES', () => {
  test('contains exactly 6 categories', () => {
    expect(CATEGORIES).toHaveLength(6)
  })

  test('every category has required fields: name, color, bg, key', () => {
    CATEGORIES.forEach(cat => {
      expect(cat).toHaveProperty('name')
      expect(cat).toHaveProperty('color')
      expect(cat).toHaveProperty('bg')
      expect(cat).toHaveProperty('key')
    })
  })

  test('all category names are unique', () => {
    const names = CATEGORIES.map(c => c.name)
    const unique = new Set(names)
    expect(unique.size).toBe(CATEGORIES.length)
  })

  test('all category keys are unique', () => {
    const keys = CATEGORIES.map(c => c.key)
    const unique = new Set(keys)
    expect(unique.size).toBe(CATEGORIES.length)
  })
})

// ─── getCat ───────────────────────────────────────────────────────────────────

describe('getCat', () => {
  test('returns the correct category for a known name', () => {
    const cat = getCat('Φαγητό')
    expect(cat.key).toBe('food')
    expect(cat.name).toBe('Φαγητό')
  })

  test('returns the correct category for every defined category', () => {
    CATEGORIES.forEach(c => {
      expect(getCat(c.name)).toEqual(c)
    })
  })

  test('returns fallback (Άλλο) for an unknown category name', () => {
    const fallback = getCat('Αγνωστο')
    expect(fallback.key).toBe('other')
  })

  test('returns fallback for empty string', () => {
    const fallback = getCat('')
    expect(fallback.key).toBe('other')
  })

  test('is case-sensitive — wrong case returns fallback', () => {
    const result = getCat('φαγητό') // lowercase
    expect(result.key).toBe('other')
  })
})

// ─── INITIAL_EXPENSES ─────────────────────────────────────────────────────────

describe('INITIAL_EXPENSES', () => {
  test('is a non-empty array', () => {
    expect(Array.isArray(INITIAL_EXPENSES)).toBe(true)
    expect(INITIAL_EXPENSES.length).toBeGreaterThan(0)
  })

  test('every expense has required fields: id, desc, cat, amount, date', () => {
    INITIAL_EXPENSES.forEach(exp => {
      expect(exp).toHaveProperty('id')
      expect(exp).toHaveProperty('desc')
      expect(exp).toHaveProperty('cat')
      expect(exp).toHaveProperty('amount')
      expect(exp).toHaveProperty('date')
    })
  })

  test('all expense ids are unique', () => {
    const ids = INITIAL_EXPENSES.map(e => e.id)
    const unique = new Set(ids)
    expect(unique.size).toBe(INITIAL_EXPENSES.length)
  })

  test('all amounts are positive numbers', () => {
    INITIAL_EXPENSES.forEach(exp => {
      expect(typeof exp.amount).toBe('number')
      expect(exp.amount).toBeGreaterThan(0)
    })
  })

  test('all categories belong to CATEGORIES list', () => {
    const validNames = CATEGORIES.map(c => c.name)
    INITIAL_EXPENSES.forEach(exp => {
      expect(validNames).toContain(exp.cat)
    })
  })

  test('all dates are in YYYY-MM-DD format', () => {
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/
    INITIAL_EXPENSES.forEach(exp => {
      expect(exp.date).toMatch(dateRegex)
    })
  })
})
