import { useState, useEffect, useCallback, useMemo } from 'react'
import { Helmet } from 'react-helmet-async'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '../context/AuthContext.jsx'
import contactService from '../services/contact.js'
import Toast from '../components/Toast.jsx'
import { CheckCircle, Zap, ShieldCheck, Globe, Cpu, BarChart3, Layers, Plus, Minus, ArrowRight, MessageCircle, Rocket, Lock, FileText, Smartphone, Layout, Server, Database, Code2 } from "lucide-react";
import { Link } from 'react-router-dom';

/* ---------------- CONSTANTS ---------------- */

const steps = [
  'Project Type',
  'Project Details',
  'Scope & Tech',
  'Budget & Timeline',
  'Contact Info'
]

const projectTypes = [
  'Web App',
  'Mobile App',
  'UI/UX Design',
  'E-commerce Store',
  'SaaS Platform',
  'Landing Page',
  'Portfolio Website',
  'Admin Dashboard',
  'AI-Powered App',
  'Web3 / Blockchain',
  'API Development',
  'Full System Build'
]

const STORAGE_KEY = 'project_draft_v1'

const initialForm = {
  type: '',
  description: '',
  features: '',
  scope: '',
  tech: '',
  budget: '',
  timeline: '',
  name: '',
  email: '',
  phone: '',
  company: '',
  website: '',
  notes: ''
}

/* ---------------- COMPONENT ---------------- */

