import { Link } from 'react-router-dom'
import { Check } from 'lucide-react'
import useAuth from '../../hooks/useAuth'

const benefits = [
  'Describe the problem, solution, budget and audience in one place',
  'Collect comments and questions from other members',
  'Edit or remove your ideas whenever you like',
]

export default function JoinCta() {
  const { user } = useAuth()

  return (
    <section className="bg-base-200 py-16 sm:py-20" aria-labelledby="join-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 rounded-[2rem] bg-primary px-6 py-12 text-primary-content sm:px-12 lg:grid-cols-2 lg:gap-16 lg:py-16">
          <div>
            <h2 id="join-heading" className="text-3xl leading-tight sm:text-4xl">
              Your next big idea deserves an audience
            </h2>
            <p className="mt-4 max-w-lg leading-relaxed text-primary-content/80">
              Create a free account to post your ideas, join the discussion on other people’s work and keep track of every
              conversation you take part in.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              {user ? (
                <Link to="/add-idea" className="btn btn-accent btn-lg">
                  Share your idea
                </Link>
              ) : (
                <Link to="/register" className="btn btn-accent btn-lg">
                  Create free account
                </Link>
              )}
              <Link
                to="/ideas"
                className="btn btn-lg border-primary-content/40 bg-transparent text-primary-content hover:bg-primary-content/10"
              >
                Browse ideas
              </Link>
            </div>
          </div>

          <ul className="space-y-4">
            {benefits.map((benefit) => (
              <li key={benefit} className="flex items-start gap-3">
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent text-accent-content">
                  <Check className="h-4 w-4" aria-hidden="true" />
                </span>
                <span className="leading-relaxed">{benefit}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
