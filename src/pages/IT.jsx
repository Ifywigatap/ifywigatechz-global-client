import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext.jsx';
import PaystackButton from '../components/PaystackButton.jsx';
import { COURSE, getModules, MODULES, NETWORK_LIST, CATEGORIES, OUTCOMES, INSTRUCTOR, TESTIMONIALS, FAQS } from '../data/itData.js'
import { Helmet } from 'react-helmet-async';

// Components
import ModuleCard from './ModuleCard.jsx'
import ITNetworkDiagram from '../components/it/ITNetworkDiagram.jsx'
import ITCourseProgress from '../components/it/ITCourseProgress.jsx'
import ITTestimonialSlider from '../components/it/ITTestimonialSlider.jsx'
import InstructorBio from './InstructorBio.jsx'
import FaqItem from './FaqItem.jsx';
import { WrenchScrewdriverIcon } from '@heroicons/react/24/solid';

const itTheme = {
  unlocked: {
    border: 'border-emerald-500/30',
    bg: 'bg-gradient-to-br from-emerald-500/10 to-teal-500/10',
    hoverBorder: 'hover:border-emerald-400/60',
    shadow: 'hover:shadow-emerald-500/10',
    icon: <WrenchScrewdriverIcon className="h-5 w-5 text-teal-400" />,
    moduleIconText: 'text-emerald-300',
    durationBg: 'bg-emerald-500/20',
    durationText: 'text-emerald-300',
    badgeText: 'text-teal-300',
  },
  coursePath: 'it'
};

