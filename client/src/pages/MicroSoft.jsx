import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext.jsx'
import PaystackButton from '../components/PaystackButton.jsx'
import { COURSE, getModules, MODULES, OUTCOMES, FAQS, INSTRUCTOR } from '../data/microsoftData.js'
import { Helmet } from 'react-helmet-async'
import ModuleCard from './ModuleCard.jsx';
import MicrosoftCertTable from '../components/microsoft/MicrosoftCertTable.jsx'
import MicrosoftCourseProgress from '../components/microsoft/MicrosoftCourseProgress.jsx'
import MicrosoftTestimonialSlider from '../components/microsoft/MicrosoftTestimonialSlider.jsx'
import InstructorBio from './InstructorBio.jsx';
import FaqItem from './FaqItem.jsx';
import { WindowIcon } from '@heroicons/react/24/solid';

const microsoftTheme = {
  unlocked: {
    border: 'border-blue-500/30',
    bg: 'bg-gradient-to-br from-blue-500/10 to-cyan-500/10',
    hoverBorder: 'hover:border-blue-400/60',
    shadow: 'hover:shadow-blue-500/10',
    icon: <WindowIcon className="h-5 w-5 text-cyan-400" />,
    moduleIconText: 'text-blue-300',
    durationBg: 'bg-blue-500/20',
    durationText: 'text-blue-300',
    badgeText: 'text-cyan-300',
  },
  coursePath: 'microsoft'
};

