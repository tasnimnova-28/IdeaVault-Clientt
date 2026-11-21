import usePageTitle from '../hooks/usePageTitle'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { CalendarDays, Clock, Lock, Mail, ShieldCheck } from 'lucide-react'
import useAuth from '../hooks/useAuth'
import UserAvatar from '../components/common/UserAvatar'
import FormField from '../components/auth/FormField'
import { getAuthErrorMessage } from '../utils/authErrors'
import { isValidImageUrl } from '../utils/validators'
import { formatDate } from '../utils/formatters'

const providerLabels = {
  password: 'Email and password',
  'google.com': 'Google',
}

export default function Profile() {
    usePageTitle('Profile')
  const { user, updateUserProfile } = useAuth()
  // This page only renders for signed-in people (PrivateRoute), so `user` is always set here
  const [name, setName] = useState(user.displayName)
  const [photoURL, setPhotoURL] = useState(user.photoURL)
  const [errors, setErrors] = useState({})
  const [saving, setSaving] = useState(false)

  const hasChanges = name.trim() !== user.displayName || photoURL.trim() !== user.photoURL
  const providers = user.providers.map((id) => providerLabels[id] || id)

  // The preview uses what is typed so the person sees the result before saving,
  // but only when the link looks valid so we never request half-typed URLs
  const previewUser = {
    displayName: name || user.email,
    email: user.email,
    photoURL: isValidImageUrl(photoURL) ? photoURL.trim() : '',
  }

  const validate = () => {
    const next = {}
    if (!name.trim()) next.name = 'Your name cannot be empty.'
    if (!isValidImageUrl(photoURL)) next.photoURL = 'Enter a full link starting with http:// or https://'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (!validate()) return

    setSaving(true)
    try {
      await updateUserProfile({ displayName: name, photoURL })
      toast.success('Your profile has been updated.')
    } catch (error) {
      toast.error(getAuthErrorMessage(error))
    } finally {
      setSaving(false)
    }
  }

  const handleReset = () => {
    setName(user.displayName)
    setPhotoURL(user.photoURL)
    setErrors({})
  }

  return (
    <section className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
      <h1 className="text-3xl sm:text-4xl">My Profile</h1>
      <p className="mt-2 text-base-content/70">Manage how you appear to other IdeaVault members.</p>

      <div className="mt-8 grid gap-6 lg:grid-cols-5">
        {/* Summary card */}
        <aside className="h-fit rounded-2xl border border-base-300 bg-base-100 p-6 lg:col-span-2">
          <div className="flex flex-col items-center text-center">
            <UserAvatar user={previewUser} sizeClass="h-28 w-28 text-3xl" />
            <h2 className="mt-4 max-w-full truncate text-2xl">{user.displayName || 'IdeaVault member'}</h2>
            <p className="max-w-full truncate text-sm text-base-content/60">{user.email}</p>
          </div>

          <dl className="mt-6 space-y-4 border-t border-base-300 pt-6 text-sm">
            <div className="flex items-start gap-3">
              <dt className="flex shrink-0 items-center gap-2 text-base-content/60">
                <ShieldCheck className="h-4 w-4" aria-hidden="true" />
                Sign-in
              </dt>
              <dd className="ml-auto text-right font-medium">{providers.join(', ') || 'Unknown'}</dd>
            </div>
            <div className="flex items-start gap-3">
              <dt className="flex shrink-0 items-center gap-2 text-base-content/60">
                <Mail className="h-4 w-4" aria-hidden="true" />
                Email
              </dt>
              <dd className="ml-auto text-right font-medium">{user.emailVerified ? 'Verified' : 'Not verified'}</dd>
            </div>
            <div className="flex items-start gap-3">
              <dt className="flex shrink-0 items-center gap-2 text-base-content/60">
                <CalendarDays className="h-4 w-4" aria-hidden="true" />
                Joined
              </dt>
              <dd className="ml-auto text-right font-medium">{formatDate(user.createdAt)}</dd>
            </div>
            <div className="flex items-start gap-3">
              <dt className="flex shrink-0 items-center gap-2 text-base-content/60">
                <Clock className="h-4 w-4" aria-hidden="true" />
                Last sign-in
              </dt>
              <dd className="ml-auto text-right font-medium">{formatDate(user.lastSignInAt)}</dd>
            </div>
          </dl>
        </aside>

        {/* Edit form */}
        <div className="rounded-2xl border border-base-300 bg-base-100 p-6 sm:p-8 lg:col-span-3">
          <h2 className="text-2xl">Edit profile</h2>

          <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-5">
            <FormField id="profile-name" label="Full name" error={errors.name}>
              <input
                id="profile-name"
                type="text"
                autoComplete="name"
                value={name}
                onChange={(event) => {
                  setName(event.target.value)
                  setErrors((current) => ({ ...current, name: '' }))
                }}
                className={`input w-full ${errors.name ? 'input-error' : ''}`}
                aria-invalid={Boolean(errors.name)}
                aria-describedby={errors.name ? 'profile-name-message' : undefined}
              />
            </FormField>

            <FormField
              id="profile-photo"
              label="Photo URL"
              optional
              error={errors.photoURL}
              hint="A link to an image. Leave empty to show your initials."
            >
              <input
                id="profile-photo"
                type="url"
                autoComplete="off"
                placeholder="https://example.com/me.jpg"
                value={photoURL}
                onChange={(event) => {
                  setPhotoURL(event.target.value)
                  setErrors((current) => ({ ...current, photoURL: '' }))
                }}
                className={`input w-full ${errors.photoURL ? 'input-error' : ''}`}
                aria-invalid={Boolean(errors.photoURL)}
                aria-describedby="profile-photo-message"
              />
            </FormField>

            <FormField
              id="profile-email"
              label="Email"
              hint="Your email is tied to your sign-in method and cannot be changed here."
            >
              <div className="relative">
                <input
                  id="profile-email"
                  type="email"
                  value={user.email}
                  readOnly
                  disabled
                  className="input w-full pr-10"
                  aria-describedby="profile-email-message"
                />
                <Lock
                  className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-base-content/50"
                  aria-hidden="true"
                />
              </div>
            </FormField>

            <div className="flex flex-wrap gap-3 pt-2">
              <button type="submit" className="btn btn-primary" disabled={saving || !hasChanges}>
                {saving && <span className="loading loading-spinner loading-sm" aria-hidden="true" />}
                {saving ? 'Saving…' : 'Save changes'}
              </button>
              <button type="button" className="btn btn-ghost" onClick={handleReset} disabled={saving || !hasChanges}>
                Reset
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}
