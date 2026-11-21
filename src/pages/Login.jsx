import usePageTitle from '../hooks/usePageTitle'
import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { toast } from 'react-toastify'
import { CircleAlert, Info } from 'lucide-react'
import useAuth from '../hooks/useAuth'
import AuthShell from '../components/auth/AuthShell'
import FirebaseSetupNotice from '../components/auth/FirebaseSetupNotice'
import FormField from '../components/auth/FormField'
import PasswordInput from '../components/auth/PasswordInput'
import GoogleButton from '../components/auth/GoogleButton'
import FormDivider from '../components/auth/FormDivider'
import ForgotPasswordModal from '../components/auth/ForgotPasswordModal'
import { getAuthErrorMessage, isQuietAuthError } from '../utils/authErrors'
import { isValidEmail } from '../utils/validators'

export default function Login() {
    usePageTitle('Login')
  const { login, loginWithGoogle } = useAuth()
  const location = useLocation()
  // PrivateRoute passes the page the person wanted in `location.state.from`
  const cameFromPrivatePage = Boolean(location.state?.from)
  const [showForgot, setShowForgot] = useState(false)
  const [form, setForm] = useState({ email: '', password: '' })
  const [errors, setErrors] = useState({})
  const [formError, setFormError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [googleLoading, setGoogleLoading] = useState(false)
  const busy = submitting || googleLoading

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
    setErrors((current) => ({ ...current, [name]: '' }))
    setFormError('')
  }

  const validate = () => {
    const next = {}
    if (!form.email.trim()) next.email = 'Enter your email address.'
    else if (!isValidEmail(form.email)) next.email = 'Enter a valid email address.'
    if (!form.password) next.password = 'Enter your password.'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  // After a successful login the GuestRoute wrapper sends the person to the page they came from
  const handleSubmit = async (event) => {
    event.preventDefault()
    if (!validate()) return

    setSubmitting(true)
    setFormError('')
    try {
      await login(form)
      toast.success('Welcome back to IdeaVault!')
    } catch (error) {
      const message = getAuthErrorMessage(error)
      setFormError(message)
      toast.error(message)
    } finally {
      setSubmitting(false)
    }
  }

  const handleGoogle = async () => {
    setGoogleLoading(true)
    setFormError('')
    try {
      await loginWithGoogle()
      toast.success('Signed in with Google.')
    } catch (error) {
      if (!isQuietAuthError(error)) {
        const message = getAuthErrorMessage(error)
        setFormError(message)
        toast.error(message)
      }
    } finally {
      setGoogleLoading(false)
    }
  }

  return (
    <AuthShell
      title="Welcome back"
      subtitle="Log in to share ideas and join the conversation."
      footer={
        <>
          New to IdeaVault?{' '}
          <Link to="/register" state={location.state} className="font-semibold text-primary hover:underline">
            Create an account
          </Link>
        </>
      }
    >
      <FirebaseSetupNotice />

      {cameFromPrivatePage && (
        <div role="status" className="mb-6 flex items-start gap-2.5 rounded-xl bg-info/10 p-3 text-sm">
          <Info className="mt-0.5 h-4 w-4 shrink-0 text-info" aria-hidden="true" />
          Please log in to continue. We will take you straight back to that page.
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate className="space-y-5">
        <FormField id="email" label="Email" error={errors.email}>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            value={form.email}
            onChange={handleChange}
            className={`input w-full ${errors.email ? 'input-error' : ''}`}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? 'email-message' : undefined}
          />
        </FormField>

        <FormField
          id="password"
          label="Password"
          error={errors.password}
          action={
            <button
              type="button"
              onClick={() => setShowForgot(true)}
              className="text-xs font-semibold text-primary hover:underline"
            >
              Forgot password?
            </button>
          }
        >
          <PasswordInput
            id="password"
            name="password"
            autoComplete="current-password"
            placeholder="Your password"
            value={form.password}
            onChange={handleChange}
            className={errors.password ? 'input-error' : ''}
            aria-invalid={Boolean(errors.password)}
            aria-describedby={errors.password ? 'password-message' : undefined}
          />
        </FormField>

        {formError && (
          <div role="alert" className="flex items-start gap-2.5 rounded-xl bg-error/10 p-3 text-sm text-error">
            <CircleAlert className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
            {formError}
          </div>
        )}

        <button type="submit" className="btn btn-primary btn-lg w-full" disabled={busy}>
          {submitting && <span className="loading loading-spinner loading-sm" aria-hidden="true" />}
          {submitting ? 'Logging in…' : 'Log in'}
        </button>
      </form>

      <FormDivider>or</FormDivider>

      <GoogleButton onClick={handleGoogle} disabled={busy} loading={googleLoading} />

      {showForgot && <ForgotPasswordModal defaultEmail={form.email} onClose={() => setShowForgot(false)} />}
    </AuthShell>
  )
}
