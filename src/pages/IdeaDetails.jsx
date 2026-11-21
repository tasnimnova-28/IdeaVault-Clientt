
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import {
  ArrowLeft,
  Lightbulb,
  LoaderCircle,
  Heart,
  MessageCircle,
  User,
  Wallet,
  Users,
  Tag,
} from 'lucide-react'

export default function IdeaDetails() {
  const { id } = useParams()

  const [idea, setIdea] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetch(`http://localhost:5000/api/ideas/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Idea not found')
        }
        return response.json()
      })
      .then((data) => {
        setIdea(data)
        setLoading(false)
      })
      .catch((err) => {
        setError(err.message)
        setLoading(false)
      })
  }, [id])

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <LoaderCircle size={40} className="animate-spin text-primary" />
      </div>
    )
  }

  if (error || !idea) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 px-4">
        <Lightbulb size={48} className="opacity-40" />

        <h2 className="text-2xl font-bold">
          Idea not found
        </h2>

        <Link to="/ideas" className="btn btn-primary">
          Back to Ideas
        </Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen px-4 py-12">
      <div className="max-w-5xl mx-auto">

        {/* Back Button */}
        <Link
          to="/ideas"
          className="btn btn-ghost mb-6 gap-2"
        >
          <ArrowLeft size={18} />
          Back to Ideas
        </Link>

        {/* Idea Image */}
        {idea.imageUrl && (
          <div className="rounded-2xl overflow-hidden mb-8">
            <img
              src={idea.imageUrl}
              alt={idea.title}
              className="w-full h-64 md:h-96 object-cover"
            />
          </div>
        )}

        {/* Idea Header */}
        <div className="mb-8">
          <span className="badge badge-primary badge-outline mb-4">
            {idea.category}
          </span>

          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            {idea.title}
          </h1>

          <p className="text-lg opacity-70">
            {idea.shortDescription}
          </p>

          <div className="flex flex-wrap gap-4 mt-5 text-sm opacity-70">
            <span className="flex items-center gap-2">
              <User size={16} />
              {idea.authorName}
            </span>

            <span className="flex items-center gap-2">
              <Heart size={16} />
              {idea.likes?.length || 0} Likes
            </span>

            <span className="flex items-center gap-2">
              <MessageCircle size={16} />
              {idea.comments?.length || 0} Comments
            </span>
          </div>
        </div>

        {/* Detailed Description */}
        <div className="card bg-base-100 border border-base-300 shadow-sm mb-6">
          <div className="card-body">
            <h2 className="text-2xl font-bold mb-3">
              About This Idea
            </h2>

            <p className="leading-8 opacity-80 whitespace-pre-wrap">
              {idea.detailedDescription}
            </p>
          </div>
        </div>

        {/* Problem Statement */}
        {idea.problemStatement && (
          <div className="card bg-base-100 border border-base-300 shadow-sm mb-6">
            <div className="card-body">
              <h2 className="text-2xl font-bold mb-3">
                The Problem
              </h2>

              <p className="leading-8 opacity-80 whitespace-pre-wrap">
                {idea.problemStatement}
              </p>
            </div>
          </div>
        )}

        {/* Proposed Solution */}
        {idea.proposedSolution && (
          <div className="card bg-base-100 border border-base-300 shadow-sm mb-6">
            <div className="card-body">
              <h2 className="text-2xl font-bold mb-3">
                Proposed Solution
              </h2>

              <p className="leading-8 opacity-80 whitespace-pre-wrap">
                {idea.proposedSolution}
              </p>
            </div>
          </div>
        )}

        {/* Additional Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">

          {/* Target Audience */}
          {idea.targetAudience && (
            <div className="card bg-base-100 border border-base-300 shadow-sm">
              <div className="card-body">
                <div className="flex items-center gap-2 text-primary">
                  <Users size={20} />
                  <h2 className="font-bold text-lg">
                    Target Audience
                  </h2>
                </div>

                <p className="opacity-80">
                  {idea.targetAudience}
                </p>
              </div>
            </div>
          )}

          {/* Budget */}
          {idea.budget > 0 && (
            <div className="card bg-base-100 border border-base-300 shadow-sm">
              <div className="card-body">
                <div className="flex items-center gap-2 text-primary">
                  <Wallet size={20} />
                  <h2 className="font-bold text-lg">
                    Estimated Budget
                  </h2>
                </div>

                <p className="text-2xl font-bold">
                  ৳{idea.budget.toLocaleString('en-BD')}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Tags */}
        {idea.tags?.length > 0 && (
          <div className="card bg-base-100 border border-base-300 shadow-sm mb-6">
            <div className="card-body">
              <div className="flex items-center gap-2 mb-3">
                <Tag size={20} className="text-primary" />
                <h2 className="text-xl font-bold">
                  Tags
                </h2>
              </div>

              <div className="flex flex-wrap gap-2">
                {idea.tags.map((tag, index) => (
                  <span key={index} className="badge badge-outline badge-lg">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Bottom Button */}
        <div className="text-center mt-10">
          <Link to="/ideas" className="btn btn-primary">
            <ArrowLeft size={18} />
            Explore More Ideas
          </Link>
        </div>

      </div>
    </div>
  )
}
