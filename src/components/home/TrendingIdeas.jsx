
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { LoaderCircle, Lightbulb } from 'lucide-react'
import SectionHeading from '../common/SectionHeading'
import IdeaCard from '../ideas/IdeaCard'

const API_URL = `${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/ideas`

export default function TrendingIdeas() {
  const [ideas, setIdeas] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetch(`${API_URL}/trending`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch trending ideas')
        }

        return response.json()
      })
      .then((data) => {
        setIdeas(data)
        setLoading(false)
      })
      .catch((err) => {
        setError(err.message)
        setLoading(false)
      })
  }, [])

  return (
    <section className="bg-base-100 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        <SectionHeading
          title="Trending ideas this week"
          description="The concepts getting the most attention and discussion from the community right now."
          action={
            <Link to="/ideas" className="btn btn-outline self-start sm:self-auto">
              View all ideas
            </Link>
          }
        />

        {/* Loading */}
        {loading && (
          <div className="flex justify-center py-16">
            <LoaderCircle className="animate-spin text-primary" size={40} />
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="alert alert-error">
            <span>{error}. Please make sure the server is running.</span>
          </div>
        )}

        {/* No Ideas */}
        {!loading && !error && ideas.length === 0 && (
          <div className="py-16 text-center">
            <Lightbulb size={42} className="mx-auto mb-3 opacity-40" />
            <h3 className="text-xl font-semibold">No trending ideas yet</h3>
            <p className="mt-2 text-base-content/60">
              Be the first to share an idea with the community!
            </p>
          </div>
        )}

        {/* Trending Ideas */}
        {!loading && !error && ideas.length > 0 && (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {ideas.map((idea) => (
              <IdeaCard key={idea._id} idea={idea} />
            ))}
          </div>
        )}

      </div>
    </section>
  )
}
