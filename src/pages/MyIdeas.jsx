
import usePageTitle from '../hooks/usePageTitle'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  FolderOpen,
  Lightbulb,
  LoaderCircle,
  Pencil,
  Trash2,
  Plus,
  X,
  Save,
  Heart,
  MessageCircle,
} from 'lucide-react'

import useAuth from '../hooks/useAuth'

const API_URL = `${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/ideas`

const emptyForm = {
  title: '',
  shortDescription: '',
  detailedDescription: '',
  category: '',
  tags: '',
  imageUrl: '',
  budget: '',
  targetAudience: '',
  problemStatement: '',
  proposedSolution: '',
}

export default function MyIdeas() {
  usePageTitle('My Ideas')

  const { user, getIdToken, loading: authLoading } = useAuth()

  const [ideas, setIdeas] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [actionError, setActionError] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  const [editingId, setEditingId] = useState(null)
  const [editForm, setEditForm] = useState(emptyForm)
  const [saving, setSaving] = useState(false)
  const [deletingId, setDeletingId] = useState(null)

  // Fetch only the current user's ideas
  useEffect(() => {
    if (authLoading) return

    if (!user?.uid) {
      setLoading(false)
      return
    }

    const fetchMyIdeas = async () => {
      setLoading(true)
      setError('')

      try {
        const response = await fetch(API_URL)

        if (!response.ok) {
          throw new Error('Failed to fetch your ideas.')
        }

        const data = await response.json()

        const myIdeas = data.filter(
          (idea) => idea.authorId === user.uid
        )

        setIdeas(myIdeas)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchMyIdeas()
  }, [user?.uid, authLoading])

  // Start editing an idea
  const handleEditStart = (idea) => {
    setEditingId(idea._id)
    setActionError('')
    setSuccessMessage('')

    setEditForm({
      title: idea.title || '',
      shortDescription: idea.shortDescription || '',
      detailedDescription: idea.detailedDescription || '',
      category: idea.category || '',
      tags: (idea.tags || []).join(', '),
      imageUrl: idea.imageUrl || '',
      budget: idea.budget ?? '',
      targetAudience: idea.targetAudience || '',
      problemStatement: idea.problemStatement || '',
      proposedSolution: idea.proposedSolution || '',
    })

    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target

    setEditForm((previous) => ({
      ...previous,
      [name]: value,
    }))
  }

  // Save updated idea
  const handleUpdate = async (e) => {
    e.preventDefault()

    if (!editForm.title.trim() || !editForm.shortDescription.trim()) {
      setActionError('Title and short description are required.')
      return
    }

    setSaving(true)
    setActionError('')
    setSuccessMessage('')

    try {
      const updatedData = {
        title: editForm.title.trim(),
        shortDescription: editForm.shortDescription.trim(),
        detailedDescription: editForm.detailedDescription.trim(),
        category: editForm.category.trim(),
        tags: editForm.tags
          .split(',')
          .map((tag) => tag.trim())
          .filter(Boolean),
        imageUrl: editForm.imageUrl.trim(),
        budget: Number(editForm.budget) || 0,
        targetAudience: editForm.targetAudience.trim(),
        problemStatement: editForm.problemStatement.trim(),
        proposedSolution: editForm.proposedSolution.trim(),
      }

      // Get Firebase authentication token
      const token = await getIdToken()

      const response = await fetch(`${API_URL}/${editingId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Failed to update idea.')
      }

      setIdeas((previous) =>
        previous.map((idea) =>
          idea._id === editingId ? data : idea
        )
      )

      setEditingId(null)
      setEditForm(emptyForm)
      setSuccessMessage('Your idea was updated successfully!')
    } catch (err) {
      setActionError(err.message)
    } finally {
      setSaving(false)
    }
  }

  // Cancel editing
  const handleCancelEdit = () => {
    setEditingId(null)
    setEditForm(emptyForm)
    setActionError('')
  }

  // Delete an idea
  const handleDelete = async (ideaId) => {
    const confirmed = window.confirm(
      'Are you sure you want to delete this idea? This action cannot be undone.'
    )

    if (!confirmed) return

    setDeletingId(ideaId)
    setActionError('')
    setSuccessMessage('')

    try {
      // Get Firebase authentication token
      const token = await getIdToken()

      const response = await fetch(`${API_URL}/${ideaId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Failed to delete idea.')
      }

      setIdeas((previous) =>
        previous.filter((idea) => idea._id !== ideaId)
      )

      if (editingId === ideaId) {
        handleCancelEdit()
      }

      setSuccessMessage('Idea deleted successfully!')
    } catch (err) {
      setActionError(err.message)
    } finally {
      setDeletingId(null)
    }
  }

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
        <FolderOpen size={48} className="opacity-40" />
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
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <FolderOpen size={32} className="text-primary" />
              <h1 className="text-3xl md:text-4xl font-bold">
                My Ideas
              </h1>
            </div>

            <p className="opacity-70">
              Manage all the startup ideas you have shared.
            </p>
          </div>

          <Link to="/add-idea" className="btn btn-primary">
            <Plus size={18} />
            Add New Idea
          </Link>
        </div>

        {/* Success Message */}
        {successMessage && (
          <div className="alert alert-success mb-6">
            <span>{successMessage}</span>
          </div>
        )}

        {/* Error Message */}
        {(error || actionError) && (
          <div className="alert alert-error mb-6">
            <span>{error || actionError}</span>
          </div>
        )}

        {/* Edit Form */}
        {editingId && (
          <div className="card bg-base-100 border border-primary shadow-sm mb-10">
            <div className="card-body">
              <div className="flex items-center justify-between gap-3 mb-4">
                <h2 className="text-2xl font-bold">
                  Edit Your Idea
                </h2>

                <button
                  type="button"
                  onClick={handleCancelEdit}
                  className="btn btn-ghost btn-sm"
                >
                  <X size={18} />
                  Cancel
                </button>
              </div>

              <form onSubmit={handleUpdate} className="space-y-4">

                <div>
                  <label className="label">Idea Title *</label>
                  <input
                    name="title"
                    value={editForm.title}
                    onChange={handleChange}
                    className="input input-bordered w-full"
                    required
                  />
                </div>

                <div>
                  <label className="label">Short Description *</label>
                  <textarea
                    name="shortDescription"
                    value={editForm.shortDescription}
                    onChange={handleChange}
                    className="textarea textarea-bordered w-full"
                    rows={2}
                    required
                  />
                </div>

                <div>
                  <label className="label">Detailed Description</label>
                  <textarea
                    name="detailedDescription"
                    value={editForm.detailedDescription}
                    onChange={handleChange}
                    className="textarea textarea-bordered w-full"
                    rows={4}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="label">Category</label>
                    <input
                      name="category"
                      value={editForm.category}
                      onChange={handleChange}
                      className="input input-bordered w-full"
                    />
                  </div>

                  <div>
                    <label className="label">Estimated Budget (৳)</label>
                    <input
                      type="number"
                      min="0"
                      name="budget"
                      value={editForm.budget}
                      onChange={handleChange}
                      className="input input-bordered w-full"
                    />
                  </div>
                </div>

                <div>
                  <label className="label">Tags</label>
                  <input
                    name="tags"
                    value={editForm.tags}
                    onChange={handleChange}
                    placeholder="Education, AI, Productivity"
                    className="input input-bordered w-full"
                  />
                  <p className="text-xs opacity-60 mt-1">
                    Separate tags with commas.
                  </p>
                </div>

                <div>
                  <label className="label">Image URL</label>
                  <input
                    type="url"
                    name="imageUrl"
                    value={editForm.imageUrl}
                    onChange={handleChange}
                    className="input input-bordered w-full"
                  />
                </div>

                <div>
                  <label className="label">Target Audience</label>
                  <input
                    name="targetAudience"
                    value={editForm.targetAudience}
                    onChange={handleChange}
                    className="input input-bordered w-full"
                  />
                </div>

                <div>
                  <label className="label">Problem Statement</label>
                  <textarea
                    name="problemStatement"
                    value={editForm.problemStatement}
                    onChange={handleChange}
                    className="textarea textarea-bordered w-full"
                    rows={3}
                  />
                </div>

                <div>
                  <label className="label">Proposed Solution</label>
                  <textarea
                    name="proposedSolution"
                    value={editForm.proposedSolution}
                    onChange={handleChange}
                    className="textarea textarea-bordered w-full"
                    rows={3}
                  />
                </div>

                {actionError && (
                  <p className="text-error text-sm">{actionError}</p>
                )}

                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={saving}
                >
                  {saving ? (
                    <LoaderCircle size={18} className="animate-spin" />
                  ) : (
                    <Save size={18} />
                  )}
                  Save Changes
                </button>

              </form>
            </div>
          </div>
        )}

        {/* Ideas List */}
        {ideas.length > 0 ? (
          <>
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-xl font-bold">
                Your Ideas ({ideas.length})
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {ideas.map((idea) => (
                <div
                  key={idea._id}
                  className="card bg-base-100 border border-base-300 shadow-sm"
                >
                  {/* Image */}
                  {idea.imageUrl ? (
                    <figure className="h-48">
                      <img
                        src={idea.imageUrl}
                        alt={idea.title}
                        className="w-full h-full object-cover"
                      />
                    </figure>
                  ) : (
                    <div className="h-40 bg-base-200 flex items-center justify-center">
                      <Lightbulb size={40} className="opacity-30" />
                    </div>
                  )}

                  <div className="card-body">

                    <span className="badge badge-primary badge-outline w-fit">
                      {idea.category || 'Uncategorized'}
                    </span>

                    <h2 className="card-title text-xl">
                      {idea.title}
                    </h2>

                    <p className="text-sm opacity-70 line-clamp-3">
                      {idea.shortDescription}
                    </p>

                    {/* Statistics */}
                    <div className="flex gap-4 text-sm opacity-70 mt-2">
                      <span className="flex items-center gap-1">
                        <Heart size={16} />
                        {idea.likes?.length || 0} Likes
                      </span>

                      <span className="flex items-center gap-1">
                        <MessageCircle size={16} />
                        {idea.comments?.length || 0} Comments
                      </span>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap gap-2 mt-4">
                      <Link
                        to={`/ideas/${idea._id}`}
                        className="btn btn-outline btn-sm flex-1"
                      >
                        View
                      </Link>

                      <button
                        type="button"
                        onClick={() => handleEditStart(idea)}
                        className="btn btn-primary btn-sm flex-1"
                      >
                        <Pencil size={15} />
                        Edit
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDelete(idea._id)}
                        disabled={deletingId === idea._id}
                        className="btn btn-error btn-outline btn-sm"
                      >
                        {deletingId === idea._id ? (
                          <LoaderCircle
                            size={15}
                            className="animate-spin"
                          />
                        ) : (
                          <Trash2 size={15} />
                        )}
                      </button>
                    </div>

                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          !error && (
            <div className="text-center py-20">
              <FolderOpen
                size={64}
                className="mx-auto opacity-30 mb-5"
              />

              <h2 className="text-2xl font-bold mb-3">
                No Ideas Yet
              </h2>

              <p className="opacity-60 mb-6">
                You haven't shared any startup ideas yet. Start sharing your ideas with the community!
              </p>

              <Link to="/add-idea" className="btn btn-primary">
                <Plus size={18} />
                Share Your First Idea
              </Link>
            </div>
          )
        )}

      </div>
    </div>
  )
}
