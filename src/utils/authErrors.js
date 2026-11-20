// Turns Firebase error codes into messages a normal person can act on
const messages = {
  'app/not-configured': 'Firebase is not set up yet. Add your keys to .env.local and restart the dev server.',
  'auth/email-already-in-use': 'An account with this email already exists. Try logging in instead.',
  'auth/invalid-email': 'That email address does not look right.',
  'auth/weak-password': 'That password is too weak. Use at least 6 characters.',
  'auth/user-not-found': 'Incorrect email or password.',
  'auth/wrong-password': 'Incorrect email or password.',
  'auth/invalid-credential': 'Incorrect email or password.',
  'auth/user-disabled': 'This account has been disabled.',
  'auth/too-many-requests': 'Too many attempts. Please wait a few minutes and try again.',
  'auth/network-request-failed': 'Network error. Check your internet connection and try again.',
  'auth/popup-closed-by-user': 'The Google window was closed before sign-in finished.',
  'auth/cancelled-popup-request': 'Another sign-in window is already open.',
  'auth/popup-blocked': 'Your browser blocked the Google sign-in popup. Allow popups for this site and try again.',
  'auth/account-exists-with-different-credential':
    'This email is already registered with a different sign-in method.',
  'auth/operation-not-allowed':
    'This sign-in method is not enabled in your Firebase console (Authentication > Sign-in method).',
  'auth/unauthorized-domain':
    'This domain is not authorized. Add it in Firebase console > Authentication > Settings > Authorized domains.',
  'auth/invalid-api-key': 'The Firebase API key is invalid. Check your .env.local file.',
  'auth/api-key-not-valid.-please-pass-a-valid-api-key.':
    'The Firebase API key is invalid. Check your .env.local file.',
  'auth/configuration-not-found':
    'Authentication is not enabled for this Firebase project. Click "Get started" in Firebase console > Authentication.',
  'auth/requires-recent-login': 'Please log in again before making this change.',
}

// Errors the person caused by closing the popup are not worth a red toast
const quietCodes = new Set(['auth/popup-closed-by-user', 'auth/cancelled-popup-request'])

export function isQuietAuthError(error) {
  return quietCodes.has(error?.code)
}

export function getAuthErrorMessage(error) {
  return messages[error?.code] || 'Something went wrong. Please try again.'
}
