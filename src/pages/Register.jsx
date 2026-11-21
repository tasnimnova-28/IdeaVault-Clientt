import usePageTitle from '../hooks/usePageTitle'
import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { toast } from 'react-toastify'
import { CircleAlert } from 'lucide-react'
import useAuth from '../hooks/useAuth'
import AuthShell from '../components/auth/AuthShell'
import FirebaseSetupNotice from '../components/auth/FirebaseSetupNotice'
import FormField from '../components/auth/FormField'
import PasswordInput from '../components/auth/PasswordInput'
import PasswordChecklist from '../components/auth/PasswordChecklist'
import GoogleButton from '../components/auth/GoogleButton'
import FormDivider from '../components/auth/FormDivider'
import { getAuthErrorMessage, isQuietAuthError } from '../utils/authErrors'
import { isStrongPassword, isValidEmail, isValidImageUrl } from '../utils/validators'

export default function Register() {
    usePageTitle('Register')
  const { register, loginWithGoogle } = useAuth()
  const location = useLocation()
  const [form, setForm] = useState({ name: '', email: '', photoURL: '', password: '', confirmPassword: '' })
  const [errors, setErrors] = useState({})
  const [formError, setFormError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [googleLoading, setGoogleLoading] = useState(false)
  const busy = submitting || googleLoading

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
    // Editing the password also clears a stale "passwords do not match" message
    setErrors((current) => ({ ...current, [name]: '', ...(name === 'password' ? { confirmPassword: '' } : {}) }))
    setFormError('')
  }

  const validate = () => {
    const next = {}
    if (!form.name.trim()) next.name = 'Enter your name.'
    if (!form.email.trim()) next.email = 'Enter your email address.'
    else if (!isValidEmail(form.email)) next.email = 'Enter a valid email address.'
    if (!isValidImageUrl(form.photoURL)) next.photoURL = 'Enter a full link starting with http:// or https://'
    if (!form.password) next.password = 'Create a password.'
    else if (!isStrongPassword(form.password)) next.password = 'Your password does not meet all the requirements.'
    if (!form.confirmPassword) next.confirmPassword = 'Confirm your password.'
    else if (form.confirmPassword !== form.password) next.confirmPassword = 'The passwords do not match.'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  // After registering, Firebase signs the person in and GuestRoute redirects them
  // to the page they originally wanted (or the homepage)
  const handleSubmit = async (event) => {
    event.preventDefault()
    if (!validate()) return

    setSubmitting(true)
    setFormError('')
    try {
      const { profileSaved } = await register(form)
      if (profileSaved) {
        toast.success(`Welcome to IdeaVault, ${form.name.trim().split(' ')[0]}!`)
      } else {
        toast.warning('Your account was created, but we could not save your name and photo. Add them on your profile page.')
      }
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
      title="Create your account"
      subtitle="It is free and takes less than a minute."
      footer={
        <>
          Already have an account?{' '}
          <Link to="/login" state={location.state} className="font-semibold text-primary hover:underline">
            Log in
          </Link>
        </>
      }
    >
      <FirebaseSetupNotice />

      <GoogleButton onClick={handleGoogle} disabled={busy} loading={googleLoading} label="Sign up with Google" />

      <FormDivider>or register with email</FormDivider>

      <form onSubmit={handleSubmit} noValidate className="space-y-5">
        <FormField id="name" label="Full name" error={errors.name}>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            placeholder="Nusrat Jahan"
            value={form.name}
            onChange={handleChange}
            className={`input w-full ${errors.name ? 'input-error' : ''}`}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? 'name-message' : undefined}
          />
        </FormField>

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
          id="photoURL"
          label="Photo URL"
          optional
          error={errors.photoURL}
          hint="Paste a link to a profile picture. You can change it later."
        >
          <input
            id="photoURL"
            name="photoURL"
            type="url"
            autoComplete="off"
            placeholder="https://example.com/me.jpg"
            value={form.photoURL}
            onChange={handleChange}
            className={`input w-full ${errors.photoURL ? 'input-error' : ''}`}
            aria-invalid={Boolean(errors.photoURL)}
            aria-describedby="photoURL-message"
          />
        </FormField>

        <div>
          <FormField id="password" label="Password" error={errors.password}>
            <PasswordInput
              id="password"
              name="password"
              autoComplete="new-password"
              placeholder="Create a password"
              value={form.password}
              onChange={handleChange}
              className={errors.password ? 'input-error' : ''}
              aria-invalid={Boolean(errors.password)}
              aria-describedby={errors.password ? 'password-message' : undefined}
            />
          </FormField>
          <PasswordChecklist password={form.password} />
        </div>

        <FormField id="confirmPassword" label="Confirm password" error={errors.confirmPassword}>
          <PasswordInput
            id="confirmPassword"
            name="confirmPassword"
            autoComplete="new-password"
            placeholder="Type your password again"
            value={form.confirmPassword}
            onChange={handleChange}
            className={errors.confirmPassword ? 'input-error' : ''}
            aria-invalid={Boolean(errors.confirmPassword)}
            aria-describedby={errors.confirmPassword ? 'confirmPassword-message' : undefined}
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
          {submitting ? 'Creating account…' : 'Create account'}
        </button>
      </form>
    </AuthShell>
  )
}
