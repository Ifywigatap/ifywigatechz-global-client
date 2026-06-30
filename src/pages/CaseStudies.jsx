﻿﻿﻿﻿﻿import { Helmet } from 'react-helmet-async'
import { NavLink } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { caseStudiesService } from '../services/caseStudies'

export default function CaseStudies() {
  const [caseStudies, setCaseStudies] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  // Fetch all case studies
  useEffect(() => {
    const fetchCaseStudies = async () => {
      try {
        setLoading(true)
        setError('')
        const response = await caseStudiesService.getAllCaseStudies(1, 100)
        setCaseStudies(response.data || [])
      } catch (err) {
        setError(err.message || 'Failed to load case studies')
        console.error('Error fetching case studies:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchCaseStudies()
  }, [])
  return (
    <section className="section space-y-14 bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      {/* SEO */}
      <Helmet>
        <title>Case Studies | IFYWIGATECHZ Global Services</title>
        <meta
          name="description"
          content="Explore real-world case studies showcasing how IFYWIGATECHZ delivers impactful web development, UI/UX design, and digital solutions."
        />
      </Helmet>

      {/* Hero */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-extrabold text-blue-600">
          Case Studies
        </h1>
        <p className="max-w-2xl mx-auto text-slate-600 dark:text-neutral-300 transition-colors duration-300">
          Real projects. Real solutions. Real results.
        </p>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="text-center py-20">
          <p className="text-slate-600 dark:text-neutral-300 transition-colors duration-300">Loading case studies...</p>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="text-center py-20 space-y-3">
          <p className="text-red-600 dark:text-red-400 font-semibold transition-colors duration-300">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-colors duration-300 shadow-sm"
          >
            Reload Page
          </button>
        </div>
      )}

      {/* Case Studies Grid */}
      {!loading && !error && (
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {caseStudies.map((item) => (
          <div
            key={item.title}
            className="rounded-2xl border border-slate-200 dark:border-neutral-800
                       bg-white dark:bg-neutral-900/40 p-6 flex flex-col space-y-4
                       hover:border-blue-500 dark:hover:border-blue-500 transition-all duration-300 shadow-sm dark:shadow-none hover:shadow-md dark:hover:shadow-lg"
          >
            <h3 className="text-xl font-bold text-slate-900 dark:text-white transition-colors duration-300">
              {item.title}
            </h3>

            <p className="text-sm font-medium text-blue-600 dark:text-blue-400 transition-colors duration-300">
              {item.industry}
            </p>

            <div className="space-y-2 text-sm text-slate-700 dark:text-neutral-300 transition-colors duration-300">
              <p>
                <span className="font-semibold text-slate-900 dark:text-white transition-colors duration-300">Problem:</span>{' '}
                {item.problem}
              </p>
              <p>
                <span className="font-semibold text-slate-900 dark:text-white transition-colors duration-300">Solution:</span>{' '}
                {item.solution}
              </p>
              <p>
                <span className="font-semibold text-slate-900 dark:text-white transition-colors duration-300">Result:</span>{' '}
                {item.result}
              </p>
            </div>

            <div className="pt-4 mt-auto">
              <NavLink
                to="/request-quote"
                className="inline-block text-sm font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 hover:underline transition-colors duration-300"
              >
                Start a similar project →
              </NavLink>
            </div>
          </div>
        ))}
      </div>
      )}

      {/* Empty State */}
      {!loading && !error && caseStudies.length === 0 && (
        <div className="text-center py-20">
          <p className="text-slate-600 dark:text-neutral-300 transition-colors duration-300">No case studies found yet.</p>
        </div>
      )}

      {/* CTA */}
      {!loading && !error && (
      <div className="text-center space-y-4 pt-10">
        <h2 className="text-2xl font-bold bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400 inline-block px-6 py-3 rounded-2xl transition-colors duration-300">
          Want results like these?
        </h2>
        <p className="text-slate-600 dark:text-neutral-300 transition-colors duration-300">
          Let’s build a solution tailored to your business.
        </p>
        <a
          href="https://wa.me/2348113722088"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-green-500 hover:bg-green-600
                     text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 shadow-md hover:shadow-lg"
        >
          Chat on WhatsApp
        </a>
      </div>
      )}
    </section>
  )
}
