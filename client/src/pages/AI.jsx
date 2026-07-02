import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import PaystackButton from '../components/PaystackButton.jsx';
import { Helmet } from 'react-helmet-async';
import { COURSE, getModules, MODULES, OUTCOMES, FAQS, INSTRUCTOR } from '../data/aiData.js';

// Components
import ModuleCard from './ModuleCard.jsx';
import AiConceptsTable from './AiConceptsTable.jsx';
import AiCourseProgress from './AiCourseProgress.jsx';
import AiTestimonialSlider from './AiTestimonialSlider.jsx';
import InstructorBio from './InstructorBio.jsx';
import FaqItem from './FaqItem.jsx';
import { SparklesIcon } from '@heroicons/react/24/solid';

const aiTheme = {
  unlocked: {
    border: 'border-teal-500/30',
    bg: 'bg-gradient-to-br from-teal-500/10 to-cyan-500/10',
    hoverBorder: 'hover:border-teal-400/60',
    shadow: 'hover:shadow-teal-500/10',
    icon: <SparklesIcon className="h-5 w-5 text-cyan-400" />,
    moduleIconText: 'text-teal-300',
    durationBg: 'bg-teal-500/20',
    durationText: 'text-teal-300',
    badgeText: 'text-cyan-300',
  },
  coursePath: 'ai'
};

export default function AI() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, aiCoursePaid, unlockAiCourse } = useAuth(); // Assumes these are added to AuthContext
  const modules = getModules(user);

  const price = COURSE?.price ? COURSE.price.toLocaleString() : '0';
  const [openFaqIndex, setOpenFaqIndex] = useState(null);
  const toggleFaq = (index) => setOpenFaqIndex(openFaqIndex === index ? null : index);

  return (
    <>
      <Helmet>
        <title>AI & Machine Learning Fundamentals - IFYWIGATECHZ Academy</title>
        <meta name="description" content="Learn AI and Machine Learning with Python, TensorFlow, and PyTorch. Build predictive models and start your career in data science." />
      </Helmet>

      {/* HERO */}
      <section className="relative overflow-hidden border border-teal-400/30 bg-[radial-gradient(circle_at_top,_rgba(13,148,136,0.16),_transparent_35%),linear-gradient(135deg,_#042f2e_0%,_#0f4c4a_45%,_#0f172a_100%)] px-6 py-10 shadow-2xl sm:px-8 lg:px-12">
        <div className="relative grid grid-cols-1 gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-teal-400/40 bg-teal-500/10 px-4 py-2 text-sm font-medium text-teal-100 backdrop-blur">
              <span className="h-2 w-2 animate-pulse rounded-full bg-gradient-to-r from-teal-400 to-cyan-400" />
              AI & Machine Learning Certification
            </div>
            <h1 className="max-w-3xl font-serif text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
              Master AI & Machine Learning Fundamentals.
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-slate-200">
              Build predictive models, understand neural networks, and start your journey into data science and deep learning.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              {!user ? (
                <button
                  className="btn-primary"
                  onClick={() => navigate('/login', { state: { from: location } })}
                >
                  Login to Enroll
                </button>
              ) : aiCoursePaid ? (
                <button
                  className="btn-primary"
                  onClick={() => navigate('/ai/module/01')}
                >
                  Continue Learning
                </button>
              ) : (
                <PaystackButton
                  email={user.email}
                  amount={COURSE.price}
                  reference={`ai_course_${Date.now()}`}
                  metadata={{ course: 'ai', userId: user.id }}
                  onSuccess={(response) => {
                    unlockAiCourse(response.reference); // Assumes this function is added to AuthContext
                  }}
                  className="w-full rounded-2xl bg-gradient-to-r from-teal-500 to-cyan-500 px-6 py-4 text-base font-bold text-white shadow-xl shadow-teal-500/25 transition-all duration-300 hover:from-teal-400 hover:to-cyan-400 hover:scale-[1.02]"
                  label={`Unlock Course - N${price}`}
                />
              )}
              <Link to="/learn" className="btn-secondary">
                Browse all courses
              </Link>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div className="stat-card">
                <div className="text-3xl font-bold text-teal-300">N{price}</div>
                <p className="mt-1 text-sm text-slate-200">Full certification</p>
              </div>
              <div className="stat-card">
                <div className="text-3xl font-bold text-teal-200">{MODULES?.length || 0}</div>
                <p className="mt-1 text-sm text-slate-200">Hands-on modules</p>
              </div>
              <div className="stat-card">
                <div className="text-3xl font-bold text-cyan-300">Python</div>
                <p className="mt-1 text-sm text-slate-200">Core Language</p>
              </div>
            </div>
            <AiCourseProgress />
          </div>
          <aside className="rounded-[1.75rem] border border-white/10 bg-slate-950/35 p-6 backdrop-blur-xl">
            <p className="text-sm uppercase tracking-[0.25em] text-teal-200/80">What you'll master</p>
            <div className="mt-5 space-y-4">
              {OUTCOMES.map((outcome, index) => (
                <div key={index} className="flex gap-3 rounded-2xl border border-white/8 bg-white/6 p-4 transition hover:bg-white/10">
                  <div className="mt-1 h-2.5 w-2.5 rounded-full bg-teal-400" />
                  <p className="text-sm leading-7 text-slate-100">{outcome}</p>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </section>

      {/* MODULES */}
      <section className="bg-gradient-to-r from-slate-800 to-slate-900">
        <div className="border border-teal-400/10 bg-slate-900/70 p-8">
          <h2 className="mt-2 text-2xl font-semibold text-white mb-4">Training Roadmap</h2>
          <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
            {modules.map((module) => <ModuleCard key={module.id} module={module} theme={aiTheme} />)}
          </div>
        </div>
      </section>

      {/* CONCEPTS */}
      <section className="mt-24 border border-teal-400/10 bg-slate-900/70">
        <AiConceptsTable />
      </section>

      {/* INSTRUCTOR + TESTIMONIALS */}
      <section className="grid grid-cols-1 gap-8 lg:grid-cols-2 py-24 px-8">
        <InstructorBio instructor={INSTRUCTOR} theme="ai" />
        <AiTestimonialSlider />
      </section>

      {/* FAQ */}
      <section className="card bg-gradient-to-r from-slate-800 to-slate-900 py-24">
        <h2 className="mb-12 text-center text-3xl font-bold text-white">Frequently Asked Questions</h2>
        <div className="mx-auto max-w-2xl space-y-4">
          {FAQS.map((faq, i) => (
            <FaqItem key={i} faq={faq} index={i} openIndex={openFaqIndex} toggle={toggleFaq} theme="ai" />
          ))}
        </div>
      </section>
    </>
  );
}