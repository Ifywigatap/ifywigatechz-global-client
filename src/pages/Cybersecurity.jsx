import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import PaystackButton from '../components/PaystackButton.jsx';
import { Helmet } from 'react-helmet-async';
import { COURSE, getModules, MODULES, OUTCOMES, FAQS, INSTRUCTOR } from '../data/cybersecurityData.js';

// Components
import ModuleCard from './ModuleCard.jsx';
import CybersecurityConceptsTable from './CybersecurityConceptsTable.jsx';
import CybersecurityCourseProgress from './CybersecurityCourseProgress.jsx';
import CybersecurityTestimonialSlider from './CybersecurityTestimonialSlider.jsx';
import InstructorBio from './InstructorBio.jsx';
import FaqItem from './FaqItem.jsx';
import { ShieldCheckIcon } from '@heroicons/react/24/solid';

const cybersecurityTheme = {
  unlocked: {
    border: 'border-red-500/30',
    bg: 'bg-gradient-to-br from-red-500/10 to-orange-500/10',
    hoverBorder: 'hover:border-red-400/60',
    shadow: 'hover:shadow-red-500/10',
    icon: <ShieldCheckIcon className="h-5 w-5 text-orange-400" />,
    moduleIconText: 'text-red-300',
    durationBg: 'bg-red-500/20',
    durationText: 'text-red-300',
    badgeText: 'text-orange-300',
  },
  coursePath: 'cybersecurity'
};

export default function Cybersecurity() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, cybersecurityCoursePaid, unlockCybersecurityCourse } = useAuth();
  const modules = getModules(user);

  const price = COURSE?.price ? COURSE.price.toLocaleString() : '0';
  const [openFaqIndex, setOpenFaqIndex] = useState(null);
  const toggleFaq = (index) => setOpenFaqIndex(openFaqIndex === index ? null : index);

  return (
    <>
      <Helmet>
        <title>Cybersecurity Fundamentals: Beginner to Pro - IFYWIGATECHZ Academy</title>
        <meta name="description" content="Learn ethical hacking, network security, and incident response. Prepare for CompTIA Security+ and start your cybersecurity career." />
      </Helmet>

      {/* HERO */}
      <section className="relative overflow-hidden border border-red-400/30 bg-[radial-gradient(circle_at_top,_rgba(239,68,68,0.16),_transparent_35%),linear-gradient(135deg,_#450a0a_0%,_#991b1b_45%,_#1e293b_100%)] px-6 py-10 shadow-2xl sm:px-8 lg:px-12">
        <div className="relative grid grid-cols-1 gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-red-400/40 bg-red-500/10 px-4 py-2 text-sm font-medium text-red-100 backdrop-blur">
              <span className="h-2 w-2 animate-pulse rounded-full bg-gradient-to-r from-red-400 to-orange-400" />
              Cybersecurity Professional Certification
            </div>
            <h1 className="max-w-3xl font-serif text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
              Become a Cybersecurity Professional.
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-slate-200">
              Master ethical hacking, defend against cyber threats, and prepare for industry certifications like CompTIA Security+.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              {!user ? (
                <button
                  className="btn-primary"
                  onClick={() => navigate('/login', { state: { from: location } })}
                >
                  Login to Enroll
                </button>
              ) : cybersecurityCoursePaid ? (
                <button
                  className="btn-primary"
                  onClick={() => navigate('/cybersecurity/module/01')}
                >
                  Continue Learning
                </button>
              ) : (
                <PaystackButton
                  email={user.email}
                  amount={COURSE.price}
                  reference={`cyber_course_${Date.now()}`}
                  metadata={{ course: 'cybersecurity', userId: user.id }}
                  onSuccess={(response) => {
                    unlockCybersecurityCourse(response.reference);
                  }}
                  className="w-full rounded-2xl bg-gradient-to-r from-red-600 to-orange-500 px-6 py-4 text-base font-bold text-white shadow-xl shadow-red-500/25 transition-all duration-300 hover:from-red-500 hover:to-orange-400 hover:scale-[1.02]"
                  label={`Unlock Course - N${price}`}
                />
              )}
              <Link to="/learn" className="btn-secondary">
                Browse all courses
              </Link>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div className="stat-card">
                <div className="text-3xl font-bold text-red-300">N{price}</div>
                <p className="mt-1 text-sm text-slate-200">Full certification</p>
              </div>
              <div className="stat-card">
                <div className="text-3xl font-bold text-red-200">{MODULES?.length || 0}</div>
                <p className="mt-1 text-sm text-slate-200">Hands-on modules</p>
              </div>
              <div className="stat-card">
                <div className="text-3xl font-bold text-orange-300">Security+</div>
                <p className="mt-1 text-sm text-slate-200">Certification Prep</p>
              </div>
            </div>
            <CybersecurityCourseProgress />
          </div>
          <aside className="rounded-[1.75rem] border border-white/10 bg-slate-950/35 p-6 backdrop-blur-xl">
            <p className="text-sm uppercase tracking-[0.25em] text-red-200/80">What you'll master</p>
            <div className="mt-5 space-y-4">
              {OUTCOMES.map((outcome, index) => (
                <div key={index} className="flex gap-3 rounded-2xl border border-white/8 bg-white/6 p-4 transition hover:bg-white/10">
                  <div className="mt-1 h-2.5 w-2.5 rounded-full bg-red-400" />
                  <p className="text-sm leading-7 text-slate-100">{outcome}</p>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </section>

      {/* MODULES */}
      <section className="bg-gradient-to-r from-slate-800 to-slate-900">
        <div className="border border-red-400/10 bg-slate-900/70 p-8">
          <h2 className="mt-2 text-2xl font-semibold text-white mb-4">Training Roadmap</h2>
          <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
            {modules.map((module) => <ModuleCard key={module.id} module={module} theme={cybersecurityTheme} />)}
          </div>
        </div>
      </section>

      {/* CONCEPTS */}
      <section className="mt-24 border border-red-400/10 bg-slate-900/70">
        <CybersecurityConceptsTable />
      </section>

      {/* INSTRUCTOR + TESTIMONIALS */}
      <section className="grid grid-cols-1 gap-8 lg:grid-cols-2 py-24 px-8">
        <InstructorBio instructor={INSTRUCTOR} theme="cybersecurity" />
        <CybersecurityTestimonialSlider />
      </section>

      {/* FAQ */}
      <section className="card bg-gradient-to-r from-slate-800 to-slate-900 py-24">
        <h2 className="mb-12 text-center text-3xl font-bold text-white">Frequently Asked Questions</h2>
        <div className="mx-auto max-w-2xl space-y-4">
          {FAQS.map((faq, i) => (
            <FaqItem key={i} faq={faq} index={i} openIndex={openFaqIndex} toggle={toggleFaq} theme="cybersecurity" />
          ))}
        </div>
      </section>
    </>
  );
}