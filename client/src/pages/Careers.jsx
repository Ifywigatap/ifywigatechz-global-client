import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Briefcase, MapPin, Clock, DollarSign, ArrowRight } from "lucide-react";
import Career from "../components/Career.jsx";

export default function Careers() {
  const benefits = [
    { icon: "🌴", title: "Flexible PTO", desc: "Take time off when you need it" },
    { icon: "🌍", title: "Remote First", desc: "Work from anywhere in the world" },
    { icon: "📈", title: "Career Growth", desc: "Clear promotion paths and mentorship" },
    { icon: "🎓", title: "Learning Budget", desc: "Annual budget for courses and books" },
    { icon: "🏥", title: "Health Coverage", desc: "Comprehensive health insurance" },
    { icon: "🎉", title: "Team Retreats", desc: "Annual meetups and team building" },
  ];

  return (
    <section className="min-h-screen bg-slate-50 dark:bg-gradient-to-b dark:from-slate-950 dark:via-slate-900 dark:to-blue-950 transition-colors duration-300">
      <Helmet>
        <title>Careers | Join the IFYWIGATECHZ Team</title>
        <meta name="description" content="Join IFYWIGATECHZ. We're hiring developers, designers, and digital talent. Remote-friendly, growth-focused." />
      </Helmet>

      {/* Hero */}
      <div className="relative overflow-hidden py-16 sm:py-32">
        <div className="absolute inset-0 bg-gradient-to-r from-brandBlue/10 via-transparent to-brandGold/10" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-brandBlue/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-brandGold/10 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brandGold/10 border border-brandGold/20 text-brandGold text-sm font-medium mb-6">
              <Briefcase size={16} />
              We're Hiring
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white mb-6 leading-tight">
              Build the Future With <span className="text-brandGold">Us</span>
            </h1>
            <p className="text-xl text-slate-700 dark:text-neutral-400 max-w-2xl mx-auto mb-10">
              Join a team of passionate innovators building technology solutions that empower businesses and individuals across Africa and beyond.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="#open-positions"
                className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-brandGold to-yellow-500 text-black font-bold rounded-xl shadow-lg hover:shadow-brandGold/25 hover:scale-105 transition-all duration-300 text-center"
              >
                View Open Positions
              </a>
              <Link
                to="/contact"
                className="w-full sm:w-auto px-8 py-4 bg-white/60 dark:bg-white/5 border border-slate-200 dark:border-white/20 text-slate-900 dark:text-white font-bold rounded-xl hover:bg-white/80 dark:hover:bg-white/10 hover:border-slate-300 dark:hover:border-white/40 transition-all duration-300 text-center"
              >
                General Application
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Stats */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { value: "10+", label: "Team Members" },
            { value: "100%", label: "Remote Friendly" },
            { value: "5+", label: "Countries" },
            { value: "∞", label: "Growth Potential" },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white/60 dark:bg-white/5 backdrop-blur-xl rounded-2xl border border-slate-200 dark:border-white/10 p-6 text-center shadow-sm dark:shadow-none transition-colors duration-300"
            >
              <div className="text-3xl font-black text-brandGold mb-1">{stat.value}</div>
              <div className="text-sm text-slate-700 dark:text-neutral-400">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Benefits */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">Why Work Here?</h2>
          <p className="text-slate-700 dark:text-neutral-400 max-w-2xl mx-auto">
            We believe happy teams build great products. Here's how we take care of ours.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((b, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white/60 dark:bg-white/5 backdrop-blur-xl rounded-2xl border border-slate-200 dark:border-white/10 p-6 hover:bg-white/80 dark:hover:bg-white/10 hover:-translate-y-1 transition-all duration-300 shadow-sm dark:shadow-none"
            >
              <div className="text-4xl mb-4">{b.icon}</div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{b.title}</h3>
              <p className="text-slate-700 dark:text-neutral-400 text-sm">{b.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Open Positions */}
      <div id="open-positions" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <Career />
      </div>

      {/* CTA */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="bg-white/60 dark:bg-gradient-to-r dark:from-brandBlue/20 dark:via-brandGold/10 dark:to-brandBlue/20 rounded-3xl border border-slate-200 dark:border-brandBlue/20 p-6 sm:p-12 text-center shadow-lg dark:shadow-none transition-colors duration-300">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-4">
            Don't See Your Role?
          </h2>
          <p className="text-slate-700 dark:text-neutral-400 mb-8 max-w-lg mx-auto">
            We're always looking for exceptional talent. Send us your resume and tell us how you can contribute.
          </p>
          <a
            href="mailto:careers@ifywigatechz.com?subject=General Application"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-brandGold to-yellow-500 text-black font-bold rounded-xl shadow-lg hover:shadow-brandGold/25 hover:scale-105 transition-all duration-300"
          >
            Send Application
            <ArrowRight size={18} />
          </a>
        </div>
      </div>
    </section>
  );
}
