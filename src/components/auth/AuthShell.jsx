import { Check } from 'lucide-react'

const highlights = [
  'Post startup ideas with budget, audience and solution',
  'Comment on and learn from other founders',
  'Keep every conversation in one place',
]

// Two-column layout shared by the login and register pages.
// The teal brand panel is hidden on small screens so the form gets the full width.
export default function AuthShell({ title, subtitle, children, footer }) {
  return (
    <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
      <div className="grid overflow-hidden rounded-[2rem] border border-base-300 bg-base-100 lg:grid-cols-5">
        <aside className="hidden flex-col justify-between bg-primary p-10 text-primary-content lg:col-span-2 lg:flex">
          <div>
            <h2 className="text-3xl leading-tight">Your ideas, kept in the vault</h2>
            <p className="mt-4 leading-relaxed text-primary-content/80">
              Join students and founders who share what they are building and help each other sharpen it.
            </p>
          </div>
          <ul className="mt-10 space-y-4">
            {highlights.map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm leading-relaxed">
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent text-accent-content">
                  <Check className="h-4 w-4" aria-hidden="true" />
                </span>
                {item}
              </li>
            ))}
          </ul>
        </aside>

        <div className="p-6 sm:p-10 lg:col-span-3">
          <div className="mx-auto max-w-md">
            <h1 className="text-3xl sm:text-4xl">{title}</h1>
            <p className="mt-2 text-base-content/70">{subtitle}</p>
            <div className="mt-8">{children}</div>
            {footer && <p className="mt-8 text-center text-sm text-base-content/70">{footer}</p>}
          </div>
        </div>
      </div>
    </section>
  )
}
