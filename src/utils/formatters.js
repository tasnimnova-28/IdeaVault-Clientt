// Turns 12000 into "$12,000"
export function formatBudget(amount) {
  return `$${Number(amount).toLocaleString('en-US')}`
}

// Turns "Nusrat Jahan" into "NJ"
export function getInitials(name = '') {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0].toUpperCase())
    .join('')
}

// Turns a date string from Firebase into "Nov 20, 2026"
export function formatDate(value) {
  if (!value) return 'Unknown'
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return 'Unknown'
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
}
