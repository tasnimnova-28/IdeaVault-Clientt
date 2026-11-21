
import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Lightbulb,
  Search,
  LoaderCircle,
  SlidersHorizontal,
  X,
} from 'lucide-react'

const API_URL = `${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/ideas`

export default function Ideas() {
  const [ideas, setIdeas] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const [searchTerm, setSearchTerm] = useState('')
  const [category, setCategory] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')

  useEffect(() => {
    fetch(API_URL)
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

  const filteredIdeas = useMemo(() => {
    return ideas.filter((idea) => {
      const matchesSearch = idea.title
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase())

      const matchesCategory =
        !category || idea.category === category

      const ideaDate = idea.createdAt
        ? new Date(idea.createdAt)
        : null

      const matchesStartDate =
        !startDate ||
        (ideaDate && ideaDate >= new Date(`${startDate}T00:00:00`))

      const matchesEndDate =
        !endDate ||
        (ideaDate && ideaDate <= new Date(`${endDate}T23:59:59.999`))

      return (
        matchesSearch &&
        matchesCategory &&
        matchesStartDate &&
        matchesEndDate
      )
    })
  }, [ideas, searchTerm, category, startDate, endDate])

  const resetFilters = () => {
    setSearchTerm('')
    setCategory('')
    setStartDate('')
    setEndDate('')
  }

  const hasFilters = searchTerm || category || startDate || endDate

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

        {/* Search and Filters */}
        <div className="bg-base-200 rounded-2xl p-5 mb-10">
          <div className="flex items-center gap-2 mb-4">
            <SlidersHorizontal size={20} className="text-primary" />
            <h2 className="font-semibold text-lg">Search & Filter Ideas</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">

            {/* Search */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Search by Title</span>
              </label>

              <div className="relative">
                <Search
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 opacity-50"
                />

                <input
                  type="text"
                  placeholder="Search ideas..."
                  className="input input-bordered w-full pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            {/* Category */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Category</span>
              </label>

              <select
                className="select select-bordered w-full"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">All Categories</option>
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

            {/* Start Date */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">From Date</span>
              </label>

              <input
                type="date"
                className="input input-bordered w-full"
                value={startDate}
                max={endDate || undefined}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>

            {/* End Date */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">To Date</span>
              </label>

              <input
                type="date"
                className="input input-bordered w-full"
                value={endDate}
                min={startDate || undefined}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
          </div>

          {/* Results Count and Reset */}
          <div className="flex flex-wrap justify-between items-center gap-3 mt-5">
            <p className="text-sm opacity-70">
              Showing <strong>{filteredIdeas.length}</strong> of{' '}
              <strong>{ideas.length}</strong> ideas
            </p>

            {hasFilters && (
              <button
                onClick={resetFilters}
                className="btn btn-ghost btn-sm"
              >
                <X size={16} />
                Clear Filters
              </button>
            )}
          </div>
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
        {!loading && !error && filteredIdeas.length === 0 && (
          <div className="text-center py-20">
            <Lightbulb size={48} className="mx-auto mb-4 opacity-40" />

            <h2 className="text-2xl font-semibold mb-2">
              {ideas.length === 0 ? 'No ideas yet' : 'No matching ideas found'}
            </h2>

            <p className="opacity-70">
              {ideas.length === 0
                ? 'Be the first to share a startup idea!'
                : 'Try changing your search or filters.'}
            </p>

            {hasFilters && (
              <button
                onClick={resetFilters}
                className="btn btn-primary btn-sm mt-5"
              >
                Clear Filters
              </button>
            )}
          </div>
        )}

        {/* Ideas Grid */}
        {!loading && !error && filteredIdeas.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

            {filteredIdeas.map((idea) => (
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
