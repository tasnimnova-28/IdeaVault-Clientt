import usePageTitle from '../hooks/usePageTitle'
import { Link } from 'react-router-dom'

export default function NotFound() {
  usePageTitle('404 - Not Found')
  return (
    <section className="mx-auto flex min-h-[60vh] max-w-2xl flex-col items-center justify-center px-4 py-20 text-center">
      <p className="font-display text-8xl font-semibold text-primary sm:text-9xl">404</p>
      <h1 className="mt-4 text-3xl sm:text-4xl">This page is not in the vault</h1>
      <p className="mt-4 leading-relaxed text-base-content/70">
        The link may be broken, or the page may have moved. Head back home or browse the latest startup ideas.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link to="/" className="btn btn-primary">
          Back to home
        </Link>
        <Link to="/ideas" className="btn btn-outline">
          Explore Ideas
        </Link>
      </div>
    </section>
  )
}