export default function MicroSoft() {
  const navigate = useNavigate()
  const location = useLocation()
  const { addItem } = useCart()
  const { user, microsoftCoursePaid, unlockMicrosoftCourse } = useAuth()
  const modules = getModules(user)

  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <>
      <Helmet>
        <title>Microsoft 365 & Azure Training - IFYWIGATECHZ</title>
        <meta
          name="description"
          content="Master Microsoft 365, Power BI, Azure Fundamentals AZ-900. Get certified and boost your career in office productivity and cloud."
        />
      </Helmet>

      <section className="relative overflow-hidden border border-blue-400/30 bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.16),_transparent_35%),linear-gradient(135deg,_#1e3a8a_0%,_#1e40af_45%,_#1e293b_100%)] px-6 py-10 shadow-2xl shadow-slate-950/30 sm:px-8 lg:px-12">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(120deg,transparent_0%,rgba(255,255,255,0.05)_35%,transparent_70%)]" />

        <div className="relative grid grid-cols-1 gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-400/40 bg-blue-500/10 px-4 py-2 text-sm font-medium text-blue-100 backdrop-blur">
              <span className="h-2 w-2 animate-pulse rounded-full bg-blue-300" />
              Microsoft Certification Training
            </div>

            <div className="space-y-4">
              <h1 className="max-w-3xl font-serif text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
                Master Microsoft 365, Power BI & Azure Fundamentals.
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-slate-200">
                Office productivity expert + AZ-900 certification prep. Excel, Power BI dashboards, Teams admin, Azure cloud basics.
              </p>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row">
              {!user ? (
                <button
                  className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-4 text-base font-bold text-white transition-all duration-300 hover:from-blue-400 hover:to-blue-500 hover:scale-[1.02] active:scale-[0.98] shadow-xl shadow-blue-500/25"
                  onClick={() => navigate('/login', { state: { from: location } })}
                >
                  Login to Enroll
                </button>
              ) : microsoftCoursePaid ? (
                <button
                  className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-4 text-base font-bold text-white transition-all duration-300 hover:from-blue-400 hover:to-blue-500 hover:scale-[1.02] active:scale-[0.98] shadow-xl shadow-blue-500/25"
                  onClick={() => navigate('/microsoft/module/01')}
                >
                  Continue Training
                </button>
              ) : (
                <PaystackButton
                  email={user.email}
                  amount={COURSE.price}
                  reference={`microsoft_course_${Date.now()}`}
                  metadata={{ course: 'microsoft', userId: user.id }}
                  onSuccess={(response) => {
                    unlockMicrosoftCourse(response.reference)
                  }}
                  className="w-full rounded-2xl bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-4 text-base font-bold text-white shadow-xl shadow-blue-500/25 transition-all duration-300 hover:from-blue-400 hover:to-blue-500 hover:scale-[1.02]"
                  label={`Unlock Course - N${COURSE.price?.toLocaleString() || '0'}`}
                />
              )}

              <Link
                to="/learn"
                className="inline-flex items-center justify-center rounded-2xl border border-white/20 bg-white/8 px-6 py-4 text-base font-semibold text-white transition-all duration-300 hover:bg-white/14 hover:scale-[1.02]"
              >
                View all trainings
              </Link>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur">
                <div className="text-3xl font-bold text-blue-300">
                  N{COURSE?.price?.toLocaleString() || '0'}
                </div>
                <p className="mt-1 text-sm text-slate-200">Certification package</p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur">
                <div className="text-3xl font-bold text-blue-200">
                  {modules?.length || 0}
                </div>
                <p className="mt-1 text-sm text-slate-200">Hands-on labs</p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur">
                <div className="text-3xl font-bold text-emerald-300">4</div>
                <p className="mt-1 text-sm text-slate-200">Cert preps included</p>
              </div>
            </div>

            <MicrosoftCourseProgress />
          </div>

          <aside className="rounded-[1.75rem] border border-white/10 bg-slate-950/35 p-6 backdrop-blur-xl">
            <p className="text-sm uppercase tracking-[0.25em] text-blue-200/80">
              Certifications you'll earn
            </p>

            <div className="mt-5 space-y-4">
              {OUTCOMES.map((outcome, index) => (
                <div key={index} className="flex gap-3 rounded-2xl border border-white/8 bg-white/6 p-4 transition hover:bg-white/10">
                  <div className="mt-1 h-2.5 w-2.5 rounded-full bg-blue-400" />
                  <p className="text-sm leading-7 text-slate-100">{outcome}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-2xl border border-blue-400/30 bg-blue-500/10 p-5">
              <p className="text-sm font-semibold text-blue-100">Format</p>
              <p className="mt-2 text-sm leading-7 text-slate-100">
                10 weeks of practical labs, certification prep, real datasets, Microsoft trials included.
              </p>
            </div>
          </aside>
        </div>
      </section>

      <section className="bg-gradient-to-r from-slate-800 to-slate-900">
        <div className="border border-blue-400/10 bg-slate-900/70">
          <div className="flex items-center justify-between gap-4 p-8">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-blue-200/80">Modules</p>
              <h2 className="mt-2 text-2xl font-semibold text-white">Learning path</h2>
            </div>

            <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200">
              Module 1 ready
            </span>
          </div>

          <div className="grid grid-cols-1 gap-6 p-8 md:grid-cols-3 lg:grid-cols-4">
            {modules.map((module) => (
              <ModuleCard key={module.id} module={module} theme={microsoftTheme} />
            ))}
          </div>
        </div>
      </section>

      <section className="mt-24 border border-blue-400/10 bg-slate-900/70">
        <MicrosoftCertTable />
      </section>

      <section className="grid grid-cols-1 gap-8 lg:grid-cols-2 py-24">
        <InstructorBio instructor={INSTRUCTOR} theme="microsoft" />
        <MicrosoftTestimonialSlider />
      </section>

      <section className="card bg-gradient-to-r from-slate-800 to-slate-900 py-24">
        <h2 className="mb-12 text-center text-3xl font-bold text-white">
          Frequently Asked Questions
        </h2>

        <div className="mx-auto max-w-2xl space-y-4">
          {FAQS.map((faq, i) => (
            <FaqItem
              key={i}
              faq={faq}
              index={i}
              openIndex={openFaqIndex}
              toggle={toggleFaq}
              theme="microsoft"
            />          ))}
        </div>
      </section>
    </>
  )
}