import { Link } from 'react-router-dom'
import { Lock } from 'lucide-react'

// Temporary page body used by routes that are built in later batches
export default function PagePlaceholder({ icon: Icon, title, description, isPrivate = false }) {
  return (
    <section className="mx-auto flex min-h-[60vh] max-w-2xl flex-col items-center justify-center px-4 py-20 text-center">
      <span className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
        <Icon className="h-8 w-8" aria-hidden="true" />
      </span>
      <h1 className="text-3xl sm:text-4xl">{title}</h1>
      <p className="mt-4 text-base leading-relaxed text-base-content/70">{description}</p>

      {isPrivate && (
        <p className="mt-6 inline-flex items-center gap-2 rounded-full border border-base-300 bg-base-200 px-4 py-2 text-sm text-base-content/70">
          <Lock className="h-4 w-4" aria-hidden="true" />
          Members-only page. You are signed in.
        </p>
      )}

      <Link to="/" className="btn btn-primary mt-8">
        Back to home
      </Link>
    </section>
  )
}
