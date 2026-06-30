import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { useState, useMemo, useEffect } from 'react'
import { blogService } from '../services/blog'
import { optimizeImage } from '../utils/cloudinary'

export default function Blog() {
  const [posts, setPosts] = useState([])
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  // Fetch all blog posts
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true)
        setError('')
        const response = await blogService.getAllPosts(1, 100)
        setPosts(response.data || [])
      } catch (err) {
        setError(err.message || 'Failed to load blog posts')
        // Prod: silent fail
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [])

  // Extract unique categories
  const categories = useMemo(
    () => [...new Set(posts.map(p => p.category).filter(Boolean))],
    [posts]
  )

  // Optimized filtering
  const filteredPosts = useMemo(() => {
    return posts.filter(p => {
      const matchesSearch =
        p.title.toLowerCase().includes(query.toLowerCase()) ||
        p.excerpt.toLowerCase().includes(query.toLowerCase())

      const matchesCategory = category ? p.category === category : true

      return matchesSearch && matchesCategory
    })
  }, [posts, query, category])

  if (error) {
    return (
      <section className="section space-y-12 container-wide">
        <Helmet>
          <title>Ifywigatechz — Blog</title>
        </Helmet>
        <div className="text-center py-20 space-y-3">
          <p className="text-red-400 text-lg font-semibold">{error}</p>
          <p className="text-neutral-500">Failed to load blog posts. Please try again later.</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-brandBlue hover:bg-brandGold text-white rounded-lg transition"
          >
            Reload Page
          </button>
        </div>
      </section>
    )
  }

  return (
    <section className="section space-y-12 container-wide">
      {/* SEO */}
      <Helmet>
        <title>Ifywigatechz — Blog</title>
        <meta
          name="description"
          content="Articles on web development, UI/UX design, freelancing, and learning resources."
        />
        <meta property="og:title" content="Ifywigatechz Blog" />
        <meta property="og:description" content="Insights on web dev, UI/UX & digital skills." />
        <meta property="og:image" content="/logo.jpg" />
      </Helmet>

      {/* Hero */}
      <header className="max-w-3xl mx-auto text-center space-y-4">
        <h1 className="text-3xl sm:text-5xl font-extrabold text-brandBlue tracking-tight">
          Insights & Articles
        </h1>
        <p className="text-base md:text-lg text-neutral-500 max-w-2xl mx-auto">
          Practical tutorials, case studies and product thinking about web development, UI/UX, and growing digital products.
        </p>
      </header>

      {/* Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6 items-start">
        <section className="rounded-2xl border border-brandBlue/20 bg-gradient-to-br from-neutral-900 to-neutral-950 p-5 sm:p-6 space-y-3 shadow-lg">
          <h3 className="text-lg font-semibold text-white">✍️ Contribute to the blog</h3>
          <p className="text-sm text-neutral-400">
            Have a practical guide or case study? Submit a guest post and reach our audience of builders and founders.
          </p>
          <Link
            to="/blog/submit"
            className="inline-block mt-3 px-5 py-2 bg-brandBlue hover:bg-brandGold transition text-white rounded-lg font-semibold"
          >
            Submit a Post
          </Link>
        </section>

        <div className="md:col-span-2 flex flex-col sm:flex-row gap-3 md:gap-4">
          <div className="flex-1 w-full relative">
            <input
              type="text"
              placeholder="Search articles, tags, or authors..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              disabled={loading}
              className="w-full rounded-xl bg-neutral-900 border border-neutral-800 px-4 py-3 text-sm text-neutral-200 focus:outline-none focus:border-brandBlue transition disabled:opacity-50"
            />
          </div>

          <div>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              disabled={loading}
              className="rounded-xl bg-neutral-900 border border-neutral-800 px-4 py-3 text-sm text-neutral-200 focus:outline-none focus:border-brandBlue transition disabled:opacity-50"
            >
              <option value="">All categories</option>
              {categories.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="text-center py-20">
          <p className="text-neutral-400">Loading articles...</p>
        </div>
      )}

      {/* Blog Grid */}
      {!loading && (
      <div className="grid gap-5 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {filteredPosts.map((p, i) => (
          <article
            key={p.slug}
            className="group h-full rounded-2xl border border-neutral-800 bg-neutral-950/60 backdrop-blur-md transition-all duration-300 hover:border-brandGold hover:-translate-y-1 hover:shadow-xl overflow-hidden"
            style={{ animationDelay: `${i * 50}ms` }}
          >
            <Link to={`/blog/${p.slug}`} className="flex h-full flex-col">
              {/* Top */}
              <div className="flex items-center justify-between px-5 pt-4">
                <span className="text-xs text-neutral-500">
                  {new Date(p.date).toDateString()}
                </span>

                {p.category && (
                  <span className="text-xs bg-neutral-800/70 text-neutral-200 px-3 py-1 rounded-full">
                    {p.category}
                  </span>
                )}
              </div>

              {/* Content */}
              <div className="p-5 flex flex-col flex-grow">
                <h3 className="text-lg font-bold text-neutral-100 group-hover:text-brandGold transition">
                  {p.title}
                </h3>

                <p className="mt-3 text-sm text-neutral-400 line-clamp-3 flex-grow">
                  {p.excerpt}
                </p>

                <div className="mt-4 flex items-center justify-between text-sm text-neutral-100">
  <div className="flex items-center gap-3">
    {p.author && (
      <span className="flex items-center gap-2">
        {p.author.avatar && (
          <img
            src={optimizeImage(p.author.avatar, { width: 48, height: 48 })}
            alt={p.author.name}
            className="w-6 h-6 rounded-full"
          />
        )}
        <span>{p.author.name}</span>
      </span>
    )}
    <span>•</span>
                    <span>
                      {Math.max(
                        1,
                        Math.ceil((p.content || '').split(/\s+/).length / 200)
                      )}{' '}
                      min read
                    </span>
                  </div>

                  <span className="text-brandBlue group-hover:text-brandGold font-medium transition">
                    Read →
                  </span>
                </div>
              </div>
            </Link>
          </article>
        ))}
      </div>
      )}

      {/* Empty State */}
      {!loading && filteredPosts.length === 0 && (
        <div className="text-center py-20 space-y-3">
          <p className="text-neutral-500 text-lg">No articles found</p>
          <p className="text-neutral-600 text-sm">
            Try adjusting your search or selecting a different category.
          </p>
        </div>
      )}
    </section>
  )
}