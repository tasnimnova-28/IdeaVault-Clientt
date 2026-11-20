// Shown while Firebase checks for a saved session
export default function FullPageLoader({ label = 'Loading your account' }) {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4" role="status" aria-live="polite">
      <span className="loading loading-spinner loading-lg text-primary" aria-hidden="true" />
      <p className="text-sm text-base-content/70">{label}…</p>
    </div>
  )
}
