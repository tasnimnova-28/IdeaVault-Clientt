
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Lightbulb, Send, LoaderCircle } from 'lucide-react'
import useAuth from '../hooks/useAuth'
import { toast } from 'react-toastify'

const API_URL = `${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/ideas`

export default function AddIdea() {
  const { user } = useAuth()
  const navigate = useNavigate()

  const [loading, setLoading] = useState(false)

  const [formData, setFormData] = useState({
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
  })

  const handleChange = (e) => {
    const { name, value } = e.target

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!user) {
      toast.error('Please log in first.')
      return
    }

    setLoading(true)

    const ideaData = {
      ...formData,
      tags: formData.tags
        .split(',')
        .map((tag) => tag.trim())
        .filter(Boolean),
      budget: Number(formData.budget) || 0,
      authorId: user.uid,
      authorName: user.displayName || 'Anonymous',
      authorEmail: user.email,
    }

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(ideaData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Failed to submit your idea.')
      }

      toast.success('Your startup idea was published!')
      navigate(`/ideas/${data.idea._id}`)
    } catch (error) {
      toast.error(error.message || 'Something went wrong.')
    } finally {
      setLoading(false)
    }
  }

  const inputClass =
    'input input-bordered w-full'

  const textareaClass =
    'textarea textarea-bordered w-full'

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <div className="mb-8">
        <div className="mb-3 flex items-center gap-3">
          <Lightbulb size={32} className="text-primary" />
          <h1 className="text-3xl font-bold">Share Your Startup Idea</h1>
        </div>

        <p className="text-base-content/60">
          Tell the community about your idea and how it can solve a problem.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label className="font-semibold">Idea Title *</label>
          <input
            className={inputClass}
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter your startup idea title"
            required
            maxLength={100}
          />
        </div>

        <div className="space-y-2">
          <label className="font-semibold">Short Description *</label>
          <textarea
            className={textareaClass}
            name="shortDescription"
            value={formData.shortDescription}
            onChange={handleChange}
            placeholder="Describe your idea briefly"
            rows={3}
            required
            maxLength={250}
          />
        </div>

        <div className="space-y-2">
          <label className="font-semibold">Detailed Description *</label>
          <textarea
            className={textareaClass}
            name="detailedDescription"
            value={formData.detailedDescription}
            onChange={handleChange}
            placeholder="Explain your startup idea in detail"
            rows={5}
            required
          />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div className="space-y-2">
            <label className="font-semibold">Category *</label>
            <select
              className="select select-bordered w-full"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            >
              <option value="">Select a category</option>
              <option value="Technology">Technology</option>
              <option value="Education">Education</option>
              <option value="Healthcare">Healthcare</option>
              <option value="E-commerce">E-commerce</option>
              <option value="Environment">Environment</option>
              <option value="Food">Food</option>
              <option value="Finance">Finance</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="font-semibold">Estimated Budget (BDT)</label>
            <input
              className={inputClass}
              type="number"
              name="budget"
              min="0"
              value={formData.budget}
              onChange={handleChange}
              placeholder="e.g. 50000"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="font-semibold">Tags</label>
          <input
            className={inputClass}
            name="tags"
            value={formData.tags}
            onChange={handleChange}
            placeholder="e.g. AI, Education, Students"
          />
          <p className="text-xs text-base-content/50">
            Separate tags with commas.
          </p>
        </div>

        <div className="space-y-2">
          <label className="font-semibold">Image URL</label>
          <input
            className={inputClass}
            type="url"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
            placeholder="https://example.com/image.jpg"
          />
        </div>

        <div className="space-y-2">
          <label className="font-semibold">Target Audience</label>
          <input
            className={inputClass}
            name="targetAudience"
            value={formData.targetAudience}
            onChange={handleChange}
            placeholder="Who will use your product?"
          />
        </div>

        <div className="space-y-2">
          <label className="font-semibold">Problem Statement *</label>
          <textarea
            className={textareaClass}
            name="problemStatement"
            value={formData.problemStatement}
            onChange={handleChange}
            placeholder="What problem are you trying to solve?"
            rows={3}
            required
          />
        </div>

        <div className="space-y-2">
          <label className="font-semibold">Proposed Solution *</label>
          <textarea
            className={textareaClass}
            name="proposedSolution"
            value={formData.proposedSolution}
            onChange={handleChange}
            placeholder="How will your startup solve this problem?"
            rows={3}
            required
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary w-full"
          disabled={loading}
        >
          {loading ? (
            <>
              <LoaderCircle className="animate-spin" size={20} />
              Publishing...
            </>
          ) : (
            <>
              <Send size={20} />
              Publish Idea
            </>
          )}
        </button>
      </form>
    </div>
  )
}
