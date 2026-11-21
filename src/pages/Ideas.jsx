
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Lightbulb, Search, LoaderCircle } from 'lucide-react'

export default function Ideas() {
  const [ideas, setIdeas] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetch('http://localhost:5000/api/ideas')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch ideas')
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
    <div className="min-h-screen px-4 py-12">
      <div className="max-w-7xl mx-auto">

        {/* Page Heading */}
        <div className="text-center mb-10">
          <div className="flex justify-center mb-4">
            <Lightbulb size={40} className="text-primary" />
          </div>

          <h1 className="text-4xl font-bold mb-3">
            Explore Ideas
          </h1>

          <p className="opacity-70 max-w-2xl mx-auto">
            Discover creative startup ideas, explore innovations,
            and find inspiration for your next big project.
          </p>
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex justify-center py-20">
            <LoaderCircle className="animate-spin text-primary" size={40} />
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="alert alert-error max-w-xl mx-auto">
            <span>{error}. Please make sure the server is running.</span>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && ideas.length === 0 && (
          <div className="text-center py-20">
            <Lightbulb size={48} className="mx-auto mb-4 opacity-40" />

            <h2 className="text-2xl font-semibold mb-2">
              No ideas yet
            </h2>

            <p className="opacity-70">
              Be the first to share a startup idea!
            </p>
          </div>
        )}

        {/* Ideas Grid */}
        {!loading && !error && ideas.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

            {ideas.map((idea) => (
              <div
                key={idea._id}
                className="card bg-base-100 border border-base-300 shadow-sm hover:shadow-lg transition-all duration-300"
              >
                {/* Idea Image */}
                {idea.imageUrl && (
                  <figure className="h-52 overflow-hidden">
                    <img
                      src={idea.imageUrl}
                      alt={idea.title}
                      className="w-full h-full object-cover"
                    />
                  </figure>
                )}

                <div className="card-body">

                  {/* Category */}
                  <div>
                    <span className="badge badge-primary badge-outline">
                      {idea.category}
                    </span>
                  </div>

                  {/* Title */}
                  <h2 className="card-title text-xl">
                    {idea.title}
                  </h2>

                  {/* Description */}
                  <p className="text-sm opacity-70">
                    {idea.shortDescription}
                  </p>

                  {/* Author */}
                  <p className="text-xs opacity-60 mt-2">
                    By {idea.authorName}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mt-2">
                    {idea.tags?.slice(0, 3).map((tag, index) => (
                      <span key={index} className="badge badge-ghost badge-sm">
                        #{tag}
                      </span>
                    ))}
                  </div>

                  {/* View Details */}
                  <div className="card-actions justify-end mt-4">
                    <Link
                      to={`/ideas/${idea._id}`}
                      className="btn btn-primary btn-sm"
                    >
                      View Details
                    </Link>
                  </div>

                </div>
              </div>
            ))}

          </div>
        )}

      </div>
    </div>
  )
}
