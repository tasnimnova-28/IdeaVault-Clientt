import { Link } from 'react-router-dom'
import SectionHeading from '../common/SectionHeading'
import { categories } from '../../data/categories'

export default function CategorySection() {
  return (
    <section id="categories" className="bg-base-200 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Browse ideas by category"
          description="Pick an industry you care about and see what other founders are building in it."
        />

        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map(({ name, icon: Icon, description }) => (
            <li key={name}>
              <Link
                to={`/ideas?category=${encodeURIComponent(name)}`}
                className="group flex h-full items-start gap-4 rounded-2xl border border-base-300 bg-base-100 p-5 transition-colors hover:border-primary/50"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-content">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <span>
                  <span className="block font-semibold">{name}</span>
                  <span className="mt-1 block text-sm leading-relaxed text-base-content/70">{description}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
