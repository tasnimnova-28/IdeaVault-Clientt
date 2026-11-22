
import usePageTitle from '../hooks/usePageTitle'
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
  Send,
  Pencil,
  Trash2,
  X,
  Check,
} from 'lucide-react'

import useAuth from '../hooks/useAuth'

const API_URL = `${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/ideas`

export default function IdeaDetails() {
  usePageTitle('Idea Details')
  const { id } = useParams()
  const { user, getIdToken } = useAuth()

  const [idea, setIdea] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const [commentText, setCommentText] = useState('')
  const [commentLoading, setCommentLoading] = useState(false)
  const [commentError, setCommentError] = useState('')

  const [editingCommentId, setEditingCommentId] = useState(null)
  const [editingText, setEditingText] = useState('')
  const [actionError, setActionError] = useState('')
  const [deletingCommentId, setDeletingCommentId] = useState(null)

  const [likeLoading, setLikeLoading] = useState(false)
  const [likeError, setLikeError] = useState('')

  // Fetch idea details (public route)
  useEffect(() => {
    setLoading(true)
    setError('')

    fetch(`${API_URL}/${id}`)
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

  const isLiked = idea?.likes?.includes(user?.uid)

  // Like / Unlike idea
  const handleLike = async () => {
    if (!user) {
      setLikeError('Please log in to like this idea.')
      return
    }

    setLikeLoading(true)
    setLikeError('')

    try {
      const token = await getIdToken()

      const response = await fetch(`${API_URL}/${id}/like`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Failed to update like')
      }

      setIdea(data.idea)
    } catch (err) {
      setLikeError(err.message)
    } finally {
      setLikeLoading(false)
    }
  }

  // Add comment
  const handleAddComment = async (e) => {
    e.preventDefault()

    if (!user) {
      setCommentError('Please log in to comment.')
      return
    }

    if (!commentText.trim()) {
      setCommentError('Comment cannot be empty.')
      return
    }

    setCommentLoading(true)
    setCommentError('')

    try {
      const token = await getIdToken()

      const response = await fetch(`${API_URL}/${id}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          text: commentText.trim(),
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Failed to add comment')
      }

      setIdea(data)
      setCommentText('')
    } catch (err) {
      setCommentError(err.message)
    } finally {
      setCommentLoading(false)
    }
  }

  // Start editing a comment
  const handleEditStart = (comment) => {
    setEditingCommentId(comment._id)
    setEditingText(comment.text)
    setActionError('')
  }

  // Save edited comment
  const handleEditComment = async (commentId) => {
    if (!editingText.trim()) {
      setActionError('Comment cannot be empty.')
      return
    }

    setActionError('')

    try {
      const token = await getIdToken()

      const response = await fetch(
        `${API_URL}/${id}/comments/${commentId}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            text: editingText.trim(),
          }),
        }
      )

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Failed to update comment')
      }

      setIdea(data)
      setEditingCommentId(null)
      setEditingText('')
    } catch (err) {
      setActionError(err.message)
    }
  }

  // Delete comment
  const handleDeleteComment = async (commentId) => {
    const confirmed = window.confirm(
      'Are you sure you want to delete this comment?'
    )

    if (!confirmed) return

    setDeletingCommentId(commentId)
    setActionError('')

    try {
      const token = await getIdToken()

      const response = await fetch(
        `${API_URL}/${id}/comments/${commentId}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Failed to delete comment')
      }

      setIdea(data)
    } catch (err) {
      setActionError(err.message)
    } finally {
      setDeletingCommentId(null)
    }
  }

  // Loading screen
  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <LoaderCircle size={40} className="animate-spin text-primary" />
      </div>
    )
  }

  // Error screen
  if (error || !idea) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 px-4">
        <Lightbulb size={48} className="opacity-40" />
        <h2 className="text-2xl font-bold">Idea not found</h2>
        <Link to="/ideas" className="btn btn-primary">
          Back to Ideas
        </Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen px-4 py-12">
      <div className="max-w-5xl mx-auto">

        <Link to="/ideas" className="btn btn-ghost mb-6 gap-2">
          <ArrowLeft size={18} />
          Back to Ideas
        </Link>

        {idea.imageUrl && (
          <div className="rounded-2xl overflow-hidden mb-8">
            <img
              src={idea.imageUrl}
              alt={idea.title}
              className="w-full h-64 md:h-96 object-cover"
            />
          </div>
        )}

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

          <div className="mt-5">
            <button
              type="button"
              onClick={handleLike}
              disabled={likeLoading}
              className={`btn gap-2 ${
                isLiked ? 'btn-error' : 'btn-outline'
              }`}
            >
              {likeLoading ? (
                <LoaderCircle size={18} className="animate-spin" />
              ) : (
                <Heart
                  size={18}
                  fill={isLiked ? 'currentColor' : 'none'}
                />
              )}

              {isLiked ? 'Unlike' : 'Like'}
              ({idea.likes?.length || 0})
            </button>

            {likeError && (
              <p className="text-error text-sm mt-2">
                {likeError}
              </p>
            )}

            {!user && (
              <p className="text-sm opacity-60 mt-2">
                Please <Link to="/login" className="link link-primary">log in</Link> to like this idea.
              </p>
            )}
          </div>
        </div>

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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">

          {idea.targetAudience && (
            <div className="card bg-base-100 border border-base-300 shadow-sm">
              <div className="card-body">
                <div className="flex items-center gap-2 text-primary">
                  <Users size={20} />
                  <h2 className="font-bold text-lg">Target Audience</h2>
                </div>
                <p className="opacity-80">{idea.targetAudience}</p>
              </div>
            </div>
          )}

          {idea.budget > 0 && (
            <div className="card bg-base-100 border border-base-300 shadow-sm">
              <div className="card-body">
                <div className="flex items-center gap-2 text-primary">
                  <Wallet size={20} />
                  <h2 className="font-bold text-lg">Estimated Budget</h2>
                </div>
                <p className="text-2xl font-bold">
                  ৳{idea.budget.toLocaleString('en-BD')}
                </p>
              </div>
            </div>
          )}
        </div>

        {idea.tags?.length > 0 && (
          <div className="card bg-base-100 border border-base-300 shadow-sm mb-6">
            <div className="card-body">
              <div className="flex items-center gap-2 mb-3">
                <Tag size={20} className="text-primary" />
                <h2 className="text-xl font-bold">Tags</h2>
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

        <div className="card bg-base-100 border border-base-300 shadow-sm mt-10">
          <div className="card-body">

            <h2 className="text-2xl font-bold flex items-center gap-2">
              <MessageCircle size={24} />
              Comments ({idea.comments?.length || 0})
            </h2>

            {user ? (
              <form onSubmit={handleAddComment} className="mt-4">
                <textarea
                  className="textarea textarea-bordered w-full min-h-28"
                  placeholder="Share your thoughts about this idea..."
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  maxLength={1000}
                />

                {commentError && (
                  <p className="text-error text-sm mt-2">
                    {commentError}
                  </p>
                )}

                <button
                  type="submit"
                  className="btn btn-primary mt-3"
                  disabled={commentLoading || !commentText.trim()}
                >
                  {commentLoading ? (
                    <LoaderCircle size={18} className="animate-spin" />
                  ) : (
                    <Send size={18} />
                  )}
                  Post Comment
                </button>
              </form>
            ) : (
              <p className="mt-4 opacity-70">
                Please <Link to="/login" className="link link-primary">log in</Link> to leave a comment.
              </p>
            )}

            {actionError && (
              <p className="text-error text-sm mt-3">{actionError}</p>
            )}

            <div className="mt-6 space-y-4">
              {idea.comments?.length > 0 ? (
                [...idea.comments].reverse().map((comment) => {
                  const isOwner = user?.uid === comment.userId
                  const isEditing = editingCommentId === comment._id

                  return (
                    <div
                      key={comment._id}
                      className="border border-base-300 rounded-xl p-4"
                    >
                      <div className="flex flex-wrap justify-between gap-3">

                        <div>
                          <p className="font-semibold">
                            {comment.userName}
                          </p>
                          <p className="text-xs opacity-60 mt-1">
                            {new Date(comment.createdAt).toLocaleString()}
                          </p>
                        </div>

                        {isOwner && !isEditing && (
                          <div className="flex gap-2">
                            <button
                              type="button"
                              className="btn btn-ghost btn-sm"
                              onClick={() => handleEditStart(comment)}
                              title="Edit comment"
                            >
                              <Pencil size={16} />
                            </button>

                            <button
                              type="button"
                              className="btn btn-ghost btn-sm text-error"
                              onClick={() => handleDeleteComment(comment._id)}
                              disabled={deletingCommentId === comment._id}
                              title="Delete comment"
                            >
                              {deletingCommentId === comment._id ? (
                                <LoaderCircle size={16} className="animate-spin" />
                              ) : (
                                <Trash2 size={16} />
                              )}
                            </button>
                          </div>
                        )}
                      </div>

                      {isEditing ? (
                        <div className="mt-3">
                          <textarea
                            className="textarea textarea-bordered w-full"
                            value={editingText}
                            onChange={(e) => setEditingText(e.target.value)}
                            maxLength={1000}
                          />

                          <div className="flex gap-2 mt-2">
                            <button
                              type="button"
                              className="btn btn-primary btn-sm"
                              onClick={() => handleEditComment(comment._id)}
                              disabled={!editingText.trim()}
                            >
                              <Check size={16} />
                              Save
                            </button>

                            <button
                              type="button"
                              className="btn btn-ghost btn-sm"
                              onClick={() => {
                                setEditingCommentId(null)
                                setEditingText('')
                                setActionError('')
                              }}
                            >
                              <X size={16} />
                              Cancel
                            </button>
                          </div>
                        </div>
                      ) : (
                        <p className="mt-3 whitespace-pre-wrap leading-7 opacity-80">
                          {comment.text}
                        </p>
                      )}
                    </div>
                  )
                })
              ) : (
                <p className="text-center opacity-60 py-8">
                  No comments yet. Be the first to share your thoughts!
                </p>
              )}
            </div>
          </div>
        </div>

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
