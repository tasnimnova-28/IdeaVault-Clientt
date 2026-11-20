import { Link } from 'react-router-dom'
import { MessageCircle, Users, Wallet } from 'lucide-react'
import { getCategory } from '../../data/categories'
import { formatBudget, getInitials } from '../../utils/formatters'

export default function IdeaCard({ idea }) {
  const CategoryIcon = getCategory(idea.category)?.icon

  return (
    <article className="flex h-full flex-col rounded-2xl border border-base-300 bg-base-100 p-6 transition-colors hover:border-primary/50">
      <div className="flex items-center justify-between gap-3">
        <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
          {CategoryIcon && <CategoryIcon className="h-4 w-4" aria-hidden="true" />}
          {idea.category}
        </span>
        <span className="inline-flex items-center gap-1.5 text-sm text-base-content/60">
          <MessageCircle className="h-4 w-4" aria-hidden="true" />
          {idea.comments}
          <span className="sr-only">comments</span>
        </span>
      </div>

      <h3 className="mt-5 text-2xl">{idea.title}</h3>
      <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-base-content/70">{idea.shortDescription}</p>

      <ul className="mt-4 flex flex-wrap gap-2">
        {idea.tags.map((tag) => (
          <li key={tag} className="rounded-md bg-base-200 px-2 py-1 text-xs text-base-content/70">
            {tag}
          </li>
        ))}
      </ul>

      <dl className="mt-5 space-y-2.5 border-t border-base-300 pt-5 text-sm">
        <div className="flex items-start gap-2.5">
          <dt className="flex items-center gap-1.5 text-base-content/60">
            <Wallet className="h-4 w-4" aria-hidden="true" />
            Budget
          </dt>
          <dd className="ml-auto font-semibold">{formatBudget(idea.budget)}</dd>
        </div>
        <div className="flex items-start gap-2.5">
          <dt className="flex shrink-0 items-center gap-1.5 text-base-content/60">
            <Users className="h-4 w-4" aria-hidden="true" />
            Audience
          </dt>
          <dd className="ml-auto text-right">{idea.targetAudience}</dd>
        </div>
      </dl>

      <div className="mt-auto flex items-center justify-between gap-3 pt-6">
        <div className="flex min-w-0 items-center gap-2.5">
          <span
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-secondary text-xs font-semibold text-secondary-content"
            aria-hidden="true"
          >
            {getInitials(idea.creator)}
          </span>
          <span className="truncate text-sm">
            <span className="text-base-content/60">by </span>
            {idea.creator}
          </span>
        </div>
        <Link to={`/ideas/${idea.id}`} className="btn btn-primary btn-sm shrink-0">
          View Details
        </Link>
      </div>
    </article>
  )
}
