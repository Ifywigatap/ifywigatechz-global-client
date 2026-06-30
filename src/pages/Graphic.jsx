import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext.jsx';
import PaystackButton from '../components/PaystackButton.jsx';
import { Helmet } from 'react-helmet-async';
import { COURSE, getModules, MODULES, OUTCOMES, FAQS, INSTRUCTOR } from '../data/graphicData.js'

// Components
import ModuleCard from './ModuleCard.jsx'
import GraphicToolTable from '../components/graphic/GraphicToolTable.jsx'
import GraphicCourseProgress from '../components/graphic/GraphicCourseProgress.jsx'
import GraphicTestimonialSlider from '../components/graphic/GraphicTestimonialSlider.jsx';
import InstructorBio from './InstructorBio.jsx';
import FaqItem from './FaqItem.jsx';
import { PenTool } from 'lucide-react';

const graphicTheme = {
  unlocked: {
    border: 'border-purple-500/30',
    bg: 'bg-gradient-to-br from-purple-500/10 to-pink-500/10',
    hoverBorder: 'hover:border-purple-400/60',
    shadow: 'hover:shadow-purple-500/10',
    icon: <PenTool className="h-5 w-5 text-pink-400" />,
    moduleIconText: 'text-purple-300',
    durationBg: 'bg-purple-500/20',
    durationText: 'text-purple-300',
    badgeText: 'text-pink-300',
  },
  coursePath: 'graphic'
};

