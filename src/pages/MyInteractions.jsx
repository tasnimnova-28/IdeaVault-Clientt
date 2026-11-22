
import usePageTitle from '../hooks/usePageTitle'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  MessagesSquare,
  Heart,
  MessageCircle,
  LoaderCircle,
  Lightbulb,
  ArrowRight,
} from 'lucide-react'

import useAuth from '../hooks/useAuth'

const API_URL = `${import.meta.env.VITE_API_URL}/ideas`

export default function MyInteractions() {
    usePageTitle('My Interactions')
  const { user, loading: authLoading } = useAuth()

  const [interactions, setInteractions] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  // Fetch ideas and filter current user's interactions
  useEffect(() => {
    if (authLoading) return

    if (!user?.uid) {
      setLoading(false)
      return
    }

    const fetchInteractions = async () => {
      setLoading(true)
      setError('')

      try {
        const response = await fetch(API_URL)

        if (!response.ok) {
          throw new Error('Failed to fetch ideas.')
        }

        const ideas = await response.json()

        const userInteractions = ideas
          .map((idea) => {
            const userLiked = idea.likes?.includes(user.uid) || false

            const userComments = (idea.comments || []).filter(
              (comment) => comment.userId === user.uid
            )

            return {
              ...idea,
              userLiked,
              userComments,
            }
          })
          .filter(
            (idea) => idea.userLiked || idea.userComments.length > 0
          )

        setInteractions(userInteractions)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchInteractions()
  }, [user?.uid, authLoading])

  // Loading screen
  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoaderCircle
          size={40}
          className="animate-spin text-primary"
        />
      </div>
    )
  }

  // Not logged in
  if (!user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <MessagesSquare size={48} className="opacity-40" />
        <h2 className="text-2xl font-bold">Please Log In</h2>
        <Link to="/login" className="btn btn-primary">
          Login
        </Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen px-4 py-12">
      <div className="max-w-6xl mx-auto">

        {/* Page Header */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-3">
            <MessagesSquare size={32} className="text-primary" />
            <h1 className="text-3xl md:text-4xl font-bold">
              My Interactions
            </h1>
          </div>

          <p className="opacity-70">
            All the ideas you have liked or commented on.
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="alert alert-error mb-6">
            <span>{error}</span>
          </div>
        )}

        {/* Interaction Summary */}
        {!error && (
          <div className="flex flex-wrap gap-4 mb-8">
            <div className="stat bg-base-200 rounded-xl flex-1 min-w-36">
              <div className="stat-title">Total Ideas</div>
              <div className="stat-value text-primary">
                {interactions.length}
              </div>
            </div>

            <div className="stat bg-base-200 rounded-xl flex-1 min-w-36">
              <div className="stat-title">Liked Ideas</div>
              <div className="stat-value text-error">
                {interactions.filter((idea) => idea.userLiked).length}
              </div>
            </div>

            <div className="stat bg-base-200 rounded-xl flex-1 min-w-36">
              <div className="stat-title">Comments</div>
              <div className="stat-value text-secondary">
                {interactions.reduce(
                  (total, idea) => total + idea.userComments.length,
                  0
                )}
              </div>
            </div>
          </div>
        )}

        {/* Interaction List */}
        {!error && interactions.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

            {interactions.map((idea) => (
              <div
                key={idea._id}
                className="card bg-base-100 border border-base-300 shadow-sm"
              >
                {/* Idea Image */}
                {idea.imageUrl ? (
                  <figure className="h-48">
                    <img
                      src={idea.imageUrl}
                      alt={idea.title}
                      className="w-full h-full object-cover"
                    />
                  </figure>
                ) : (
                  <div className="h-32 bg-base-200 flex items-center justify-center">
                    <Lightbulb size={40} className="opacity-30" />
                  </div>
                )}

                <div className="card-body">

                  {/* Category */}
                  <span className="badge badge-primary badge-outline w-fit">
                    {idea.category}
                  </span>

                  {/* Title */}
                  <h2 className="card-title text-xl">
                    {idea.title}
                  </h2>

                  {/* Description */}
                  <p className="text-sm opacity-70 line-clamp-3">
                    {idea.shortDescription}
                  </p>

                  {/* Interaction Types */}
                  <div className="flex flex-wrap gap-2 mt-2">

                    {idea.userLiked && (
                      <span className="badge badge-error gap-1">
                        <Heart size={13} fill="currentColor" />
                        Liked
                      </span>
                    )}

                    {idea.userComments.length > 0 && (
                      <span className="badge badge-secondary gap-1">
                        <MessageCircle size={13} />
                        Commented
                      </span>
                    )}

                  </div>

                  {/* User Comments */}
                  {idea.userComments.length > 0 && (
                    <div className="bg-base-200 rounded-lg p-3 mt-2">
                      <p className="text-xs font-semibold opacity-60 mb-2">
                        YOUR COMMENT
                      </p>

                      <p className="text-sm line-clamp-3">
                        {idea.userComments[idea.userComments.length - 1].text}
                      </p>

                      {idea.userComments.length > 1 && (
                        <p className="text-xs opacity-60 mt-2">
                          You commented {idea.userComments.length} times
                        </p>
                      )}
                    </div>
                  )}

                  {/* View Details */}
                  <div className="card-actions mt-4">
                    <Link
                      to={`/ideas/${idea._id}`}
                      className="btn btn-primary btn-block"
                    >
                      View Idea
                      <ArrowRight size={17} />
                    </Link>
                  </div>

                </div>
              </div>
            ))}

          </div>
        ) : (
          !error && (
            <div className="text-center py-20">
              <MessagesSquare
                size={64}
                className="mx-auto opacity-30 mb-5"
              />

              <h2 className="text-2xl font-bold mb-3">
                No Interactions Yet
              </h2>

              <p className="opacity-60 mb-6">
                Start exploring ideas and like or comment on the ones you find interesting.
              </p>

              <Link to="/ideas" className="btn btn-primary">
                Explore Ideas
                <ArrowRight size={18} />
              </Link>
            </div>
          )
        )}

      </div>
    </div>
  )
}