export default function StartProject() {
  const { user } = useAuth()

  const [step, setStep] = useState(0)

  const [form, setForm] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved ? JSON.parse(saved) : initialForm
  })

  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [toast, setToast] = useState(null)
  const [submitted, setSubmitted] = useState(false)
  const [openFaq, setOpenFaq] = useState(null)

  const toggleFaq = (i) => setOpenFaq(openFaq === i ? null : i)

  const faqs = [
    { q: "How long does a typical project take?", a: "For an MVP, we typically deliver within 4-6 weeks. Larger enterprise platforms range from 3-6 months depending on complexity." },
    { q: "Do I own the source code after development?", a: "Absolutely. We provide full ownership of the repository and documentation upon project completion." },
    { q: "Do you offer post-launch support?", a: "Yes, all our builds come with 3 months of free technical support and performance monitoring." },
    { q: "Can we start with an NDA?", a: "Of course. We prioritize your IP security and are happy to sign an NDA before discussing project specifics." }
  ];

  const metrics = [
    { value: "250+", label: "Projects Delivered", icon: <Layers size={20} className="text-brandBlue" /> },
    { value: "4.9/5", label: "Client Rating", icon: <MessageCircle size={20} className="text-brandGold" /> },
    { value: "99.9%", label: "Uptime SLA", icon: <Globe size={20} className="text-emerald-500" /> },
    { value: "24h", label: "Avg. Response", icon: <Zap size={20} className="text-blue-400" /> },
  ];

  /* ---------------- AUTO FILL USER ---------------- */

  useEffect(() => {
    if (user) {
      setForm(prev => ({
        ...prev,
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || ''
      }))
    }
  }, [user])

  /* ---------------- AUTO SAVE ---------------- */

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(form))
  }, [form])

  /* ---------------- AUTO FOCUS ---------------- */

  useEffect(() => {
    const el = document.querySelector('input, textarea, select')
    if (el) el.focus()
  }, [step])

  /* ---------------- VALIDATION ---------------- */

  const validate = useCallback(() => {
    const newErrors = {}

    if (step === 0 && !form.type) {
      newErrors.type = 'Select a project type'
    }

    if (step === 1 && !form.description) {
      newErrors.description = 'Project description is required'
    }

    if (step === 3 && !form.budget) {
      newErrors.budget = 'Select a budget'
    }

    if (step === 4) {
      if (!form.name.trim()) newErrors.name = 'Name is required'

      const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)
      if (!form.email || !emailValid) newErrors.email = 'Valid email required'

      if (!form.phone.trim()) newErrors.phone = 'Phone required'

      if (form.website.trim() && !/^https?:\/\//.test(form.website.trim())) {
        newErrors.website = 'URL must start with http:// or https://'
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }, [step, form])

  /* ---------------- HANDLERS ---------------- */

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const next = () => {
    if (!validate()) return
    setStep(s => Math.min(s + 1, steps.length - 1))
  }

  const prev = () => setStep(s => Math.max(s - 1, 0))

  const showToast = (message, type = 'error', time = 3000) => {
    setToast({ message, type })
    setTimeout(() => setToast(null), time)
  }

  /* ---------------- SUBMIT ---------------- */

  const submitProject = async () => {
    if (!validate()) return

    setLoading(true)

    try {
      await contactService.submitContact({
        name: form.name,
        email: form.email,
        phone: form.phone,
        subject: `New Project: ${form.type}`,
        message: JSON.stringify(form, null, 2),
        category: 'project'
      })

      localStorage.removeItem(STORAGE_KEY)
      setSubmitted(true)

      showToast("Project submitted successfully! 🚀", 'success', 5000)

    } catch (err) {
      showToast(err.message || 'Submission failed', 'error', 5000)
    } finally {
      setLoading(false)
    }
  }

  const getProjectIcon = (type) => {
    const map = {
      'Web App': <Globe size={18} />,
      'Mobile App': <Smartphone size={18} />,
      'UI/UX Design': <Layout size={18} />,
      'SaaS Platform': <Cpu size={18} />,
      'AI-Powered App': <Zap size={18} />,
      'Web3 / Blockchain': <Layers size={18} />,
      'API Development': <Code2 size={18} />,
      'Full System Build': <Server size={18} />,
      'Admin Dashboard': <BarChart3 size={18} />,
      'Landing Page': <FileText size={18} />,
    };
    return map[type] || <Code2 size={18} />;
  };

  const progress = ((step + 1) / steps.length) * 100

  /* ---------------- UI ---------------- */

  if (submitted) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 px-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full text-center space-y-6 bg-white dark:bg-slate-900 p-10 rounded-[3rem] shadow-2xl border border-slate-200 dark:border-white/10"
        >
          <div className="w-20 h-20 bg-emerald-500/10 text-emerald-500 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle size={40} />
          </div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white">Project Request Sent!</h1>
          <p className="text-slate-600 dark:text-neutral-400">Our engineering team has received your brief. We will review the details and reach out within 24 hours.</p>
          <Link to="/" className="inline-block px-8 py-3 bg-brandBlue text-white font-bold rounded-xl hover:bg-blue-700 transition">
            Back to Homepage
          </Link>
        </motion.div>
      </section>
    );
  }

  return (
    <div className="bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white transition-colors duration-300 pb-20 overflow-hidden">
      <Helmet>
        <title>Launch Your Project | IFYWIGATECHZ</title>
        <meta name="description" content="Kickstart your digital transformation. Tell us about your vision and get a scalable engineering roadmap." />
      </Helmet>

      {/* 🔥 SAAS HERO - Product Positioning */}
      <div className="relative pt-24 pb-16 px-4">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.15),_transparent_50%)]" />
        <div className="max-w-6xl mx-auto text-center space-y-8 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brandBlue/10 border border-brandBlue/20 text-brandBlue text-xs font-bold uppercase tracking-widest"
          >
            <Rocket size={14} className="animate-pulse" /> Engineering Your Vision
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-6xl md:text-7xl font-black leading-tight tracking-tight text-slate-900 dark:text-white"
          >
            Build Your <span className="text-brandBlue">Next Big Thing</span> <br />
            <span className="bg-gradient-to-r from-brandBlue to-cyan-400 bg-clip-text text-transparent">With Precision.</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg sm:text-xl text-slate-600 dark:text-neutral-400 max-w-3xl mx-auto"
          >
            Translate your ideas into a high-performance digital product. Fill out the brief below to get a custom roadmap and architectural quote.
          </motion.p>
        </div>
      </div>

      {/* 🏢 CUSTOMER LOGOS */}
      <div className="max-w-7xl mx-auto py-8 border-y border-slate-200 dark:border-white/5 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
        <p className="text-center text-xs font-bold uppercase tracking-widest text-slate-500 mb-6">Trusted by innovation-led teams</p>
        <div className="flex flex-wrap justify-center gap-8 md:gap-16 items-center px-4">
          {["TechFlow", "GlobalCloud", "InnovateX", "DataCorp", "EcoSystem"].map((brand) => (
            <span key={brand} className="text-xl font-black text-slate-400 dark:text-neutral-600">{brand}</span>
          ))}
        </div>
      </div>

      {/* 📈 LIVE PRODUCT METRICS */}
      <div className="max-w-6xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-4 px-4 py-12">
        {metrics.map((item, i) => (
          <div key={i} className="p-8 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-3xl text-center shadow-sm">
            <div className="w-10 h-10 bg-slate-100 dark:bg-white/5 rounded-xl flex items-center justify-center mx-auto mb-4">{item.icon}</div>
            <div className="text-3xl font-black text-slate-900 dark:text-white mb-1">{item.value}</div>
            <p className="text-slate-500 dark:text-neutral-400 text-xs font-bold uppercase tracking-widest">{item.label}</p>
          </div>
        ))}
      </div>

      {/* 📝 THE FORM SECTION */}
      <div className="w-full max-w-3xl mx-auto py-20 px-4" id="project-form">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-black">Project Configuration</h2>
          <p className="text-slate-500 dark:text-neutral-400">Step {step + 1} of {steps.length}: {steps[step]}</p>
        </div>

        {/* ---------------- STEPPER ---------------- */}
        <div className="flex justify-between mb-10">
          {steps.map((s, i) => (
            <div key={i} className="flex-1 text-center">
              <div
                className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center text-xs font-bold
                ${i < step ? 'bg-green-500' :
                  i === step ? 'bg-blue-500' :
                  'bg-slate-200 dark:bg-slate-800'}`}
              >
                {i < step ? '✓' : i + 1}
              </div>
              <p className={`text-xs mt-2 ${i === step ? 'font-bold' : 'text-slate-500 dark:text-slate-400'}`}>
                {s}
              </p>
            </div>
          ))}
        </div>

        {/* ---------------- PROGRESS BAR ---------------- */}
        <div className="h-2 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden mb-10">
          <div
            className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* ---------------- CARD ---------------- */}
        <div className="bg-white dark:bg-slate-900/80 backdrop-blur-xl p-8 md:p-12 rounded-[3rem] shadow-2xl dark:shadow-none border border-slate-200 dark:border-white/10 transition-colors duration-300">

          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -50, scale: 0.98 }}
              transition={{ duration: 0.3 }}
            >

              {/* STEP 1 */}
              {step === 0 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold">What are you building?</h2>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {projectTypes.map(type => (
                      <button
                        key={type}
                        onClick={() => setForm(prev => ({ ...prev, type }))}
                        className={`p-4 rounded-2xl text-xs sm:text-sm border transition-all flex flex-col items-center gap-3 text-center
                        ${form.type === type 
                          ? 'border-blue-500 bg-blue-500/10 text-blue-600 dark:text-blue-400'
                          : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 text-slate-700 dark:text-slate-300 hover:border-brandBlue'}`}
                      >
                        {getProjectIcon(type)}
                        {type}
                      </button>
                    ))}
                  </div>

                  {errors.type && <p className="text-red-400">{errors.type}</p>}
                </div>
              )}

              {/* STEP 2 */}
              {step === 1 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold">Project Details</h2>

                  <textarea
                    name="description"
                    placeholder="Describe your project..."
                    value={form.description}
                    onChange={handleChange}
                    className={`input ${errors.description ? 'border-red-500' : ''}`}
                  />
                  {errors.description && <p className="text-red-400">{errors.description}</p>}

                  <textarea
                    name="features"
                    placeholder="Key features..."
                    value={form.features}
                    onChange={handleChange}
                    className="input"
                  />
                </div>
              )}

              {/* STEP 3 */}
              {step === 2 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold">Scope & Tech</h2>

                  <select name="scope" value={form.scope} onChange={handleChange} className="input">
                    <option value="">Scope</option>
                    <option>Prototype</option>
                    <option>MVP</option>
                    <option>Single Feature</option>
                    <option>Website Only</option>
                    <option>Mobile App Only</option>
                    <option>UI/UX Design Only</option>
                    <option>API Only</option>
                     <option>Full Product</option>
                    <option>Redesign</option>
                    <option>Consultation</option>
                    <option>Other</option>
                  </select>

                  <input
                    name="tech"
                    placeholder="Preferred tech"
                    value={form.tech}
                    onChange={handleChange}
                    className="input"
                  />
                </div>
              )}

              {/* STEP 4 */}
              {step === 3 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold">Budget & Timeline</h2>

                  <select name="budget" value={form.budget} onChange={handleChange} className="input">
                    <option value="">Budget</option>
                    <option>₦50k - ₦100k</option>
                    <option>₦100k - ₦300k</option>
                    <option>₦300k - ₦700k</option>
                    <option>₦700k - ₦1M</option>
                    <option>₦1M - ₦3M</option>
                    <option>₦3M - ₦5M</option>
                    <option>₦5M+</option>
                  </select>

                  {errors.budget && <p className="text-red-400">{errors.budget}</p>}

                  <select name="timeline" value={form.timeline} onChange={handleChange} className="input">
                    <option value="">Timeline</option>
                    <option>1 Week</option>
                    <option>2 Weeks</option>
                    <option>1 Month</option>
                    <option>2 Months</option>
                    <option>3 Months</option>
                    <option>6 Months</option>
                    <option>Flexible</option>
                  </select>
                </div>
              )}

              {/* STEP 5 */}
              {step === 4 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold">Your Info</h2>

                  {['name', 'email', 'phone', 'company', 'website'].map(field => (
                    <div key={field}>
                      <input
                        name={field}
                        placeholder={field}
                        value={form[field]}
                        onChange={handleChange}
                        className={`input ${errors[field] ? 'border-red-500' : ''}`}
                      />
                      {errors[field] && <p className="text-red-400">{errors[field]}</p>}
                    </div>
                  ))}

                  <textarea
                    name="notes"
                    placeholder="Additional notes"
                    value={form.notes}
                    onChange={handleChange}
                    className="input"
                  />
                </div>
              )}

            </motion.div>
          </AnimatePresence>

          {/* NAVIGATION */}
          <div className="flex justify-between mt-10">
            {step > 0 && (
              <button onClick={prev} className="btn-secondary">
                Back
              </button>
            )}

            {step < steps.length - 1 ? (
              <button onClick={next} className="btn-primary ml-auto">
                Next
              </button>
            ) : (
              <button
                onClick={submitProject}
                className="btn-gradient ml-auto"
                disabled={loading || submitted}
              >
                {loading ? 'Submitting...' : 'Submit 🚀'}
              </button>
            )}
          </div>

        </div>
      </div>

      {/* 🖼️ PRODUCT DASHBOARD PREVIEW */}
      <div className="max-w-6xl mx-auto px-4 py-20">
        <div className="bg-slate-900 rounded-[3rem] p-1 overflow-hidden shadow-2xl border-8 border-slate-900">
          <img src="/services/web.png" alt="Dashboard View" className="w-full h-auto opacity-90" />
        </div>
      </div>

      {/* 🛡️ SECURITY & COMPLIANCE */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="flex flex-wrap justify-center items-center gap-8 p-8 border border-slate-200 dark:border-white/10 rounded-[3rem] bg-white dark:bg-white/5 shadow-sm transition-colors duration-300">
          <div className="flex items-center gap-3">
            <Lock className="text-emerald-500" size={32} />
            <div>
              <p className="font-bold text-slate-900 dark:text-white">IP Protection</p>
              <p className="text-xs text-slate-500">100% ownership & secure NDA</p>
            </div>
          </div>
          <div className="h-10 w-px bg-slate-200 dark:bg-white/10 hidden md:block" />
          <div className="flex gap-4 opacity-50 font-black text-slate-400">
            <span>NDA PROTECTED</span>
            <span>SOC2</span>
            <span>W3C COMPLIANT</span>
          </div>
        </div>
      </div>

      {/* ⚡ ROI CALCULATOR STYLE STATS */}
      <div className="max-w-6xl mx-auto px-4 py-20">
        <div className="bg-brandBlue text-white rounded-[3rem] p-10 md:p-16 flex flex-col lg:flex-row gap-12 items-center">
          <div className="flex-1 space-y-6 text-center lg:text-left">
            <h2 className="text-3xl md:text-4xl font-black leading-tight">Engineering built for scale.</h2>
            <p className="text-blue-100 text-lg">We don't just write code; we architect business solutions that lower your long-term maintenance costs.</p>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-6 bg-white/10 rounded-2xl backdrop-blur">
                <p className="text-3xl font-black">-40%</p>
                <p className="text-xs uppercase font-bold">Time to Market</p>
              </div>
              <div className="p-6 bg-white/10 rounded-2xl backdrop-blur">
                <p className="text-3xl font-black">+150%</p>
                <p className="text-xs uppercase font-bold">App Performance</p>
              </div>
            </div>
          </div>
          <div className="flex-1 w-full max-w-md bg-white text-slate-900 p-8 rounded-[2rem] shadow-2xl">
            <h3 className="font-bold mb-6 flex items-center gap-2"><BarChart3 size={20} className="text-brandBlue"/> Efficiency Roadmaps</h3>
            <div className="space-y-4">
              {[
                { label: "Standard Agencies", val: 85, color: "bg-red-400" },
                { label: "IFYWIGATECHZ Dev", val: 15, color: "bg-emerald-400" }
              ].map((bar, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex justify-between text-xs font-bold uppercase text-slate-500">
                    <span>{bar.label}</span>
                    <span>{bar.val}% friction</span>
                  </div>
                  <div className="h-4 bg-slate-100 rounded-full overflow-hidden">
                    <motion.div initial={{ width: 0 }} whileInView={{ width: `${bar.val}%` }} className={`h-full ${bar.color}`} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 🧩 CAPABILITIES GRID */}
      <div className="max-w-6xl mx-auto px-4 py-24">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl font-black">Full-Spectrum Capabilities</h2>
          <p className="text-slate-600 dark:text-neutral-400">Whatever your stack, our engineers can handle it.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {projectTypes.slice(0,6).map((type, i) => (
            <div key={i} className="group p-8 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-[2.5rem] hover:border-brandBlue transition-all">
              <div className="w-12 h-12 bg-brandBlue/10 text-brandBlue rounded-2xl flex items-center justify-center mb-6 group-hover:bg-brandBlue group-hover:text-white transition-colors">
                {getProjectIcon(type)}
              </div>
              <h3 className="text-xl font-bold mb-2">{type}</h3>
              <p className="text-sm text-slate-500">Enterprise-grade architecture for {type.toLowerCase()} scaling.</p>
            </div>
          ))}
        </div>
      </div>

      {/* ❓ FAQ SECTION */}
      <div className="max-w-4xl mx-auto px-4 py-24">
        <h2 className="text-4xl font-black text-center mb-16">Common Questions</h2>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-3xl overflow-hidden transition-colors">
              <button onClick={() => toggleFaq(i)} className="w-full p-6 text-left flex justify-between items-center">
                <span className="font-bold text-lg text-slate-900 dark:text-white">{faq.q}</span>
                {openFaq === i ? <Minus size={20} className="text-brandBlue" /> : <Plus size={20} className="text-brandBlue" />}
              </button>
              <AnimatePresence>
                {openFaq === i && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="px-6 pb-6 text-slate-600 dark:text-neutral-400 leading-relaxed">
                    {faq.a}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>

      {/* 🚀 FINAL CTA FUNNEL */}
      <div className="max-w-6xl mx-auto px-4 py-24 text-center">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="bg-slate-100 dark:bg-white/5 p-12 md:p-24 rounded-[4rem] border border-slate-200 dark:border-white/10 space-y-8">
          <h2 className="text-4xl md:text-6xl font-black">Not sure where <br /> <span className="text-brandBlue">to start?</span></h2>
          <p className="text-slate-600 dark:text-neutral-400 text-lg max-w-2xl mx-auto">Skip the form and chat with a senior engineer directly about your project needs.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
            <a href="#project-form" className="px-12 py-5 bg-brandBlue text-white rounded-2xl font-black text-xl hover:scale-105 transition shadow-2xl">
              Start The Brief
            </a>
            <a href="https://wa.me/2348113722088" className="px-12 py-5 bg-green-600 text-white rounded-2xl font-black text-xl hover:scale-105 transition shadow-2xl flex items-center justify-center gap-2">
              <MessageCircle size={24} /> WhatsApp Us
            </a>
          </div>
        </motion.div>
      </div>

      {/* TOAST */}
      {toast && (
        <div className="fixed top-4 right-4">
          <Toast message={toast.message} type={toast.type} />
        </div>
      )}

      {/* STYLES */}
      <style>{`
        .input {
          width: 100%;
          padding: 1rem;
          border-radius: 0.75rem;
          background: #f8fafc;
          border: 1px solid #cbd5e1;
          color: #0f172a;
          outline: none;
          transition: all 0.3s ease;
        }
        .dark .input {
          background: #1e293b;
          border: 1px solid #334155;
          color: #f8fafc;
        }
        .input:focus {
          border-color: #3b82f6;
        }
        .btn-primary {
          padding: 0.75rem 1.5rem;
          background: #0f172a;
          color: white;
          border-radius: 0.75rem;
          transition: all 0.3s ease;
        }
        .dark .btn-primary {
          background: white;
          color: #0f172a;
        }
        .btn-secondary {
          padding: 0.75rem 1.5rem;
          border: 1px solid #e2e8f0;
          border-radius: 0.75rem;
          color: #64748b;
        }
        .dark .btn-secondary {
          border-color: #334155;
          color: #94a3b8;
        }
        .btn-gradient {
          padding: 1rem 2rem;
          border-radius: 0.75rem;
          background: linear-gradient(to right, #3b82f6, #22d3ee);
        }
      `}</style>
    </div>
  )
}