export default function Graphic() {
  const navigate = useNavigate()
  const location = useLocation()
  const { addItem } = useCart()
  const { user, graphicCoursePaid, unlockGraphicCourse } = useAuth()
  const modules = getModules(user)

  // ✅ Safe price handling
  const price = COURSE?.price ? COURSE.price.toLocaleString() : '0'

  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <>
      <Helmet>
        <title>Graphic Design Training - IFYWIGATECHZ Academy</title>
        <meta
          name="description"
          content="Professional Graphic Design Certification with Figma, Photoshop, Illustrator. Build portfolios and launch freelance career."
        />
      </Helmet>

      {/* HERO */}
      <section className="relative overflow-hidden border border-purple-400/30 bg-[radial-gradient(circle_at_top,_rgba(168,85,247,0.16),_transparent_35%),linear-gradient(135deg,_#1e1b4b_0%,_#1e293b_45%,_#0f172a_100%)] px-6 py-10 shadow-2xl shadow-slate-950/30 sm:px-8 lg:px-12">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(120deg,transparent_0%,rgba(255,255,255,0.05)_35%,transparent_70%)]" />

        <div className="relative grid grid-cols-1 gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-purple-400/40 bg-purple-500/10 px-4 py-2 text-sm font-medium text-purple-100 backdrop-blur">
              <span className="h-2 w-2 animate-pulse rounded-full bg-gradient-to-r from-purple-400 to-pink-400" />
              Graphic Design Certification Training
            </div>

            <div className="space-y-4">
              <h1 className="max-w-3xl font-serif text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
                Master Graphic Design with Figma, Photoshop & Illustrator.
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-slate-200">
                Build professional portfolios, create pixel-perfect UI designs, and launch a profitable freelance career. From zero to pro in 12 weeks.
              </p>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row">
              {!user ? (
                <button
                  className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 px-6 py-4 text-base font-bold text-white transition-all duration-300 hover:from-purple-400 hover:to-pink-400 hover:scale-[1.02] active:scale-[0.98] shadow-xl shadow-purple-500/25"
                  onClick={() => navigate('/login', { state: { from: location } })}
                >
                  Login to Enroll
                </button>
              ) : graphicCoursePaid ? (
                <button
                  className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 px-6 py-4 text-base font-bold text-white transition-all duration-300 hover:from-purple-400 hover:to-pink-400 hover:scale-[1.02] active:scale-[0.98] shadow-xl shadow-purple-500/25"
                  onClick={() => navigate('/graphic/module/01')}
                >
                  Continue Learning
                </button>
              ) : (
                <PaystackButton
                  email={user.email}
                  amount={COURSE.price}
                  reference={`graphic_course_${Date.now()}`}
                  metadata={{ course: 'graphic', userId: user.id }}
                  onSuccess={(response) => {
                    unlockGraphicCourse(response.reference);
                  }}
                  className="w-full rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 px-6 py-4 text-base font-bold text-white shadow-xl shadow-purple-500/25 transition-all duration-300 hover:from-purple-400 hover:to-pink-400 hover:scale-[1.02]"
                  label={`Unlock Course - N${price}`}
                />
              )}

              <Link
                to="/learn"
                className="inline-flex items-center justify-center rounded-2xl border border-white/20 bg-white/8 px-6 py-4 text-base font-semibold text-white transition-all duration-300 hover:bg-white/14 hover:scale-[1.02]"
              >
                Browse all courses
              </Link>
            </div>

            {/* STATS */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur">
                <div className="text-3xl font-bold text-purple-300">N{price}</div>
                <p className="mt-1 text-sm text-slate-200">Full certification package</p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur">
                <div className="text-3xl font-bold text-purple-200">
                  {MODULES?.length || 0}
                </div>
                <p className="mt-1 text-sm text-slate-200">Hands-on modules</p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur">
                <div className="text-3xl font-bold text-emerald-300">100+</div>
                <p className="mt-1 text-sm text-slate-200">Practice projects</p>
              </div>
            </div>

<GraphicCourseProgress />
          </div>

          {/* SIDEBAR */}
          <aside className="rounded-[1.75rem] border border-white/10 bg-slate-950/35 p-6 backdrop-blur-xl">
            <p className="text-sm uppercase tracking-[0.25em] text-purple-200/80">
              What you'll master
            </p>

            <div className="mt-5 space-y-4">
              {OUTCOMES.length > 0 ? (
                OUTCOMES.map((outcome, index) => (
                  <div
                    key={index}
                    className="flex gap-3 rounded-2xl border border-white/8 bg-white/6 p-4 transition hover:bg-white/10"
                  >
                    <div className="mt-1 h-2.5 w-2.5 rounded-full bg-gradient-to-r from-purple-400 to-pink-400" />
                    <p className="text-sm leading-7 text-slate-100">{outcome}</p>
                  </div>
                ))
              ) : (
                <p className="text-slate-400 text-sm">No outcomes available.</p>
              )}
            </div>

            <div className="mt-6 rounded-2xl border border-purple-400/30 bg-purple-500/10 p-5">
              <p className="text-sm font-semibold text-purple-100">Course format</p>
              <p className="mt-2 text-sm leading-7 text-slate-100">
                12 weeks of guided projects, tool mastery, portfolio building, and freelancing strategies. First module free.
              </p>
            </div>
          </aside>
        </div>
      </section>

      {/* MODULES */}
      <section className="bg-gradient-to-r from-slate-800 to-slate-900">
        <div className="border border-purple-400/10 bg-slate-900/70">
          <div className="flex items-center justify-between gap-4 p-8">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-purple-200/80">
                Modules
              </p>
              <h2 className="mt-2 text-2xl font-semibold text-white">
                Training roadmap
              </h2>
            </div>

            <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200">
              Module 1 preview unlocked
            </span>
          </div>

<div className="grid grid-cols-2 gap-6 p-8 md:grid-cols-3 lg:grid-cols-4">
            {MODULES.length > 0 ? (
              modules.map((module) => (
                <ModuleCard
                  key={module.id || module.title}
                  module={module}
                  theme={graphicTheme}
                />
              ))
            ) : (
              <p className="text-slate-400">No modules available.</p>
            )}
          </div>
        </div>
      </section>

      {/* TOOLS */}
      <section className="mt-24 border border-purple-400/10 bg-slate-900/70">
        <GraphicToolTable />
      </section>

      {/* INSTRUCTOR + TESTIMONIALS */}
      <section className="grid grid-cols-1 gap-8 lg:grid-cols-2 py-24">
        <InstructorBio instructor={INSTRUCTOR} theme="graphic" />
        <GraphicTestimonialSlider />
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
                theme="graphic"
              />            ))
          ) : (
            <p className="text-slate-400 text-center">No FAQs available.</p>
          )}
        </div>
      </section>
    </>
  )
}