import { Helmet } from 'react-helmet-async'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { User, Target, MessageSquare, ArrowRight, ArrowLeft, Send, CheckCircle, Zap } from 'lucide-react'

export default function RequestQuote() {
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)

  const [form, setForm] = useState({
    name: '',
    email: '',
    service: '',
    budget: '',
    message: '',
  })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const nextStep = () => setStep((prev) => prev + 1)
  const prevStep = () => setStep((prev) => prev - 1)

  const isStep1Valid = form.name && form.email
  const isStep2Valid = form.service && form.budget
  const isStep3Valid = form.message

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!isStep3Valid) return

    setLoading(true)

    const whatsappMessage = `Hello IFYWIGATECHZ 👋%0A%0A
Name: ${form.name}%0A
Email: ${form.email}%0A
Service Needed: ${form.service}%0A
Budget: ${form.budget}%0A%0A
Project Details:%0A${form.message}`

    const url = `https://wa.me/2348113722088?text=${whatsappMessage}`

    setTimeout(() => {
      window.open(url, '_blank')
      setLoading(false)
    }, 500)
  }

  return (
    <section className="min-h-screen bg-slate-50 dark:bg-slate-950 py-20 px-4 transition-colors duration-300 overflow-hidden relative">
      <Helmet>
        <title>Request a Quote | IFYWIGATECHZ Global Services</title>
      </Helmet>

      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-96 bg-brandBlue/10 blur-[120px] pointer-events-none" />

      <div className="max-w-3xl mx-auto relative z-10 space-y-10">
        {/* Header */}
        <header className="text-center space-y-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brandBlue/10 border border-brandBlue/20 text-brandBlue text-xs font-bold uppercase tracking-widest"
          >
            <Zap size={14} className="animate-pulse" /> Precision Quote System
          </motion.div>
          <h1 className="text-4xl font-black text-slate-900 dark:text-white">Request a Quote</h1>
          <p className="text-slate-600 dark:text-neutral-400">Tell us about your vision, and we'll engineer the roadmap.</p>
        </header>

        {/* Progress Stepper */}
        <div className="space-y-4">
          <div className="flex justify-between">
            {[
              { id: 1, icon: <User size={16} />, label: "Identity" },
              { id: 2, icon: <Target size={16} />, label: "Scope" },
              { id: 3, icon: <MessageSquare size={16} />, label: "Brief" }
            ].map((s) => (
              <div key={s.id} className="flex flex-col items-center gap-2 flex-1">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 border-2 ${
                  step >= s.id 
                    ? 'bg-brandBlue border-brandBlue text-white' 
                    : 'bg-white dark:bg-white/5 border-slate-200 dark:border-white/10 text-slate-400'
                }`}>
                  {step > s.id ? <CheckCircle size={18} /> : s.icon}
                </div>
                <span className={`text-xs font-bold uppercase tracking-tighter ${step === s.id ? 'text-brandBlue' : 'text-slate-400'}`}>
                  {s.label}
                </span>
              </div>
            ))}
          </div>
          {/* Progress Bar */}
          <div className="h-1.5 w-full bg-slate-200 dark:bg-white/10 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-brandBlue"
              animate={{ width: `${(step / 3) * 100}%` }}
            />
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white dark:bg-white/5 backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-[2.5rem] p-8 md:p-12 shadow-2xl transition-colors duration-300"
        >
          <AnimatePresence mode="wait">
            {/* STEP 1 */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Personal Information</h2>
                <div className="space-y-4">
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Full Name"
                    value={form.name}
                    onChange={handleChange}
                    className="input w-full p-4 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 focus:ring-2 focus:ring-brandBlue outline-none transition-all"
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Your Business Email"
                    value={form.email}
                    onChange={handleChange}
                    className="input w-full p-4 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 focus:ring-2 focus:ring-brandBlue outline-none transition-all"
                  />
                </div>
                <button
                  type="button"
                  disabled={!isStep1Valid}
                  onClick={nextStep}
                  className="w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 bg-brandBlue text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-brandBlue/20"
                >
                  Continue <ArrowRight size={18} />
                </button>
              </motion.div>
            )}

            {/* STEP 2 */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Project Scope</h2>
                <div className="space-y-4">
                  <select
                    name="service"
                    value={form.service}
                    onChange={handleChange}
                    className="input w-full p-4 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 focus:ring-2 focus:ring-brandBlue outline-none transition-all"
                  >
                    <option value="">Select Primary Service</option>
                    <option>Web Development</option>
                    <option>UI/UX Design</option>
                    <option>E-commerce</option>
                    <option>Mobile App</option>
                    <option>Other</option>
                  </select>
                  <select
                    name="budget"
                    value={form.budget}
                    onChange={handleChange}
                    className="input w-full p-4 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 focus:ring-2 focus:ring-brandBlue outline-none transition-all"
                  >
                    <option value="">Budget Range</option>
                    <option>₦100k – ₦250k</option>
                    <option>₦250k – ₦500k</option>
                    <option>₦500k – ₦1M+</option>
                  </select>
                </div>
                <div className="flex gap-4">
                  <button type="button" onClick={prevStep} className="flex-1 py-4 rounded-xl font-bold bg-slate-100 dark:bg-white/10 text-slate-600 dark:text-white hover:bg-slate-200 dark:hover:bg-white/20 transition-all flex items-center justify-center gap-2">
                    <ArrowLeft size={18} /> Back
                  </button>
                  <button
                    type="button"
                    disabled={!isStep2Valid}
                    onClick={nextStep}
                    className="flex-1 py-4 rounded-xl font-bold bg-brandBlue text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-brandBlue/20 flex items-center justify-center gap-2"
                  >
                    Next <ArrowRight size={18} />
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 3 */}
            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Project Brief</h2>
                <textarea
                  name="message"
                  rows="5"
                  placeholder="Describe your goals, requirements, and any specific ideas..."
                  value={form.message}
                  onChange={handleChange}
                  className="input w-full p-4 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 focus:ring-2 focus:ring-brandBlue outline-none transition-all resize-none"
                />
                <div className="bg-brandBlue/5 border border-brandBlue/20 p-6 rounded-2xl space-y-2 text-sm">
                  <p className="text-brandBlue font-bold uppercase tracking-widest text-[10px]">Project Summary</p>
                  <p className="text-slate-700 dark:text-neutral-300"><strong>Partner:</strong> {form.name}</p>
                  <p className="text-slate-700 dark:text-neutral-300"><strong>Vertical:</strong> {form.service}</p>
                  <p className="text-slate-700 dark:text-neutral-300"><strong>Investment:</strong> {form.budget}</p>
                </div>
                <div className="flex gap-4">
                  <button type="button" onClick={prevStep} className="flex-1 py-4 rounded-xl font-bold bg-slate-100 dark:bg-white/10 text-slate-600 dark:text-white hover:bg-slate-200 dark:hover:bg-white/20 transition-all flex items-center justify-center gap-2">
                    <ArrowLeft size={18} /> Back
                  </button>
                  <button
                    type="submit"
                    disabled={!isStep3Valid || loading}
                    className="flex-1 py-4 rounded-xl font-bold bg-green-500 text-white hover:bg-green-600 disabled:opacity-50 transition-all shadow-lg shadow-green-500/20 flex items-center justify-center gap-2"
                  >
                    {loading ? 'Processing...' : <><Send size={18} /> Send Quote Request</>}
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </form>

        {/* Trust Footer */}
        <p className="text-center text-xs text-slate-500 dark:text-neutral-500 font-medium">
          🛡️ Your data is secure. Requests are typically reviewed within 12-24 hours.
        </p>
      </div>
    </section>
  )
}
