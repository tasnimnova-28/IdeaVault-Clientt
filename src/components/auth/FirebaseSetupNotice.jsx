import { TriangleAlert } from 'lucide-react'
import useAuth from '../../hooks/useAuth'

// Only visible while the Firebase keys are missing, so setup mistakes are obvious
export default function FirebaseSetupNotice() {
  const { isConfigured } = useAuth()
  if (isConfigured) return null

  return (
    <div role="alert" className="mb-6 flex items-start gap-3 rounded-2xl border border-warning/50 bg-warning/10 p-4 text-sm">
      <TriangleAlert className="mt-0.5 h-5 w-5 shrink-0 text-warning" aria-hidden="true" />
      <div className="leading-relaxed">
        <p className="font-semibold">Firebase is not configured yet</p>
        <p className="text-base-content/70">
          Copy <code className="rounded bg-base-200 px-1">.env.example</code> to{' '}
          <code className="rounded bg-base-200 px-1">.env.local</code>, paste your Firebase web app keys, then restart{' '}
          <code className="rounded bg-base-200 px-1">npm run dev</code>.
        </p>
      </div>
    </div>
  )
}
