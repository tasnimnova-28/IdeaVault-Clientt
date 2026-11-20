import { useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify'
import { KeyRound, X } from 'lucide-react'
import FormField from './FormField'
import { isValidEmail } from '../../utils/validators'

// UI only: this screen is built but not connected to Firebase yet.
// Render it only while it should be open: {open && <ForgotPasswordModal onClose={...} />}
export default function ForgotPasswordModal({ defaultEmail = '', onClose }) {
  const dialogRef = useRef(null)
  const [email, setEmail] = useState(defaultEmail)
  const [error, setError] = useState('')

  // Native <dialog> gives us focus trapping and Escape-to-close for free
  useEffect(() => {
    const dialog = dialogRef.current
    if (dialog && !dialog.open) dialog.showModal()
  }, [])

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!email.trim()) return setError('Enter your email address.')
    if (!isValidEmail(email)) return setError('Enter a valid email address.')

    toast.info('Password reset is not available yet. It will be connected in a later update.')
    onClose()
  }

  return (
    <dialog ref={dialogRef} className="modal" onClose={onClose} aria-labelledby="forgot-title">
      <div className="modal-box max-w-md">
        <button
          type="button"
          className="btn btn-ghost btn-sm btn-circle absolute right-3 top-3"
          onClick={onClose}
          aria-label="Close"
        >
          <X className="h-4 w-4" aria-hidden="true" />
        </button>

        <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
          <KeyRound className="h-6 w-6" aria-hidden="true" />
        </span>
        <h2 id="forgot-title" className="mt-4 text-2xl">
          Forgot your password?
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-base-content/70">
          Enter the email you registered with and we will send you a link to choose a new password.
        </p>

        <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-5">
          <FormField id="reset-email" label="Email" error={error}>
            <input
              id="reset-email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value)
                setError('')
              }}
              className={`input w-full ${error ? 'input-error' : ''}`}
              aria-invalid={Boolean(error)}
              aria-describedby={error ? 'reset-email-message' : undefined}
            />
          </FormField>

          <div className="flex flex-wrap justify-end gap-3">
            <button type="button" className="btn btn-ghost" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Send reset link
            </button>
          </div>
        </form>
      </div>
      {/* Clicking the dimmed area closes the dialog */}
      <form method="dialog" className="modal-backdrop">
        <button type="submit" aria-label="Close">
          close
        </button>
      </form>
    </dialog>
  )
}
