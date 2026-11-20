// Rules shown live under the password field on the register page
export const passwordRules = [
  { id: 'length', label: 'At least 6 characters', test: (value) => value.length >= 6 },
  { id: 'upper', label: 'One uppercase letter', test: (value) => /[A-Z]/.test(value) },
  { id: 'lower', label: 'One lowercase letter', test: (value) => /[a-z]/.test(value) },
]

export function isStrongPassword(value) {
  return passwordRules.every((rule) => rule.test(value))
}

export function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())
}

// Empty is allowed (photo is optional); otherwise it must be an http(s) link
export function isValidImageUrl(value) {
  const trimmed = value.trim()
  if (!trimmed) return true
  try {
    const url = new URL(trimmed)
    return url.protocol === 'http:' || url.protocol === 'https:'
  } catch {
    return false
  }
}
