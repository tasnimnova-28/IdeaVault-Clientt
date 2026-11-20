import SectionHeading from '../common/SectionHeading'
import { steps } from '../../data/howItWorks'

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-base-100 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="From first thought to real feedback in four steps"
          description="IdeaVault keeps the process simple, so you spend your time on the idea and not on the paperwork."
        />

        <ol className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map(({ title, description, icon: Icon }, index) => (
            <li key={title} className="relative">
              <div className="flex items-center gap-4">
                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-primary text-primary-content">
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </span>
                {/* Connecting line between steps on large screens */}
                {index < steps.length - 1 && (
                  <span className="hidden h-px flex-1 border-t-2 border-dashed border-base-300 lg:block" aria-hidden="true" />
                )}
              </div>
              <p className="mt-5 text-sm font-semibold text-primary">Step {index + 1}</p>
              <h3 className="mt-1 text-xl">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-base-content/70">{description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
