import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { ArrowRight, CheckCircle, Link as LinkIcon } from "lucide-react";
import { COURSE, getModules, OUTCOMES } from "../data/web3Data";
import ModuleCard from "./ModuleCard.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import PaystackButton from "../components/PaystackButton.jsx";

const web3Theme = {
  unlocked: {
    border: 'border-violet-200 dark:border-violet-500/30',
    bg: 'bg-gradient-to-br from-violet-50 to-fuchsia-50 dark:from-violet-500/10 dark:to-fuchsia-500/10',
    hoverBorder: 'hover:border-violet-400 dark:hover:border-violet-400/60',
    shadow: 'hover:shadow-violet-500/10',
    icon: <LinkIcon className="h-5 w-5 text-fuchsia-600 dark:text-fuchsia-400" />,
    moduleIconText: 'text-violet-700 dark:text-violet-300',
    durationBg: 'bg-violet-100 dark:bg-violet-500/20',
    durationText: 'text-violet-700 dark:text-violet-300',
    badgeText: 'text-fuchsia-600 dark:text-fuchsia-300',
  },
  coursePath: 'web3'
};

export default function Web3() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, web3CoursePaid, unlockWeb3Course } = useAuth();
  const modules = getModules(user);
  const price = COURSE?.price ? COURSE.price.toLocaleString() : '0';

  return (
    <section className="relative bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white overflow-hidden min-h-screen transition-colors duration-300">
      <Helmet>
        <title>Web3 & Blockchain Development | IFYWIGATECHZ</title>
      </Helmet>
      <div className="absolute inset-0 bg-gradient-to-b from-violet-100/50 dark:from-violet-900/20 via-transparent dark:to-black pointer-events-none transition-colors duration-300" />
      
      <header className="relative max-w-6xl mx-auto px-4 py-28 text-center">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/60 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-full text-sm text-violet-600 dark:text-violet-400 mb-6 shadow-sm dark:shadow-none transition-colors duration-300">
            <LinkIcon size={16} /> Web3 Academy
          </div>
          <h1 className="text-5xl md:text-6xl font-black leading-tight mb-6 text-slate-900 dark:text-white transition-colors duration-300">
            Build the Future of <br />
            <span className="bg-gradient-to-r from-violet-500 to-fuchsia-500 bg-clip-text text-transparent">Decentralization.</span>
          </h1>
          <p className="text-slate-600 dark:text-neutral-400 max-w-xl mx-auto text-lg mb-10 transition-colors duration-300">
            Learn to write secure smart contracts with Solidity and build full-stack decentralized applications.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            {!user ? (
              <button onClick={() => navigate('/login', { state: { from: location } })} className="px-8 py-4 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white font-bold rounded-xl shadow-lg hover:scale-105 transition">
                Login to Enroll
              </button>
            ) : web3CoursePaid ? (
              <button onClick={() => navigate('/web3/module/01')} className="px-8 py-4 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white font-bold rounded-xl shadow-lg hover:scale-105 transition">
                Continue Learning
              </button>
            ) : (
              <PaystackButton
                email={user.email}
                amount={COURSE.price}
                reference={`web3_course_${Date.now()}`}
                metadata={{ course: 'web3', userId: user.id }}
                onSuccess={(response) => unlockWeb3Course(response.reference)}
                className="px-8 py-4 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white font-bold rounded-xl shadow-lg hover:scale-105 transition"
                label={`Unlock Course - ₦${price}`}
              />
            )}
          </div>
        </motion.div>
      </header>

      <section className="max-w-6xl mx-auto px-4 pb-24 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4 transition-colors duration-300">Curriculum</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {modules.map((m) => <ModuleCard key={m.id} module={m} theme={web3Theme} />)}
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 pb-24 relative z-10">
        <div className="bg-white/60 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-3xl p-10 backdrop-blur-xl shadow-lg dark:shadow-none transition-colors duration-300">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white text-center mb-10 transition-colors duration-300">Why Learn Web3 With Us?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {OUTCOMES.map((item, i) => (
              <div key={i} className="flex gap-3">
                <CheckCircle className="text-violet-600 dark:text-violet-500 mt-1 transition-colors duration-300" size={18} />
                <p className="text-slate-700 dark:text-neutral-300 transition-colors duration-300">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </section>
  );
}