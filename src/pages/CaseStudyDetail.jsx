import { useParams, NavLink } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { useEffect, useState } from 'react'
import { caseStudiesService } from '../services/caseStudies'

export default function CaseStudyDetail() {
  const { slug } = useParams()

  const [study, setStudy] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  // Fetch case study by slug
  useEffect(() => {
    const fetchStudy = async () => {
      try {
        setLoading(true)
        setError('')
        const response = await caseStudiesService.getCaseStudyBySlug(slug)
        setStudy(response.data)
      } catch (err) {
        setError(err.message || 'Failed to load case study')
        console.error('Error fetching case study:', err)
      } finally {
        setLoading(false)
      }
    }
    if (slug) fetchStudy()
  }, [slug])

  // Fallback: invalid or missing slug
  if (loading) {
    return (
      <section className="section text-center space-y-6">
        <Helmet>
          <title>Loading Case Study...</title>
        </Helmet>
        <p className="text-slate-600 dark:text-neutral-400">Loading case study...</p>
      </section>
    )
  }

  if (error || !study) {
    return (
      <section className="section text-center space-y-6">
        <Helmet>
          <title>Case Study Not Found | IFYWIGATECHZ</title>
        </Helmet>

        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
          Case Study Not Found
        </h1>
        <p className="text-neutral-500 dark:text-neutral-300">
          {error || "The case study you're looking for does not exist or was moved."}
        </p>

        <NavLink
          to="/case-studies"
          className="inline-block text-blue-500 font-semibold hover:underline"
        >
          ← Back to Case Studies
        </NavLink>
      </section>
    )
  }

  return (
    <section className="section space-y-12 container-wide">
      {/* SEO */}
      <Helmet>
        <title>{study.title} | Case Study</title>
        <meta
          name="description"
          content={study.challenge || study.problem}
        />
      </Helmet>

      {/* Header */}
      <div className="space-y-3 max-w-4xl">
        {study.company && (
          <p className="text-sm font-semibold text-blue-500">{study.company}</p>
        )}
        <p className="text-sm font-semibold text-blue-500">
          {study.industry}
        </p>
        <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white">
          {study.title}
        </h1>
      </div>

      {/* Main Content */}
      <div className="grid gap-8 max-w-4xl">
        <div>
          <h2 className="text-xl font-bold mb-2 text-slate-900 dark:text-white">
            The Challenge
          </h2>
          <p className="text-neutral-600 dark:text-neutral-300 leading-relaxed">
            {study.challenge || study.problem}
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold mb-2 text-slate-900 dark:text-white">
            Our Solution
          </h2>
          <p className="text-neutral-600 dark:text-neutral-300 leading-relaxed">
            {study.solution}
          </p>
        </div>

        {study.results && study.results.length > 0 && (
          <div>
            <h2 className="text-xl font-bold mb-4 text-slate-900 dark:text-white">
              The Results
            </h2>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {study.results.map((result, idx) => (
                <div
                  key={idx}
                  className="bg-neutral-100 dark:bg-neutral-800 p-4 rounded-lg"
                >
                  <p className="text-lg font-bold text-blue-500">{result.value}</p>
                  <p className="font-semibold text-neutral-900 dark:text-neutral-100">
                    {result.metric}
                  </p>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
                    {result.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {study.result && !study.results && (
          <div>
            <h2 className="text-xl font-bold mb-2 text-slate-900 dark:text-white">
              The Result
            </h2>
            <p className="text-neutral-600 dark:text-neutral-300 leading-relaxed">
              {study.result}
            </p>
          </div>
        )}

        {study.technologies && study.technologies.length > 0 && (
          <div>
            <h2 className="text-xl font-bold mb-3 text-slate-900 dark:text-white">
              Technologies Used
            </h2>
            <div className="flex flex-wrap gap-2">
              {study.technologies.map((tech, idx) => (
                <span
                  key={idx}
                  className="bg-blue-500/10 text-blue-600 dark:text-blue-400 px-3 py-1 rounded-full text-sm font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex flex-wrap gap-4 pt-6">
        <NavLink
          to="/contact"
          className="bg-blue-500 hover:bg-blue-400
                     text-white px-6 py-3 rounded-xl
                     font-semibold transition"
        >
          Start a Similar Project
        </NavLink>

        <NavLink
          to="/case-studies"
          className="self-center text-blue-500 font-semibold hover:underline"
        >
          ← Back to Case Studies
        </NavLink>
      </div>
    </section>
  )
}