export default function IT() {
  const navigate = useNavigate()
  const location = useLocation()
  const { addItem } = useCart()
  const { user, itCoursePaid, unlockItCourse } = useAuth()
  const modules = getModules(user)

  // ✅ Safe price formatting
  const price = COURSE?.price ? COURSE.price.toLocaleString() : '0'

  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <>
      <Helmet>
        <title>IT Support Fundamentals Training - IFYWIGATECHZ</title>
        <meta
          name="description"
          content="CompTIA A+ level IT support training. Hardware, networking, troubleshooting, cybersecurity basics for entry-level IT careers."
        />
      </Helmet>

      {/* HERO SECTION */}
      <section className="relative overflow-hidden border border-emerald-400/30 bg-[radial-gradient(circle_at_top,_rgba(34,197,94,0.16),_transparent_35%),linear-gradient(135deg,_#166534_0%,_#15803d_45%,_#064e3b_100%)] px-6 py-10 shadow-2xl shadow-slate-950/30 sm:px-8 lg:px-12">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(120deg,transparent_0%,rgba(255,255,255,0.05)_35%,transparent_70%)]" />

        <div className="relative grid grid-cols-1 gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/40 bg-emerald-500/10 px-4 py-2 text-sm font-medium text-emerald-100 backdrop-blur">
              <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-300" />
              IT Support Certification
            </div>

            <div className="space-y-4">
              <h1 className="max-w-3xl font-serif text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
                IT Support Fundamentals - From Zero to Helpdesk Hero
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-slate-200">
                Hardware repair, network troubleshooting, Windows mastery, cybersecurity basics.
                Perfect entry point for IT careers.
              </p>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row">
              {!user ? (
                <button
                  className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 px-6 py-4 text-base font-bold text-white transition-all duration-300 hover:from-emerald-400 hover:to-teal-400 hover:scale-[1.02] active:scale-[0.98] shadow-xl shadow-emerald-500/25"
                  onClick={() => navigate('/login', { state: { from: location } })}
                >
                  Login to Enroll
                </button>
              ) : itCoursePaid ? (
                <button
                  className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 px-6 py-4 text-base font-bold text-white transition-all duration-300 hover:from-emerald-400 hover:to-teal-400 hover:scale-[1.02] active:scale-[0.98] shadow-xl shadow-emerald-500/25"
                  onClick={() => navigate('/it/module/01')}
                >
                  Start Learning Now
                </button>
              ) : (
                <PaystackButton
                  email={user.email}
                  amount={COURSE.price}
                  reference={`it_course_${Date.now()}`}
                  metadata={{ course: 'it', userId: user.id }}
                  onSuccess={(response) => {
                    unlockItCourse(response.reference);
                  }}
                  className="w-full rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 px-6 py-4 text-base font-bold text-white shadow-xl shadow-emerald-500/25 transition-all duration-300 hover:from-emerald-400 hover:to-teal-400 hover:scale-[1.02]"
                  label={`Unlock Full Course - N${price}`}
                />
              )}

              <Link
                to="/learn"
                className="inline-flex items-center justify-center rounded-2xl border border-white/20 bg-white/8 px-6 py-4 text-base font-semibold text-white transition-all duration-300 hover:bg-white/14 hover:scale-[1.02]"
              >
                Explore courses
              </Link>
            </div>

            {/* STATS */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur">
                <div className="text-3xl font-bold text-emerald-300">N{price}</div>
                <p className="mt-1 text-sm text-slate-200">Complete training</p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur">
              <div className="text-3xl font-bold text-emerald-200">
                  {MODULES?.length || 0}
                </div>
                <p className="mt-1 text-sm text-slate-200">Practical labs</p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur">
                <div className="text-3xl font-bold text-cyan-300">A+ Ready</div>
                <p className="mt-1 text-sm text-slate-200">CompTIA prep</p>
              </div>
            </div>

<ITCourseProgress />
          </div>

          {/* SIDEBAR */}
          <aside className="rounded-[1.75rem] border border-white/10 bg-slate-950/35 p-6 backdrop-blur-xl">
            <p className="text-sm uppercase tracking-[0.25em] text-emerald-200/80">
              Core skills you'll gain
            </p>

            <div className="mt-5 space-y-4">
              {OUTCOMES.length > 0 ? (
                OUTCOMES.map((outcome, index) => (
                  <div
                    key={index}
                    className="flex gap-3 rounded-2xl border border-white/8 bg-white/6 p-4 transition hover:bg-white/10"
                  >
                    <div className="mt-1 h-2.5 w-2.5 rounded-full bg-emerald-400" />
                    <p className="text-sm leading-7 text-slate-100">{outcome}</p>
                  </div>
                ))
              ) : (
                <p className="text-slate-400 text-sm">No outcomes available.</p>
              )}
            </div>

            <div className="mt-6 rounded-2xl border border-emerald-400/30 bg-emerald-500/10 p-5">
              <p className="text-sm font-semibold text-emerald-100">Hands-on format</p>
              <p className="mt-2 text-sm leading-7 text-slate-100">
                Virtual labs, real troubleshooting scenarios, CompTIA A+ aligned.
                No prior IT experience needed.
              </p>
            </div>
          </aside>
        </div>
      </section>

      {/* MODULES */}
      <section className="bg-gradient-to-r from-slate-800 to-slate-900">
        <div className="border border-emerald-400/10 bg-slate-900/70">
          <div className="flex items-center justify-between gap-4 p-8">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-emerald-200/80">
                Modules
              </p>
              <h2 className="mt-2 text-2xl font-semibold text-white">
                Step-by-step path
              </h2>
            </div>

            <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200">
              Module 1 unlocked
            </span>
          </div>

          <div className="grid grid-cols-2 gap-6 p-8 md:grid-cols-3 lg:grid-cols-4">
            {modules.length > 0 ? (
              modules.map((module) => (
                <ModuleCard key={module.id || module.title} module={module} theme={itTheme} />
              ))
            ) : (
              <p className="text-slate-400">No modules available.</p>
            )}
          </div>
        </div>
      </section>

      {/* NETWORK */}
      <section className="mt-24 border border-emerald-400/10 bg-slate-900/70">
        <ITNetworkDiagram />
      </section>

      {/* INSTRUCTOR + TESTIMONIALS */}
<section className="grid grid-cols-1 gap-8 lg:grid-cols-2 py-24">
        <InstructorBio instructor={INSTRUCTOR} theme="it" />
        <ITTestimonialSlider />
      </section>

      {/* FAQ */}
      <section className="card bg-gradient-to-r from-slate-800 to-slate-900 py-24">
        <h2 className="mb-12 text-center text-3xl font-bold text-white">
          Frequently Asked Questions
        </h2>

        <div className="mx-auto max-w-2xl space-y-4">
          {FAQS.length > 0 ? (
            FAQS.map((faq, i) => (
              <FaqItem
                key={i}
                faq={faq}
                index={i}
                openIndex={openFaqIndex}
                toggle={toggleFaq}
                theme="it"
              />            ))
          ) : (
            <p className="text-slate-400 text-center">No FAQs available.</p>
          )}
        </div>
      </section>
    </>
  )
}
