import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  BarChart2,
  ArrowRight,
  CheckCircle,
} from "lucide-react";
import { COURSE, getModules, OUTCOMES, FAQS } from "../data/dataAnalyticsData";
import ModuleCard from "./ModuleCard.jsx";
import FaqItem from "./FaqItem.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import PaystackButton from "../components/PaystackButton.jsx";

const dataAnalyticsTheme = {
  unlocked: {
    border: 'border-blue-500/30',
    bg: 'bg-gradient-to-br from-blue-500/10 to-cyan-500/10',
    hoverBorder: 'hover:border-blue-400/60',
    shadow: 'hover:shadow-blue-500/10',
    icon: <BarChart2 className="h-5 w-5 text-cyan-400" />,
    moduleIconText: 'text-blue-300',
    durationBg: 'bg-blue-500/20',
    durationText: 'text-blue-300',
    badgeText: 'text-cyan-300',
  },
  coursePath: 'data-analytics'
};

export default function DataAnalytics() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, dataAnalyticsCoursePaid, unlockDataAnalyticsCourse } = useAuth();
  const modules = getModules(user);
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  const price = COURSE?.price ? COURSE.price.toLocaleString() : '0';

  const toggleFaq = (index) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <section className="relative bg-slate-950 text-white overflow-hidden min-h-screen">
      <Helmet>
        <title>Data Analytics Training | IFYWIGATECHZ</title>
        <meta
          name="description"
          content="Master Data Analytics with SQL, Python, and PowerBI. Start your journey to becoming a data expert today."
        />
      </Helmet>

      {/* Background Glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-900/20 via-transparent to-black pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-brandBlue/10 blur-[120px] pointer-events-none" />

      {/* HERO */}
      <header className="relative max-w-6xl mx-auto px-4 py-28 text-center">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm text-brandBlue mb-6">
            <BarChart2 size={16} />
            Data Analytics Academy
          </div>

          <h1 className="text-5xl md:text-6xl font-black leading-tight mb-6">
            Turn Data Into <br />
            <span className="bg-gradient-to-r from-brandBlue to-cyan-400 bg-clip-text text-transparent">
              Actionable Insights.
            </span>
          </h1>

          <p className="text-neutral-400 max-w-xl mx-auto text-lg mb-10">
            Learn the skills needed to collect, process, and analyze data to drive business decisions. Master SQL, Python, and Data Visualization tools.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            {!user ? (
              <button
                onClick={() => navigate('/login', { state: { from: location } })}
                className="px-8 py-4 bg-gradient-to-r from-brandBlue to-blue-600 text-white font-bold rounded-xl shadow-lg hover:scale-105 transition"
              >
                Login to Enroll
              </button>
            ) : dataAnalyticsCoursePaid ? (
              <button
                onClick={() => navigate('/data-analytics/module/01')}
                className="px-8 py-4 bg-gradient-to-r from-brandBlue to-blue-600 text-white font-bold rounded-xl shadow-lg hover:scale-105 transition"
              >
                Continue Learning
              </button>
            ) : (
              <PaystackButton
                email={user.email}
                amount={COURSE.price}
                reference={`data_analytics_course_${Date.now()}`}
                metadata={{ course: 'data-analytics', userId: user.id }}
                onSuccess={(response) => {
                  unlockDataAnalyticsCourse(response.reference);
                }}
                className="px-8 py-4 bg-gradient-to-r from-brandBlue to-blue-600 text-white font-bold rounded-xl shadow-lg hover:scale-105 transition"
                label={`Unlock Course - ₦${price}`}
              />
            )}

            <a
              href="#modules"
              className="px-8 py-4 bg-white/5 border border-white/20 rounded-xl hover:bg-white/10 transition"
            >
              View Curriculum
            </a>
          </div>
        </motion.div>
      </header>

      {/* MODULES */}
      <section id="modules" className="max-w-6xl mx-auto px-4 pb-24 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Comprehensive Curriculum</h2>
          <p className="text-neutral-400 max-w-xl mx-auto">
            Step-by-step learning path designed to take you from beginner to job-ready data analyst.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {modules.map((m) => (
            <ModuleCard key={m.id} module={m} theme={dataAnalyticsTheme} />
          ))}
        </div>
      </section>

      {/* WHY THIS COURSE */}
      <section className="max-w-5xl mx-auto px-4 pb-24 relative z-10">
        <div className="bg-white/5 border border-white/10 rounded-3xl p-10 backdrop-blur-xl">
          <h2 className="text-3xl font-bold text-center mb-10">
            Why Learn Data Analytics With Us?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {OUTCOMES.map((item, i) => (
              <div key={i} className="flex gap-3">
                <CheckCircle className="text-brandBlue mt-1" size={18} />
                <p className="text-neutral-300">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    {/* FAQ */}
    <section className="max-w-4xl mx-auto px-4 pb-24 relative z-10">
      <div className="bg-white/5 border border-white/10 rounded-3xl p-10 backdrop-blur-xl">
        <h2 className="text-3xl font-bold text-center mb-10">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {FAQS.map((faq, i) => (
            <FaqItem
              key={i}
              faq={faq}
              index={i}
              openIndex={openFaqIndex}
              toggle={toggleFaq}
              theme="microsoft"
            />
          ))}
        </div>
      </div>
    </section>

      {/* CTA */}
      <section className="max-w-4xl mx-auto px-4 pb-28 text-center relative z-10">
        <div className="bg-gradient-to-r from-brandBlue/20 to-cyan-500/10 border border-brandBlue/20 rounded-3xl p-10 backdrop-blur-xl">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Start Your Data Journey?
          </h2>

          <p className="text-neutral-400 mb-8">
            Join our next cohort and learn the skills needed in today's data-driven world.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            {!user ? (
              <button
                onClick={() => navigate('/login', { state: { from: location } })}
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-brandBlue to-blue-600 text-white font-bold rounded-xl hover:scale-105 transition"
              >
                Login to Enroll
                <ArrowRight size={18} />
              </button>
            ) : dataAnalyticsCoursePaid ? (
              <button
                onClick={() => navigate('/data-analytics/module/01')}
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-brandBlue to-blue-600 text-white font-bold rounded-xl hover:scale-105 transition"
              >
                Continue Learning
                <ArrowRight size={18} />
              </button>
            ) : (
              <PaystackButton
                email={user.email}
                amount={COURSE.price}
                reference={`data_analytics_course_${Date.now()}`}
                metadata={{ course: 'data-analytics', userId: user.id }}
                onSuccess={(response) => {
                  unlockDataAnalyticsCourse(response.reference);
                }}
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-brandBlue to-blue-600 text-white font-bold rounded-xl hover:scale-105 transition"
                label={`Unlock Course - ₦${price}`}
              />
            )}

            <a
              href="https://wa.me/2348113722088"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white/5 border border-white/20 rounded-xl hover:bg-white/10 transition"
            >
              Chat with an Advisor
            </a>
          </div>
        </div>
      </section>
    </section>
  );
}