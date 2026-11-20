import { Link } from 'react-router-dom'

// `inverted` is used on dark backgrounds such as the footer
export default function Logo({ inverted = false }) {
  return (
    <Link to="/" className="inline-flex items-center gap-2.5" aria-label="IdeaVault home">
      <svg viewBox="0 0 32 32" className="h-8 w-8" aria-hidden="true">
        <rect width="32" height="32" rx="9" className={inverted ? 'fill-neutral-content' : 'fill-primary'} />
        <path
          d="M16 6 18.6 13.4 26 16 18.6 18.6 16 26 13.4 18.6 6 16 13.4 13.4Z"
          className={inverted ? 'fill-primary' : 'fill-accent'}
        />
      </svg>
      <span
        className={`font-display text-xl font-semibold tracking-tight ${
          inverted ? 'text-neutral-content' : 'text-base-content'
        }`}
      >
        IdeaVault
      </span>
    </Link>
  )
}
