import { Helmet } from 'react-helmet-async'
import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { NavLink } from 'react-router-dom'
import { ChevronDown, Search, MessageCircle } from 'lucide-react'
import { ALL_FAQS } from '../data/faqData';
import { siteConfig } from '../data/config';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState('all')

  const CATEGORIES = {
    all: 'All Questions',
    pricing: 'Pricing',
    timeline: 'Timeline',
    process: 'Process',
    support: 'Support'
  }

  const filteredFAQs = useMemo(() => {
    return ALL_FAQS.filter(faq => {
      const matchesCategory = activeCategory === 'all' || faq.category === activeCategory
      const matchesSearch =
        searchQuery === '' ||
        faq.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.a.toLowerCase().includes(searchQuery.toLowerCase())
      return matchesCategory && matchesSearch
    })
  }, [activeCategory, searchQuery])

  const toggle = index => {
    setOpenIndex(openIndex === index ? null : index)
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 }
    }
  }

  return (
    <section className="section space-y-16 py-20 bg-neutral-50 dark:bg-sky-900">
      {/* SEO */}
      <Helmet>
        <title>FAQ | IFYWIGATECHZ Global Services</title>
        <meta
          name="description"
          content="Frequently asked questions about IFYWIGATECHZ Global Services. Learn about our pricing, timelines, web development services, and support options."
        />
        <meta name="keywords" content="FAQ, web development, SaaS, pricing, support, IFYWIGATECHZ" />
      </Helmet>

      <div className="container-wide">
        {/* Header */}
        <div className="text-center space-y-4 mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-brandBlue">
            Frequently Asked Questions
          </h1>
          <p className="max-w-2xl mx-auto text-gray-600 dark:text-neutral-200 text-lg">
            Answers to common questions about our services, pricing, timeline, and support. Can't find what you're looking for? Reach out to us!
          </p>
        </div>

        {/* Search & Filters */}
        <div className="max-w-3xl mx-auto mb-12 space-y-6">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search FAQs..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              aria-label="Search frequently asked questions"
              className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-300 dark:border-neutral-600
                         bg-white dark:bg-neutral-800 text-gray-900 dark:text-white
                         placeholder-gray-500 dark:placeholder-neutral-400
                         focus:ring-2 focus:ring-brandBlue focus:border-transparent
                         transition"
            />
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-2">
            {Object.entries(CATEGORIES).map(([key, label]) => (
              <button
                key={key}
                onClick={() => setActiveCategory(key)}
                aria-pressed={activeCategory === key}
                className={`px-4 py-2 rounded-full font-medium transition ${
                  activeCategory === key
                    ? 'bg-brandBlue text-white'
                    : 'bg-gray-200 dark:bg-neutral-700 text-gray-700 dark:text-neutral-200 hover:bg-gray-300 dark:hover:bg-neutral-600'
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Results info */}
          {searchQuery && (
            <p className="text-sm text-gray-600 dark:text-neutral-400">
              Showing {filteredFAQs.length} result{filteredFAQs.length !== 1 ? 's' : ''}
            </p>
          )}
        </div>

        {/* FAQ Items */}
        {filteredFAQs.length > 0 ? (
          <motion.div
            className="max-w-3xl mx-auto space-y-4"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {filteredFAQs.map((faq, index) => (
              <motion.div key={faq.id} variants={itemVariants}>
                <div
                  className="rounded-lg border border-gray-300 dark:border-neutral-600
                             bg-white dark:bg-neutral-800 overflow-hidden
                             hover:border-brandBlue dark:hover:border-brandBlue transition"
                >
                  <button
                    onClick={() => toggle(index)}
                    aria-expanded={openIndex === index}
                    aria-controls={`faq-answer-${faq.id}`}
                    className="w-full flex justify-between items-center p-5 text-left
                               hover:bg-gray-50 dark:hover:bg-neutral-700/50 transition"
                  >
                    <span className="font-semibold text-gray-900 dark:text-white pr-4">
                      {faq.q}
                    </span>
                    <motion.div
                      animate={{ rotate: openIndex === index ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                      className="flex-shrink-0"
                    >
                      <ChevronDown className="w-5 h-5 text-brandBlue" />
                    </motion.div>
                  </button>

                  <AnimatePresence>
                    {openIndex === index && (
                      <motion.div
                        id={`faq-answer-${faq.id}`}
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="border-t border-gray-200 dark:border-neutral-700"
                      >
                        <div className="px-5 py-4 text-gray-700 dark:text-neutral-200 leading-relaxed">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            className="max-w-3xl mx-auto text-center py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <p className="text-gray-600 dark:text-neutral-300 text-lg mb-4">
              No questions found matching your search.
            </p>
            <button
              onClick={() => {
                setSearchQuery('')
                setActiveCategory('all')
              }}
              className="text-brandBlue hover:underline font-medium"
            >
              Clear filters
            </button>
          </motion.div>
        )}

        {/* CTA Section */}
        <div className="max-w-3xl mx-auto mt-16 p-8 rounded-lg bg-gradient-to-br from-slate-900 to-slate-800
                        text-white text-center space-y-6 border border-slate-700">
          <h2 className="text-3xl font-bold">Still have questions?</h2>
          <p className="text-slate-300 text-lg">
            We're here to help! Reach out to our team and we'll get back to you as soon as possible.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <a
              href={siteConfig.whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-amber-400 text-slate-950
                         px-6 py-3 rounded-lg font-bold transition shadow-lg hover:shadow-amber-500/20"
              aria-label="Chat with us on WhatsApp"
            >
              <MessageCircle className="w-5 h-5" />
              Chat on WhatsApp
            </a>
            <NavLink
              to="/requestquote"
              className="inline-flex items-center justify-center bg-white/20 hover:bg-white/30
                         text-white px-6 py-3 rounded-lg font-semibold transition border border-white/50"
            >
              Request a Quote
            </NavLink>
          </div>
        </div>
      </div>
    </section>
  )
}